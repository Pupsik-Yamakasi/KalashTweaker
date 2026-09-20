"""KALASH TWEAKER v2.0"""

# ── Imports ──────────────────────────────────────────────────────────────
import base64
import ctypes
import datetime
import gzip
import hashlib
import io
import json
import os
import re
import shutil
import statistics
import subprocess
import sys
import tarfile
import tempfile
import threading
import time
import traceback
import urllib.request
import uuid
import webbrowser
from pathlib import Path
from urllib.parse import urlparse

import psutil
import pystray
import webview
from PIL import Image
from pypresence import Presence



# ── Constants ────────────────────────────────────────────────────────────
APP_NAME = "KALASH TWEAKER"
APP_TAG = "KALASH"
VERSION = "2.0.2"
DISCORD_CLIENT_ID = "1542616831012110356"

UPDATE_MANIFEST_URL = "https://api.github.com/repos/Pupsik-Yamakasi/KalashTweaker/releases/latest"

CREATE_NO_WINDOW = 0x08000000

# Windows не всегда установлена на C: — читаем реальный системный диск.
SYSTEM_DRIVE = os.environ.get("SystemDrive", "C:") + "\\"

# Win32 constants used with ctypes calls below (named instead of magic numbers)
MB_ICONERROR = 0x10
MB_YESNO_ICONQUESTION = 0x24
IDYES = 6
SW_RESTORE = 9

if hasattr(sys, "_MEIPASS"):
    BASE_DIR = Path(sys._MEIPASS)
else:
    BASE_DIR = Path(__file__).parent

WEB_DIR = BASE_DIR / "web"
EXTRAS_DIR = BASE_DIR / "extras"


def _installed_version() -> str:
    try:
        p = WEB_DIR / "BUILD_VER.txt"
        if p.exists():
            v = p.read_text(encoding="utf-8", errors="ignore").strip()
            if v:
                return v
    except Exception:
        pass
    return VERSION


INSTALLED_VERSION = _installed_version()

LOG_DIR = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "logs"
CRASH_LOG = LOG_DIR / "crash.log"

os.environ.setdefault(
    "WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS",
    "--autoplay-policy=no-user-gesture-required",
)


# ── Discord Rich Presence ────────────────────────────────────────────────

class DiscordRPCManager:
    """Keeps the Discord activity alive and rotates its status."""

    IDLE_STATUSES = [
        "Настраиваем систему",
        "Тюним Windows",
        "Оптимизируем ПК",
        "Чистим систему",
        "Настраиваем под игры",
    ]
    _OVERRIDE_SECONDS = 25

    def __init__(self, client_id=DISCORD_CLIENT_ID):
        self.client_id = client_id
        self.rpc = None
        self.start_time = int(time.time())
        self._running = False
        self._pool = self.IDLE_STATUSES[:]
        self._pool_index = 0
        self._override = None
        self._override_until = 0.0

    def set_state(self, state, duration=_OVERRIDE_SECONDS):
        self._override = state
        self._override_until = time.time() + duration

    def _current_state(self):
        if self._override is not None:
            if time.time() < self._override_until:
                return self._override
            self._override = None
        state = self._pool[self._pool_index % len(self._pool)]
        self._pool_index += 1
        return state

    def start(self):
        def connect_loop():
            self._running = True
            while self._running:
                try:
                    if self.rpc is None:
                        self.rpc = Presence(self.client_id)
                        self.rpc.connect()
                    self.rpc.update(
                        details="KALASH TWEAKER",
                        state=self._current_state(),
                        start=self.start_time,
                        large_image="logo",
                        large_text=f"{APP_NAME} v{VERSION}",
                        buttons=[{"label": "Наше комьюнити", "url": "https://t.me/Kalash_Optimization"}],
                    )
                except Exception:
                    # Discord may be launched after KALASH: retry on the
                    # next interval instead of affecting the application.
                    self.rpc = None

                for _ in range(15):
                    if not self._running:
                        break
                    time.sleep(1)

        threading.Thread(target=connect_loop, daemon=True, name="discord-rpc").start()

    def stop(self):
        self._running = False
        try:
            if self.rpc is not None:
                self.rpc.close()
        except Exception:
            pass


class TrayManager:
    """Keeps KALASH available after its main window is hidden."""

    def __init__(self, window):
        self.window = window
        self._exiting = False
        self._icon = None

    def start(self):
        try:
            image = Image.open(WEB_DIR / "logo.png")
            menu = pystray.Menu(
                pystray.MenuItem("Открыть KALASH TWEAKER", self._show_window, default=True),
                pystray.Menu.SEPARATOR,
                pystray.MenuItem("Выход", self._exit_application),
            )
            self._icon = pystray.Icon("kalash_tweaker", image, APP_NAME, menu)
            threading.Thread(target=self._icon.run, daemon=True, name="kalash-tray").start()
        except Exception as e:
            _write_crash_log(f"Tray startup failed: {e}")

    def hide_on_close(self):
        if self._exiting:
            return True
        try:
            self.window.hide()
        except Exception:
            pass
        # pywebview treats a False event handler result as cancellation.
        return False

    def _show_window(self, icon=None, item=None):
        try:
            self.window.show()
        except Exception:
            pass

    def _exit_application(self, icon=None, item=None):
        self._exiting = True
        try:
            if self._icon is not None:
                self._icon.stop()
        except Exception:
            pass
        try:
            self.window.destroy()
        except Exception:
            pass


# ── Helper functions ─────────────────────────────────────────────────────

def _init_logging():
    try:
        LOG_DIR.mkdir(exist_ok=True, parents=True)
    except Exception:
        return


def _write_crash_log(exc_text):
    try:
        _init_logging()
        with open(CRASH_LOG, "a", encoding="utf-8") as f:
            f.write(f"\n{'=' * 60}\n")
            f.write(f"[{datetime.datetime.now().isoformat()}] {APP_NAME} v{VERSION}\n")
            f.write(f"{'=' * 60}\n")
            f.write(exc_text)
            f.write("\n")
    except Exception:
        return


_instance_mutex = None
_SINGLE_INSTANCE_PORT = 48231
_active_window = None
_INSTANCE_TOKEN_PATH = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "instance.token"


def _get_or_create_instance_token():
    """A per-user secret so only the same user's KALASH instance can
    trigger _activate_window over the localhost socket (defense in
    depth — the socket is 127.0.0.1-only, but nothing previously
    stopped another local process/user from sending "show")."""
    try:
        _INSTANCE_TOKEN_PATH.parent.mkdir(exist_ok=True, parents=True)
        if _INSTANCE_TOKEN_PATH.exists():
            tok = _INSTANCE_TOKEN_PATH.read_text(encoding="utf-8").strip()
            if tok:
                return tok
        tok = base64.urlsafe_b64encode(os.urandom(24)).decode("ascii")
        _INSTANCE_TOKEN_PATH.write_text(tok, encoding="utf-8")
        return tok
    except Exception:
        # Fall back to a per-process token; second-instance handoff
        # simply won't work this run, which fails safe (both windows
        # just stay open) rather than failing open.
        return base64.urlsafe_b64encode(os.urandom(24)).decode("ascii")


def _acquire_instance_lock():
    global _instance_mutex
    try:
        mutex_name = f"Global\\{APP_TAG}_INSTANCE_{VERSION.replace('.', '_')}"
        _instance_mutex = ctypes.windll.kernel32.CreateMutexW(None, False, mutex_name)
        return ctypes.windll.kernel32.GetLastError() != 183
    except Exception:
        return True


def _activate_window():
    """Restores and foregrounds the main window on a second launch request."""
    w = _active_window
    if w is not None:
        try:
            w.show()
        except Exception:
            pass
        try:
            w.restore()
        except Exception:
            pass
        if w.on_top:
            w.on_top = False
    try:
        hwnd = ctypes.windll.user32.FindWindowW(None, f"{APP_NAME} v{VERSION}")
        if hwnd:
            ctypes.windll.user32.ShowWindow(hwnd, SW_RESTORE)
            ctypes.windll.user32.SetForegroundWindow(hwnd)
    except Exception:
        pass


def _notify_existing_instance():
    """Ask the already-running instance to bring its window to the front."""
    import socket
    token = _get_or_create_instance_token()
    payload = ("show:" + token).encode("utf-8")
    for _ in range(6):
        try:
            s = socket.create_connection(("127.0.0.1", _SINGLE_INSTANCE_PORT), timeout=1)
            try:
                s.sendall(payload)
            finally:
                s.close()
            return
        except Exception:
            time.sleep(0.5)


def _start_single_instance_server():
    """Serves the 'show' command from a second launch on the localhost port."""
    import hmac
    import socket
    token = _get_or_create_instance_token()
    try:
        srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        srv.bind(("127.0.0.1", _SINGLE_INSTANCE_PORT))
        srv.listen(2)
    except Exception:
        return

    def _serve():
        while True:
            try:
                conn, _ = srv.accept()
                try:
                    conn.settimeout(2)
                    data = conn.recv(256).strip().decode("utf-8", errors="ignore")
                    if data.startswith("show:") and hmac.compare_digest(data[5:], token):
                        _activate_window()
                except Exception:
                    pass
                finally:
                    try:
                        conn.close()
                    except Exception:
                        pass
            except Exception:
                break

    threading.Thread(target=_serve, daemon=True, name="single-instance-srv").start()


# Patterns that legitimate tweak commands (reg add, Set-Service, netsh,
# DISM, powercfg, bcdedit, etc.) never need. `command` here is sourced
# from the bundled app.js TWEAKS table, not from arbitrary user/network
# input, but the frontend is still the trust boundary: any future XSS
# or a corrupted/tampered app.js should not be able to turn "apply a
# tweak" into "download and run a remote payload as admin". This is
# defense-in-depth, not a full allow-list — it blocks the injection
# techniques that matter (remote fetch + obfuscated/encoded execution),
# it does not attempt to validate that a command is a "real" tweak.
_SUSPICIOUS_PS_PATTERNS = [
    r"invoke-webrequest", r"\biwr\b", r"invoke-restmethod", r"\birm\b",
    r"net\.webclient", r"downloadstring", r"downloadfile", r"downloaddata",
    r"start-bitstransfer",
    r"-encodedcommand", r"\bfromb64string\b",
    r"\biex\b", r"invoke-expression",
    r"\bcurl\b", r"\bwget\b",
]
_SUSPICIOUS_PS_RE = re.compile("|".join(_SUSPICIOUS_PS_PATTERNS), re.IGNORECASE)


def _reject_if_suspicious_command(command):
    """Returns an error dict if `command` matches a known-dangerous
    pattern, else None. See _SUSPICIOUS_PS_PATTERNS above."""
    if not command or not isinstance(command, str):
        return {"ok": False, "stderr": "Пустая или некорректная команда."}
    if _SUSPICIOUS_PS_RE.search(command):
        _write_crash_log(f"BLOCKED suspicious command (defense-in-depth):\n{command}")
        return {
            "ok": False,
            "stderr": "Команда заблокирована защитным фильтром (похоже на сетевой запрос или "
                      "закодированный код, что не нужно ни одному твику). Если это ложное "
                      "срабатывание — сообщи в поддержку @WhyOtto77.",
        }
    return None


def _run_ps(cmd, timeout=180):
    return subprocess.run(
        ["powershell", "-NoProfile", "-Command", cmd],
        creationflags=CREATE_NO_WINDOW,
        capture_output=True,
        text=True,
        timeout=timeout,
    )


def _reg_fragments_pending(command):
    """Разбивка команды на фрагменты: reg.exe-операции парсятся в argv,
    остальное отдаётся на PowerShell. Возвращает (reg_argv_list, ps_fragments)."""
    reg_argv_list = []
    ps_fragments = []
    for raw in (command or "").split(";"):
        frag = raw.strip()
        if not frag:
            continue
        m = re.match(r"reg\s+(add|delete)\s+'([^']+)'(.*)$", frag, re.I | re.S)
        if not m:
            ps_fragments.append(frag)
            continue
        op, path, tail = m.group(1).lower(), m.group(2), m.group(3).rstrip()
        argv = ["reg", op, path]
        vm = re.search(r"/v\s+([^\s]+)", tail)
        if vm:
            argv += ["/v", vm.group(1)]
        tm = re.search(r"/t\s+([^\s]+)", tail)
        if tm:
            argv += ["/t", tm.group(1)]
        dm = re.search(r"/d\s+'([^']*)'|/d\s+([^\s]+)", tail)
        if dm:
            argv += ["/d", dm.group(1) if dm.group(1) is not None else dm.group(2)]
        if re.search(r"/f\b", tail, re.I):
            argv.append("/f")
        reg_argv_list.append(argv)
    return reg_argv_list, ps_fragments


def _run_command_robust(command, timeout=20):
    """Выполняет твик основным способом (PowerShell), и если не вышло —
    пофрагментно: reg-операции через reg.exe (без PowerShell/WMI),
    остальное отдельными короткими PowerShell-запусками."""
    wrapped = (
        "$ErrorActionPreference = 'Continue';"
        "try { " + command + " } catch { Write-Host $_.Exception.Message; exit 1 }"
    )
    primary_error = None
    try:
        result = subprocess.run(
            ["powershell", "-NoProfile", "-Command", wrapped],
            creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=timeout,
        )
        if result.returncode == 0:
            return {"ok": True, "stdout": (result.stdout or "").strip()[:400], "stderr": ""}
        primary_error = (result.stderr or result.stdout or "").strip()[:300]
    except subprocess.TimeoutExpired:
        primary_error = "основной прогон: превышен таймаут"
    except Exception as e:
        primary_error = f"основной прогон: {e}"

    if primary_error:
        _write_crash_log(f"_run_command_robust primary attempt failed, falling back:\n{command}\n{primary_error}")

    reg_argv_list, ps_fragments = _reg_fragments_pending(command)
    errors = []
    for argv in reg_argv_list:
        try:
            r = subprocess.run(argv, creationflags=CREATE_NO_WINDOW,
                               capture_output=True, text=True, timeout=15)
            if r.returncode != 0:
                errors.append("reg.exe {0}: {1}".format(argv[1], (r.stderr or r.stdout or "").strip()[:200]))
        except subprocess.TimeoutExpired:
            errors.append("reg.exe {0}: timeout".format(argv[1]))
        except Exception as e:
            errors.append("reg.exe {0}: {1}".format(argv[1], str(e)))
    for frag in ps_fragments:
        try:
            r = subprocess.run(
                ["powershell", "-NoProfile", "-Command",
                 "$ErrorActionPreference='Stop'; try { " + frag + " } catch { exit 1 }"],
                creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=timeout,
            )
            if r.returncode != 0:
                errors.append("ps: {0}".format((r.stderr or r.stdout or "").strip()[:200] or frag[:120]))
        except Exception as e:
            errors.append("ps: {0}".format(str(e)[:200]))
    if errors:
        return {"ok": False, "stderr": "; ".join(errors)[:400]}
    if not reg_argv_list and not ps_fragments:
        detail = f" ({primary_error})" if primary_error else ""
        return {"ok": False, "stderr": f"Команда не выполнилась ни одним из способов.{detail}"[:400]}
    return {"ok": True, "stdout": "Применено (fallback: reg.exe / короткие PS-запуски)", "stderr": ""}


def _probe_storage_and_net(timeout=10):
    """Быстрый опрос "железа": типы дисков (SSD/HDD) и наличие Wi-Fi.
    Один PowerShell-запуск, никогда не бросает исключений.
    Основной источник — MSFT_PhysicalDisk (полный доступ в режиме администратора);
    fallback — Win32_DiskDrive по Model/InterfaceType. Возвращает
    {ok, disk_type, has_ssd, has_hdd, wifi}."""
    empty = {"ok": False, "disk_type": "unknown", "has_ssd": None, "has_hdd": None, "wifi": None}
    try:
        ps = (
            "$ErrorActionPreference='SilentlyContinue';"
            "$md=@(); $mb=@(); $mm=@(); $mi=@(); $pd=@();"
            "try { $pd=@(Get-CimInstance -ClassName MSFT_PhysicalDisk -Namespace root\\Microsoft\\Windows\\Storage"
            " -ErrorAction SilentlyContinue | Where-Object { $_.BusType -ne 'File Backed Virtual' });"
            " $md=@($pd | ForEach-Object { [string]$_.MediaType }); $mb=@($pd | ForEach-Object { [string]$_.BusType }); } catch {};"
            "if (-not $pd.Count) { $wd=@(Get-CimInstance Win32_DiskDrive -ErrorAction SilentlyContinue);"
            " $mm=@($wd | ForEach-Object { [string]$_.Model }); $mi=@($wd | ForEach-Object { [string]$_.InterfaceType }); };"
            "$n=0;"
            "try { $n=@(Get-NetAdapter -ErrorAction SilentlyContinue | Where-Object { $_.Status -eq 'Up' -and"
            " $_.InterfaceDescription -match '(?i)Wi-?Fi|802\\.11|Wireless|WLAN' }).Count } catch {};"
            "Write-Output ('MEDIA=' + ($md -join ','));"
            "Write-Output ('BUS=' + ($mb -join ','));"
            "Write-Output ('MODEL=' + ($mm -join ','));"
            "Write-Output ('IFACE=' + ($mi -join ','));"
            "Write-Output ('WIFI=' + $n)"
        )
        r = subprocess.run(
            ["powershell", "-NoProfile", "-Command", ps],
            creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=timeout,
        )
        if r.returncode != 0 or not (r.stdout or "").strip():
            return empty
        media = bus = model = iface = ""
        wifi = None
        for line in (r.stdout or "").splitlines():
            line = line.strip()
            if line.startswith("MEDIA="):
                media = line[6:]
            elif line.startswith("BUS="):
                bus = line[4:]
            elif line.startswith("MODEL="):
                model = line[6:]
            elif line.startswith("IFACE="):
                iface = line[6:]
            elif line.startswith("WIFI="):
                try:
                    wifi = int(line[5:]) > 0
                except Exception:
                    wifi = None
        has_ssd = has_hdd = None
        # MediaType/BusType приходят числовыми перечислениями MSFT_Storage:
        # MediaType: 3=HDD, 4=SSD, 5=SCM;  BusType: 17=NVMe.
        ssd_flag = hdd_flag = False
        for tok in (t.strip().lower() for t in media.split(",") if t.strip()):
            try:
                v = int(tok)
            except ValueError:
                v = None
            if v == 3:
                hdd_flag = True
            elif v in (4, 5):
                ssd_flag = True
            elif tok == "ssd":
                ssd_flag = True
            elif tok == "hdd":
                hdd_flag = True
        for tok in (t.strip().lower() for t in bus.split(",") if t.strip()):
            try:
                v = int(tok)
            except ValueError:
                v = None
            if v == 17:
                ssd_flag = True
        if ssd_flag or hdd_flag:
            has_ssd, has_hdd = ssd_flag, hdd_flag
        else:
            bl, ml, il = bus.lower(), model.lower(), iface.lower()
            ssd_hint = ("nvme" in bl or "ssd" in bl or il == "nvme"
                        or any(k in ml for k in ("ssd", "nvme", "m.2", " m2 ")))
            hdd_hint = (il == "ide"
                        or any(k in ml for k in ("hdd", "seagate", "barracuda",
                                                 "toshiba", "hitachi", "hgst", "wdc wd")))
            if ssd_hint and not hdd_hint:
                has_ssd, has_hdd = True, False
            elif hdd_hint and not ssd_hint:
                has_ssd, has_hdd = False, True
            elif ssd_hint and hdd_hint:
                has_ssd, has_hdd = True, True
        if has_ssd is True and has_hdd is True:
            dtype = "mixed"
        elif has_ssd is True:
            dtype = "ssd"
        elif has_hdd is True:
            dtype = "hdd"
        else:
            dtype = "unknown"
        return {"ok": True, "disk_type": dtype, "has_ssd": has_ssd, "has_hdd": has_hdd, "wifi": wifi}
    except Exception:
        return empty


