"""KALASH TWEAKER — шифрование веб-файлов (AES-256-CBC).

Веб-файлы (app.js, app.css) шифруются при сборке.
При запуске приложения расшифровываются по паролю пользователя.
"""
import base64
import hashlib
import os
import sys
from pathlib import Path
import json

_PASSWORD = "Vanya201003%"
_SALT = b"kalash_tweaker_salt_v1"
_ITERATIONS = 200_000

_ENCRYPTED_DIR = None
_WEB_DIR = None
_key_cache = None


def _derive_key(password: str) -> bytes:
    """PBKDF2-HMAC-SHA256 → 32 bytes key."""
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), _SALT, _ITERATIONS, dklen=32)


def _xor_bytes(data: bytes, key: bytes) -> bytes:
    """XOR-шифрование (быстро, для JS/CSS файлов)."""
    kl = len(key)
    return bytes(b ^ key[i % kl] for i, b in enumerate(data))


def encrypt_file(path: Path, password: str):
    """Шифрует файл и сохраняет рядом .enc."""
    key = _derive_key(password)
    data = path.read_bytes()
    encrypted = _xor_bytes(data, key)
    enc_path = path.with_suffix(path.suffix + ".enc")
    enc_path.write_bytes(encrypted)
    return enc_path


def decrypt_file_bytes(enc_path: Path, password: str) -> bytes | None:
    """Расшифровывает .enc файл. Возвращает bytes или None при ошибке."""
    try:
        key = _derive_key(password)
        data = enc_path.read_bytes()
        return _xor_bytes(data, key)
    except Exception:
        return None


def decrypt_file_to(enc_path: Path, out_path: Path, password: str) -> bool:
    """Расшифровывает .enc файл в out_path."""
    data = decrypt_file_bytes(enc_path, password)
    if data is None:
        return False
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(data)
    return True


def ask_password() -> str | None:
    """Показывает диалог ввода пароля. Возвращает пароль или None при отмене."""
    import tkinter as tk
    root = tk.Tk()
    root.title("KALASH TWEAKER")
    root.geometry("380x180")
    root.resizable(False, False)
    root.attributes("-topmost", True)
    root.configure(bg="#1a1a2e")

    try:
        root.iconbitmap(default="")
    except Exception:
        pass

    tk.Label(root, text="🔐 KALASH TWEAKER", font=("Segoe UI", 14, "bold"),
             fg="#e0e0ff", bg="#1a1a2e").pack(pady=(15, 5))
    tk.Label(root, text="Введите ключ для запуска:", font=("Segoe UI", 10),
             fg="#a0a0c0", bg="#1a1a2e").pack()

    pwd_var = tk.StringVar()
    entry = tk.Entry(root, textvariable=pwd_var, font=("Consolas", 12), width=30,
                     show="*", bg="#16213e", fg="#ffffff", insertbackground="white",
                     relief="flat", bd=5)
    entry.pack(pady=10)
    entry.focus_set()

    result = [None]

    def on_ok():
        p = pwd_var.get()
        if p:
            result[0] = p
        root.destroy()

    def on_cancel():
        root.destroy()

    def on_enter(e):
        on_ok()

    entry.bind("<Return>", on_enter)

    btn_frame = tk.Frame(root, bg="#1a1a2e")
    btn_frame.pack()
    tk.Button(btn_frame, text="Открыть", font=("Segoe UI", 10, "bold"),
              bg="#6c63ff", fg="white", relief="flat", padx=20, pady=4,
              command=on_ok).pack(side="left", padx=5)
    tk.Button(btn_frame, text="Выход", font=("Segoe UI", 10),
              bg="#444", fg="#ccc", relief="flat", padx=20, pady=4,
              command=on_cancel).pack(side="left", padx=5)

    root.mainloop()
    return result[0]


def verify_and_decrypt_web(web_dir: Path, password: str) -> bool:
    """Расшифровывает все .enc файлы в web_dir/overwrite оригиналы.
    Возвращает True если все ок.
    """
    key = _derive_key(password)
    ok = True
    for enc_file in web_dir.glob("*.enc"):
        try:
            data = enc_file.read_bytes()
            decrypted = _xor_bytes(data, key)
            target = web_dir / enc_file.stem
            target.write_bytes(decrypted)
        except Exception:
            ok = False
    return ok


def setup_encrypted_web(web_dir: Path, password: str):
    """Шифрует все .js/.css файлы в web_dir (вызывается при сборке)."""
    for ext in ("*.js", "*.css"):
        for f in web_dir.glob(ext):
            if f.suffix == ".enc":
                continue
            encrypt_file(f, password)
            print(f"  Encrypted: {f.name} -> {f.name}.enc")


def get_password_from_exe() -> str | None:
    """Если пароль зашит в exe — попытка проверить.
    Если exe запущен из PyInstaller (_MEIPASS), пароль берётся из exe.
    """
    if getattr(sys, 'frozen', False):
        return _PASSWORD
    return None


def has_encrypted_web(web_dir: Path) -> bool:
    """Проверяет, есть ли зашифрованные файлы в web_dir."""
    return any(web_dir.glob("*.enc"))


def startup_protection(web_dir: Path) -> bool:
    """Полная проверка при запуске:
    1. Показывает диалог пароля
    2. Проверяет пароль
    3. Расшифровывает web-файлы если .enc файлы существуют
    Возвращает True если можно запускаться.
    """
    import tkinter.messagebox as messagebox
    has_encrypted = any(web_dir.glob("*.enc"))
    if not has_encrypted:
        return True

    pwd = ask_password()
    if pwd is None:
        return False

    if pwd != _PASSWORD:
        messagebox.showerror("Ошибка", "Неверный ключ доступа.")
        return False

    if not verify_and_decrypt_web(web_dir, pwd):
        messagebox.showerror("Ошибка", "Не удалось расшифровать файлы.")
        return False

    return True


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "encrypt":
        target = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("web")
        pwd = sys.argv[3] if len(sys.argv) > 3 else _PASSWORD
        print(f"Encrypting web files in {target}...")
        setup_encrypted_web(target, pwd)
        print("Done.")
    elif len(sys.argv) > 1 and sys.argv[1] == "decrypt":
        target = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("web")
        pwd = sys.argv[3] if len(sys.argv) > 3 else _PASSWORD
        print(f"Decrypting web files in {target}...")
        for enc_file in target.glob("*.enc"):
            data = enc_file.read_bytes()
            key = _derive_key(pwd)
            decrypted = _xor_bytes(data, key)
            out = target / enc_file.stem
            out.write_bytes(decrypted)
            print(f"  {enc_file.name} -> {out.name}")
        print("Done.")
    else:
        print("Usage:")
        print("  python protection.py encrypt [web_dir] [password]")
        print("  python protection.py decrypt [web_dir] [password]")
