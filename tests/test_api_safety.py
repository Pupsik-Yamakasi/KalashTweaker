import json
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import main


class ApiSafetyTests(unittest.TestCase):
    def setUp(self):
        self.api = main.Api()

    def test_rejects_invalid_winget_identifier_before_starting_process(self):
        with patch.object(main.subprocess, "run") as run:
            result = self.api.install_app("VideoLAN.VLC & whoami")
        self.assertFalse(result["ok"])
        run.assert_not_called()

    def test_accepts_only_complete_http_urls(self):
        with patch.object(main.webbrowser, "open") as open_browser:
            self.assertFalse(self.api.open_url("https:example.com")["ok"])
            self.assertTrue(self.api.open_url("https://example.com")["ok"])
        open_browser.assert_called_once_with("https://example.com")

    def test_cleanup_schedule_passes_each_schtasks_argument_separately(self):
        with tempfile.TemporaryDirectory() as directory:
            schedule_path = Path(directory) / "schedule.json"
            result_stub = SimpleNamespace(returncode=0, stdout="", stderr="")
            with patch.object(main.Api, "_SCHEDULE_PATH", schedule_path), patch.object(
                main.subprocess, "run", return_value=result_stub
            ) as run:
                result = self.api.schedule_cleanup("weekly", "03:00")

            self.assertTrue(result["ok"])
            command = run.call_args.args[0]
            self.assertIn(["/sc", "weekly", "/d", "*", "/st", "03:00"], [command[6:12]])
            self.assertEqual(json.loads(schedule_path.read_text(encoding="utf-8"))["time"], "03:00")

    def test_cleanup_schedule_rejects_invalid_time_without_running_command(self):
        with patch.object(main.subprocess, "run") as run:
            result = self.api.schedule_cleanup("daily", "03:00 & calc")
        self.assertFalse(result["ok"])
        run.assert_not_called()

    def test_frontend_backs_up_every_registry_change_before_running_queue(self):
        source = Path("web/app.js").read_text(encoding="utf-8")
        self.assertIn("const registryCmds = items.map((it) => it.cmd)", source)
        self.assertNotIn("const dangerCmds = items.filter", source)

    def test_frontend_updates_the_loading_version_from_backend(self):
        source = Path("web/app.js").read_text(encoding="utf-8")
        markup = Path("web/index.html").read_text(encoding="utf-8")
        self.assertIn('id="fallbackVersion"', markup)
        self.assertIn('fallbackVersion.textContent = `v${APP_VERSION}`', source)

    def test_smart_optimization_keeps_personal_and_security_settings_manual(self):
        source = Path("web/app.js").read_text(encoding="utf-8")
        self.assertIn("const SMART_PROFILE_TWEAKS", source)
        self.assertIn("const SMART_REQ", source)
        self.assertIn('if (!allowed.has(name))', source)
        self.assertIn('if (rec === "default") return "balanced"', source)
        self.assertIn('return !pc.is_laptop && rec === "maximum" ? "maximum" : "gaming"', source)
        self.assertNotIn("smartOptMode", source)
        self.assertIn("const cpuMinAc = mode === \"maximum\" && !laptop ? 100", source)
        # These settings can be useful, but are personal/security choices and
        # must not silently be part of any automatic scenario.
        mode_section = source.split("const SMART_PROFILE_TWEAKS", 1)[1].split("const DEEP_TWEAKS", 1)[0]
        self.assertNotIn('"Mitigations OFF (Meltdown/Spectre)"', mode_section)
        self.assertNotIn('"DNS Cloudflare"', mode_section)


if __name__ == "__main__":
    unittest.main()