_WINREG_HIVE_MAP = {
    "HKEY_LOCAL_MACHINE": "HKLM", "HKLM": "HKLM",
    "HKEY_CURRENT_USER": "HKCU", "HKCU": "HKCU",
    "HKEY_USERS": "HKU", "HKU": "HKU",
}


def _run_reg_query(hive, path, name):
    """Reads a single registry value.

    Uses the ``winreg`` module first (locale-independent, no text
    parsing). Falls back to ``reg.exe`` output parsing only if winreg
    is unavailable or raises, so behaviour on non-Windows-locale
    systems doesn't depend on parsing localized ``reg query`` text.
    Returns (value_as_str, reg_type_name) or (None, None).
    """
    hive_short = _WINREG_HIVE_MAP.get(hive, hive)

    try:
        import winreg

        root_map = {
            "HKLM": winreg.HKEY_LOCAL_MACHINE,
            "HKCU": winreg.HKEY_CURRENT_USER,
            "HKU": winreg.HKEY_USERS,
        }
        root = root_map.get(hive_short)
        if root is not None:
            type_names = {
                winreg.REG_SZ: "REG_SZ",
                winreg.REG_EXPAND_SZ: "REG_EXPAND_SZ",
                winreg.REG_DWORD: "REG_DWORD",
                winreg.REG_QWORD: "REG_QWORD",
                winreg.REG_BINARY: "REG_BINARY",
                winreg.REG_MULTI_SZ: "REG_MULTI_SZ",
            }
            with winreg.OpenKey(root, path, 0, winreg.KEY_READ) as k:
                value, reg_type = winreg.QueryValueEx(k, name)
                return (str(value), type_names.get(reg_type, "REG_SZ"))
    except Exception:
        pass  # fall through to reg.exe fallback below

    try:
        r = subprocess.run(
            ["reg", "query", f"{hive_short}\\{path}", "/v", name],
            creationflags=CREATE_NO_WINDOW,
            capture_output=True,
            text=True,
            timeout=15,
        )
        if r.returncode != 0:
            return (None, None)
        for line in r.stdout.splitlines():
            line = line.strip()
            if line.startswith(name):
                parts = line.split(None, 2)
                if len(parts) >= 3:
                    return (parts[2], parts[1])
        return (None, None)
    except Exception:
        return (None, None)


_TWEAKS_STATE_PATH = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "tweaks_state.json"
_TWEAK_HISTORY_PATH = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "tweak_history.json"
_EXPORT_DIR = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "exports"
_BACKUP_DIR = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "registry_backups"
_SETTINGS_PATH = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "settings.json"
_SETTINGS_DEFAULTS = {
    "theme": "dark",
    "confirm_danger": True,
    "create_restore_point": True,
    "autostart": False,
    "notify_applied": True,
}


def _load_settings():
    try:
        if _SETTINGS_PATH.exists():
            data = json.loads(_SETTINGS_PATH.read_text(encoding="utf-8"))
            if isinstance(data, dict):
                merged = dict(_SETTINGS_DEFAULTS)
                merged.update(data)
                return merged
    except Exception:
        pass
    return dict(_SETTINGS_DEFAULTS)


def _save_settings(data):
    merged = dict(_SETTINGS_DEFAULTS)
    if isinstance(data, dict):
        merged.update(data)
    _SETTINGS_PATH.parent.mkdir(parents=True, exist_ok=True)
    _SETTINGS_PATH.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding="utf-8")
    return merged


def _load_tweaks_state():
    try:
        if _TWEAKS_STATE_PATH.exists():
            return json.loads(_TWEAKS_STATE_PATH.read_text(encoding="utf-8"))
    except Exception:
        pass
    return {}


def _save_tweaks_state(state):
    try:
        _TWEAKS_STATE_PATH.parent.mkdir(exist_ok=True, parents=True)
        _TWEAKS_STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding="utf-8")
    except Exception:
        return


def _mark_tweak_applied(tweak_id):
    state = _load_tweaks_state()
    state[tweak_id] = {"applied_at": time.time(), "applied": True}
    _save_tweaks_state(state)


def _load_tweak_history():
    try:
        if _TWEAK_HISTORY_PATH.exists():
            return json.loads(_TWEAK_HISTORY_PATH.read_text(encoding="utf-8"))
    except Exception:
        pass
    return []


def _save_tweak_history(history):
    try:
        _TWEAK_HISTORY_PATH.parent.mkdir(exist_ok=True, parents=True)
        _TWEAK_HISTORY_PATH.write_text(json.dumps(history, indent=2, ensure_ascii=False), encoding="utf-8")
    except Exception:
        return


def _log_tweak_to_history(tweak_id, title, command, category):
    try:
        old_value = None
        cmd_lower = command.lower() if command else ""
        if "reg add" in cmd_lower:
            m = re.search(r"reg\s+add\s+['\"]?(\w+)\\([^'\"]+)['\"]?\s+/v\s+['\"]?(\w+)", command, re.IGNORECASE)
            if m:
                hive, path, name = m.group(1), m.group(2), m.group(3)
                val, typ = _run_reg_query(hive, path, name)
                if val is not None:
                    old_value = {"hive": hive, "path": path, "name": name, "value": val}

        entry = {
            "id": f"auto_{int(time.time() * 1000)}",
            "tweak_id": tweak_id,
            "title": title,
            "command": command,
            "category": category,
            "applied_at": datetime.datetime.now().isoformat(),
            "old_value": old_value,
        }

        history = _load_tweak_history()
        history.append(entry)
        _save_tweak_history(history)
    except Exception:
        return


def _revert_single_tweak(entry):
    old_value = entry.get("old_value")
    command = entry.get("command", "")
    cmd_lower = command.lower() if command else ""

    # Registry add — restore original value
    if "reg add" in cmd_lower and old_value and old_value.get("value") is not None:
        m = re.search(r"reg\s+add\s+['\"]?(\w+)\\([^'\"]+)['\"]?\s+/v\s+['\"]?(\w+)\s+/t\s+['\"]?(\w+)", command, re.IGNORECASE)
        hive_short = old_value.get("hive", "HKCU")
        path = old_value["path"]
        name = old_value["name"]
        value = old_value["value"]
        reg_type = m.group(4) if m else "REG_SZ"
        try:
            subprocess.run(
                ["reg", "add", f"{hive_short}\\{path}", "/v", name, "/t", reg_type, "/d", value, "/f"],
                creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=15,
            )
            return True
        except Exception:
            return False

    # Stop-service / sc stop — restart the service
    if "stop-service" in cmd_lower or "sc stop" in cmd_lower:
        svc_match = re.search(r"Stop-Service\s+['\"]?([A-Za-z0-9_]+)", command, re.IGNORECASE)
        if not svc_match:
            svc_match = re.search(r"sc\s+stop\s+['\"]?([A-Za-z0-9_]+)", command, re.IGNORECASE)
        if svc_match:
            svc = svc_match.group(1)
            try:
                subprocess.run(
                    ["powershell", "-NoProfile", "-Command", f'Start-Service -Name "{svc}" -ErrorAction SilentlyContinue'],
                    creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=15,
                )
                return True
            except Exception:
                return False

    # Disable service — re-enable
    if "disable" in cmd_lower and "service" in cmd_lower:
        svc_match = re.search(r"Set-Service\s+['\"]?([A-Za-z0-9_]+)", command, re.IGNORECASE)
        if svc_match:
            svc = svc_match.group(1)
            try:
                subprocess.run(
                    ["powershell", "-NoProfile", "-Command",
                     f'Set-Service -Name "{svc}" -StartupType Manual -ErrorAction SilentlyContinue; Start-Service -Name "{svc}" -ErrorAction SilentlyContinue'],
                    creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=15,
                )
                return True
            except Exception:
                return False

    return False



_STATIC_SYS_CACHE = {"ts": 0, "cpu_name": "", "windows_edition": "", "windows_build": 0}


# ── API class ────────────────────────────────────────────────────────────

class Api:
    _temps_cache = {"cpu_temp": None, "gpu_temp": None}
    _temps_lock = threading.Lock()
    _SENSOR_PROBE_INTERVAL = 300
    _TASK_NAME = "KALASH_TWEAKER_AutoCleanup"
    _SCHEDULE_PATH = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "cleanup_schedule.json"
    _CLEANUP_PS = (
        "Get-ChildItem -Path ($env:TEMP + '\\*'),'C:\\Windows\\Temp\\*' -Force -ErrorAction SilentlyContinue | "
        "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue; "
        "Get-ChildItem \"$env:LocalAppData\\Microsoft\\Windows\\Explorer\\thumbcache_*.db\" -Force -ErrorAction SilentlyContinue | "
        "Remove-Item -Force -ErrorAction SilentlyContinue; "
        "Clear-RecycleBin -Force -ErrorAction SilentlyContinue"
    )

    def __init__(self, rpc=None):
        self._stop_event = threading.Event()
        self._sensor_probe_ts = 0.0
        self._rpc = rpc
        self._opt_score_val = 50.0
        self._opt_score_ts = 0.0

    def _set_rpc_state(self, state):
        if self._rpc is not None:
            try:
                self._rpc.set_state(state)
            except Exception:
                pass

    def stop(self):
        self._stop_event.set()

    def _temp_updater(self):
        while not self._stop_event.is_set():
            try:
                t = self.get_temperatures()
                with self._temps_lock:
                    self._temps_cache["cpu_temp"] = t.get("cpu_temp")
                    self._temps_cache["gpu_temp"] = t.get("gpu_temp")
            except Exception:
                pass
            self._stop_event.wait(20)

    def get_stats(self):
        try:
            mem = psutil.virtual_memory()
            disk = psutil.disk_usage(SYSTEM_DRIVE)
            uptime_h = round((time.time() - psutil.boot_time()) / 3600, 1)
            cpu_freq = psutil.cpu_freq()
            net = psutil.net_io_counters()
            cpu = psutil.cpu_percent()

            with self._temps_lock:
                cpu_temp = self._temps_cache.get("cpu_temp")
                gpu_temp = self._temps_cache.get("gpu_temp")

            health = 100.0
            health -= max(0, cpu - 40) * 0.6
            health -= max(0, mem.percent - 65) * 0.7
            health -= max(0, disk.percent - 80) * 0.5
            if cpu_temp is not None:
                health -= max(0, cpu_temp - 75) * 1.2
            if gpu_temp is not None:
                health -= max(0, gpu_temp - 80) * 0.8
            health = max(5, min(100, round(health)))

            # Тяжёлая оценка оптимизации выполняется максимум раз в 20 секунд
            # (get_stats вызывается с фронта каждую секунду, а PS-бatch этого
            # расчёта спавнит процесс PowerShell — он не должен делать это чаще).
            now = time.time()
            if now - self._opt_score_ts > 20:
                self._opt_score_ts = now
                self._opt_score_val = self._calc_optimization_score()
            optimization = self._opt_score_val

            cpu_name = _STATIC_SYS_CACHE.get("cpu_name", "")
            windows_edition = _STATIC_SYS_CACHE.get("windows_edition", "")
            windows_build = _STATIC_SYS_CACHE.get("windows_build", 0)
            try:
                if time.time() - float(_STATIC_SYS_CACHE.get("ts") or 0) > 60:
                    ps_cmd = (
                        "$cpu = (Get-CimInstance Win32_Processor | Select-Object -First 1 -ExpandProperty Name); "
                        "$os = Get-CimInstance Win32_OperatingSystem; "
                        "[PSCustomObject]@{ CpuName=$cpu; Caption=$os.Caption; Build=$os.BuildNumber } | ConvertTo-Json -Compress"
                    )
                    r = _run_ps(ps_cmd, timeout=8)
                    if r.stdout and r.stdout.strip():
                        d = json.loads(r.stdout.strip())
                        cpu_name = (d.get("CpuName") or "").strip()
                        windows_edition = (d.get("Caption") or "").strip()
                        windows_build = int(d.get("Build") or 0)
                        _STATIC_SYS_CACHE.update({
                            "ts": time.time(),
                            "cpu_name": cpu_name,
                            "windows_edition": windows_edition,
                            "windows_build": windows_build,
                        })
            except Exception:
                pass

            return {
                "ok": True,
                "cpu": cpu,
                "ram_percent": mem.percent,
                "ram_used": round(mem.used / 1073741824, 1),
                "ram_total": round(mem.total / 1073741824, 1),
                "disk_percent": disk.percent,
                "disk_used": round(disk.used / 1073741824, 1),
                "disk_total": round(disk.total / 1073741824, 1),
                "uptime_h": uptime_h,
                "cpu_freq_ghz": round(cpu_freq.max / 1000, 2) if cpu_freq else 0,
                "net_sent_gb": round(net.bytes_sent / 1073741824, 2),
                "net_recv_gb": round(net.bytes_recv / 1073741824, 2),
                "boot_time": psutil.boot_time(),
                "cpu_temp": cpu_temp,
                "gpu_temp": gpu_temp,
                "health_score": health,
                "optimization_score": optimization,
                "cpu_name": cpu_name,
                "windows_edition": windows_edition,
                "windows_build": windows_build,
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_monitor(self):
        try:
            mem = psutil.virtual_memory()
            disk = psutil.disk_usage(SYSTEM_DRIVE)
            cpu_freq = psutil.cpu_freq()
            net = psutil.net_io_counters()
            cpu = psutil.cpu_percent()
            per_core = [round(x, 1) for x in psutil.cpu_percent(percpu=True)]
            cores = psutil.cpu_count(logical=True)
            with self._temps_lock:
                cpu_temp = self._temps_cache.get("cpu_temp")
                gpu_temp = self._temps_cache.get("gpu_temp")
            top = []
            try:
                for p in psutil.process_iter(["pid", "name", "cpu_percent", "memory_percent"]):
                    try:
                        top.append({
                            "pid": p.info["pid"],
                            "name": (p.info["name"] or "—")[:28],
                            "cpu": round(p.info["cpu_percent"] or 0, 1),
                            "ram": round(p.info["memory_percent"] or 0, 1),
                        })
                    except (psutil.NoSuchProcess, psutil.AccessDenied):
                        continue
                top.sort(key=lambda x: x["cpu"], reverse=True)
                top = top[:8]
            except Exception:
                top = []
            return {
                "ok": True,
                "cpu": cpu,
                "per_core": per_core,
                "cores": cores,
                "freq_ghz": round(cpu_freq.current / 1000, 2) if cpu_freq else 0,
                "ram_percent": mem.percent,
                "ram_used": round(mem.used / 1073741824, 1),
                "ram_total": round(mem.total / 1073741824, 1),
                "disk_percent": disk.percent,
                "uptime_h": round((time.time() - psutil.boot_time()) / 3600, 1),
                "net_down_mbps": round((net.bytes_recv / 1024 / 1024), 1),
                "net_up_mbps": round((net.bytes_sent / 1024 / 1024), 1),
                "cpu_temp": cpu_temp,
                "gpu_temp": gpu_temp,
                "top": top,
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def free_ram(self):
        try:
            _run_ps("EmptyStandbyList.exe standby 2>$null; EmptyStandbyList.exe working-set 2>$null", timeout=15)
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    _OPT_PS_BATCH = (
        "$r = @{};"
        # CPU / process priority
        "$v = (Get-ItemProperty 'HKLM:\\System\\CurrentControlSet\\Control\\PriorityControl' -EA 0).Win32PrioritySeparation;"
        "$r['Win32PrioritySeparation'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' -EA 0).GlobalTimerResolutionRequests;"
        "$r['TimerRes'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' -EA 0).PowerThrottlingOff;"
        "$r['PowerThrottling'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Power' -EA 0).HibernateEnabled;"
        "$r['Hibernate'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power' -EA 0).HiberbootEnabled;"
        "$r['FastStartup'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' -EA 0).DistributeTimers;"
        "$r['DistributeTimers'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' -EA 0).DpcWatchdogProfileOffset;"
        "$r['DpcLatency'] = $v;"
        # GPU / DirectX
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' -EA 0).HwSchMode;"
        "$r['HAGS'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\DirectX' -EA 0).MaxFrameLatency;"
        "$r['MaxFrameLat'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\DirectX' -EA 0).FlipModelSwapchain;"
        "$r['FlipModel'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\DirectX' -EA 0).UltraLowLatencyMode;"
        "$r['ULLM'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' -EA 0).TdrDelay;"
        "$r['TdrDelay'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\DWM' -EA 0).OverlayTestMode;"
        "$r['DWM'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' -EA 0).GpuPreemption;"
        "$r['GpuPreemption'] = $v;"
        # GPU priority
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' -EA 0).'GPU Priority';"
        "$r['GPUPri'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' -EA 0).Priority;"
        "$r['GamePri'] = $v;"
        # Network
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' -EA 0).NetworkThrottlingIndex;"
        "$r['Throttle'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' -EA 0).SystemResponsiveness;"
        "$r['SysResp'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' -EA 0).TcpTimedWaitDelay;"
        "$r['TcpWait'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' -EA 0).MaxUserPort;"
        "$r['MaxPort'] = $v;"
        # Gaming / Windows features
        "$v = (Get-ItemProperty 'HKCU:\\System\\GameConfigStore' -EA 0).GameDVR_Enabled;"
        "$r['GameDVR'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR' -EA 0).AdvancedCaptureEnabled;"
        "$r['GameDVRAdv'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\Software\\Microsoft\\GameBar' -EA 0).AllowAutoGameMode;"
        "$r['GameMode'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\Software\\Microsoft\\GameBar' -EA 0).AutoGameModeEnabled;"
        "$r['GameModeEn'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR' -EA 0).AllowGameDVR;"
        "$r['GameDVRPol'] = $v;"
        # Telemetry / privacy
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection' -EA 0).AllowTelemetry;"
        "$r['Telemetry'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection' -EA 0).AllowTelemetry;"
        "$r['Telemetry2'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search' -EA 0).AllowCortana;"
        "$r['Cortana'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' -EA 0).SystemPaneSuggestionsEnabled;"
        "$r['Suggestions'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' -EA 0).SilentInstalledAppsEnabled;"
        "$r['SilentApps'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\Software\\Microsoft\\InputPersonalization' -EA 0).RestrictImplicitInkCollection;"
        "$r['InkCollect'] = $v;"
        # Visual / responsiveness
        "$v = (Get-ItemProperty 'HKCU:\\Control Panel\\Desktop' -EA 0).MenuShowDelay;"
        "$r['MenuDelay'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\Control Panel\\Desktop\\WindowMetrics' -EA 0).MinAnimate;"
        "$r['MinAnimate'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' -EA 0).TaskbarAnimations;"
        "$r['TaskbarAnim'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' -EA 0).ListviewShadow;"
        "$r['ListShadow'] = $v;"
        # Input latency
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\mouclass\\Parameters' -EA 0).MouseDataQueueSize;"
        "$r['MouseQ'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\kbdclass\\Parameters' -EA 0).KeyboardDataQueueSize;"
        "$r['KeyQ'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl' -EA 0).IRQ8Priority;"
        "$r['IRQ8'] = $v;"
        # Power plan (extract scheme GUID, not the trailing label)
        "$m = powercfg /getactivescheme 2>$null; "
        "if ($m -match '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'){ $v = $matches[0] } else { $v = '' };"
        "$r['PowerPlan'] = $v;"
        # Services (starttype)
        "$svcs = @('SysMain','DiagTrack','WSearch','edgeupdate','BITS','MapsBroker','lfsvc','SharedAccess','XblAuthManager','XblGameSave','XboxNetApiSvc','WpnUserService','TabletInputService','Ndu','NvTelemetryContainer','diagnosticshub.standardcollector.service','dmwappushservice','SgrmBroker','PcaSvc','WerSvc','wcncsvc','Wecsvc');"
        "foreach($s in $svcs){ try{$st=(Get-Service -Name $s -EA SilentlyContinue).StartType;if($st){$r['svc_'+$s]=[string]$st}}catch{} };"
        # Prefetch / memory tuning
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters' -EA 0).EnablePrefetcher;"
        "$r['Prefetch'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters' -EA 0).EnableSuperfetch;"
        "$r['Superfetch'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' -EA 0).LargeSystemCache;"
        "$r['LargeCache'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' -EA 0).DisablePagingExecutive;"
        "$r['DisPaging'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' -EA 0).DisableCompression;"
        "$r['MemCompress'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' -EA 0).FeatureSettingsOverride;"
        "$r['SpectreOver'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' -EA 0).FeatureSettingsOverrideMask;"
        "$r['SpectreMask'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting' -EA 0).Disabled;"
        "$r['WER'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' -EA 0).ClearPageFileAtShutdown;"
        "$r['ClearPF'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control' -EA 0).WaitToKillServiceTimeout;"
        "$r['W2K'] = $v;"
        "$v = (Get-ItemProperty 'HKCU:\\Control Panel\\Desktop' -EA 0).HungAppTimeout;"
        "$r['HungApp'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' -EA 0).TcpMaxDupAcks;"
        "$r['DupAck'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\AFD\\Parameters' -EA 0).AfdFastCopySend;"
        "$r['AFDsend'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\AFD\\Parameters' -EA 0).AfdFastCopyReceive;"
        "$r['AFDrecv'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\AFD\\Parameters' -EA 0).AfdMaxFastSendEvents;"
        "$r['AFDevents'] = $v;"
        # TRIM / фоновые приложения / рабочий набор кэша (для оценки оптимизации)
        "$r['Trim'] = [int]((fsutil behavior query DisableDeleteNotify 2>$null | Out-String) -match 'DisableDeleteNotify = 0');"
        "$r['BgApps'] = (Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications' -EA 0).GlobalUserDisabled;"
        "$r['CacheTrim'] = (Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' -EA 0).RemovePageFileFromWorkingSet;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' -EA 0).'SFIO Priority';"
        "$r['SFIOpri'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' -EA 0).'Background Only';"
        "$r['BgOnly'] = $v;"
        # MMCSS категории планирования (REG_SZ)
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' -EA 0).'Scheduling Category';"
        "$r['GameCat'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio' -EA 0).Priority;"
        "$r['AudioPri'] = $v;"
        "$v = (Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio' -EA 0).'Scheduling Category';"
        "$r['AudioCat'] = $v;"
        # BCD (bcdedit) - быстрый текстовый парсинг, без WMI.
        # ВАЖНО: {current} обязательно в одинарных кавычках — иначе PS парсит его
        # как scriptblock, bcdedit падает молча и чтение всегда возвращает дефолты.
        "$b = (bcdedit /enum '{current}' 2>$null | Out-String);"
        "if($b -match 'disabledynamictick\\s+(Yes|No)'){ $r['BcdDyn'] = [int]($matches[0] -match 'Yes') } else { $r['BcdDyn'] = '' };"
        "if($b -match 'tscsyncpolicy\\s+(Enhanced|Legacy|Default)'){ $r['BcdTsc'] = [int]($matches[0] -match 'Enhanced') } else { $r['BcdTsc'] = '' };"
        "if($b -match 'useplatformclock'){ $r['BcdClock'] = [int]($b -notmatch 'useplatformclock\\s+true') } else { $r['BcdClock'] = '1' };"
        "if($b -match 'nx\\s+(\\S+)'){ $r['BcdNx'] = $matches[1] } else { $r['BcdNx'] = 'OptIn' };"
        "$bt = (bcdedit /enum 2>$null | Out-String); if($bt -match 'timeout\\s+(\\d+)'){ $r['BcdTimeout'] = $matches[1] } else { $r['BcdTimeout'] = '30' };"
        "$r|ConvertTo-Json -Compress"
    )

    def _calc_optimization_score(self):
        try:
            r = _run_ps(self._OPT_PS_BATCH, timeout=12)
            if r.returncode != 0 or not r.stdout.strip():
                return 50.0
            data = json.loads(r.stdout.strip())
        except Exception:
            return 50.0

        # Применимость к железу: NVIDIA-твики начислим только на NVIDIA,
        # глубокие твики памяти — только на системах с 16+ ГБ RAM. Так %
        # оптимизации не занижается из-за вещей, невозможных на этом ПК.
        gpu_name = ""
        try:
            import winreg as _wr
            _base = r"SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}"
            for _i in range(0, 6):
                try:
                    with _wr.OpenKey(_wr.HKEY_LOCAL_MACHINE, _base + "\\%04d" % _i) as _k:
                        _d = _wr.QueryValueEx(_k, "DriverDesc")[0]
                        if _d:
                            gpu_name = str(_d).lower()
                            break
                except OSError:
                    continue
        except Exception:
            pass
        is_nvidia = ("nvidia" in gpu_name or "geforce" in gpu_name or "quadro" in gpu_name)
        try:
            ram_ok = psutil.virtual_memory().total >= 16 * 1073741824
        except Exception:
            ram_ok = False

        nvidia_only = {"MaxFrameLat", "FlipModel", "ULLM", "GpuPreemption"}
        ram16_only = {"DisPaging", "MemCompress", "CacheTrim"}

        score = 0
        max_score = 0

        reg_checks = [
            ("Win32PrioritySeparation", ["38"], 12),
            ("TimerRes", ["1"], 10),
            ("PowerThrottling", ["1"], 10),
            ("Hibernate", ["0"], 5),
            ("FastStartup", ["0"], 5),
            ("DistributeTimers", ["1"], 4),
            ("DpcLatency", ["10000", "20000"], 6),
            ("HAGS", ["2"], 10),
            ("MaxFrameLat", ["1"], 8),
            ("FlipModel", ["1"], 5),
            ("ULLM", ["1"], 5),
            ("TdrDelay", ["4", "6", "8", "10"], 5),
            ("DWM", ["5"], 4),
            ("GpuPreemption", ["0"], 5),
            ("GPUPri", ["7", "8"], 6),
            ("GamePri", ["6", "8"], 5),
            ("Throttle", ["4294967295"], 6),
            ("SysResp", ["0", "5"], 5),
            ("TcpWait", ["30", "15", "10"], 4),
            ("MaxPort", ["65534", "65535"], 3),
            ("GameDVR", ["0"], 8),
            ("GameDVRAdv", ["0"], 4),
            ("GameMode", ["1"], 4),
            ("GameModeEn", ["1"], 4),
            ("GameDVRPol", ["0"], 4),
            ("Telemetry", ["0"], 5),
            ("Telemetry2", ["0"], 3),
            ("Cortana", ["0"], 4),
            ("Suggestions", ["0"], 4),
            ("SilentApps", ["0"], 3),
            ("InkCollect", ["1"], 3),
            ("MenuDelay", ["0", "100", "200"], 5),
            ("MinAnimate", ["0"], 4),
            ("TaskbarAnim", ["0"], 3),
            ("ListShadow", ["0"], 2),
            ("MouseQ", ["10", "15", "20"], 5),
            ("KeyQ", ["10", "15", "20"], 5),
            ("IRQ8", ["1"], 3),
            ("Prefetch", ["0"], 4),
            ("Superfetch", ["0"], 4),
            ("LargeCache", ["0"], 4),
            ("DisPaging", ["1"], 3),
            ("GameCat", ["High"], 5),
            ("AudioPri", ["6", "8"], 4),
            ("AudioCat", ["High"], 4),
            ("BcdDyn", ["1"], 4),
            ("BcdTsc", ["1"], 3),
            ("BcdClock", ["1"], 3),
            ("BcdTimeout", ["3", "5", "10"], 2),
            # Настройки, которые реально применяет приложение (сейчас не начислялись):
            ("Trim", ["1"], 4),
            ("BgApps", ["1"], 4),
            ("CacheTrim", ["1"], 4),
            ("MemCompress", ["1"], 4),
            ("ClearPF", ["1"], 2),
            ("W2K", ["2000"], 3),
            ("HungApp", ["5000"], 2),
            ("DupAck", ["2"], 2),
            ("AFDsend", ["1"], 3),
            ("AFDrecv", ["1"], 3),
            ("AFDevents", ["2"], 2),
            ("SFIOpri", ["High"], 3),
            ("BgOnly", ["0", "False"], 3),
        ]
        for key, accepted, pts in reg_checks:
            if key in nvidia_only and not is_nvidia:
                continue
            if key in ram16_only and not ram_ok:
                continue
            max_score += pts
            val = str(data.get(key) or "").strip()
            if val in accepted:
                score += pts

        power_plan = str(data.get("PowerPlan") or "")
        max_score += 10
        if "e9a42b02" in power_plan or "8c5e7fda" in power_plan:
            score += 10
        elif "381b4222" in power_plan:
            score += 5

        svc_disabled_pts = {
            "SysMain": 6, "DiagTrack": 7, "WSearch": 4, "edgeupdate": 3,
            "BITS": 2, "MapsBroker": 2, "lfsvc": 2, "SharedAccess": 2,
            "XblAuthManager": 3, "XblGameSave": 3, "XboxNetApiSvc": 3,
            "WpnUserService": 3, "TabletInputService": 3, "Ndu": 3,
        }
        for svc, pts in svc_disabled_pts.items():
            svc_val = str(data.get(f"svc_{svc}") or "").lower()
            if not svc_val:
                # Службы нет на этой системе — не занижаем максимум
                continue
            max_score += pts
            if "disabled" in svc_val:
                score += pts
            elif "manual" in svc_val:
                score += pts // 2

        if max_score == 0:
            return 50.0
        return max(0.0, min(100.0, round(score * 1000 / max_score) / 10))

    def get_system_info(self):
        try:
            freq = psutil.cpu_freq()
            mem = psutil.virtual_memory()
            disk = psutil.disk_usage(SYSTEM_DRIVE)
            boot = psutil.boot_time()
            uptime_s = time.time() - boot

            days = int(uptime_s // 86400)
            hours = int(uptime_s % 86400 // 3600)
            mins = int(uptime_s % 3600 // 60)
            uptime_str = f"{days}д {hours}ч {mins}м" if days else f"{hours}ч {mins}м"

            return {
                "ok": True,
                "cpu_count_phys": psutil.cpu_count(logical=False) or 0,
                "cpu_count_log": psutil.cpu_count(logical=True) or 0,
                "cpu_freq": round(freq.max / 1000, 2) if freq else 0,
                "ram_total": round(mem.total / 1073741824, 1),
                "disk_total": round(disk.total / 1073741824, 1),
                "boot_time": boot,
                "uptime_str": uptime_str,
                "uptime_s": round(uptime_s, 0),
                "version": VERSION,
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_cpu_info(self):
        try:
            name = "Unknown"
            max_mhz = 0
            try:
                import winreg as _wr
                with _wr.OpenKey(_wr.HKEY_LOCAL_MACHINE, r"HARDWARE\DESCRIPTION\System\CentralProcessor\0") as _k:
                    try:
                        name = _wr.QueryValueEx(_k, "ProcessorNameString")[0].strip()
                    except Exception:
                        pass
                    try:
                        max_mhz = int(_wr.QueryValueEx(_k, "~MHz")[0])
                    except Exception:
                        max_mhz = 0
            except Exception:
                pass
            freq = psutil.cpu_freq()
            charm = (name or "").lower()
            if "intel" in charm:
                vendor = "intel"
            elif "amd" in charm or "ryzen" in charm or "athlon" in charm or "a-series" in charm or "fx-" in charm:
                vendor = "amd"
            else:
                vendor = "unknown"
            return {
                "ok": True,
                "name": name or "Unknown",
                "vendor": vendor,
                "cores": psutil.cpu_count(logical=False) or 4,
                "threads": psutil.cpu_count() or 4,
                "max_ghz": round((freq.max if freq and freq.max else max_mhz or 0) / 1000, 2),
                "current_ghz": round((freq.current if freq else 0) / 1000, 2),
                "load": psutil.cpu_percent(interval=None),
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_gpu_info(self):
        try:
            name = "—"
            driver = "—"
            qw = None
            try:
                import winreg as _wr
                base = r"SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}"
                try:
                    root = _wr.OpenKey(_wr.HKEY_LOCAL_MACHINE, base)
                    idx = 0
                    while True:
                        try:
                            sub = _wr.EnumKey(root, idx)
                        except OSError:
                            break
                        idx += 1
                        if not sub.isdigit():
                            continue
                        with _wr.OpenKey(_wr.HKEY_LOCAL_MACHINE, base + "\\" + sub) as k:
                            try:
                                cand = _wr.QueryValueEx(k, "DriverDesc")[0].strip()
                            except Exception:
                                continue
                            if not cand or "Microsoft Basic" in cand or "Remote" in cand:
                                continue
                            name = cand
                            try:
                                driver = _wr.QueryValueEx(k, "DriverVersion")[0].strip()
                            except Exception:
                                pass
                            try:
                                qgrams = _wr.QueryValueEx(k, "HardwareInformation.qwMemorySize")[0]
                                qw = int(qgrams)
                            except Exception:
                                qw = None
                            break
                    _wr.CloseKey(root)
                except OSError:
                    pass
            except Exception:
                pass
            vram_bytes = qw or 0
            nc = (name or "").lower()
            if "nvidia" in nc or "geforce" in nc or "quadro" in nc or "tesla" in nc:
                gvendor = "nvidia"
            elif "amd" in nc or "radeon" in nc or "ati" in nc:
                gvendor = "amd"
            elif "intel" in nc or "iris" in nc or "uhd" in nc or "hd graphics" in nc:
                gvendor = "intel"
            else:
                gvendor = "unknown"
            return {
                "ok": True,
                "name": name or "—",
                "vendor": gvendor,
                "vram_gb": round(vram_bytes / 1073741824, 1) if vram_bytes else 0,
                "driver": driver or "—",
                "refresh_rate": 0,
                "video_mode": "—",
                "status": "—",
            }
        except Exception as e:
            return {"ok": False, "name": "—", "vram_gb": 0, "driver": "—", "stderr": str(e)}

    def get_temperatures(self):
        temps = {"cpu_temp": None, "gpu_temp": None}
        try:
            t = psutil.sensors_temperatures()
            if t:
                for key in ("coretemp", "k10temp", "cpu_thermal"):
                    if key in t and t[key]:
                        for sensor in t[key]:
                            if sensor.current and sensor.current > 0:
                                temps["cpu_temp"] = round(sensor.current, 1)
                                break
                for key in ("nvidia", "amdgpu", "radeon", "intelgpu"):
                    if key in t and t[key]:
                        for sensor in t[key]:
                            if sensor.current and sensor.current > 0:
                                temps["gpu_temp"] = round(sensor.current, 1)
                                break
        except Exception:
            pass

        if temps["cpu_temp"] is None or temps["gpu_temp"] is None:
            now = time.time()
            if now - self._sensor_probe_ts >= Api._SENSOR_PROBE_INTERVAL:
                self._sensor_probe_ts = now
                try:
                    ps_cmd = (
                        "$result = @{}; try { $t = Get-CimInstance MSAcpi_ThermalZoneTemperature "
                        "-Namespace 'root/wmi' -ErrorAction Stop; if ($t) { $result.cpu = "
                        "[math]::Round(($t[0].CurrentTemperature - 2732) / 10, 1) } } catch {}; "
                        "try { $nv = & nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader,nounits 2>$null; "
                        "if ($nv) { $result.gpu = [int]$nv.Trim() } } catch {}; "
                        "$result | ConvertTo-Json -Compress"
                    )
                    r = _run_ps(ps_cmd, timeout=10)
                    stdout = (r.stdout or "").strip()
                    if stdout:
                        d = json.loads(stdout)
                        if temps["cpu_temp"] is None and d.get("cpu"):
                            temps["cpu_temp"] = d["cpu"]
                        if temps["gpu_temp"] is None and d.get("gpu"):
                            temps["gpu_temp"] = d["gpu"]
                except Exception:
                    pass

        return {
            "ok": True,
            "cpu_temp": temps["cpu_temp"],
            "gpu_temp": temps["gpu_temp"],
        }

    def get_top_processes(self, sort_by="cpu", limit=30):
        try:
            procs = []
            for p in psutil.process_iter(["pid", "name", "cpu_percent", "memory_percent", "memory_info", "status", "create_time"]):
                try:
                    info = p.info
                    try:
                        mem_bytes = info["memory_info"].rss if info.get("memory_info") else 0
                    except Exception:
                        mem_bytes = 0
                    procs.append({
                        "pid": info.get("pid", 0),
                        "name": info.get("name", "—"),
                        "cpu": round(info.get("cpu_percent") or 0, 1),
                        "ram_mb": round(mem_bytes / 1048576, 1) if mem_bytes else 0,
                        "ram_percent": round(info.get("memory_percent") or 0, 1),
                        "status": info.get("status", ""),
                    })
                except (psutil.NoSuchProcess, psutil.AccessDenied):
                    continue

            if sort_by == "ram":
                procs.sort(key=lambda x: x["ram_mb"], reverse=True)
            else:
                procs.sort(key=lambda x: x["cpu"], reverse=True)

            return {
                "ok": True,
                "processes": procs[:limit],
                "total": len(procs),
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def kill_process(self, pid):
        try:
            p = psutil.Process(int(pid))
            name = p.name()
            p.kill()
            return {"ok": True, "killed": name, "pid": pid}
        except psutil.NoSuchProcess:
            return {"ok": False, "stderr": "Процесс не найден."}
        except psutil.AccessDenied:
            return {"ok": False, "stderr": "Нет прав для завершения этого процесса."}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_disk_health(self):
        try:
            ps_cmd = (
                "$disks = @(); Get-PhysicalDisk | Select-Object FriendlyName, MediaType, Size, HealthStatus, OperationalStatus "
                "| ForEach-Object { $disks += $_ }; Get-Partition | Select-Object DriveLetter, Size, Type, FileSystem "
                "| Where-Object { $_.DriveLetter } | ForEach-Object { $disks += $_ }; try { "
                "$sm = Get-CimInstance -Namespace root/wmi -ClassName MSStorageDriver_FailurePredictStatus -ErrorAction Stop; "
                "$smart = $sm | Select-Object -First 1 PredictFailure; } catch { $smart = $null }; "
                "[PSCustomObject]@{ PhysicalDisks=@($disks); SmartStatus=$smart } | ConvertTo-Json -Compress -Depth 4"
            )
            result = _run_ps(ps_cmd, timeout=10)
            stdout = (result.stdout or "").strip()
            if stdout:
                d = json.loads(stdout)
                physical = []
                for pd in d.get("PhysicalDisks") or []:
                    if pd.get("FriendlyName"):
                        physical.append({
                            "name": pd.get("FriendlyName", "—"),
                            "type": pd.get("MediaType", "—"),
                            "size_gb": round((pd.get("Size") or 0) / 1073741824, 1),
                            "health": pd.get("HealthStatus", "—"),
                            "status": pd.get("OperationalStatus", "—"),
                        })
                return {"ok": True, "disks": physical}

            return {"ok": False, "disks": []}
        except Exception as e:
            return {"ok": False, "disks": [], "stderr": str(e)}

    def get_windows_info(self):
        try:
            ver = sys.getwindowsversion()
            ps_cmd = (
                "[PSCustomObject]@{ Caption=(Get-CimInstance Win32_OperatingSystem).Caption; "
                "Version=(Get-CimInstance Win32_OperatingSystem).Version; "
                "BuildNumber=(Get-CimInstance Win32_OperatingSystem).BuildNumber; "
                "InstallDate=(Get-CimInstance Win32_OperatingSystem).InstallDate; "
                "LastBootUpTime=(Get-CimInstance Win32_OperatingSystem).LastBootUpTime; "
                "OSArchitecture=(Get-CimInstance Win32_OperatingSystem).OSArchitecture; } | ConvertTo-Json -Compress"
            )
            result = _run_ps(ps_cmd, timeout=10)
            stdout = (result.stdout or "").strip()
            if stdout:
                d = json.loads(stdout)
                return {
                    "ok": True,
                    "caption": d.get("Caption", "Windows"),
                    "version": d.get("Version", str(ver)),
                    "build": d.get("BuildNumber", str(ver.build)),
                    "architecture": d.get("OSArchitecture", "64-bit"),
                    "install_date": d.get("InstallDate", "—"),
                }
            # Fallback to basic info
            return {
                "ok": True,
                "caption": "Windows",
                "version": str(ver),
                "build": str(ver.build),
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def run_tweak(self, command):
        self._set_rpc_state("Применяю твики")
        rejected = _reject_if_suspicious_command(command)
        if rejected:
            return rejected
        try:
            timeout = 120 if ("dism" in command.lower() or "/Cleanup-Image" in command) else 20
            return _run_command_robust(command, timeout=timeout)
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_tweaks_state(self):
        return {"ok": True, "state": _load_tweaks_state()}

    def bulk_mark_applied(self, tweak_ids_json):
        try:
            ids = json.loads(tweak_ids_json) if isinstance(tweak_ids_json, str) else tweak_ids_json
            state = _load_tweaks_state()
            for tid in ids:
                state[tid] = {"applied_at": time.time(), "applied": True}
            _save_tweaks_state(state)
            return {"ok": True, "marked": len(ids)}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def log_tweak_application(self, tweak_id, title, command, category):
        _log_tweak_to_history(tweak_id, title, command, category)
        return {"ok": True}

    def get_tweak_history(self):
        return {"ok": True, "history": _load_tweak_history()}

    def revert_tweak(self, history_id):
        self._set_rpc_state("Откатываю твики")
        try:
            history = _load_tweak_history()
            for i, entry in enumerate(history):
                if entry.get("id") == history_id:
                    if _revert_single_tweak(entry):
                        entry["reverted_at"] = datetime.datetime.now().isoformat()
                        history[i] = entry
                        _save_tweak_history(history)
                        return {"ok": True, "reverted": entry.get("title", "")}
                    return {"ok": False, "stderr": "Нельзя автоматически откатить эту настройку."}
            return {"ok": False, "stderr": "Запись не найдена."}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def revert_all_tweaks(self):
        self._set_rpc_state("Откатываю твики")
        try:
            history = _load_tweak_history()
            reverted = 0
            failed = 0
            remaining = []
            for entry in reversed(history):
                if entry.get("reverted_at"):
                    remaining.append(entry)
                    continue
                if _revert_single_tweak(entry):
                    reverted += 1
                    entry["reverted_at"] = datetime.datetime.now().isoformat()
                    remaining.append(entry)
                else:
                    failed += 1
                    remaining.append(entry)
            remaining.reverse()
            _save_tweak_history(remaining)
            return {"ok": True, "reverted": reverted, "failed": failed}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_settings(self):
        try:
            return {"ok": True, "settings": _load_settings()}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def save_settings(self, data):
        try:
            setting = {}
            if isinstance(data, str):
                import json as _json
                setting = _json.loads(data)
            elif isinstance(data, dict):
                setting = data
            merged = _save_settings(setting)
            return {"ok": True, "settings": merged}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def set_autostart(self, enable):
        try:
            import winreg
            enable = bool(enable)
            key = winreg.CreateKeyEx(
                winreg.HKEY_CURRENT_USER,
                r"Software\Microsoft\Windows\CurrentVersion\Run",
                0, winreg.KEY_ALL_ACCESS,
            )
            name = "KALASH Tweak Cleaner"
            if enable:
                if getattr(sys, "frozen", False):
                    exe = f'"{os.path.abspath(sys.argv[0])}"'
                else:
                    exe = f'"{sys.executable}" "{os.path.abspath("main.py")}"'
                winreg.SetValueEx(key, name, 0, winreg.REG_SZ, exe)
            else:
                try:
                    winreg.DeleteValue(key, name)
                except OSError:
                    pass
            winreg.CloseKey(key)
            s = _load_settings()
            s["autostart"] = enable
            _save_settings(s)
            return {"ok": True, "autostart": enable}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def clear_tweak_history(self):
        try:
            _save_tweak_history([])
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def open_url(self, url):
        try:
            parsed = urlparse(url)
        except (TypeError, ValueError):
            parsed = None
        if not parsed or parsed.scheme not in ("http", "https") or not parsed.netloc:
            return {"ok": False, "stderr": "Небезопасная ссылка."}
        try:
            webbrowser.open(url)
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def install_app(self, package_id):
        self._set_rpc_state("Устанавливаю программы")
        try:
            # `package_id` becomes part of a .bat file. Keep it to the
            # documented WinGet identifier alphabet so a malformed value
            # cannot add another command when the batch file is opened.
            if not isinstance(package_id, str) or not re.fullmatch(r"[A-Za-z0-9._-]{1,128}", package_id):
                return {"ok": False, "stderr": "Некорректный идентификатор пакета WinGet."}
            check = subprocess.run(
                ["where", "winget"],
                creationflags=CREATE_NO_WINDOW,
                capture_output=True,
                text=True,
                timeout=10,
            )
            if check.returncode != 0:
                try:
                    subprocess.Popen("start ms-windows-store://pdp/?ProductId=9NBLGGH4NNS1", shell=True)
                except Exception:
                    pass
                return {
                    "ok": False,
                    "stderr": "winget не установлен. Откроется Microsoft Store с App Installer.",
                }

            bat = Path(tempfile.gettempdir()) / f"{APP_TAG}_install_{package_id.replace('.', '_')}.bat"
            bat.write_text(
                f"@echo off\r\nchcp 65001 >nul\r\ntitle Installing {package_id}"
                f"\r\necho Installing: {package_id}"
                f"\r\necho.\r\nwinget install {package_id}"
                " --accept-source-agreements --accept-package-agreements"
                "\r\nset EC=%errorlevel%\r\necho.\r\nif %EC% neq 0 (\r\n"
                "  echo [!] Install finished with code %EC%.\r\n"
                "  echo     If you saw 'hash does not match' - relaunch this .bat from a non-admin terminal.\r\n"
                ")\r\necho.\r\npause\r\n",
                encoding="utf-8",
            )
            subprocess.Popen(["explorer.exe", str(bat)], creationflags=CREATE_NO_WINDOW)
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def create_restore_point(self):
        self._set_rpc_state("Создаю точку восстановления")
        try:
            cmd = (
                "$ErrorActionPreference = 'Stop'; try { "
                "  reg add 'HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\SystemRestore' "
                "  /v SystemRestorePointCreationFrequency /t REG_DWORD /d 0 /f | Out-Null; "
                "  $svc = Get-Service -Name 'VSS' -ErrorAction SilentlyContinue; "
                "  if ($svc -and $svc.Status -ne 'Running') { Start-Service VSS }; "
                "  $svc2 = Get-Service -Name 'swprv' -ErrorAction SilentlyContinue; "
                "  if ($svc2 -and $svc2.StartType -eq 'Disabled') { Set-Service swprv -StartupType Manual }; "
                "  Enable-ComputerRestore -Drive 'C:\\'; "
                "  $before = (Get-ComputerRestorePoint -ErrorAction SilentlyContinue | Measure-Object).Count; "
                "  Checkpoint-Computer -Description 'KALASH Manual' -RestorePointType MODIFY_SETTINGS; "
                "  $after = (Get-ComputerRestorePoint -ErrorAction SilentlyContinue | Measure-Object).Count; "
                "  if ($after -gt $before) { Write-Host 'CREATED' } else { Write-Host 'NOT_CREATED' } "
                "} catch { Write-Host ('ERROR: ' + $_.Exception.Message); exit 1 }"
            )
            result = subprocess.run(
                ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", cmd],
                creationflags=CREATE_NO_WINDOW,
                capture_output=True,
                text=True,
                timeout=180,
            )
            stdout = (result.stdout or "").strip()
            stderr = (result.stderr or "").strip()
            created = "CREATED" in stdout and "NOT_CREATED" not in stdout
            if created:
                return {
                    "ok": True,
                    "stdout": stdout[:400],
                    "stderr": stderr[:400],
                }
            return {
                "ok": False,
                "stdout": stdout[:400],
                "stderr": stderr[:400] or "Точка не создана. Проверь: System Protection включён в свойствах системы (sysdm.cpl).",
            }
        except subprocess.TimeoutExpired:
            return {"ok": False, "stderr": "Timeout при создании точки восстановления."}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def run_jitter_test(self):
        try:
            latencies = []
            for _ in range(300):
                t1 = time.perf_counter()
                time.sleep(0.001)
                t2 = time.perf_counter()
                latencies.append((t2 - t1) * 1000)
            return {
                "ok": True,
                "jitter": round(statistics.stdev(latencies), 4),
                "avg": round(statistics.mean(latencies), 4),
                "min": round(min(latencies), 4),
                "max": round(max(latencies), 4),
                "median": round(statistics.median(latencies), 4),
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def run_cpu_bench(self):
        self._set_rpc_state("Запустил бенчмарк")
        try:
            total_mb = 256
            chunk = os.urandom(1048576)
            t0 = time.perf_counter()
            h = hashlib.sha256()
            for _ in range(total_mb):
                h.update(chunk)
            duration = time.perf_counter() - t0
            mbs = round(total_mb / duration, 1) if duration > 0 else 0

            h2 = hashlib.sha512()
            t0b = time.perf_counter()
            for _ in range(total_mb):
                h2.update(chunk)
            duration2 = time.perf_counter() - t0b
            sha512_mbs = round(total_mb / duration2, 1) if duration2 > 0 else 0

            return {
                "ok": True,
                "sha256_mbs": mbs,
                "sha512_mbs": sha512_mbs,
                "iterations": total_mb,
                "duration_s": round(duration, 2),
                "hash": h.hexdigest()[:16],
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def run_ram_bench(self):
        self._set_rpc_state("Запустил бенчмарк")
        try:
            size_mb = 256
            size = size_mb * 1024 * 1024
            src = bytearray(os.urandom(size))
            dst = bytearray(size)
            t0 = time.perf_counter()
            dst[:] = src
            duration = time.perf_counter() - t0
            mbs = round(size_mb / duration, 1) if duration > 0 else 0

            return {
                "ok": True,
                "copy_mbs": mbs,
                "size_mb": size_mb,
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def run_disk_bench(self):
        self._set_rpc_state("Запустил бенчмарк")
        try:
            size_mb = 256
            chunk_mb = 4
            chunks = size_mb // chunk_mb
            chunk = os.urandom(chunk_mb * 1024 * 1024)
            path = Path(tempfile.gettempdir()) / f"{APP_TAG}_disk_bench.tmp"

            try:
                t0 = time.perf_counter()
                with open(path, "wb") as f:
                    for _ in range(chunks):
                        f.write(chunk)
                    f.flush()
                    os.fsync(f.fileno())
                write_duration = time.perf_counter() - t0
                write_mbs = round(size_mb / write_duration, 1) if write_duration > 0 else 0

                t0 = time.perf_counter()
                total_read = 0
                with open(path, "rb") as f:
                    while True:
                        data = f.read(4194304)
                        if not data:
                            break
                        total_read += len(data)
                read_duration = time.perf_counter() - t0
                read_mbs = round(total_read / read_duration / 1048576, 1) if read_duration > 0 else 0
            finally:
                try:
                    path.unlink(missing_ok=True)
                except Exception:
                    pass

            result = {
                "ok": True,
                "write_mbs": write_mbs,
                "read_mbs": read_mbs,
                "size_mb": size_mb,
                "write_time": round(write_duration, 2),
                "read_time": round(read_duration, 2),
            }
            return result
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_benchmark_baseline(self):
        return {
            "ok": True,
            "note": "Ориентировочные пороги, не точная база других ПК.",
            "cpu_sha256_mbs": {"low": 400, "mid": 900, "high": 1600},
            "cpu_sha512_mbs": {"low": 300, "mid": 700, "high": 1200},
            "ram_copy_mbs": {"low": 3000, "mid": 8000, "high": 15000},
            "disk_write_mbs": {"low": 150, "mid": 500, "high": 2000},
            "disk_read_mbs": {"low": 200, "mid": 600, "high": 3000},
            "jitter_ms": {"low": 0.5, "mid": 0.15, "high": 0.05},
        }

    def _fixes_root(self):
        cached = getattr(self, "_fixes_dir", None)
        if cached and Path(cached).exists():
            return Path(cached)
        dat = EXTRAS_DIR / "fixes_pack.dat"
        if dat.exists():
            try:
                raw = base64.b64decode(dat.read_bytes())
                out = Path(tempfile.gettempdir()) / f"{APP_TAG}_fixes"
                if out.exists():
                    shutil.rmtree(out, True)
                out.mkdir(exist_ok=True, parents=True)
                tar = tarfile.open(io.BytesIO(raw), "r:gz")
                try:
                    tar.extractall(out, filter="data")
                except TypeError:
                    tar.extractall(out)
                root = out / "fixes"
                if not root.exists():
                    root = out
                self._fixes_dir = str(root)
                return root
            except Exception:
                pass
        direct = EXTRAS_DIR / "fixes"
        if direct.is_dir():
            self._fixes_dir = str(direct)
            return direct
        return None

    def _safe_fix_folder(self, root, fix_name):
        try:
            root_resolved = Path(root).resolve()
            folder = (Path(root) / fix_name).resolve()
            folder.relative_to(root_resolved)
            return folder if folder.is_dir() else None
        except Exception:
            return None

    def _find_runnable(self, folder):
        for ext in (".bat", ".cmd", ".ps1"):
            for f in Path(folder).glob(f"*{ext}"):
                return f
        return None

    def list_fixes(self):
        root = self._fixes_root()
        if not root:
            return {"ok": False, "stderr": "fixes pack not available — no extras/fixes dir found"}
        try:
            fixes = []
            for entry in sorted(Path(root).iterdir()):
                if entry.is_dir():
                    runnable = self._find_runnable(entry)
                    fixes.append({"name": entry.name, "runnable": runnable is not None})
            return {"ok": True, "fixes": fixes}
        except Exception as e:
            _write_crash_log(traceback.format_exc())
            return {"ok": False, "stderr": str(e)}

    def run_fix(self, fix_name):
        self._set_rpc_state("Применяю фиксы")
        root = self._fixes_root()
        if not root:
            return {"ok": False, "stderr": "fixes pack not available"}
        folder = self._safe_fix_folder(root, fix_name)
        if not folder:
            return {"ok": False, "stderr": "Фикс не найден."}
        runnable = self._find_runnable(folder)
        if not runnable:
            return {"ok": False, "stderr": "В папке фикса нет .bat/.cmd/.ps1."}

        if runnable.suffix.lower() == ".ps1":
            cmd = ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(runnable)]
        else:
            cmd = ["cmd", "/c", str(runnable)]

        try:
            result = subprocess.run(
                cmd,
                cwd=str(folder),
                creationflags=CREATE_NO_WINDOW,
                capture_output=True,
                text=True,
                timeout=300,
            )
            return {
                "ok": result.returncode == 0,
                "stdout": (result.stdout or "").strip()[:400],
                "stderr": (result.stderr or "").strip()[:400],
            }
        except subprocess.TimeoutExpired:
            return {"ok": False, "stderr": "Timeout при запуске фикса."}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def run_privacy_pack(self):
        self._set_rpc_state("Настраиваю приватность")
        dat = EXTRAS_DIR / "privacy_pack.dat"
        if not dat.exists():
            return {"ok": False, "stderr": "privacy_pack.dat not found"}
        try:
            bat_bytes = gzip.decompress(base64.b64decode(dat.read_bytes()))
            out = Path(tempfile.gettempdir()) / f"{APP_TAG}_privacy_pack.bat"
            out.write_bytes(bat_bytes)
            subprocess.Popen(f'start "{APP_TAG} Privacy Pack" cmd /k ""{out}""', shell=True)
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def privacy_pack_exists(self):
        dat = EXTRAS_DIR / "privacy_pack.dat"
        count = None
        if dat.exists():
            try:
                bat = gzip.decompress(base64.b64decode(dat.read_bytes())).decode("utf-8", errors="replace")
                count = sum(
                    1 for ln in bat.splitlines()
                    if ln.strip() and not ln.lstrip().startswith(("::", "rem ", "REM ", "@echo"))
                )
            except Exception:
                count = None
        return {"ok": True, "exists": dat.exists(), "count": count}

    def check_for_update(self):
        if not UPDATE_MANIFEST_URL:
            return {"ok": True, "update_available": False, "current": VERSION}
        try:
            req = urllib.request.Request(
                UPDATE_MANIFEST_URL,
                headers={"User-Agent": APP_TAG},
            )
            with urllib.request.urlopen(req, timeout=8) as resp:
                release = json.loads(resp.read().decode("utf-8"))
            if release.get("message"):
                remote_version = ""
                download_url = ""
            else:
                remote_version = str(release.get("tag_name", "") or "").lstrip("v").strip()
                download_url = ""
                for asset in release.get("assets") or []:
                    name = str(asset.get("name", "") or "")
                    if name.lower().startswith("kalash_tweaker_v2") and name.lower().endswith(".exe"):
                        download_url = str(asset.get("browser_download_url", "") or "")
                        break

            def _v(s):
                return tuple(int(x) for x in s.split(".") if x.isdigit())

            def _ver_gt(a, b):
                a = _v(a) + (0, 0, 0)
                b = _v(b) + (0, 0, 0)
                return a[:3] > b[:3]

            if not remote_version:
                newer = False
            else:
                try:
                    newer = _ver_gt(remote_version, INSTALLED_VERSION)
                except Exception:
                    newer = remote_version != INSTALLED_VERSION

            return {
                "ok": True,
                "update_available": newer,
                "current": INSTALLED_VERSION,
                "latest": remote_version,
                "url": download_url,
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e), "current": INSTALLED_VERSION}

    def add_defender_exclusion(self, user_confirmed=False):
        """Adds the app to Windows Defender exclusions (process + folder).

        IMPORTANT: this must only ever be triggered by an explicit,
        clearly-labelled user action in the UI (e.g. a button that
        says what it does and why: "PyInstaller-сборки иногда ложно
        детектятся антивирусом — добавить KALASH в исключения
        Defender?"). It must never run automatically on startup or as
        a side effect of another tweak — self-exclusion from the AV is
        exactly the pattern real malware uses, and doing it silently
        erodes the trust of the very users this app is for.
        `user_confirmed` is a required explicit flag from the caller;
        the frontend must have shown a confirmation dialog first.
        """
        if not user_confirmed:
            return {"ok": False, "stderr": "Требуется явное подтверждение пользователя."}
        try:
            exe = os.path.abspath(sys.executable)
            folder = os.path.dirname(exe)
            proc_name = os.path.basename(exe)
            cmd = (
                "if (Get-Command Add-MpPreference -ErrorAction SilentlyContinue) { "
                f"Add-MpPreference -ExclusionProcess '{proc_name}' -ErrorAction SilentlyContinue; "
                f"Add-MpPreference -ExclusionPath '{folder}' -ErrorAction SilentlyContinue }} "
                "else { Write-Error 'Add-MpPreference not available' }"
            )
            r = _run_ps(cmd, timeout=60)
            if r.returncode != 0:
                return {"ok": False, "stderr": (r.stderr or r.stdout or "").strip() or "Не удалось добавить исключение."}
            self._set_rpc_state("Настройка исключений Defender")
            _write_crash_log(f"Defender exclusion added by explicit user request: {folder}")
            return {"ok": True, "path": folder, "exe": proc_name}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def pc_profile(self):
        """Определяет характеристики ПК для подбора пресета оптимизации.
        Возвращает: {is_laptop, ram_gb, cores, recommended} — recommended в {'default','optimal','maximum'}.
        Локально, без инета."""
        try:
            laptop = False
            on_ac = None
            try:
                import psutil as _psutil
                if hasattr(_psutil, "sensors_battery"):
                    b = _psutil.sensors_battery()
                    laptop = b is not None and b.power_plugged is not None
                    if laptop:
                        on_ac = bool(b.power_plugged)
            except Exception:
                pass
            sysi = self.get_system_info() or {}
            cpu = self.get_cpu_info() or {}
            gpu = self.get_gpu_info() or {}
            probe = _probe_storage_and_net()
            ram = float(sysi.get("ram_total") or 0)
            cores = int(cpu.get("cores") or sysi.get("cpu_count_phys") or 4)
            threads = int(cpu.get("threads") or sysi.get("cpu_count") or cores or 4)
            # Подбор пресета по железу:
            #   default  — слабые/неизвестные системы и ноутбуки: только безопасная база
            #   optimal  — средний игровой ПК / мощный ноутбук: полный безопасный пак + хардкор
            #   maximum  — мощный десктоп с достаточной RAM, SSD и кулером: максимальный пак
            gpuv = (gpu.get("vendor") or "unknown")
            disk_type = probe.get("disk_type") or "unknown"
            has_ssd = probe.get("has_ssd")
            gpu_vram = round(float(gpu.get("vram_gb") or 0), 1)
            # Профиль определяется по реальному железу:
            #   default  — слабые/неизвестные системы, ноутбуки от батареи:
            #              только безопасная база (глубокие твики не даются)
            #   optimal  — игровой ПК / ноутбук от сети: полный безопасный
            #              пакет + углублённые настройки (сеть/система)
            #   maximum  — мощный десктоп (32+ ГБ RAM, 8+ ядер, 8+ ГБ VRAM, SSD):
            #              добавляются глубокие твики памяти
            strong_cpu = cores >= 6 or threads >= 12
            mid_gpu = gpuv in ("nvidia", "amd") and gpu_vram >= 4
            big_gpu = gpuv in ("nvidia", "amd") and gpu_vram >= 8
            # RAM считается по версиям ОС (16 ГБ = 15.9, 32 ГБ = 31.9) —
            # реальный физический объём выше показанного на 0.1-0.4 ГБ.
            ram_floor = round(ram + 0.5)
            if laptop:
                if on_ac is False:
                    recommended = "default"   # от батареи — экономия, а не гейминг
                elif ram_floor >= 16 and strong_cpu and mid_gpu:
                    recommended = "optimal"   # игровой ноутбук от сети: полный пак уместен
                else:
                    recommended = "default"   # слабый/офисный ноутбук
            elif not (strong_cpu and ram_floor >= 16 and mid_gpu):
                recommended = "default"       # слабый десктоп: избегаем лишних твиков
            elif ram_floor >= 32 and cores >= 8 and big_gpu and has_ssd is not False and disk_type != "hdd":
                recommended = "maximum"       # мощный игровой десктоп (+SSD): полный пак
            else:
                recommended = "optimal"
            return {
                "ok": True,
                "is_laptop": laptop,
                "on_ac": on_ac,
                "ram_gb": round(ram, 1),
                "cores": cores,
                "threads": threads,
                "recommended": recommended,
                "cpu_vendor": cpu.get("vendor") or "unknown",
                "gpu_vendor": gpu.get("vendor") or "unknown",
                "gpu_vram": round(float(gpu.get("vram_gb") or 0), 1),
                "cpu_name": cpu.get("name") or "",
                "gpu_name": gpu.get("name") or "",
                "disk_type": probe.get("disk_type") or "unknown",
                "has_ssd": probe.get("has_ssd"),
                "has_hdd": probe.get("has_hdd"),
                "wifi": probe.get("wifi"),
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def run_pro_tweak(self, command):
        r = self.run_tweak(command)
        if r.get("ok"):
            self._set_rpc_state("Применяю PRO-твики")
        return r

    # ── Умная одно-кликовая оптимизация ─────────────────────────────────
    # Читает РЕАЛЬНОЕ состояние ОС (активный план питания + ключевые настройки
    # реестра) и возвращает структурированный отчёт. Фронтенд решает, что
    # применить (создаёт план питания с нуля + догоняет невыставленные твики).
    def analyze_optimization(self):
        pc = {}
        try:
            pcr = self.pc_profile()
            if pcr.get("ok"):
                pc = pcr
        except Exception:
            pass
        pc.setdefault("is_laptop", False)
        pc.setdefault("on_ac", None)
        pc.setdefault("ram_gb", 0)
        pc.setdefault("cores", 0)
        pc.setdefault("threads", 0)
        pc.setdefault("recommended", "optimal")
        pc.setdefault("cpu_vendor", "unknown")
        pc.setdefault("gpu_vendor", "unknown")
        pc.setdefault("gpu_vram", 0)
        pc.setdefault("cpu_name", "")
        pc.setdefault("gpu_name", "")
        pc.setdefault("disk_type", "unknown")
        pc.setdefault("has_ssd", None)
        pc.setdefault("has_hdd", None)
        pc.setdefault("wifi", None)

        # Один PowerShell-запуск на весь анализ: реестр/службы берём из
        # _OPT_PS_BATCH (быстро, без WMI), сюда добавляем AC-значения плана
        # питания, активную схему и настройки bcdedit. Локально-зависимые
        # подписи powercfg не парсим: берём последние hex-индексы (AC и DC)
        # и имени планов сопоставляем по GUID.
        extra = (
            "function GetAcIdx($q){ $m=[regex]::Matches($q,'0x([0-9A-Fa-f]+)'); "
            "if($m.Count -ge 2){ return [int]('0x'+$m[$m.Count-2].Groups[1].Value) }; "
            "if($m.Count -eq 1){ return [int]('0x'+$m[0].Groups[1].Value) }; return $null };"
            "$r['disk_idle'] = GetAcIdx (powercfg /query scheme_current sub_disk DISKIDLE 2>$null | Out-String);"
            "$r['usb_suspend'] = GetAcIdx (powercfg /query scheme_current 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 2>$null | Out-String);"
            "$r['cpu_min'] = GetAcIdx (powercfg /query scheme_current sub_processor PROCTHROTTLEMIN 2>$null | Out-String);"
            "$r['cpu_max'] = GetAcIdx (powercfg /query scheme_current sub_processor PROCTHROTTLEMAX 2>$null | Out-String);"
            "$r['cooling'] = GetAcIdx (powercfg /query scheme_current sub_processor 94D3A615-A899-4AC5-AE2B-E4D8F634367F 2>$null | Out-String);"
            "$nv=(Get-ItemProperty 'HKCU:\\Software\\NVIDIA Corporation\\Global\\NVTweak' -EA 0);"
            "$r['nv_perf_src']=$nv.PerfLevelSrc; $r['nv_p9']=$nv.DisableP9Powersaving; $r['nv_lowlat']=$nv.LowLatencyMode; $r['nv_threaded']=$nv.ThreadedOptimization;"
            "$r['ullm']=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\DirectX' -EA 0).UltraLowLatencyMode;"
            "$v=$null; Get-ChildItem 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}' -EA 0 | Where-Object { $_.PSChildName -match '^\\d+$' } | ForEach-Object { $pv=$_.GetValue('EnableUlps'); if($pv -ne $null){ $v=$pv } };"
            "$r['ulps']=$v;"
            "function Test-ReBAR { $ns = Get-Command nvidia-smi -EA 0; if(-not $ns){ return $null };"
            "try { $o = & nvidia-smi -q 2>$null | Out-String; if($o -match 'BAR1 Memory Usage[^\\n]*\\n\\s+Total\\s*:\\s*(\\d+)\\s*MiB'){ $mb=[int]$matches[1]; return [int]($mb -gt 512) } } catch {};"
            "try { $o = & nvidia-smi --query-gpu=resizable_bar_1_memory_size --format=csv,noheader 2>$null; if($o -match '\\d+'){ $mb=[int][regex]::Match($o,'\\d+').Value; return [int]($mb -gt 256) } } catch {};"
            "return $null };"
            "$r['rebar'] = Test-ReBAR;"
            "$m = powercfg /getactivescheme 2>$null; "
            "if($m -match ':\\s*([0-9a-fA-F-]{36})\\s*\\(([^)]*)\\)'){ $r['active_guid']=$matches[1]; $r['active_name']=$matches[2] } else { $r['active_guid']=''; $r['active_name']='' };"
            "$pl = powercfg /list 2>$null | Out-String; "
            "$r['has_ultimate'] = [int]($pl -match '9d0abc2a-0b95-4cd0-acf2-be989cde3084'); "
            "$r['has_high_perf'] = [int]($pl -match '8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c'); "
            "$r['has_balanced'] = [int]($pl -match '381b4222-f694-41f0-9685-ff5bb260df2e'); "
            "$r['has_kalash'] = [int]($pl -match 'b2f0d8a3-6c9e-4a7b-8d1c-2e5f93a4b7c2'); "
            "$b = (bcdedit /enum '{current}' 2>$null | Out-String); "
            "$r['bcd_dyn'] = [int]($b -match 'disabledynamictick\\s+Yes'); "
            "$r['bcd_tsc'] = if($b -match 'tscsyncpolicy\\s+(Enhanced|Legacy|Default)'){ $matches[1] } else { '' };"
            "$r['bcd_clock'] = if($b -match 'useplatformclock'){ [int]($b -notmatch 'useplatformclock\\s+true') } else { 1 };"
            "$bt = (bcdedit /enum 2>$null | Out-String); $r['bcd_timeout'] = if($bt -match 'timeout\\s+(\\d+)'){ [int]$matches[1] } else { 30 };"
            # Explorer / интерфейс
            "$e=(Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' -EA 0);"
            "$r['HideExt']=$e.HideFileExt; $r['Hidden']=$e.Hidden; $r['TaskbarDa']=$e.TaskbarDa; $r['TaskbarMn']=$e.TaskbarMn;"
            "$r['CopilotBtn']=$e.ShowCopilotButton; $r['TaskViewBtn']=$e.ShowTaskViewButton; $r['TaskbarAl']=$e.TaskbarAl;"
            "$r['SmallTask']=$e.TaskbarSmallIcons; $r['SnapAssist']=$e.SnapAssist; $r['StartDocs']=$e.Start_TrackDocs;"
            "$x=(Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer' -EA 0); $r['ShowRecent']=$x.ShowRecent; $r['ShowFrequent']=$x.ShowFrequent;"
            "$sp=(Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Search' -EA 0); $r['SearchMode']=$sp.SearchboxTaskbarMode; $r['BingSearch']=$sp.BingSearchEnabled;"
            "$cdm=(Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' -EA 0);"
            "$r['PreInst']=$cdm.PreInstalledAppsEnabled; $r['SoftLand']=$cdm.SoftLandingEnabled; $r['LockSpot']=$cdm.RotatingLockScreenOverlayEnabled;"
            "$r['AutoPlay']=(Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\AutoplayHandlers' -EA 0).DisableAutoplay;"
            "$r['Sticky']=(Get-ItemProperty 'HKCU:\\Control Panel\\Accessibility\\StickyKeys' -EA 0).Flags;"
            "$r['FilterK']=(Get-ItemProperty 'HKCU:\\Control Panel\\Accessibility\\Keyboard Response' -EA 0).Flags;"
            "$r['ToggleK']=(Get-ItemProperty 'HKCU:\\Control Panel\\Accessibility\\ToggleKeys' -EA 0).Flags;"
            "$th=(Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' -EA 0);"
            "$r['DarkApp']=$th.AppsUseLightTheme; $r['DarkSys']=$th.SystemUsesLightTheme; $r['Transp']=$th.EnableTransparency;"
            "$r['NumLock']=(Get-ItemProperty 'Registry::HKEY_USERS\\.DEFAULT\\Control Panel\\Keyboard' -EA 0).InitialKeyboardIndicators;"
            "$r['VisFX']=(Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects' -EA 0).VisualFXSetting;"
            "$r['BkgApps']=(Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications' -EA 0).GlobalUserDisabled;"
            "$r['AutoEnd']=(Get-ItemProperty 'HKCU:\\Control Panel\\Desktop' -EA 0).AutoEndTasks;"
            "$r['MenuDelay']=(Get-ItemProperty 'HKCU:\\Control Panel\\Desktop' -EA 0).MenuShowDelay;"
            # Приватность
            "$r['AdvId']=(Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo' -EA 0).Enabled;"
            "$r['ActFeed']=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' -EA 0).EnableActivityFeed;"
            "$r['PubAct']=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' -EA 0).PublishUserActivities;"
            "$r['Feedback']=(Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Siuf\\Rules' -EA 0).NumberOfSIUFInPeriod;"
            "$r['LocDeny']=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location' -EA 0).Value;"
            "$ap=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy' -EA 0);"
            "$r['LetCam']=$ap.LetAppsAccessCamera; $r['LetCont']=$ap.LetAppsAccessContacts; $r['LetCal']=$ap.LetAppsAccessCalendar;"
            "$r['InkErr']=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\HandwritingErrorReports' -EA 0).PreventHandwritingErrorReports;"
            "$r['FindDev']=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\FindMyDevice' -EA 0).AllowFindMyDevice;"
            "$r['Speech']=(Get-ItemProperty 'HKCU:\\Software\\Microsoft\\Speech_OneCore\\Settings\\OnlineSpeechPrivacy' -EA 0).HasAccepted;"
            "$eg=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Edge' -EA 0);"
            "$r['EdgeStart']=$eg.StartupBoostEnabled; $r['EdgeBg']=$eg.BackgroundModeEnabled;"
            "$r['OffTel']=(Get-ItemProperty 'HKCU:\\SOFTWARE\\Policies\\Microsoft\\Office\\16.0\\Common\\ClientTelemetry' -EA 0).DisableTelemetry;"
            # Классическое контекстное меню (есть ключ → уже включено)
            "$r['ClsMenu']=[int](Test-Path 'HKCU:\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}');"
            # TRIM, last access
            "$r['Trims']=[int]((fsutil behavior query DisableDeleteNotify 2>$null | Out-String) -match 'DisableDeleteNotify = 0');"
            "$r['LastAcc']=[int]((fsutil behavior query disablelastaccess 2>$null | Out-String) -match 'Disable last access updates: 1|disablelastaccess = 1');"
            # Сеть: netsh + DNS + Nagle по интерфейсам
            "$t=(netsh int tcp show global 2>$null | Out-String); $r['Tfo']=[int]($t -match 'Fast Open\\s*:\\s*enabled'); $r['Ecn']=[int]($t -match 'ECN[^:]*:\\s*enabled');"
            "$d=Get-DnsClientServerAddress -EA 0; $r['CfDns']=[int](($d.ServerAddresses -join ',') -match '1\\.1\\.1\\.1');"
            "$r['NagleIface']=[int]((Get-NetAdapter -EA 0 | Where-Object {$_.Status -eq 'Up'} | ForEach-Object { $id=$_.InterfaceGuid; $iface='HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\'+$id; (Get-ItemProperty $iface -EA 0).TCPNoDelay } | Where-Object { $_ -eq 1 }) -ne $null);"
            "$r['NagleGlobal']=(Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' -EA 0).TCPNoDelay;"
            "$r['CacheTrim']=(Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' -EA 0).RemovePageFileFromWorkingSet;"
            # ── Сводные твики v2.0: ConsentStore, доп. телеметрия, планировщик, эко-сеть ──
            "$cs=@('userAccountInformation','videosLibrary','picturesLibrary','documentsLibrary','appDiagnostics','userDataTasks','appointments','webcam','contacts','chat','downloadsFolder','radios','phoneCall','userNotificationListener','broadFileSystemAccess','email','phoneCallHistory');"
            "$r['ConsentDeny']=($cs | Where-Object { (Get-ItemProperty ('HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\'+$_) -EA 0).Value -eq 'Deny' }).Count;"
            "$tCount=0;"
            "if((Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' -EA 0).Start_TrackProgs -eq 0){$tCount++};"
            "if((Get-ItemProperty 'HKCU:\\Control Panel\\International\\User Profile' -EA 0).HttpAcceptLanguageOptOut -eq 1){$tCount++};"
            "if((Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\InputPersonalization\\TrainedDataStore' -EA 0).HarvestContacts -eq 0){$tCount++};"
            "if((Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Diagnostics\\DiagTrack\\EventTranscriptKey' -EA 0).EnableEventTranscript -eq 0){$tCount++};"
            "if((Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat' -EA 0).AITEnable -eq 0){$tCount++};"
            "if((Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' -EA 0).UploadUserActivities -eq 0){$tCount++};"
            "if((Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\WMI\\AutoLogger\\AutoLogger-Diagtrack-Listener' -EA 0).Start -eq 0){$tCount++};"
            "if((Get-ItemProperty 'HKCU:\\SOFTWARE\\Microsoft\\Input\\TIPC' -EA 0).Enabled -eq 0){$tCount++};"
            "$r['TelExtra']=$tCount;"
            "$tns=@(@('\\Microsoft\\Windows\\Application Experience\\','AitAgent'),@('\\Microsoft\\Windows\\NetTrace\\','GatherNetworkInfo'),@('\\Microsoft\\Windows\\PI\\','Sqm-Tasks'),@('\\Microsoft\\Windows\\Diagnosis\\','Scheduled'),@('\\Microsoft\\Windows\\Windows Error Reporting\\','QueueReporting'),@('\\Microsoft\\Windows\\Feedback\\Siuf\\','DmClient'));"
            "$schTel=0; foreach($p in $tns){ try{ if((Get-ScheduledTask -TaskPath $p[0] -TaskName $p[1] -EA SilentlyContinue).State -eq 'Disabled'){ $schTel++ } }catch{} };"
            "$r['SchTel']=$schTel;"
            "$nicTotal=0; $nicOff=0;"
            "$cls='HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e972-e325-11ce-bfc1-08002be10318}';"
            "Get-ChildItem $cls -EA 0 | Where-Object {$_.PSChildName -match '^\\d+$'} | ForEach-Object { $k=$cls+'\\'+$_.PSChildName; if((Get-ItemProperty $k -EA 0).DriverDesc){ $nicTotal++; if((Get-ItemProperty $k -EA 0).PnPCapabilities -eq 24){ $nicOff++ } } };"
            "$r['NicTotal']=$nicTotal; $r['NicOff']=$nicOff;"
            "$r['WlanPwr']=GetAcIdx (powercfg /query scheme_current 19cbb8fa-5279-450e-9fac-8a3d5fedd0c1 12bbebe6-58d6-4636-95bb-3217ef867c1a 2>$null | Out-String);"
            "$r['WuAuto']=(Get-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU' -EA 0).NoAutoUpdate;"
            "$wuTns=@(@('\\Microsoft\\Windows\\UpdateOrchestrator\\','USOClient'),@('\\Microsoft\\Windows\\UpdateOrchestrator\\','Schedule Scan'),@('\\Microsoft\\Windows\\WindowsUpdate\\','Scheduled Start'),@('\\Microsoft\\Windows\\WindowsUpdate\\','Automatic App Update'));"
            "$wuSch=0; foreach($p in $wuTns){ try{ if((Get-ScheduledTask -TaskPath $p[0] -TaskName $p[1] -EA SilentlyContinue).State -eq 'Disabled'){ $wuSch++ } }catch{} };"
            "$r['WUTasks']=$wuSch;"
            "$r['MaxMem']=[int]((bcdedit /enum '{current}' 2>$null | Out-String) -match 'truncatememory');"
        )
        batch = self._OPT_PS_BATCH.replace(
            "$r|ConvertTo-Json -Compress",
            extra + "$r|ConvertTo-Json -Compress",
        )
        data = {}
        try:
            r = _run_ps(batch, timeout=15)
            if r.returncode == 0 and r.stdout.strip():
                data = json.loads(r.stdout.strip())
        except Exception:
            data = {}

        reg = {
            "win32_priority": data.get("Win32PrioritySeparation"),
            "timer_res": data.get("TimerRes"),
            "power_throttling": data.get("PowerThrottling"),
            "fast_startup": data.get("FastStartup"),
            "dpc_latency": data.get("DpcLatency"),
            "dis_paging": data.get("DisPaging"),
            "large_cache": data.get("LargeCache"),
            "hw_sched": data.get("HAGS"),
            "network_throttle": data.get("Throttle"),
            "gp_priority": data.get("GPUPri"),
            "ram_priority": data.get("GamePri"),
            "prefetch": data.get("Prefetch"),
            "superfetch": data.get("Superfetch"),
            "game_cat": data.get("GameCat"),
            "audio_pri": data.get("AudioPri"),
            "audio_cat": data.get("AudioCat"),
            "game_dvr": data.get("GameDVR"),
            "irq8": data.get("IRQ8"),
            "mouse_q": data.get("MouseQ"),
            "key_q": data.get("KeyQ"),
            "distribute_timers": data.get("DistributeTimers"),
            "tdr_delay": data.get("TdrDelay"),
            "ullm": data.get("ULLM"),
            "nv_perf_src": data.get("nv_perf_src"),
            "nv_p9": data.get("nv_p9"),
            "nv_lowlat": data.get("nv_lowlat"),
            "nv_threaded": data.get("nv_threaded"),
            "ulps": data.get("ulps"),
            "clear_pagefile": data.get("ClearPF"),
            "wait_kill": data.get("W2K"),
            "hung_app": data.get("HungApp"),
            "tcp_dup_acks": data.get("DupAck"),
            "afd_fast_copy_send": data.get("AFDsend"),
            "afd_fast_copy_recv": data.get("AFDrecv"),
            "afd_max_events": data.get("AFDevents"),
            "sfio_pri": data.get("SFIOpri"),
            "bg_only": data.get("BgOnly"),
            "mem_compress": data.get("MemCompress"),
            "spectre_over": data.get("SpectreOver"),
            "spectre_mask": data.get("SpectreMask"),
            "wer_disabled": data.get("WER"),
            "svc_ndu": data.get("svc_Ndu"),
            "svc_ntel": data.get("svc_NvTelemetryContainer"),
            "hide_ext": data.get("HideExt"),
            "hidden": data.get("Hidden"),
            "taskbar_da": data.get("TaskbarDa"),
            "taskbar_mn": data.get("TaskbarMn"),
            "copilot": data.get("CopilotBtn"),
            "task_view": data.get("TaskViewBtn"),
            "taskbar_al": data.get("TaskbarAl"),
            "small_task": data.get("SmallTask"),
            "snap_assist": data.get("SnapAssist"),
            "start_docs": data.get("StartDocs"),
            "show_recent": data.get("ShowRecent"),
            "show_frequent": data.get("ShowFrequent"),
            "search_mode": data.get("SearchMode"),
            "bing": data.get("BingSearch"),
            "pre_inst": data.get("PreInst"),
            "soft_land": data.get("SoftLand"),
            "lock_spot": data.get("LockSpot"),
            "autoplay": data.get("AutoPlay"),
            "sticky": data.get("Sticky"),
            "filter_k": data.get("FilterK"),
            "toggle_k": data.get("ToggleK"),
            "dark_app": data.get("DarkApp"),
            "dark_sys": data.get("DarkSys"),
            "transp": data.get("Transp"),
            "numlock": data.get("NumLock"),
            "vis_fx": data.get("VisFX"),
            "bkg_apps": data.get("BkgApps"),
            "auto_end": data.get("AutoEnd"),
            "menu_delay": data.get("MenuDelay"),
            "adv_id": data.get("AdvId"),
            "act_feed": data.get("ActFeed"),
            "pub_act": data.get("PubAct"),
            "feedback": data.get("Feedback"),
            "loc_deny": data.get("LocDeny"),
            "let_cam": data.get("LetCam"),
            "let_cont": data.get("LetCont"),
            "let_cal": data.get("LetCal"),
            "ink_err": data.get("InkErr"),
            "find_dev": data.get("FindDev"),
            "speech": data.get("Speech"),
            "edge_start": data.get("EdgeStart"),
            "edge_bg": data.get("EdgeBg"),
            "off_tel": data.get("OffTel"),
            "cls_menu": data.get("ClsMenu"),
            "trims": data.get("Trims"),
            "last_acc": data.get("LastAcc"),
            "tfo": data.get("Tfo"),
            "ecn": data.get("Ecn"),
            "cf_dns": data.get("CfDns"),
            "nagle_iface": data.get("NagleIface"),
            "nagle_global": data.get("NagleGlobal"),
            "cache_trim": data.get("CacheTrim"),
            "consent_deny": data.get("ConsentDeny"),
            "tel_extra": data.get("TelExtra"),
            "sch_tel": data.get("SchTel"),
            "svc_diaghub": data.get("svc_diagnosticshub.standardcollector.service"),
            "svc_diagtrack": data.get("svc_DiagTrack"),
            "svc_dmwappush": data.get("svc_dmwappushservice"),
            "svc_sgrm": data.get("svc_SgrmBroker"),
            "svc_pca": data.get("svc_PcaSvc"),
            "svc_wer": data.get("svc_WerSvc"),
            "svc_wcnc": data.get("svc_wcncsvc"),
            "svc_wec": data.get("svc_Wecsvc"),
            "nic_total": data.get("NicTotal"),
            "nic_off": data.get("NicOff"),
            "wlan_pwr": data.get("WlanPwr"),
            "wu_auto": data.get("WuAuto"),
            "wu_tasks": data.get("WUTasks"),
            "max_mem": data.get("MaxMem"),
            "hibernate": data.get("Hibernate"),
            "max_frame_lat": data.get("MaxFrameLat"),
            "flip_model": data.get("FlipModel"),
            "dwm": data.get("DWM"),
            "gpu_preemption": data.get("GpuPreemption"),
            "tcp_wait": data.get("TcpWait"),
            "max_port": data.get("MaxPort"),
            "cortana": data.get("Cortana"),
            "silent_apps": data.get("SilentApps"),
        }

        return {
            "ok": True,
            "pc": pc,
            "power": {
                "active_name": data.get("active_name") or "",
                "active_guid": (data.get("active_guid") or "").lower(),
                "has_ultimate": bool(data.get("has_ultimate")),
                "has_high_perf": bool(data.get("has_high_perf")),
                "has_balanced": bool(data.get("has_balanced")),
                "has_kalash": bool(data.get("has_kalash")),
                "disk_idle": data.get("disk_idle"),
                "usb_suspend": data.get("usb_suspend"),
                "cpu_min": data.get("cpu_min"),
                "cpu_max": data.get("cpu_max"),
                "cooling": data.get("cooling"),
            },
            "reg": reg,
            "bcd": {
                "dyn_tick": data.get("bcd_dyn"),
                "tsc": data.get("bcd_tsc") or "",
                "clock": data.get("bcd_clock"),
                "timeout": data.get("bcd_timeout"),
            },
            "hw": {
                "rebar": data.get("rebar"),
            },
        }

    def download_update(self):
        """Downloads the latest release exe from GitHub into the Downloads folder."""
        if not UPDATE_MANIFEST_URL:
            return {"ok": False, "stderr": "Автообновление не настроено."}
        url = ""
        try:
            req = urllib.request.Request(
                UPDATE_MANIFEST_URL,
                headers={"User-Agent": APP_TAG},
            )
            with urllib.request.urlopen(req, timeout=8) as resp:
                release = json.loads(resp.read().decode("utf-8"))
            if release.get("message"):
                return {"ok": False, "stderr": "Релиз с обновлением не найден."}
            checksums_url = ""
            for asset in release.get("assets") or []:
                name = str(asset.get("name", "") or "")
                if name.lower().startswith("kalash_tweaker_v2") and name.lower().endswith(".exe"):
                    url = str(asset.get("browser_download_url", "") or "")
                elif name.upper() in ("SHA256SUMS", "SHA256SUMS.TXT", "CHECKSUMS.TXT"):
                    checksums_url = str(asset.get("browser_download_url", "") or "")
            if not url:
                return {"ok": False, "stderr": "Не найден файл обновления на GitHub."}

            # Never place an executable in Downloads without a published
            # checksum. A release missing SHA256SUMS is a publishing error,
            # not a reason to weaken the update path.
            if not checksums_url:
                return {
                    "ok": False,
                    "stderr": "У релиза нет файла SHA256SUMS. Обновление отменено ради безопасности.",
                }
            expected_sha256 = None
            try:
                creq = urllib.request.Request(checksums_url, headers={"User-Agent": APP_TAG})
                with urllib.request.urlopen(creq, timeout=8) as cresp:
                    checksums_text = cresp.read().decode("utf-8", errors="ignore")
                fname = Path(url).name
                for line in checksums_text.splitlines():
                    parts = line.strip().split()
                    if len(parts) >= 2 and parts[-1].lstrip("*").strip() == fname:
                        candidate = parts[0].lower()
                        if re.fullmatch(r"[0-9a-f]{64}", candidate):
                            expected_sha256 = candidate
                        break
            except Exception:
                expected_sha256 = None
            if not expected_sha256:
                return {
                    "ok": False,
                    "stderr": "Не удалось проверить SHA-256 обновления. Скачивание отменено.",
                }

            dl_dir = Path(os.environ.get("USERPROFILE", "")) / "Downloads"
            dl_dir.mkdir(exist_ok=True)
            dst = dl_dir / Path(url).name
            tmp = dst.with_suffix(dst.suffix + ".part")
            stream = urllib.request.urlopen(
                urllib.request.Request(url, headers={"User-Agent": APP_TAG}),
                timeout=60,
            )
            hasher = hashlib.sha256()
            try:
                with open(tmp, "wb") as f:
                    while True:
                        chunk = stream.read(262144)
                        if not chunk:
                            break
                        hasher.update(chunk)
                        f.write(chunk)
            finally:
                stream.close()

            actual_sha256 = hasher.hexdigest()
            if actual_sha256 != expected_sha256:
                try:
                    tmp.unlink()
                except Exception:
                    pass
                return {
                    "ok": False,
                    "stderr": "Контрольная сумма скачанного файла не совпадает с опубликованной. "
                              "Файл удалён — обновление НЕ установлено.",
                }

            tmp.replace(dst)
            return {
                "ok": True,
                "path": str(dst),
                "filename": dst.name,
                "sha256": actual_sha256,
                "verified": True,
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_os_build(self):
        try:
            ver = sys.getwindowsversion()
            return {"ok": True, "build": ver.build, "major": ver.major, "minor": ver.minor}
        except Exception:
            return {"ok": False, "build": 0, "major": 0, "minor": 0}

    def get_admin_status(self):
        return {"ok": True, "is_admin": _is_admin()}

    def get_app_version(self):
        return {"ok": True, "version": INSTALLED_VERSION}

    def import_settings(self, file_path):
        try:
            p = Path(file_path)
            if not p.exists():
                return {"ok": False, "stderr": "Файл не найден."}
            data = json.loads(p.read_text(encoding="utf-8"))
            if "tweaks_state" in data:
                _save_tweaks_state(data["tweaks_state"])
            if "tweak_history" in data:
                _save_tweak_history(data["tweak_history"])
            return {"ok": True, "imported": True}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    # ── Registry backups ──────────────────────────────────────────────────

    @staticmethod
    def _extract_reg_keys(command):
        keys = set()
        if not command:
            return keys
        hive_map = {
            "HKCU": "HKEY_CURRENT_USER",
            "HKLM": "HKEY_LOCAL_MACHINE",
            "HKCR": "HKEY_CLASSES_ROOT",
            "HKU": "HKEY_USERS",
            "HKCC": "HKEY_CURRENT_CONFIG",
        }
        raw = command
        for m in re.finditer(r"reg\s+add\s+(['\"])((?:HKLM|HKCU|HKCR|HKU|HKCC)\\[^'\"]+)\1", raw, re.IGNORECASE):
            path = m.group(2).strip("\\")
            hive_short = path.split("\\", 1)[0].upper()
            rest = path.split("\\", 1)[1]
            if rest:
                keys.add(f"{hive_map.get(hive_short, 'HKEY_CURRENT_USER')}\\{rest}")
        for m in re.finditer(r"reg\s+add\s+((?:HKLM|HKCU|HKCR|HKU|HKCC)\\[^\s'\"]+)", raw, re.IGNORECASE):
            if m.group(1).startswith(("'", '"')):
                continue
            path = m.group(1).strip("\\")
            hive_short = path.split("\\", 1)[0].upper()
            rest = path.split("\\", 1)[1]
            if rest:
                keys.add(f"{hive_map.get(hive_short, 'HKEY_CURRENT_USER')}\\{rest}")
        return keys

    def backup_registry_keys(self, commands_json):
        try:
            cmds = json.loads(commands_json) if isinstance(commands_json, str) else (commands_json or [])
            if isinstance(cmds, str):
                cmds = [cmds]
            keys = set()
            for c in cmds:
                keys |= self._extract_reg_keys(c)
            if not keys:
                return {"ok": True, "backed_up": 0, "files": []}

            _BACKUP_DIR.mkdir(exist_ok=True, parents=True)
            ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            files = []
            for key in sorted(keys):
                safe_name = re.sub(r"[^A-Za-z0-9]+", "_", key).strip("_")
                out = _BACKUP_DIR / f"{ts}_{safe_name}.reg"
                if out.exists():
                    continue
                r = subprocess.run(
                    ["reg", "export", key, str(out), "/y"],
                    creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=30,
                )
                if r.returncode == 0 and out.exists() and out.stat().st_size > 0:
                    files.append(str(out))
                else:
                    try:
                        out.unlink(missing_ok=True)
                    except Exception:
                        pass
            return {"ok": True, "backed_up": len(files), "files": files}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def get_cleanup_schedule(self):
        """Проверяет статус задачи автоочистки."""
        try:
            r = subprocess.run(
                ["schtasks", "/query", "/tn", self._TASK_NAME, "/fo", "csv", "/nh"],
                creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=10,
            )
            # The text returned by schtasks is localized, while its exit
            # code is stable. Tasks created here are enabled by default.
            enabled = r.returncode == 0
            saved = {}
            if self._SCHEDULE_PATH.exists():
                try:
                    saved = json.loads(self._SCHEDULE_PATH.read_text(encoding="utf-8"))
                except Exception:
                    pass
            return {
                "ok": True,
                "enabled": enabled,
                "frequency": saved.get("frequency", "daily"),
                "time": saved.get("time", "03:00"),
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e), "enabled": False}

    def schedule_cleanup(self, frequency="daily", run_time="03:00"):
        """Создаёт/удаляет задачу автоочистки. frequency: daily/weekly/monthly/off."""
        try:
            if frequency == "off":
                subprocess.run(
                    ["schtasks", "/delete", "/tn", self._TASK_NAME, "/f"],
                    creationflags=CREATE_NO_WINDOW, capture_output=True, timeout=10,
                )
                if self._SCHEDULE_PATH.exists():
                    self._SCHEDULE_PATH.unlink(missing_ok=True)
                return {"ok": True, "enabled": False}

            if frequency not in ("daily", "weekly", "monthly"):
                return {"ok": False, "stderr": f"Неверная частота: {frequency}"}
            if not isinstance(run_time, str) or not re.fullmatch(r"(?:[01]\d|2[0-3]):[0-5]\d", run_time):
                return {"ok": False, "stderr": "Время должно быть в формате ЧЧ:ММ."}

            ps_cmd = (
                f'powershell -NoProfile -WindowStyle Hidden -Command "{self._CLEANUP_PS}"'
            )
            sc_args = {
                "daily":  ["/sc", "daily", "/st", run_time],
                "weekly": ["/sc", "weekly", "/d", "*", "/st", run_time],
                "monthly": ["/sc", "monthly", "/d", "1", "/st", run_time],
            }
            cmd = [
                "schtasks", "/create",
                "/tn", self._TASK_NAME,
                "/tr", ps_cmd,
                *sc_args[frequency],
                "/f",
                "/rl", "highest",
            ]
            r = subprocess.run(
                cmd, creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=15,
            )
            if r.returncode != 0:
                return {"ok": False, "stderr": (r.stderr or "").strip()[:300] or "Не удалось создать задачу."}
            self._SCHEDULE_PATH.parent.mkdir(parents=True, exist_ok=True)
            self._SCHEDULE_PATH.write_text(
                json.dumps({"frequency": frequency, "time": run_time}, ensure_ascii=False),
                encoding="utf-8",
            )
            return {"ok": True, "enabled": True, "frequency": frequency, "time": run_time}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    # ── Export / Import dialogs ──────────────────────────────────────────

    @staticmethod
    def _tk_dialog(kind):
        import tkinter as tk
        from tkinter import filedialog
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        try:
            if kind == "save":
                return filedialog.asksaveasfilename(
                    title="Сохранить настройки KALASH",
                    defaultextension=".json",
                    initialfile=f"kalash_settings_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                    filetypes=[("JSON", "*.json"), ("Все файлы", "*.*")],
                )
            return filedialog.askopenfilename(
                title="Импорт настроек KALASH",
                filetypes=[("JSON", "*.json"), ("Все файлы", "*.*")],
            )
        finally:
            root.destroy()

    def open_export_folder(self):
        try:
            _EXPORT_DIR.mkdir(exist_ok=True, parents=True)
            os.startfile(str(_EXPORT_DIR))
            return {"ok": True}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    # ── Полный снимок системы ──────────────────────────────────────────────
    # Экспорт: читает РЕАЛЬНЫЕ значения реестра/планов питания → JSON.
    # Импорт: применяет значения из JSON к системе через reg add / powercfg.

    def _ps(self, script, timeout=15):
        wrapped = ("$ErrorActionPreference='SilentlyContinue'; try { " + script + " } catch {}")
        try:
            r = subprocess.run(
                ["powershell", "-NoProfile", "-Command", wrapped],
                creationflags=CREATE_NO_WINDOW,
                capture_output=True, text=True, timeout=timeout,
            )
            return (r.stdout or "").strip()
        except Exception:
            return ""

    def _reg_read(self, hive, path, name):
        v = self._reg_query(hive, path, name)
        if not v:
            return None
        m = re.search(r"REG_\w+\s+(0x[0-9A-Fa-f]+|\d+)\s*$", v, re.M)
        if m:
            val = m.group(1)
            return int(val, 16) if val.startswith("0x") else int(val)
        return None

    def _reg_read_str(self, hive, path, name):
        v = self._reg_query(hive, path, name)
        if not v:
            return None
        m = re.search(r"REG_\w+\s+(.+)$", v, re.M)
        return m.group(1).strip() if m else None

    def _reg_query(self, hive, path, name):
        # reg.exe вызывается списком аргументов (без PowerShell), чтобы значения
        # hive/path/name из файла снимка не могли стать инъекцией в shell.
        try:
            r = subprocess.run(
                ["reg", "query", "{0}\\{1}".format(hive, path), "/v", name],
                creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=10,
            )
            return (r.stdout or "")
        except Exception:
            return ""

    def _powercfg_query(self, alias_or_guid, setting):
        raw = self._ps("powercfg /query scheme_current {0} {1}".format(alias_or_guid, setting))
        if not raw:
            return None
        m = re.findall(r"Current AC Power Setting Index:\s*0x([0-9A-Fa-f]+)", raw)
        return int(m[0], 16) if m else None

    # Ключевые настройки реестра для снимка системы (read + write-ready path/name).
    _SNAPSHOT_REG_DEFS = [
        ("HKLM", r"System\CurrentControlSet\Control\PriorityControl", "Win32PrioritySeparation", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\Session Manager\kernel", "DpcWatchdogProfileOffset", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\Session Manager\kernel", "DistributeTimers", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management", "DisablePagingExecutive", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management", "LargeSystemCache", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\GraphicsDrivers", "HwSchMode", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\GraphicsDrivers", "GpuPreemption", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\GraphicsDrivers", "TdrDelay", "REG_DWORD"),
        ("HKLM", r"SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile", "NetworkThrottlingIndex", "REG_DWORD"),
        ("HKLM", r"SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games", "GPU Priority", "REG_DWORD"),
        ("HKLM", r"SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games", "Priority", "REG_DWORD"),
        ("HKLM", r"SOFTWARE\Microsoft\DirectX", "UltraLowLatencyMode", "REG_DWORD"),
        ("HKLM", r"SOFTWARE\Microsoft\DirectX", "MaxFrameLatency", "REG_DWORD"),
        ("HKLM", r"SOFTWARE\Microsoft\DirectX", "FlipModelSwapchain", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\Power\PowerThrottling", "PowerThrottlingOff", "REG_DWORD"),
        ("HKLM", r"SYSTEM\CurrentControlSet\Control\Session Manager\Power", "HiberbootEnabled", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced", "HideFileExt", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced", "Hidden", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced", "TaskbarDa", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced", "TaskbarMn", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced", "ShowCopilotButton", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced", "TaskbarSmallIcons", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize", "AppsUseLightTheme", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize", "EnableTransparency", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager", "PreInstalledAppsEnabled", "REG_DWORD"),
        ("HKCU", r"SOFTWARE\Policies\Microsoft\Edge", "StartupBoostEnabled", "REG_DWORD"),
        ("HKCU", r"SOFTWARE\Policies\Microsoft\Edge", "BackgroundModeEnabled", "REG_DWORD"),
        ("HKLM", r"SOFTWARE\Policies\Microsoft\Windows\DataCollection", "AllowTelemetry", "REG_DWORD"),
        ("HKCU", r"Software\Microsoft\Windows\CurrentVersion\Search", "BingSearchEnabled", "REG_DWORD"),
        ("HKLM", r"SOFTWARE\Policies\Microsoft\Windows\Windows Search", "AllowCortana", "REG_DWORD"),
    ]

    def _build_system_snapshot(self):
        """Читает реальные значения системы (профиль ПК, план питания,
        реестр, интерфейс) и возвращает готовый dict снимка. Общая логика
        для export_system_snapshot() и export_system_snapshot_dialog()."""
        pc = {}
        try:
            pcr = self.pc_profile()
            if pcr.get("ok"):
                pc = pcr
        except Exception:
            pass

        active = self._ps("powercfg /getactivescheme")
        active_guid = ""
        active_name = ""
        m = re.search(r":\s*([0-9a-fA-F-]{36})\s*\(([^)]*)\)", active)
        if m:
            active_guid = m.group(1).strip().lower()
            active_name = m.group(2).strip()

        power = {
            "active_guid": active_guid,
            "active_name": active_name,
            "disk_idle": self._powercfg_query("sub_disk", "DISKIDLE"),
            "usb_suspend": self._powercfg_query("2a737441-1930-4402-8d77-b2bebba308a3", "48e6b7a6-50f5-4782-a5d4-53bb8f07e226"),
            "cpu_min": self._powercfg_query("sub_processor", "PROCTHROTTLEMIN"),
            "cpu_max": self._powercfg_query("sub_processor", "PROCTHROTTLEMAX"),
            "cooling": self._powercfg_query("sub_processor", "94D3A615-A899-4AC5-AE2B-E4D8F634367F"),
        }

        reg = {}
        for hive, path, name, regtype in self._SNAPSHOT_REG_DEFS:
            val = self._reg_read(hive, path, name)
            if val is not None:
                reg["{0}\\{1}\\{2}".format(hive, path, name)] = {"value": val, "type": regtype}

        interface = {
            "numlock_on": self._reg_read("HKU", r".DEFAULT\Control Panel\Keyboard", "InitialKeyboardIndicators"),
            "menu_delay": self._reg_read_str("HKCU", r"Control Panel\Desktop", "MenuShowDelay"),
        }

        data = {
            "version": VERSION,
            "exported_at": datetime.datetime.now().isoformat(),
            "snapshot_type": "full_system",
            "pc": pc,
            "power": power,
            "reg": reg,
            "interface": interface,
            "app_state": {
                "tweaks_state": _load_tweaks_state(),
                "tweak_history": _load_tweak_history(),
            },
        }
        settings_count = len(reg) + len([v for v in power.values() if v is not None])
        return data, settings_count

    def export_system_snapshot_dialog(self):
        try:
            path = self._tk_dialog("save")
            if not path:
                return {"ok": False, "canceled": True, "stderr": "Отменено пользователем."}
            p = Path(path)
            if not p.suffix:
                p = p / "kalash_snapshot.json"
            p.parent.mkdir(exist_ok=True, parents=True)
            data, settings_count = self._build_system_snapshot()
            p.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
            return {"ok": True, "path": str(p), "settings_count": settings_count}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def import_system_snapshot(self, json_data):
        """Применяет полный снимок системы из JSON. Возвращает список применённых изменений."""
        try:
            if isinstance(json_data, str):
                data = json.loads(json_data)
            else:
                data = json_data

            results = {"reg": [], "power": [], "errors": []}

            # Применяем реестр. Значения импортированного JSON — не доверенные
            # (пользователь мог открыть чужой файл), поэтому reg.exe вызывается
            # списком аргументов (без сборки PowerShell-строки), а hive/type
            # сверяются с allow-list, чтобы исключить инъекцию через value.
            allowed_hives = {"HKLM", "HKCU", "HKU", "HKCR", "HKCC"}
            allowed_types = {"REG_SZ", "REG_EXPAND_SZ", "REG_DWORD", "REG_QWORD", "REG_BINARY", "REG_MULTI_SZ"}
            for key_path, info in (data.get("reg") or {}).items():
                parts = key_path.split("\\", 1)
                if len(parts) < 2:
                    continue
                hive = parts[0].upper()
                rest = parts[1]
                last_sep = rest.rfind("\\")
                if last_sep < 0:
                    continue
                reg_path = rest[:last_sep]
                reg_name = rest[last_sep + 1:]
                reg_type = str(info.get("type", "REG_DWORD")).upper()
                val = info.get("value")
                if val is None:
                    continue
                if hive not in allowed_hives or reg_type not in allowed_types:
                    results["errors"].append("{0}: некорректный hive/type в снимке".format(reg_name))
                    continue

                try:
                    r = subprocess.run(
                        ["reg", "add", f"{hive}\\{reg_path}", "/v", reg_name, "/t", reg_type, "/d", str(val), "/f"],
                        creationflags=CREATE_NO_WINDOW, capture_output=True, text=True, timeout=15,
                    )
                    ok = r.returncode == 0
                    err = (r.stderr or "").strip()[:200]
                except Exception as e:
                    ok = False
                    err = str(e)
                if ok:
                    results["reg"].append("{0}\\{1} = {2}".format(reg_path, reg_name, val))
                else:
                    results["errors"].append("{0}: {1}".format(reg_name, err or "ошибка"))

            # Применяем план питания. power[...] тоже приходит из непроверенного
            # JSON — приводим к int перед вставкой в команду, иначе строковое
            # значение могло бы вставить произвольный PowerShell через ";".
            def _as_index(v):
                try:
                    return int(v)
                except (TypeError, ValueError):
                    return None

            power = data.get("power") or {}
            # Уникальный GUID на каждый импорт: при повторном импорте
            # powercfg -duplicatescheme с тем же GUID падает ("already exists").
            g = str(uuid.uuid4()).upper()
            # Определяем тип ПК из снимка
            pc = data.get("pc") or {}
            is_laptop = pc.get("is_laptop", False)
            src = "381b4222-f694-41f0-9685-ff5bb260df2e" if is_laptop else "8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c"
            cmds = [
                "powercfg -duplicatescheme {0} {1}".format(src, g),
                'powercfg -changename {0} "KALASH Snapshot" "Imported from KALASH TWEAKER"'.format(g),
            ]
            disk_idle = _as_index(power.get("disk_idle"))
            if disk_idle is not None:
                cmds.append("powercfg -setacvalueindex {0} sub_disk DISKIDLE {1}".format(g, disk_idle))
            usb_suspend = _as_index(power.get("usb_suspend"))
            if usb_suspend is not None:
                cmds.append("powercfg -setacvalueindex {0} 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 {1}".format(g, usb_suspend))
            cpu_min = _as_index(power.get("cpu_min"))
            if cpu_min is not None:
                cmds.append("powercfg -setacvalueindex {0} sub_processor PROCTHROTTLEMIN {1}".format(g, cpu_min))
            cpu_max = _as_index(power.get("cpu_max"))
            if cpu_max is not None:
                cmds.append("powercfg -setacvalueindex {0} sub_processor PROCTHROTTLEMAX {1}".format(g, cpu_max))
            cooling = _as_index(power.get("cooling"))
            if cooling is not None:
                cmds.append("powercfg -setacvalueindex {0} sub_processor 94D3A615-A899-4AC5-AE2B-E4D8F634367F {1}".format(g, cooling))
            cmds.append("powercfg -setactive {0}".format(g))

            power_script = "; ".join(cmds)
            r = self.run_tweak(power_script)
            if r.get("ok"):
                results["power"].append("План питания применён: {0}".format(power.get("active_name", "KALASH Snapshot")))
            else:
                results["errors"].append("План питания: {0}".format(r.get("stderr", "ошибка")))

            # Восстанавливаем app state если есть
            app_state = data.get("app_state") or {}
            if app_state.get("tweaks_state"):
                _save_tweaks_state(app_state["tweaks_state"])
            if app_state.get("tweak_history"):
                _save_tweak_history(app_state["tweak_history"])

            return {
                "ok": True,
                "reg_applied": len(results["reg"]),
                "power_applied": len(results["power"]),
                "errors": results["errors"],
                "reg_details": results["reg"],
                "power_details": results["power"],
            }
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def import_system_snapshot_dialog(self):
        try:
            path = self._tk_dialog("open")
            if not path:
                return {"ok": False, "canceled": True, "stderr": "Отменено пользователем."}
            p = Path(path)
            if not p.exists():
                return {"ok": False, "stderr": "Файл не найден."}
            data = json.loads(p.read_text(encoding="utf-8"))
            if data.get("snapshot_type") != "full_system":
                return {"ok": False, "stderr": "Это не файл настроек KALASH. Проверьте формат файла."}
            return self.import_system_snapshot(data)
        except Exception as e:
            return {"ok": False, "stderr": str(e)}

    def relaunch_as_admin(self):
        try:
            if getattr(sys, "frozen", False):
                exe = os.path.abspath(sys.argv[0])
            else:
                exe = sys.executable
            res = ctypes.windll.shell32.ShellExecuteW(None, "runas", exe, "", None, 1)
            if res <= 32:
                return {"ok": False, "stderr": "Запуск от админа отменён или отклонён."}
        except Exception as e:
            return {"ok": False, "stderr": str(e)}
        try:
            import webview
            for w in webview.windows:
                try:
                    w.destroy()
                except Exception:
                    pass
        except Exception:
            pass
        return {"ok": True}


# ── WebView2 management ──────────────────────────────────────────────────

_WV2_STORAGE = Path(os.environ.get("APPDATA", tempfile.gettempdir())) / APP_TAG / "webview2"
_WV2_CANARY = _WV2_STORAGE / ".ok"
_WV2_MAX_CACHE_DAYS = 7


def _reset_webview2_cache():
    """Clears the WebView2 profile only when it is stale or was never healthy."""
    if _WV2_STORAGE.exists():
        refresh = True
        try:
            age_days = (time.time() - _WV2_CANARY.stat().st_mtime) / 86400
            if age_days < _WV2_MAX_CACHE_DAYS:
                refresh = False
        except Exception:
            pass
        if refresh:
            try:
                shutil.rmtree(_WV2_STORAGE, True)
            except Exception:
                pass
    try:
        _WV2_STORAGE.mkdir(exist_ok=True, parents=True)
    except Exception:
        pass


def _mark_webview2_ok():
    try:
        _WV2_STORAGE.mkdir(exist_ok=True, parents=True)
        _WV2_CANARY.write_bytes(b"ok")
    except Exception:
        pass


def _start_local_server():
    from http.server import SimpleHTTPRequestHandler, HTTPServer
    import functools
    handler = functools.partial(SimpleHTTPRequestHandler, directory=str(WEB_DIR))
    srv = HTTPServer(("127.0.0.1", 0), handler)
    port = srv.server_address[1]
    t = threading.Thread(target=srv.serve_forever, daemon=True)
    t.start()
    return port


def _set_window_icon():
    try:
        user32 = ctypes.windll.user32
        kernel32 = ctypes.windll.kernel32
        ICO_BIG = 1
        ICO_SMALL = 0
        WM_SETICON = 0x80
        ico_path = str(WEB_DIR / "snake.ico")
        if not os.path.isfile(ico_path):
            return

        our_pid = kernel32.GetCurrentProcessId()
        found_hwnd = [None]

        WNDENUMPROC = ctypes.WINFUNCTYPE(ctypes.c_int, ctypes.c_void_p, ctypes.c_void_p)

        def _enum_cb(hwnd, _lparam):
            if not user32.IsWindowVisible(hwnd):
                return 1
            pid = ctypes.c_ulong()
            user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
            if pid.value == our_pid:
                length = user32.GetWindowTextLengthW(hwnd)
                if length > 0:
                    found_hwnd[0] = hwnd
                    return 0
            return 1

        user32.EnumWindows(WNDENUMPROC(_enum_cb), 0)
        hwnd = found_hwnd[0]
        if not hwnd:
            return

        hicon = user32.LoadImageW(0, ico_path, 1, 256, 256, 16)
        if hicon:
            user32.SendMessageW(hwnd, WM_SETICON, ICO_BIG, hicon)
            user32.SendMessageW(hwnd, WM_SETICON, ICO_SMALL, hicon)
    except Exception:
        return


def _launch_main_window(api):
    global _active_window
    _reset_webview2_cache()
    port = _start_local_server()
    url = f"http://127.0.0.1:{port}/index.html"

    try:
        window = webview.create_window(
            f"{APP_NAME} v{VERSION}",
            url,
            js_api=api,
            width=1520, height=980,
            min_size=(1180, 760),
            background_color="#050506",
        )
    except Exception as e:
        _write_crash_log(f"webview.create_window failed: {e}")
        _show_error(f"Не удалось создать окно WebView2.\n\n{e}\n\nПопробуй перезапустить ПК.")
        sys.exit(1)

    tray = TrayManager(window)
    window.events.closing += tray.hide_on_close
    tray.start()

    _active_window = window
    _start_single_instance_server()

    def _start_icon_thread():
        time.sleep(0.8)
        _set_window_icon()

    threading.Thread(target=_start_icon_thread, daemon=True).start()

    try:
        webview.start(debug=False, gui="edgechromium", storage_path=str(_WV2_STORAGE))
    except Exception as e:
        _write_crash_log(f"webview.start failed: {e}")
        _show_error(
            f"WebView2 не запустился.\n\n{e}\n\n"
            "Возможные причины:\n"
            "1. Перезагрузи ПК после оптимизации\n"
            "2. Установи WebView2 Runtime заново\n"
            "3. Проверь диспетчер задач — заверши все процессы KALASH"
        )
        sys.exit(1)
    _mark_webview2_ok()


def _show_error(message, title=""):
    try:
        ctypes.windll.user32.MessageBoxW(0, message, f"{APP_TAG} — Ошибка", MB_ICONERROR)
    except Exception:
        return


def _ask_yes_no(message, title=""):
    try:
        return ctypes.windll.user32.MessageBoxW(0, message, title, MB_YESNO_ICONQUESTION) == IDYES
    except Exception:
        return False


def _is_webview2_installed():
    try:
        import winreg
    except ImportError:
        return True

    guid = "{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}"
    locations = [
        (winreg.HKEY_LOCAL_MACHINE, f"SOFTWARE\\WOW6432Node\\Microsoft\\EdgeUpdate\\Clients\\{guid}"),
        (winreg.HKEY_LOCAL_MACHINE, f"SOFTWARE\\Microsoft\\EdgeUpdate\\Clients\\{guid}"),
        (winreg.HKEY_CURRENT_USER, f"SOFTWARE\\Microsoft\\EdgeUpdate\\Clients\\{guid}"),
    ]
    for root, path in locations:
        try:
            k = winreg.OpenKey(root, path, 0, winreg.KEY_READ)
            pv, _ = winreg.QueryValueEx(k, "pv")
            winreg.CloseKey(k)
            if pv and pv != "0.0.0.0":
                return True
        except OSError:
            continue
    return False


def _install_webview2_silent():
    try:
        boot_url = "https://go.microsoft.com/fwlink/p/?LinkId=2124703"
        boot_path = Path(tempfile.gettempdir()) / "MicrosoftEdgeWebview2Setup.exe"
        urllib.request.urlretrieve(boot_url, boot_path)
        result = subprocess.run(
            [str(boot_path), "/silent", "/install"],
            timeout=120,
            creationflags=CREATE_NO_WINDOW,
        )
        return result.returncode == 0
    except Exception:
        return False


def _ensure_webview2():
    if _is_webview2_installed():
        return True
    install = _ask_yes_no(
        f"{APP_NAME} требует Microsoft Edge WebView2 Runtime.\n\n"
        "Это бесплатный компонент Microsoft (НЕ браузер Edge).\n\n"
        "Установить автоматически? (нужен интернет)\n\n"
        "Если нажмёшь «Нет» — приложение не сможет показать интерфейс.",
        f"{APP_TAG} — WebView2",
    )
    if install:
        ok = _install_webview2_silent()
        if ok and _is_webview2_installed():
            return True
    _show_error(
        "Не удалось установить WebView2 автоматически.\n\n"
        "Можешь скачать вручную:\n"
        "https://developer.microsoft.com/microsoft-edge/webview2/"
    )
    try:
        webbrowser.open("https://developer.microsoft.com/microsoft-edge/webview2/")
    except Exception:
        pass
    return False


def _check_dep():
    try:
        r = subprocess.run(
            ["bcdedit", "/enum", "{current}"],
            capture_output=True,
            text=True,
            timeout=10,
            creationflags=CREATE_NO_WINDOW,
        )
        output = (r.stdout or "").lower()
        if "nx" in output and "alwaysoff" in output:
            fix = _ask_yes_no(
                "ОБНАРУЖЕНА ПРОБЛЕМА: DEP (NX) выключен!\n\n"
                "Это ломает Steam, Chrome, Discord и KALASH TWEAKER.\n"
                "Интерфейс не загрузится пока DEP отключён.\n\n"
                "Включить DEP обратно? (потребуется перезагрузка)",
                f"{APP_TAG} — Критическая проблема",
            )
            if fix:
                subprocess.run(
                    ["bcdedit", "/set", "nx", "OptIn"],
                    creationflags=CREATE_NO_WINDOW,
                    timeout=10,
                )
                _show_error("DEP включён обратно.\n\nПЕРЕЗАГРУЗИ ПК и запусти KALASH TWEAKER заново.")
                sys.exit(0)
            else:
                _show_error(
                    "DEP остался выключенным.\n"
                    "Чтобы починить вручную — запусти CMD от админа:\n"
                    "bcdedit /set nx OptIn\n"
                    "Потом перезагрузи ПК."
                )
    except Exception:
        return


def _is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin() != 0
    except Exception:
        return False


def _relaunch_as_admin():
    try:
        if getattr(sys, "frozen", False):
            exe = os.path.abspath(sys.argv[0])
        else:
            exe = sys.executable
        res = ctypes.windll.shell32.ShellExecuteW(None, "runas", exe, "", None, 1)
        return int(res) > 32
    except Exception:
        return False


def _safe_main():
    _startup_log = []
    def _log(msg):
        _startup_log.append(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {msg}")
    _log(f"STARTUP PID={os.getpid()}")

    if not _is_admin():
        _log("Not admin, requesting elevation")
        if _relaunch_as_admin():
            _log("Relaunching as admin, exiting")
            sys.exit(0)
        _show_error("Не удалось запросить права администратора.\nЗапусти файл вручную от имени администратора.")
        sys.exit(0)
    _log("Admin: OK")
    if not _acquire_instance_lock():
        _log("Instance lock FAILED")
        _log("Notifying running instance, exiting quietly")
        _notify_existing_instance()
        sys.exit(0)
    _log("Instance lock: OK")
    _check_dep()
    _log("check_dep: OK")
    if not _ensure_webview2():
        _log("WebView2: MISSING")
        sys.exit(1)
    _log("WebView2: OK")

    psutil.cpu_percent(None)
    _log("Starting API and window...")

    discord_rpc = DiscordRPCManager()
    discord_rpc.start()
    _log("Discord Rich Presence: started")

    # ── Защита от декомпиляции: расшифровка веб-файлов по паролю ──
    try:
        import protection
    except ImportError as e:
        _log(f"protection module missing/failed to import: {e}")
        protection = None

    if protection is not None:
        try:
            if protection.has_encrypted_web(WEB_DIR):
                if not protection.startup_protection(WEB_DIR):
                    _log("Startup protection: ACCESS DENIED")
                    sys.exit(0)
                _log("Startup protection: ACCESS GRANTED")
        except SystemExit:
            raise
        except Exception as e:
            _log(f"Startup protection check failed: {e}")
            _write_crash_log(f"protection check failed: {e}\n{traceback.format_exc()}")

    api = Api(rpc=discord_rpc)
    t = threading.Thread(target=api._temp_updater, daemon=True)
    t.start()
    _log("Temp updater: OK")
    try:
        _launch_main_window(api)
    except Exception as e:
        _log(f"LAUNCH FAILED: {e}")
        try:
            log_path = os.path.join(os.environ.get("APPDATA", tempfile.gettempdir()), APP_TAG, "startup.log")
            os.makedirs(os.path.dirname(log_path), exist_ok=True)
            with open(log_path, "w", encoding="utf-8") as f:
                f.write("\n".join(_startup_log))
        except Exception:
            pass
        raise
    finally:
        discord_rpc.stop()
        api.stop()


def main():
    try:
        _safe_main()
    except SystemExit:
        raise
    except Exception:
        tb = traceback.format_exc()
        _write_crash_log(tb)
        _show_error(
            "Произошла непредвиденная ошибка при запуске.\n\n"
            f"Полный лог сохранён здесь:\n{CRASH_LOG}\n\n"
            "Скопируй текст ниже (или файл лога) и пришли в поддержку @WhyOtto77:\n\n"
            + tb[-1500:]
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
