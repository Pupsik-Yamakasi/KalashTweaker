const ICONS = {
  home:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg>',
  optimize:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  clean:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/></svg>',
  cpu:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>',
  ram:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="1"/><path d="M6 11v2M10 11v2M14 11v2M18 11v2"/></svg>',
  gpu:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  net:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01M2 8.82a15 15 0 0120 0"/></svg>',
  disk:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12H2M5 12V6a2 2 0 012-2h10a2 2 0 012 2v6M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6"/><circle cx="6.5" cy="16" r=".5" fill="currentColor"/></svg>',
  priv:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  kernel:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
  uwp:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  startup: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  cust:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.7-.77 1.7-1.7 0-.43-.16-.83-.43-1.13a1.7 1.7 0 011.27-2.84H17a5 5 0 005-5c0-4.42-4.5-8-10-8z"/></svg>',
  sec:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  tools:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
  bench:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 100-20 10 10 0 000 20z"/><path d="M12 12l4-4"/></svg>',
  apps:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  zap:     '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  search:  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  external:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  doc:     '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
  check:   '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  cross:   '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  telegram:'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21.5 4.3L2.7 11.6c-1 .4-1 1.4 0 1.7l4.7 1.4 1.8 5.6c.2.7 1 .9 1.6.4l2.6-2.4 5.1 3.7c1 .7 2.4.2 2.6-1l3.4-15.7c.2-1.2-1-2.1-2-1.6zM10 14.5L9 18l-1-3L18 7l-8 7.5z"/></svg>',
  shield:  '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z"/></svg>',
  keyboard:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/></svg>',
  user:    '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
  clock:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  alert:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  fix:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z"/></svg>',
  restore: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
  bios:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>',
  mouse:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="6"/><line x1="12" y1="6" x2="12" y2="10"/></svg>',
  profile: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  gamepad: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><path d="M17.32 5H6.68a4 4 0 00-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 003 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 019.828 16h4.344a2 2 0 011.414.586L17 18c.5.5 1 1 2 1a3 3 0 003-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0017.32 5z"/></svg>',
  database:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  w11:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5l7.5 0M13.5 5l7.5 0M3 12l7.5 0M13.5 12l7.5 0M3 19l7.5 0M13.5 19l7.5 0"/></svg>',
  device:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 15h2M20 15h2M2 9h2M20 9h2"/></svg>',
  plus:    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  info:    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  process: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  gauge:   '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 6v6l4 2"/></svg>',
  lan:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  save:    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
  upload:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  download:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  backup:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9a9 9 0 1 0-2.13 9.36L23 14"/></svg>',
  pro:     '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20M12 22L9 9M12 22l3-13M6 3l3 6M18 3l-3 6"/></svg>',
  lock:    '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
};

const CATEGORIES = [
  { id: "home",     label: "Главная",        icon: ICONS.home },
  { id: "optimize", label: "Оптимизация",    icon: ICONS.optimize, hot: true },
  { id: "deep",     label: "Глубокая оптим.",icon: ICONS.alert,    danger: true },
  { id: "fixes",    label: "Исправления",    icon: ICONS.fix },
  { divider: "Производительность" },
  { id: "registry", label: "Реестр",         icon: ICONS.database, hot: true },
  { id: "devices",  label: "Устройства",     icon: ICONS.device,   hot: true },

  { id: "games",    label: "Игры",           icon: ICONS.gamepad,  hot: true },
  { id: "clean",    label: "Очистка",        icon: ICONS.clean },
  { id: "cpu",      label: "Процессор",      icon: ICONS.cpu },
  { id: "ram",      label: "Память",         icon: ICONS.ram },
  { id: "gpu",      label: "Графика",        icon: ICONS.gpu },
  { id: "nvidia",   label: "NVIDIA",         icon: ICONS.gpu,      hot: true },
  { id: "net",      label: "Сеть",           icon: ICONS.net },
  { id: "disk",     label: "Диски",          icon: ICONS.disk },
  { id: "input",    label: "Мышь/клавиатура",icon: ICONS.mouse },
  { divider: "Система" },
  { id: "priv",     label: "Приватность",    icon: ICONS.priv },
  { id: "datacoll", label: "Сбор данных",    icon: ICONS.priv,     hot: true },
  { id: "startup",  label: "Службы",         icon: ICONS.startup },
  { id: "cust",     label: "Интерфейс",      icon: ICONS.cust },
  { id: "perfosec", label: "Перф. vs Защита", icon: ICONS.sec,     hot: true },
  { id: "nuke_security", label: "Нукер безопасности", icon: ICONS.shield, danger: true },
  { id: "history",  label: "История",        icon: ICONS.clock },
  { id: "processes",label: "Процессы",       icon: ICONS.tools },
  { divider: "Утилиты" },
  { id: "tools",    label: "Инструменты",    icon: ICONS.tools },
  { id: "bench",    label: "Бенчмарк",       icon: ICONS.bench },
  { id: "monitor",  label: "Мониторинг",     icon: ICONS.gauge,   hot: true },
  { id: "apps",     label: "Приложения",     icon: ICONS.apps },
  { divider: "Настройки" },
  { id: "settings", label: "Настройки",      icon: ICONS.cust },
  { id: "bios",     label: "BIOS Tuning",    icon: ICONS.bios },
];

// Все твики открыты бесплатно, без лицензий.
const PRO_CATS = new Set([]);
const PRO_SECTIONS = new Set([]);
const PRO_LOCK_MSG = "";
const isProSection = (s) => !!s && false;

const getCategoryCount = (id) => {
  if (id === "startup") return SERVICES.length;
  if (id === "apps") return APPS.length;
  const t = TWEAKS[id];
  if (!t) return null;
  if (Array.isArray(t)) return t.length;
  return Object.values(t).reduce((n, arr) => n + arr.length, 0);
};

const tweakMatchesSearch = (t, q) => {
  if (!q) return true;
  const ql = q.toLowerCase();
  return t[0].toLowerCase().includes(ql) || (t[3] && t[3].toLowerCase().includes(ql));
};

const TWEAKS = {
  pro: {
    "Таймеры и приоритеты": [
      ["Dynamic Tick OFF", "bcdedit /set disabledynamictick yes", "warn", "Отключает динамический тик — может увеличить энергопотребление.", null, "Перезагрузка обязательна. На десктопе — рекомендуется."],
      ["TSC Sync Enhanced", "bcdedit /set tscsyncpolicy enhanced", "safe", "Улучшенная синхронизация TSC между ядрами CPU.", null, "Безопасно для большинства CPU. Ребут обязателен."],
      ["Platform Clock Prefer TSC", "bcdedit /set useplatformclock false 2>$null", "warn", "Предпочитает TSC. При проблемах со звуком: bcdedit /deletevalue useplatformclock.", null, "При проблемах со звуком: bcdedit /deletevalue useplatformclock."],
      ["Timer Resolution = 0.5ms", "$code = 'using System;using System.Runtime.InteropServices;public class NtTimer{[DllImport(\"ntdll.dll\", SetLastError=true)]public static extern int NtSetTimerResolution(int DesiredResolution, bool SetResolution, out int CurrentResolution);}'; Add-Type -TypeDefinition $code -OutputAssembly $null; $cr = 0; [NtTimer]::NtSetTimerResolution(5000, [ref]$true, [ref]$cr) | Out-Null", "warn", "Таймер ядра 0.5мс — снижает input lag. Действует пока PowerShell работает.", null, "Действует пока PowerShell работает. Для постоянного эффекта используйте registry-твик."],
      ["Win32PrioritySeparation = 38 (Gaming)", "reg add 'HKLM\\System\\CurrentControlSet\\Control\\PriorityControl' /v Win32PrioritySeparation /t REG_DWORD /d 38 /f", "safe", "Foreground boost + короткие кванты — оптимально для игр и быстрого ввода.", null, "Оптимально для FPS-игр. Активное окно получает больше ресурсов."],
      ["MMCSS Audio = High", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio' /v Priority /t REG_DWORD /d 6 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio' /v 'Scheduling Category' /t REG_SZ /d High /f", "safe", "Высокий приоритет аудио-потока — без щелчков и пропусков звука.", null, "Важно для аудио/видео работы и стриминга."],
      ["DPC Latency Optimization", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v DpcWatchdogProfileOffset /t REG_DWORD /d 10000 /f", "safe", "Снижает DPC-задержки — меньше фризов и прерываний.", null, "Хорошо при микро-фризах и лагах в играх."],
      ["Increase IRQ Priority", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl' /v IRQ8Priority /t REG_DWORD /d 1 /f", "safe", "Повышает приоритет IRQ8 (RTC) — стабильнее таймер.", null, "Повышает стабильность таймера. Полезно для аудио."],
      ["MMCSS Games = High Priority", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v Priority /t REG_DWORD /d 8 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'Scheduling Category' /t REG_SZ /d High /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'GPU Priority' /t REG_DWORD /d 8 /f", "safe", "Максимальный приоритет игрового потока (CPU, RAM и GPU) — плавный фреймрейт.", null, "Главный твик для FPS-стабильности. Игры получают больше ресурсов."],
      ["MMCSS Стресс-тест (Windows Game Mode)", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v SystemResponsiveness /t REG_DWORD /d 10 /f", "safe", "Снижает фоновую активность до 10% — система отдаёт больше мощности активной игре.", null, "Оптимально для игр. Фон подтормаживает, но активноется только игра."],
      ["Socket Priority = Games", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v SystemResponsiveness /t REG_DWORD /d 10 /f", "safe", "Полностью снимает сетевой троттлинг Windows и отдаёт приоритет играм.", null, "Снижает сетевые задержки в онлайн-играх."],
    ],
    "Питание (агрессивное)": [
      ["Отключить парковку ядер", "powercfg /setacvalueindex scheme_current sub_processor CPMINCORES 100; powercfg /setactive scheme_current", "warn", "Все ядра CPU всегда активны, без засыпания.", null, "Для десктопов — ок. На ноутбуках — лишний нагрев и расход батареи."],
      ["Turbo Boost Max", "powercfg /setacvalueindex scheme_current sub_processor PERFBOOSTMODE 1; powercfg /setactive scheme_current", "warn", "Агрессивный турбо-буст: CPU держит максимальную частоту дольше.", null, "Требует хорошего кулера. Температура может вырасти на 10-15°C."],
      ["CPU Min 100%", "powercfg /setacvalueindex scheme_current sub_processor PROCTHROTTLEMIN 100; powercfg /setactive scheme_current", "warn", "Процессор не снижает частоту ниже максимума от сети.", null, "Только для десктопов. Ноутбук будет жрать батарею."],
      ["Отключить EPP (проц. приоритет электричества)", "powercfg /setacvalueindex scheme_current sub_processor PERFEPP 0; powercfg /setactive scheme_current", "safe", "CPU не экономит энергию при задаче частот — максимальный буст в играх.", null, "На десктопе с хорошим кулером — безопасно. Ноутбук будет жрать батарею."],
    ],
    "Память": [
      ["Prefetch + Superfetch OFF (реестр)", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters' /v EnablePrefetcher /t REG_DWORD /d 0 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters' /v EnableSuperfetch /t REG_DWORD /d 0 /f", "safe", "Отключает алгоритмы предзагрузки в реестре (работают на всех версиях Windows).", null, "Меньше операций чтения диска. Первые запуски программ будут чуть медленнее."],
      ["Отключить Superfetch (SysMain)", "Stop-Service SysMain -ErrorAction SilentlyContinue; Set-Service SysMain -StartupType Disabled", "safe", "Отключает предзагрузку приложений в RAM — снижает диск и RAM-использование.", null, "При первом запуске программы будут загружаться медленнее."],
      ["Отключить Memory Compression", "Disable-MMAgent -MemoryCompression", "safe", "Без сжатия страниц в RAM — меньше CPU, больше прямого потребления.", null, "На 8 ГБ RAM и меньше — не рекомендуется."],
      ["Отключить Page Combining", "Disable-MMAgent -PageCombining", "safe", "Отключает объединение одинаковых страниц — предсказуемее для игр.", null, "Меньше CPU-нагрузки при работе с памятью."],
      ["LargeSystemCache", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v LargeSystemCache /t REG_DWORD /d 1 /f", "warn", "Приоритет файлового кэша над приложениями — ускоряет серверы, на десктопе скорее вреда.", null, "Для серверов и рабочих станций с большой RAM."],
      ["DisablePagingExecutive", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v DisablePagingExecutive /t REG_DWORD /d 1 /f", "warn", "Ядро Windows в RAM — быстрее отклик, но на <8 ГБ RAM будет нехватка.", null, "Только для 16+ ГБ RAM. На 8 ГБ будет нехватка."],
    ],
    "GPU": [
      ["GPU Preemption OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v GpuPreemption /t REG_DWORD /d 0 /f", "warn", "Отключает предварительный перехват GPU — ниже латентность, возможны краткие фризы.", null, "Снижает input lag, но может вызвать микро-фризы в некоторых играх. Тестируйте."],
      ["DX12 Low Latency (MaxFrameLatency=1)", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v MaxFrameLatency /t REG_DWORD /d 1 /f", "warn", "Максимальная задержка кадра = 1. Минимальный input lag в DirectX-приложениях.", null, "Может вызвать микро-фризы при нестабильном FPS."],
      ["NVIDIA Ultra Low Latency", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v UltraLowLatencyMode /t REG_DWORD /d 1 /f", "safe", "Включает Ultra Low Latency Mode для NVIDIA GPU.", "nvidia", "Для GPU NVIDIA GTX 10xx+. На AMD — не действует. Перезагрузка нужна."],
      ["TDR Delay = 60s", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDelay /t REG_DWORD /d 60 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDdiDelay /t REG_DWORD /d 60 /f", "warn", "60с до сброса GPU при зависании — может выглядеть как зависание системы.", "nvidia", "60с — долго. Если GPU завис, система будет ждать минуту."],
      ["NVIDIA Low Latency ON", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v LowLatencyMode /t REG_DWORD /d 1 /f", "safe", "Включает NVIDIA Low Latency Mode — меньше input lag.", "nvidia", "Для NVIDIA GPU. Снижает input lag."],
    ],
    "Сеть и ввод": [
      ["Nagle OFF (низкий пинг)", "Get-NetAdapter | ForEach-Object { $p = 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\' + $_.InterfaceGuid; if (Test-Path $p) { New-ItemProperty -Path $p -Name TcpAckFrequency -PropertyType DWord -Value 1 -Force | Out-Null; New-ItemProperty -Path $p -Name TCPNoDelay -PropertyType DWord -Value 1 -Force | Out-Null } }", "warn", "Отключает алгоритм Нэгла — ниже пинг, чуть больше пакетов.", null, "Влияет на ICMP-пинг. Для онлайн-игр — лучше."],
      ["MouseDataQueueSize = 10", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\mouclass\\Parameters' /v MouseDataQueueSize /t REG_DWORD /d 10 /f", "warn", "Минимальный буфер событий мыши — быстрее отклик.", "any", "Минимальный буфер — быстрее отклик, возможны пропуски."],
      ["Отключить Pointer Ballistics (1:1)", "$x = [byte[]]@(0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,192,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0); $y = [byte[]]@(0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,192,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0); Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name SmoothMouseXCurve -Value $x; Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name SmoothMouseYCurve -Value $y", "warn", "Линейная кривая 1:1 — полное убирание баллистикы.", null, "Требует ручной настройки кривой."],
      ["KeyboardDataQueueSize = 10", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\kbdclass\\Parameters' /v KeyboardDataQueueSize /t REG_DWORD /d 10 /f", "warn", "Минимальный буфер клавиатуры — быстрее отклик при быстром вводе.", null, "Быстрее отклик при быстром вводе."],
      ["Отключить USB Selective Suspend", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\USB\\DisableSelectiveSuspend' /v DisableSelectiveSuspend /t REG_DWORD /d 1 /f", "safe", "Запрещает Windows отключать USB-устройства для экономии — нет «проспавших» мышек/клавиатур.", null, "Убирает задержки пробуждения USB. Микроскопический расход батареи на ноутбуке."],
      ["Отключить DNS-клиент по запросу", "Disable-NetAdapterBinding -Name '*' -ComponentID ms_lltdio -ErrorAction SilentlyContinue", "safe", "Отключает LLDP/LLTD-протокол — снижает фоновый сетевой шум.", null, "Небольшое снижение сетевого трафика. На старых роутерах не требуется."],
    ],
    "Ядро": [
      ["Large Pages ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v LargePageMinimum /t REG_DWORD /d 0 /f", "safe", "Включает большие страницы памяти — быстрее работа БД и игр.", null, "Полезно для БД и игр. Требует включённой опции в групповых политиках."],
      ["GlobalTimerResolutionRequests ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v GlobalTimerResolutionRequests /t REG_DWORD /d 1 /f", "safe", "Глобальный запрос высокого timer resolution — стабильнее 0.5мс.", null, "Плавный ввод и меньше статтеров."],
      ["DistributeTimers ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v DistributeTimers /t REG_DWORD /d 1 /f", "safe", "Распределение таймеров по ядрам — снижает contention.", null, "Полезно на 8+ ядрах. На 4 ядрах — может быть нейтрально."],
      ["Driver Verifier OFF", "verifier /reset", "safe", "Отключает Driver Verifier — убирает проверку драйверов.", null, "Убирает проверку драйверов. Полезно после отладки."],
      ["Boot Timeout 3с", "bcdedit /timeout 3", "safe", "Короткое boot menu (3 сек) — быстрый старт без риска пропустить меню.", null, "Стандарт 30 сек. 3 сек — достаточно для входа в меню."],
      ["Legacy Boot Menu", "bcdedit /set bootmenupolicy Legacy", "safe", "Классическое boot menu — быстрее доступ к F8.", null, "Быстрее доступ к F8 при загрузке."],
    ],
    "Ультимативные кнопки": [
      ["Отключить UAC полностью", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v EnableLUA /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v PromptOnSecureDesktop /t REG_DWORD /d 0 /f", "danger", "Полностью убирает запросы UAC. Любая программа получает права админа без вопросов.", null, "ТОЛЬКО для опытных. Система и вирусы получат права администратора без предупреждений. Перезагрузка обязательна."],
      ["Отключить EPP (проц. приоритет электричества)", "powercfg /setacvalueindex scheme_current sub_processor PERFEPP 0; powercfg /setactive scheme_current", "safe", "CPU не экономит энергию при задаче частот — максимальный буст в играх.", null, "На десктопе с хорошим кулером — безопасно. Ноутбук будет жрать батарею."],
      ["Авторемонт системы (DISM + SFC)", "dism /online /Cleanup-Image /RestoreHealth; sfc /scannow", "safe", "Чинит файлы системы: DISM восстанавливает образ, SFC проверяет и чинит повреждённые файлы.", null, "Занимает 5-20 минут. Требует прав админа и интернет для загрузки компонентов (dism)."],
      ["Мега-пакет (8 ключевых оптимизаций)", "reg add 'HKLM\\System\\CurrentControlSet\\Control\\PriorityControl' /v Win32PrioritySeparation /t REG_DWORD /d 38 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v GlobalTimerResolutionRequests /t REG_DWORD /d 1 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' /v PowerThrottlingOff /t REG_DWORD /d 1 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v HwSchMode /t REG_DWORD /d 2 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f; reg add 'HKCU\\System\\GameConfigStore' /v GameDVR_Enabled /t REG_DWORD /d 0 /f; powercfg /duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 2>$null | Out-Null; powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61 2>$null", "warn", "Применяет сразу 8 ключевых настроек одной кнопкой: приоритеты, таймеры, HAGS, троттлинг, сеть, GameDVR и power plan.", null, "Вместо 8 команд вручную — один твик. Перезагрузка желательна."],
    ],
  },

  clean: {
    "Системные кэши": [
      ["Очистить Temp пользователя", "Remove-Item -Path $env:TEMP\\* -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Удаляет временные файлы пользователя.", null, "Первое запускайте — освободит много места. Можно запускать регулярно."],
      ["Очистить Temp Windows", "Remove-Item -Path 'C:\\Windows\\Temp\\*' -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает системную папку Temp.", null, "Безопасно, не влияет на работу программ."],
      ["Удалить Prefetch", "Remove-Item -Path 'C:\\Windows\\Prefetch\\*' -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Удаляет файлы предвыборки.", null, "Следующие 1-2 запуска программ будут чуть медленнее — система пересоздаёт кэш."],
      ["Сжатие WinSXS", "Dism /online /Cleanup-Image /StartComponentCleanup", "warn", "Очищает неиспользуемые компоненты. Без ResetBase — безопаснее для отката обновлений.", null, "Может освободить 1-5 ГБ. Не используйте ResetBase если планируете откат обновлений."],
      ["Очистить кэш Windows Update", "net stop wuauserv; net stop bits; Remove-Item -Path 'C:\\Windows\\SoftwareDistribution\\*' -Recurse -Force -ErrorAction SilentlyContinue; net start wuauserv; net start bits", "safe", "Удаляет кэш Windows Update.", null, "Если Windows Update завис — этот твик частично решает проблему."],
      ["Удалить Crash Dumps", "Remove-Item \"$env:LocalAppData\\CrashDumps\\*\" -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item 'C:\\Windows\\Minidump\\*' -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Удаляет дампы памяти при аварийных завершениях.", null, "Каждый дамп может занимать сотни МБ. Безопасно удалять."],
      ["Удалить Windows.old", "Remove-Item 'C:\\Windows.old' -Recurse -Force -ErrorAction SilentlyContinue", "warn", "Удаляет папку старой Windows (освобождает 10-30 ГБ).", null, "Освобождает 10-30 ГБ. Откат к предыдущей версии Windows станет невозможен."],
    ],
    "Кэши приложений": [
      ["Очистить кэш NVIDIA", "Get-ChildItem -Path \"$env:LocalAppData\\NVIDIA\\DXCache\",\"$env:LocalAppData\\NVIDIA\\GLCache\" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш шейдеров NVIDIA.", null, "При первом запуске игры будет микро-фриз при компиляции шейдеров."],
      ["Очистить кэш AMD", "Remove-Item -Path \"$env:LocalAppData\\AMD\\DxCache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш шейдеров AMD.", null, "Шейдеры будут пересозданы при следующем запуске игр."],
      ["Очистить DirectX Shader Cache", "Remove-Item \"$env:LocalAppData\\D3DSCache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш шейдеров DirectX.", null, "Помогает при артефактах в играх."],
      ["Очистить кэш Steam", "Remove-Item \"${env:ProgramFiles(x86)}\\Steam\\appcache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш Steam.", null, "Безопасно, ничего не удалится из библиотеки."],
      ["Очистить кэш Epic Games", "Remove-Item \"$env:LocalAppData\\EpicGamesLauncher\\Saved\\webcache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает webcache Epic Games.", null, "Безопасно, не влияет на установленные игры."],
      ["Очистить кэш Discord", "Remove-Item \"$env:AppData\\discord\\Cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item \"$env:AppData\\discord\\Code Cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит весь кэш Discord.", null, "Discord перезагрузит кэш автоматически при следующем запуске."],
      ["Очистить кэш Spotify", "Remove-Item \"$env:LocalAppData\\Spotify\\Storage\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит локальный кэш Spotify.", null, "Не удалит скачанные песни — только локальный кэш."],
      ["Очистить кэш Edge", "Remove-Item \"$env:LocalAppData\\Microsoft\\Edge\\User Data\\Default\\Cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит кэш Microsoft Edge.", null, "Браузер пересоздаст кэш автоматически."],
      ["Очистить кэш Chrome", "Remove-Item \"$env:LocalAppData\\Google\\Chrome\\User Data\\Default\\Cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит кэш Google Chrome.", null, "Браузер пересоздаст кэш автоматически."],
      ["Очистить Java кэш", "Remove-Item \"$env:LocalAppData\\Sun\\Java\\Deployment\\cache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Чистит кэш Java Runtime.", null, "Полезно если Java-приложения глючат."],
      ["Сбросить Microsoft Store", "Start-Process wsreset.exe", "safe", "Сбрасывает кэш Microsoft Store.", null, "Помогает при ошибках загрузки приложений из Store."],
    ],
    "Журналы и прочее": [
      ["Сброс DNS + Winsock", "ipconfig /flushdns; netsh winsock reset", "safe", "Сбрасывает сетевые кэши и сокеты.", null, "Полезно при проблемах с доступом к сайтам. Перезагрузка обязательна."],
      ["Очистить все журналы Windows", "wevtutil el | ForEach-Object { wevtutil cl $_ 2>$null }", "safe", "Удаляет все логи Event Viewer.", null, "Полезно перед продажей/передачей ПК."],
      ["Очистить Корзину", "Clear-RecycleBin -Force -ErrorAction SilentlyContinue", "safe", "Полностью очищает корзину.", null, "Убедитесь, что не нужного в корзине — отменить нельзя."],
      ["Очистить кэш иконок", "Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue; Remove-Item \"$env:LocalAppData\\IconCache.db\" -Force -ErrorAction SilentlyContinue; Remove-Item \"$env:LocalAppData\\Microsoft\\Windows\\Explorer\\iconcache*\" -Force -ErrorAction SilentlyContinue; Start-Process explorer", "safe", "Перестраивает кэш иконок и перезапускает Explorer.", null, "Explorer мигнёт. Кэш иконок пересоздастся автоматически."],
      ["Удалить старые точки восстановления", "vssadmin delete shadows /for=C: /oldest /quiet", "warn", "Удаляет самую старую точку восстановления.", null, "Удаляет только самую старую точку. Остальные сохраняются."],
      ["Очистить Recent Files", "Remove-Item \"$env:AppData\\Microsoft\\Windows\\Recent\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Удаляет список недавних документов.", null, "Список недавних файлов в проводнике станет пустым."],
      ["Очистить Thumbnails", "Remove-Item \"$env:LocalAppData\\Microsoft\\Windows\\Explorer\\thumbcache_*.db\" -Force -ErrorAction SilentlyContinue", "safe", "Удаляет кэш миниатюр проводника.", null, "Проводник будет первое время генерировать превью заново."],
      ["Disk Cleanup (sageset)", "cleanmgr /sagerun:1", "safe", "Запускает встроенную очистку диска.", null, "Запускает встроенную утилиту Windows для глубокой очистки."],
    ],
  },

  cpu: {
    "Питание и производительность": [
      ["High Performance план", "powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c", "safe", "Высокая производительность. Хороший баланс скорости и энергии.", null, "Хороший баланс для большинства десктопов."],
      ["AMD Ryzen Power Plans", "powercfg -duplicatescheme 9935e61f-1661-40c5-ae2f-8495027d5d5d 2>$null; powercfg /setactive 9935e61f-1661-40c5-ae2f-8495027d5d5d 2>$null", "safe", "Оптимальный план питания для AMD Ryzen процессоров.", "amd", "Оптимальный план для AMD Ryzen. Если не установился — Ryzen изначально использует баланс."],
      ["Fast Startup OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power' /v HiberbootEnabled /t REG_DWORD /d 0 /f", "safe", "Чистая загрузка Windows каждое включение.", null, "Загрузка станет медленнее на 5-10 сек, но система стабильнее."],
    ],
  },

  ram: {
    "Службы памяти": [
      ["Отключить Hibernation", "powercfg /hibernate off", "safe", "Удаляет hiberfil.sys — освобождает место на диске.", null, "Освобождает место = объём RAM."],
    ],
    "Оптимизация памяти": [
      ["RAM Priority = Games", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v Priority /t REG_DWORD /d 8 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'GPU Priority' /t REG_DWORD /d 8 /f", "safe", "Максимальный приоритет выделения RAM для игровых процессов + приоритет видеокарте.", null, "Игры получают RAM и GPU в первую очередь."],
      ["ClearPageFileAtShutdown OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v ClearPageFileAtShutdown /t REG_DWORD /d 0 /f", "safe", "Быстрее завершение работы — не очищает pagefile.", null, "Ускоряет выключение на 10-30 сек."],
    ],
  },

  gpu: {
    "Общие настройки": [
      ["Включить HAGS", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v HwSchMode /t REG_DWORD /d 2 /f", "safe", "Hardware-Accelerated GPU Scheduling — GPU сам планирует задачи.", null, "Требует Windows 10 2004+ и совместимый драйвер."],
      ["Включить VRR", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v EnableVariableRefreshRate /t REG_DWORD /d 1 /f", "safe", "Variable Refresh Rate — убирает разрывы на FreeSync/G-Sync мониторах.", null, "Требует FreeSync/G-Sync монитор и совместимый GPU."],
      ["GPU Priority = 8", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'GPU Priority' /t REG_DWORD /d 8 /f", "safe", "Максимальный приоритет GPU для игровых процессов.", null, "Безопасно, влияет только на Games SystemProfile."],
      ["DWM Optimization", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\DWM' /v OverlayTestMode /t REG_DWORD /d 5 /f", "safe", "Оптимизация Desktop Window Manager — меньше overhead при переключении окон.", null, "Убирает лишние оверлеи DWM."],
      ["Flip Model Swapchain ON", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v FlipModelSwapchain /t REG_DWORD /d 1 /f", "safe", "Принудительный flip model — быстрее рендеринг в играх.", null, "Включает более эффективную модель presentation."],
      ["DirectX Optimizations", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX\\UserGpuPreferences' /v DirectXUserGlobalSettings /t REG_SZ /d 'SwapEffectUpgradeEnable=1;' /f", "safe", "Включает оптимизации DirectX для swap chain.", null, "Улучшает работу swap chain в играх."],
      ["Включить Game Bar Tips", "reg add 'HKCU\\Software\\Microsoft\\GameBar' /v ShowStartupPanel /t REG_DWORD /d 0 /f", "safe", "Убирает всплывающую панель Game Bar при запуске игры.", null, "Убирает всплывающую панель при запуске игры."],
      ["Resolution Host OFF", "schtasks /change /tn 'Microsoft\\Windows\\WDI\\ResolutionHost' /disable 2>$null", "safe", "Отключает фоновую задачу разрешения дисплея.", null, "Безопасно, не влияет на играет."],
    ],
"NVIDIA": [
      ["NVIDIA Threaded Optimization ON", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v ThreadedOptimization /t REG_DWORD /d 1 /f", "safe", "Многопоточная оптимизация NVIDIA — распараллеливание на несколько ядер GPU.", "nvidia", "Для NVIDIA GPU. Распараллеливает на несколько ядер."],
    ],
    "AMD": [
      ["AMD ULPS OFF", "Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*' -Name EnableUlps -ErrorAction SilentlyContinue | ForEach-Object { Set-ItemProperty $_.PSPath -Name EnableUlps -Value 0 }", "safe", "Отключает Ultra Low Power State — GPU не засыпает и не тормозит при пробуждении.", "amd", "Для AMD GPU. Убирает задержки при пробуждении."],
    ],
  },

  net: {
    "DNS": [
      ["DNS Cloudflare 1.1.1.1", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('1.1.1.1','1.0.0.1') -ErrorAction SilentlyContinue", "safe", "Самый быстрый публичный DNS.", null, "Самый быстрый публичный DNS."],
      ["DNS Google 8.8.8.8", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('8.8.8.8','8.8.4.4') -ErrorAction SilentlyContinue", "safe", "DNS от Google — стабильный и надёжный.", null, "Стабильный и проверенный DNS."],
      ["DNS AdGuard (без рекламы)", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('94.140.14.14','94.140.15.15') -ErrorAction SilentlyContinue", "safe", "DNS с блокировкой рекламы на уровне DNS.", null, "Блокирует рекламу на уровне DNS."],
      ["DNS Quad9 (защита)", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('9.9.9.9','149.112.112.112') -ErrorAction SilentlyContinue", "safe", "DNS с блокировкой вредоносных сайтов.", null, "Блокирует вредоносные сайты."],
      ["DNS over HTTPS Cloudflare", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Dnscache\\Parameters' /v EnableAutoDOH /t REG_DWORD /d 2 /f", "safe", "Шифрует DNS-запросы через HTTPS.", null, "Шифрует DNS-запросы. Требует Windows 10 1903+."],
    ],
    "TCP / Протокол": [
      ["TCP BBR", "netsh int tcp set supplemental Internet congestionprovider=bbr2 2>$null; netsh int tcp set global congestionprovider=bbr 2>$null", "safe", "Современный алгоритм контроля перегрузки — быстрее загрузки.", null, "Современный контроль перегрузки. Ускоряет загрузки."],
      ["TCP Fast Open ON", "netsh int tcp set global fastopen=enabled", "safe", "Ускоряет повторные TCP-соединения.", null, "Ускоряет повторные TCP-соединения."],
      ["TCP Initial RTO 2000ms", "netsh int tcp set global initialRto=2000", "safe", "Быстрее повторная передача при потерях пакетов.", null, "Быстрее повторная передача при потерях."],
      ["TCP Auto-Tuning Normal", "netsh int tcp set global autotuninglevel=normal", "safe", "Авто-настройка TCP receive window.", null, "Оптимально для большинства сетей."],
      ["ECN Capability ON", "netsh int tcp set global ecncapability=enabled", "warn", "Explicit Congestion Notification — уведомляет о перегрузке раньше.", null, "Некоторые ISP не поддерживают. Тогда не действует."],
    ],
    "Сетевой адаптер": [
      ["Network Throttling OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f", "safe", "Снимает лимит сетевого трафика — без искусственного троттлинга.", null, "Рекомендуется для стриминга и онлайн-игр."],
      ["Wi-Fi Power Saving OFF", "powercfg /setacvalueindex SCHEME_CURRENT 19cbb8fa-5279-450e-9fac-8a3d5fedd0c1 12bbebe6-58d6-4636-95bb-3217ef867c1a 0; powercfg /setdcvalueindex SCHEME_CURRENT 19cbb8fa-5279-450e-9fac-8a3d5fedd0c1 12bbebe6-58d6-4636-95bb-3217ef867c1a 0; powercfg /setactive SCHEME_CURRENT", "safe", "Wi-Fi адаптер = Maximum Performance — не засыпаёт.", null, "Для Wi-Fi адаптеров — максимальная производительность."],
      ["QoS Packet Scheduler OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Psched' /v NonBestEffortLimit /t REG_DWORD /d 0 /f", "safe", "Снимает 20% лимит QoS — весь канал доступен.", null, "Снимает 20% лимит QoS. Весь канал доступен."],
      ["MaxUserPort 65534", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v MaxUserPort /t REG_DWORD /d 65534 /f", "safe", "Максимум доступных TCP-портов.", null, "Стандарт 5000 — мало для торентов/стриминга."],
      ["TcpTimedWaitDelay 30s", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f", "safe", "Быстрее освобождение портов после закрытия соединения.", null, "Стандарт 120с — пережиток. 30с безопасно."],
    ],
    "Сброс": [
      ["Reset TCP/IP Stack", "netsh int ip reset; netsh winsock reset", "warn", "Полный сброс сетевого стека — теряются VPN, статические IP, кастомные настройки.", null, "Потеряются VPN, статические IP, кастомные настройки. Требуется ребут."],
    ],
  },

  input: {
    "Мышь": [
      ["Отключить Enhance Pointer Precision", "Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name MouseSpeed -Value 0; Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name MouseThreshold1 -Value 0; Set-ItemProperty -Path 'HKCU:\\Control Panel\\Mouse' -Name MouseThreshold2 -Value 0", "safe", "Убирает ускорение курсора — идеально 1:1 для шутеров.", "any", "Для FPS-игр — обязательно. Мышь = 1:1 с физическим движением."],
    ],
    "Клавиатура": [
      ["Keyboard Delay/Speed = MAX", "reg add 'HKCU\\Control Panel\\Keyboard' /v KeyboardDelay /t REG_SZ /d 0 /f; reg add 'HKCU\\Control Panel\\Keyboard' /v KeyboardSpeed /t REG_SZ /d 31 /f", "safe", "Нулевая задержка + максимальная скорость повтора клавиш.", null, "Нулевая задержка + максимальная скорость повтора."],
      ["FilterKeys: идеал (Kalash)", "reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v AutoRepeatDelay /t REG_DWORD /d 150 /f; reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v AutoRepeatRate /t REG_DWORD /d 25 /f; reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v BounceTime /t REG_DWORD /d 0 /f; reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v DelayBeforeAcceptance /t REG_DWORD /d 0 /f; reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v Flags /t REG_DWORD /d 3 /f", "safe", "FilterKeys: задержка повтора 150 мс, скорость 25 мс (40 пов/сек), игнор быстрых кликов выкл. Тот же режим, что в FilterKeysSetter.", null, "Вступает в силу после повторного входа. Отдельный профиль, не мешает 'FilterKeys OFF'."],
    ],
    "USB": [
      ["USB Selective Suspend OFF", "powercfg /setacvalueindex scheme_current 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0; powercfg /setactive scheme_current", "safe", "USB-порты не засыпают — мышь и клавиатура не тормозят.", null, "USB-порты не засыпают. Мышь и клавиатура не тормозят."],
    ],
  },

  disk: {
    "TRIM и оптимизация": [
      ["Включить TRIM", "fsutil behavior set DisableDeleteNotify 0", "safe", "Включает TRIM для SSD — поддерживает производительность записи.", null, "Критично для SSD. Без TRIM скорость записи падает."],
      ["TRIM сейчас (все диски)", "Get-Volume | Where-Object { $_.DriveType -eq 'Fixed' -and $_.DriveLetter } | ForEach-Object { Optimize-Volume -DriveLetter $_.DriveLetter -ReTrim -ErrorAction SilentlyContinue }", "safe", "Запускает TRIM немедленно на всех SSD.", null, "Запускает TRIM немедленно. Можно запускать раз в неделю."],
      ["Last Access Time OFF", "fsutil behavior set disablelastaccess 1", "safe", "Убирает запись времени доступа — ускоряет операции с файлами.", null, "Некоторые роботы-архиваторы могут полагаться на это."],
      ["8dot3 Names OFF", "fsutil behavior set disable8dot3 1", "safe", "Отключает короткие имена 8.3 — меньше overhead на SSD.", null, "Безопасно. Меньше overhead на SSD."],
    ],
    "Кэширование и запись": [
      ["Write-Cache ON (все диски)", "Get-WmiObject -Class Win32_DiskDrive | ForEach-Object { $_.SetPowerState(4, $null) } 2>$null; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\disk\\Enum' /v 0 /t REG_SZ /f 2>$null", "safe", "Включает кэширование записи — ускоряет запись на SSD.", null, "Ускоряет запись, но при аварийном выключении данные могут потеряться."],
      ["Write-Cache Buffering ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0001\\Parameters\\Disk' /v WriteCacheEnabled /t REG_SZ /d 1 /f", "safe", "Включает буферизацию записи для SSD.", null, "Буферизация записи для SSD."],
    ],
    "Отключение функций": [
      ["Defrag по расписанию OFF", "Disable-ScheduledTask -TaskName 'ScheduledDefrag' -TaskPath '\\Microsoft\\Windows\\Defrag\\' -ErrorAction SilentlyContinue", "safe", "Отключает фоновую дефрагментацию — не нужна для SSD.", null, "Не нужна для SSD. HDD — можно оставить."],
      ["Storage Sense OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\StorageSense\\Parameters\\StoragePolicy' /v 01 /t REG_DWORD /d 0 /f", "safe", "Отключает авт. очистку Storage Sense.", null, "Отключает авт. очистку. Управляйте вручную."],
      ["Search Indexing OFF", "Stop-Service WSearch -ErrorAction SilentlyContinue; Set-Service WSearch -StartupType Disabled", "safe", "Отключает индексацию поиска — меньше чтение диска.", null, "Поиск Windows будет медленнее, но меньше нагрузка на диск."],
      ["ReadyBoost OFF", "sc config rdyboost start= disabled 2>$null", "safe", "Отключает ReadyBoost — не нужен для SSD.", null, "Не нужен для SSD. ReadyBoost — для HDD."],
      ["File History OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\FileHistory' /v Disabled /t REG_DWORD /d 1 /f", "safe", "Отключает историю файлов — меньше записи на диск.", null, "Меньше записи на диск. Отключается также из 'Восстановление'."],
      ["Defrag для SSD OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Defrag\\OptimizeApp' /v Enabled /t REG_DWORD /d 0 /f", "safe", "Отключает автоматическую оптимизацию для SSD — предотвращает лишние записи.", null, "Предотвращает лишние записи на SSD."],
      ["Windows Search для SSD OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows Search' /v DisableSearchBoxSuggestions /t REG_DWORD /d 1 /f", "safe", "Отключает подсказки поиска — меньше нагрузка на SSD.", null, "Меньше нагрузка на SSD."],
    ],
    "Энергопотребление": [
      ["Диски не засыпают", "powercfg /setacvalueindex scheme_current sub_disk DISKIDLE 0; powercfg /setactive scheme_current", "safe", "Жёсткие диски и SSD не засыпают в простое — мгновенный доступ.", null, "Для десктопов — ок. На ноутбуках — лишний шум."],
      ["AHCI Link Power OFF", "powercfg /setacvalueindex scheme_current sub_DISKSTORABLE 0; powercfg /setactive scheme_current", "safe", "Отключает энергосберегающий режим AHCI — убирает задержки пробуждения SSD.", null, "SSD быстрее откликается после простоя."],
      ["Hibernate Size = 50%", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power' /v HibernateFileSizePercent /t REG_DWORD /d 50 /f", "safe", "Уменьшает файл гибернации до 50% от RAM — экономит место на SSD.", null, "Экономит место. Гибернация будет неполной."],
    ],
    "Производительность": [
      ["NTFS Memory Usage = High", "fsutil behavior set memoryusage 2", "safe", "Больше оперативной памяти под NTFS-кэш — ускоряет чтение.", null, "Больше оперативной памяти под NTFS-кэш."],
      ["Long Paths > 260 ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\FileSystem' /v LongPathsEnabled /t REG_DWORD /d 1 /f", "safe", "Поддержка длинных путей > 260 символов.", null, "Поддержка длинных путей. Полезно для разработчиков."],
      ["Pagefile = SSD-оптимизация", "wmic pagefileset where name='C:\\pagefile.sys' set InitialSize=4096,MaximumSize=8192", "warn", "Фиксирует pagefile 4-8 ГБ — предотвращает фрагментацию на SSD.", null, "Фиксирует pagefile. Предотвращает фрагментацию."],
      ["NTFS Last Access Timestamp OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\FileSystem' /v NtfsDisableLastAccessUpdate /t REG_DWORD /d 1 /f", "safe", "Отключает обновление метки времени последнего доступа — меньше записей на SSD.", null, "Убирает лишние записи на SSD при обращении к файлам."],
    ],
  },

  priv: {
    "Телеметрия Microsoft": [
      ["Отключить телеметрию", "Stop-Service DiagTrack -ErrorAction SilentlyContinue; Set-Service DiagTrack -StartupType Disabled; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection' /v AllowTelemetry /t REG_DWORD /d 0 /f", "safe", "Полностью отключает сбор данных Microsoft.", null, "Windows перестаёт собирать данные. Функции не пострадают."],
      ["Cortana OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search' /v AllowCortana /t REG_DWORD /d 0 /f", "safe", "Отключает Cortana.", null, "Поиск продолжит работать — отключается только голосовой помощник."],
      ["Activity History OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v EnableActivityFeed /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v PublishUserActivities /t REG_DWORD /d 0 /f", "safe", "Отключает историю активности.", null, "Таймлайн (Win+Tab) перестанет показывать недавние действия."],
      ["Connected User Experiences OFF", "Stop-Service dmwappushservice -ErrorAction SilentlyContinue; Set-Service dmwappushservice -StartupType Disabled", "safe", "Отключает канал телеметрии dmwappushservice.", null, "Отключает канал телеметрии dmwappushservice."],
      ["Customer Experience tasks OFF", "schtasks /change /tn 'Microsoft\\Windows\\Customer Experience Improvement Program\\Consolidator' /disable 2>$null; schtasks /change /tn 'Microsoft\\Windows\\Customer Experience Improvement Program\\UsbCeip' /disable 2>$null; schtasks /change /tn 'Microsoft\\Windows\\Customer Experience Improvement Program\\KernelCeipTask' /disable 2>$null", "safe", "Отключает задачи CEIP — сбор данных об использовании.", null, "Больше никаких фоновых задач CEIP."],
      ["CompatTelRunner OFF", "schtasks /change /tn 'Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser' /disable 2>$null; schtasks /change /tn 'Microsoft\\Windows\\Application Experience\\ProgramDataUpdater' /disable 2>$null", "safe", "Отключает проверку совместимости при обновлении.", null, "Отключает проверку совместимости при обновлении."],
      ["Biometric Service OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Biometrics' /v Enabled /t REG_DWORD /d 0 /f; Stop-Service WbioSrvc -ErrorAction SilentlyContinue; Set-Service WbioSrvc -StartupType Disabled", "safe", "Отключает биометрические сервисы.", null, "Для ПК без сканера отпечатков. Не влияет на вход по паролю."],
      ["Office Telemetry OFF", "reg add 'HKCU\\SOFTWARE\\Policies\\Microsoft\\Office\\16.0\\Common\\ClientTelemetry' /v DisableTelemetry /t REG_DWORD /d 1 /f", "safe", "Отключает телеметрию Microsoft Office.", null, "Office перестанет отправлять данные об использовании."],
    ],
    "Реклама и контент": [
      ["Advertising ID OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo' /v Enabled /t REG_DWORD /d 0 /f", "safe", "Отключает рекламный идентификатор.", null, "Реклама не исчезнет полностью, но персонализация отключится."],
      ["Suggested Apps OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SystemPaneSuggestionsEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SubscribedContent-338388Enabled /t REG_DWORD /d 0 /f", "safe", "Убирает рекомендации в меню Пуск.", null, "Меню Пуск станет чище."],
      ["Cloud Content OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v PreInstalledAppsEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SilentInstalledAppsEnabled /t REG_DWORD /d 0 /f", "safe", "Отключает облачный контент и авт. установку приложений.", null, "Windows перестанет ставить Candy Crush и подобное."],
      ["Tips/Tricks OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SoftLandingEnabled /t REG_DWORD /d 0 /f", "safe", "Убирает подсказки Windows.", null, "Больше никаких всплывающих советов."],
      ["Реклама в Settings OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SubscribedContent-338393Enabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SubscribedContent-353694Enabled /t REG_DWORD /d 0 /f", "safe", "Убирает рекламу в параметрах Windows.", null, "Параметры Windows без рекламы."],
      ["Реклама на Lock Screen OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Lock Screen' /v RotatingLockScreenOverlayEnabled /t REG_DWORD /d 0 /f", "safe", "Убирает рекламу на экране блокировки.", null, "Убирает обои с рекламой на экране блокировки."],
      ["Bing в Search OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search' /v BingSearchEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search' /v CortanaConsent /t REG_DWORD /d 0 /f", "safe", "Убирает результаты Bing из локального поиска.", null, "Поиск в меню Пуск покажет только файлы."],
      ["Location Tracking OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location' /v Value /t REG_SZ /d Deny /f", "safe", "Отключает геолокацию.", null, "Карты потеряют геолокацию. Включите вручную при необходимости."],
      ["Feedback OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Siuf\\Rules' /v NumberOfSIUFInPeriod /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection' /v DoNotShowFeedbackNotifications /t REG_DWORD /d 1 /f", "safe", "Убирает запросы обратной связи от Microsoft.", null, "Больше никаких окон «Поделитесь мнением»."],
    ],
    "Службы и компоненты": [
      ["Edge Background OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v StartupBoostEnabled /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v BackgroundModeEnabled /t REG_DWORD /d 0 /f", "safe", "Edge не запускается в фоне.", null, "Экономия 200-400 МБ RAM."],
      ["Speech Recognition OFF", "reg add 'HKCU\\Software\\Microsoft\\Speech_OneCore\\Settings\\OnlineSpeechPrivacy' /v HasAccepted /t REG_DWORD /d 0 /f", "safe", "Отключает распознавание речи.", null, "Диктовка (Win+H) потеряет точность."],
      ["Inking Learning OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\InputPersonalization' /v RestrictImplicitInkCollection /t REG_DWORD /d 1 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\InputPersonalization' /v RestrictImplicitTextCollection /t REG_DWORD /d 1 /f", "safe", "Отключает сбор данных для обучения ввода.", null, "Данные не отправляются для обучения ввода."],
      ["Sync Settings OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\SettingSync' /v DisableSettingSync /t REG_DWORD /d 2 /f", "safe", "Без синхронизации настроек через Microsoft Account.", null, "Настройки не синхронизируются через Microsoft Account."],
    ],
    "Брандмауэр": [
      ["Блок SMB/RPC портов (входящие)", "@(69,135,137,138,139,445,1025,4444,5000) | ForEach-Object { netsh advfirewall firewall delete rule name=(\"KALASH_Block_TCP-\"+$_) 2>$null; netsh advfirewall firewall add rule name=(\"KALASH_Block_TCP-\"+$_) dir=in action=block protocol=tcp localport=$_ enable=yes 2>$null }; 'OK'", "warn", "Блокирует входящие по портам NetBIOS (135,137-139), SMB (445), RPC (1025), Metasploit (4444), TFTP (69), UPnP (5000).", null, "Общие папки/WSL/UPnP-медиа по сети могут перестать работать. Повторный запуск не дублирует правила."],
    ],
    "Hosts-блокировка": [
      ["Hosts: телеметрия MS (системная)", "$h=Join-Path $env:WINDIR 'System32\\drivers\\etc\\hosts'; @('vortex.data.microsoft.com','vortex-win.data.microsoft.com','telemetry.microsoft.com','watson.telemetry.microsoft.com','watson.ppe.telemetry.microsoft.com','oca.telemetry.microsoft.com','sqm.telemetry.microsoft.com','sqm.df.telemetry.microsoft.com','wes.df.telemetry.microsoft.com','reports.wes.df.telemetry.microsoft.com','settings-win.data.microsoft.com','settings.data.microsoft.com','v10.vortex-win.data.microsoft.com','diagtrack-ppt.microsoft.com','diagtrack.microsoft.com','wustats.microsoft.com','statsfe2.ws.microsoft.com','statsfe1.ws.microsoft.com','telemetry.urs.microsoft.com','fe3.delivery.mp.microsoft.com','vortex-bn2.metron.live.com.nsatc.net') | ForEach-Object { if (-not (Select-String -Path $h -Pattern $_ -SimpleMatch -Quiet)) { Add-Content -Path $h -Value ('0.0.0.0 '+$_) } }; 'OK'", "warn", "Добавляет ~20 доменов телеметрии Microsoft в hosts на 0.0.0.0 (безопасный список, без msftncsi и login.live.com).", null, "Повторный запуск не дублирует строки. Чтобы откатить — удалите строки из C:\\Windows\\System32\\drivers\\etc\\hosts."],
    ],
    "Доступы приложений (ConsentStore)": [
      ["Аккаунт (учётная запись) OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\userAccountInformation' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает доступ приложений к данным учётной записи.", null, "Панель учётных записей Windows не пострадает, приложения не увидят данные профиля."],
      ["Библиотека видео OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\videosLibrary' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к видеобиблиотеке.", null, "Кинотеатр и медиа-приложения без доступа к видео."],
      ["Библиотека изображений OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\picturesLibrary' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к библиотеке изображений.", null, "Фото и галереи без доступа к изображениям."],
      ["Библиотека документов OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\documentsLibrary' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к библиотеке документов.", null, "Приложения не увидят документы без вашего выбора."],
      ["Диагностика приложений OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\appDiagnostics' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям читать диагностические данные других приложений.", null, "Полезно от приватности — приложения не следят за другими."],
      ["Задачи (userDataTasks) OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\userDataTasks' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к задачам пользователя.", null, "Список задач не будет виден приложениям."],
      ["Календарь OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\appointments' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к календарю.", null, "Календарь Windows не затронут — ограничение для приложений."],
      ["Камера OFF (ConsentStore)", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\webcam' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает доступ к камере на уровне параметров приватности.", null, "Дополняет политику LetAppsAccessCamera — работает для Win32-приложений тоже."],
      ["Контакты OFF (ConsentStore)", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\contacts' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к контактам.", null, "Дополняет политику LetAppsAccessContacts."],
      ["Сообщения (chat) OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\chat' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к обмену сообщениями.", null, "Мессенджеры от Microsoft не увидят SMS/чат."],
      ["Папка загрузок OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\downloadsFolder' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к папке загрузок.", null, "Приложения не увидят Downloads без вашего выбора."],
      ["Радио OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\radios' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям управлять Wi-Fi/Bluetooth радио.", null, "Wi-Fi/Bluetooth продолжат работать — меняется только доступ приложений."],
      ["Телефонные звонки OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\phoneCall' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям звонить по телефону.", null, "Для ПК без модема — просто гигиена."],
      ["Уведомления OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\userNotificationListener' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям слушать уведомления системы.", null, "Приложения не будут читать ваши уведомления."],
      ["Файловая система OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\broadFileSystemAccess' /v Value /t REG_SZ /d Deny /f", "warn", "Запрещает широкий доступ приложений к файловой системе.", null, "Некоторые Win32/UWP-приложения могут требовать доступ вручную."],
      ["Почта OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\email' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям доступ к почте.", null, "Почта Outlook (Win32) не затронута."],
      ["Журнал вызовов OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\phoneCallHistory' /v Value /t REG_SZ /d Deny /f", "safe", "Запрещает приложениям читать журнал вызовов.", null, "Для ПК — гигиена приватности."],
    ],
    "Доп. телеметрия (реестр)": [
      ["Трекинг запусков OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v Start_TrackProgs /t REG_DWORD /d 0 /f", "safe", "Отключает отслеживание запусков приложений для рекомендаций.", null, "Меню Пуск не будет собирать статистику запусков."],
      ["Языковой трекинг OFF", "reg add 'HKCU\\Control Panel\\International\\User Profile' /v HttpAcceptLanguageOptOut /t REG_DWORD /d 1 /f", "safe", "Отключает отправку списка языков в HTTP-запросах (Accept-Language).", null, "Сайты перестанут получать информацию о языке системы."],
      ["Сбор контактов ввода OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\InputPersonalization\\TrainedDataStore' /v HarvestContacts /t REG_DWORD /d 0 /f", "safe", "Запрещает сбор контактов для обучения словаря ввода.", null, "Дополняет твик Inking Learning OFF."],
      ["Рекомендации контента OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SubscribedContent-353696Enabled /t REG_DWORD /d 0 /f", "safe", "Отключает рекомендуемое содержимое Windows.", null, "Дополняет блок рекламы в Параметрах."],
      ["Event Transcript OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Diagnostics\\DiagTrack\\EventTranscriptKey' /v EnableEventTranscript /t REG_DWORD /d 0 /f", "safe", "Отключает журнал событий телеметрии DiagTrack.", null, "Windows не ведёт транскрипт диагностических событий."],
      ["AppCompat AIT OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat' /v AITEnable /t REG_DWORD /d 0 /f", "safe", "Отключает сбор данных совместимости приложений (AIT).", null, "Дополняет отключение Appraiser и AitAgent."],
      ["Учёт приложений OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat' /v DisableInventory /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat' /v DisableUAR /t REG_DWORD /d 1 /f", "safe", "Отключает инвентаризацию приложений (DisableInventory) и анализ использования (DisableUAR).", null, "Microsoft не собирает список установленных приложений."],
      ["MOTW (SaveZoneInformation) ON", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Attachments' /v SaveZoneInformation /t REG_DWORD /d 1 /f", "safe", "Сохраняет метку зоны для скачанных файлов — защита от автозапуска.", null, "SmartScreen продолжит помечать файлы из интернета."],
      ["Automatic Maintenance OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Schedule\\Maintenance' /v MaintenanceDisabled /t REG_DWORD /d 1 /f", "warn", "Отключает автоматическое обслуживание Windows по расписанию.", null, "Остановит фоновую дефрагментацию/обновления по расписанию. Для SSD/гигиены — OK."],
      ["Камера на Lock Screen OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Personalization' /v NoLockScreenCamera /t REG_DWORD /d 1 /f", "safe", "Запрещает камеру на экране блокировки.", null, "Никто не будет видеть камеру на Lock Screen."],
      ["Рукописный ввод OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\TabletPC' /v PreventHandwritingDataSharing /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\HandwritingErrorReports' /v PreventHandwritingErrorReports /t REG_DWORD /d 1 /f", "safe", "Запрещает отправку данных рукописного ввода и отчётов об ошибках.", null, "Для планшетов/стилусов приватность важнее обучения."],
      ["Text Input Personalization (TIPC) OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Input\\TIPC' /v Enabled /t REG_DWORD /d 0 /f", "safe", "Отключает персонализацию текстового ввода.", null, "Словарь честности ввода не будет обучаться."],
      ["Геолокация: провайдер OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors' /v DisableWindowsLocationProvider /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors' /v DisableLocationScripting /t REG_DWORD /d 1 /f", "safe", "Отключает системный провайдер геолокации и скриптинговое определение.", null, "Дополняет DisableLocation — полный запрет определения местоположения."],
      ["UploadActivity OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v UploadUserActivities /t REG_DWORD /d 0 /f", "safe", "Запрещает выгрузку активности пользователя в облако.", null, "Дополняет Activity History OFF / PublishUserActivities."],
      ["AutoLogger DiagTrack OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\WMI\\AutoLogger\\AutoLogger-Diagtrack-Listener' /v Start /t REG_DWORD /d 0 /f", "safe", "Отключает автозапуск журнала телеметрии при загрузке.", null, "DiagTrack больше не ведёт журнал с загрузки системы."],
    ],
  },

  cust: {
    "Проводник": [
      ["Классическое меню Win11", "reg add 'HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32' /f /ve", "safe", "Возвращает классическое контекстное меню (без 'Ещё').", null, "Для возврата: удалите ключ реестра."],
      ["Показать расширения файлов", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v HideFileExt /t REG_DWORD /d 0 /f", "safe", "Показывает .txt, .exe и другие расширения.", null, "Помогает отличить document.txt от document.exe."],
      ["Показать скрытые файлы", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v Hidden /t REG_DWORD /d 1 /f", "safe", "Скрытые файлы и папки видны.", null, "Полезно для разработчиков и продвинутых пользователей."],
    ],
    "Анимации и внешний вид": [
      ["Задержка меню = 0", "reg add 'HKCU\\Control Panel\\Desktop' /v MenuShowDelay /t REG_SZ /d 0 /f", "safe", "Мгновенное открытие контекстных меню.", null, "Стандартная задержка 400мс — заметная. 0 — мгновенно."],
      ["Анимации окон OFF", "reg add 'HKCU\\Control Panel\\Desktop\\WindowMetrics' /v MinAnimate /t REG_SZ /d 0 /f", "safe", "Без анимаций сворачивания/разворачивания окон.", null, "Без анимаций сворачивания/разворачивания."],
      ["Visual Effects = Performance", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects' /v VisualFXSetting /t REG_DWORD /d 2 /f; reg add 'HKCU\\Control Panel\\Desktop' /v UserPreferencesMask /t REG_BINARY /d 901203801000000000000000 /f; reg add 'HKCU\\Control Panel\\Desktop\\WindowMetrics' /v MinAnimate /t REG_SZ /d 0 /f; Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue; Start-Process explorer", "safe", "Отключает все визуальные эффекты — максимум производительности. Применяется сразу.", null, "Экран мигнёт — explorer перезапустится."],
      ["Transparency OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v EnableTransparency /t REG_DWORD /d 0 /f", "safe", "Отключает прозрачность Windows — меньше нагрузка на GPU.", null, "Убирает акриловые/стеклянные эффекты."],
      ["Принудительный Dark Mode", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v AppsUseLightTheme /t REG_DWORD /d 0 /f; reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v SystemUsesLightTheme /t REG_DWORD /d 0 /f", "safe", "Ҹмная тема для приложений и системы.", null, "Уменьшает нагрузка на глаза ночью."],
    ],
    "Панель задач": [
      ["Widgets OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarDa /t REG_DWORD /d 0 /f", "safe", "Убирает виджеты с панели задач.", null, "Экономит 50-150 МБ RAM в фоне."],
      ["Chat в Taskbar OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarMn /t REG_DWORD /d 0 /f", "safe", "Убирает Teams Chat с панели задач.", null, "Teams (приложение) не затронется."],
      ["Snap Assist OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v SnapAssist /t REG_DWORD /d 0 /f", "safe", "Отключает помощник привязки окон.", null, "Привязка окон (Win+→/←) продолжает работать."],
      ["News and Interests OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Feeds' /v EnableFeeds /t REG_DWORD /d 0 /f", "safe", "Убирает виджет новостей.", null, "Убирает виджет новостей."],
      ["Search Box → иконка", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search' /v SearchboxTaskbarMode /t REG_DWORD /d 0 /f", "safe", "Компактная иконка поиска вместо широкого поля.", null, "3 варианта: 0=иконка, 1=поле, 2=большое поле."],
      ["Lock Screen Spotlight OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v RotatingLockScreenEnabled /t REG_DWORD /d 0 /f", "safe", "Убирает авто-смену обоев на экране блокировки.", null, "Убирает рекламные обои Microsoft."],
      ["Маленькие иконки taskbar", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarSmallIcons /t REG_DWORD /d 1 /f", "safe", "Компактная панель задач.", null, "1=маленькие, 0=большие. Маленькие иконки — больше места."],
      ["Taskbar Left Align (Win11)", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarAl /t REG_DWORD /d 0 /f", "safe", "Иконки панели задач слева как в Windows 10.", null, "0=лево, 1=центр. Классическое расположение."],
    ],
    "Прочее": [
      ["Startup Sound OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Authentication\\LogonUI\\BootAnimation' /v DisableStartupSound /t REG_DWORD /d 1 /f", "safe", "Без звука при загрузке Windows.", null, "Без звука при загрузке Windows."],
      ["Классический Volume Mixer", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\MTCUVC' /v EnableMtcUvc /t REG_DWORD /d 0 /f", "safe", "Возвращает классический микшер громкости.", null, "Возвращает старый вид микшера."],
      ["Sticky Keys hotkey OFF", "reg add 'HKCU\\Control Panel\\Accessibility\\StickyKeys' /v Flags /t REG_SZ /d 506 /f", "safe", "Отключает активацию по 5x Shift.", null, "Исправляет проблему случайной активации залипания."],
      ["NumLock ON при старте", "reg add 'HKU\\.DEFAULT\\Control Panel\\Keyboard' /v InitialKeyboardIndicators /t REG_SZ /d 2 /f", "safe", "NumLock включается автоматически.", null, "2=вкл, 0=выкл. Удобно для десктопов с нумпадом."],
    ],
  },

  nuke_security: {
    "Windows Defender": [
      ["Полный стоп Defender", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender' /v DisableAntiSpyware /t REG_DWORD /d 1 /f | Out-Null; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f | Out-Null; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\WinDefend' /v Start /t REG_DWORD /d 4 /f | Out-Null; $svc = Get-Service -Name WinDefend -ErrorAction SilentlyContinue; if ($svc) { Stop-Service WinDefend -Force -ErrorAction SilentlyContinue; Set-Service WinDefend -StartupType Disabled -ErrorAction SilentlyContinue }", "danger", "Полностью останавливает и отключает службу Windows Defender (реестр + служба).", null, "Полностью отключает защиту. Не рекомендуется."],
      ["Defender realtime OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f", "danger", "Отключает мониторинг в реальном времени — никакой проверки файлов.", null, "Никакой проверки файлов. Система уязвима."],
      ["Behavior Monitor OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableBehaviorMonitoring /t REG_DWORD /d 1 /f", "danger", "Отключает мониторинг поведения — вирусы-хитрости не ловятся.", null, "Вирусы-хитрости не ловятся."],
      ["IOAV Protection OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableIOAVProtection /t REG_DWORD /d 1 /f", "danger", "Отключает проверку скачиваемых файлов.", null, "Скачиваемые файлы не проверяются."],
      ["Script Scanning OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection' /v DisableScriptScanning /t REG_DWORD /d 1 /f", "danger", "Отключает сканирование скриптов (PowerShell, VBS, JS).", null, "PowerShell/VBS/JS-скрипты не сканируются."],
      ["Defender Cloud OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet' /v SubmitSamplesConsent /t REG_DWORD /d 2 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Spynet' /v SpynetNetTestingDisabled /t REG_DWORD /d 1 /f", "danger", "Отключает облачную проверку и отправку образцов.", null, "Нет облачной проверки и отправки образцов."],
      ["Defender Exclusion: C:\\", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows Defender\\Exclusions\\Paths' /v 'C:\\' /t REG_DWORD /d 0 /f | Out-Null; if (Get-Command Add-MpPreference -ErrorAction SilentlyContinue) { Add-MpPreference -ExclusionPath 'C:\\' -ErrorAction SilentlyContinue }", "danger", "Весь диск C:\\ исключён из проверки. Вирусы свободно работают.", null, "Весь диск C:\\ исключён из проверки."],
      ["Tamper Protection OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows Defender\\Features' /v TamperProtection /t REG_DWORD /d 0 /f", "danger", "Отключает защиту от изменений — можно менять любые настройки Defender.", null, "Можно менять любые настройки Defender."],
      ["Defender Scheduled Scan OFF", "schtasks /change /tn '\\Microsoft\\Windows\\Windows Defender\\Windows Defender Scheduled Scan' /disable 2>$null; schtasks /change /tn '\\Microsoft\\Windows\\Windows Defender\\Scheduled Scan' /disable 2>$null; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender' /v DisableScheduledScan /t REG_DWORD /d 1 /f | Out-Null", "danger", "Отключает запланированные сканирования.", null, "Нет запланированных сканирований."],
      ["Windows Security Center OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\wscsvc' /v Start /t REG_DWORD /d 4 /f | Out-Null; $svc = Get-Service -Name wscsvc -ErrorAction SilentlyContinue; if ($svc) { Stop-Service wscsvc -Force -ErrorAction SilentlyContinue; Set-Service wscsvc -StartupType Disabled -ErrorAction SilentlyContinue }", "danger", "Отключает центр безопасности — никаких уведомлений о проблемах.", null, "Никаких уведомлений о проблемах безопасности."],
    ],
    "Брандмауэр (Firewall)": [
      ["Firewall OFF (все профили)", "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False -ErrorAction SilentlyContinue", "danger", "Полностью отключает брандмауэр на всех профилях. Система открыта.", null, "Система полностью открыта. Не рекомендуется."],
      ["Firewall Domain OFF", "Set-NetFirewallProfile -Profile Domain -Enabled False -ErrorAction SilentlyContinue", "danger", "Отключает брандмауэр для доменной сети.", null, "Отключает для доменной сети."],
      ["Firewall Private OFF", "Set-NetFirewallProfile -Profile Private -Enabled False -ErrorAction SilentlyContinue", "danger", "Отключает брандмауэр для частной сети.", null, "Отключает для частной сети."],
      ["Firewall Public OFF", "Set-NetFirewallProfile -Profile Public -Enabled False -ErrorAction SilentlyContinue", "danger", "Отключает брандмауэр для публичной сети.", null, "Отключает для публичной сети."],
      ["Firewall Service OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\mpssvc' /v Start /t REG_DWORD /d 4 /f | Out-Null; $svc = Get-Service -Name mpssvc -ErrorAction SilentlyContinue; if ($svc) { Stop-Service mpssvc -Force -ErrorAction SilentlyContinue; Set-Service mpssvc -StartupType Disabled -ErrorAction SilentlyContinue }", "danger", "Полностью останавливает службу брандмауэра.", null, "Полностью останавливает службу."],
    ],
    "SmartScreen и защита приложений": [
      ["SmartScreen OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer' /v SmartScreenEnabled /t REG_SZ /d 'Off' /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v EnableSmartScreen /t REG_DWORD /d 0 /f", "danger", "Отключает SmartScreen — никакой проверки скачиваемых файлов.", null, "Никакой проверки скачиваемых файлов."],
      ["SmartScreen Store OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AppHost' /v EnableWebContentEvaluation /t REG_DWORD /d 0 /f", "danger", "Отключает проверку SmartScreen в Store и UWP-приложениях.", null, "Проверка в Store и UWP отключена."],
      ["Уведомления SmartScreen OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer' /v SmartScreenEnabled /t REG_SZ /d 'Off' /f", "danger", "Убирает предупреждения SmartScreen при запуске приложений.", null, "Предупреждения при запуске приложений убраны."],
      ["Exploit Protection OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\*' /v MitigationOptions /t REG_QWORD /d 0 /f | Out-Null; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\*' /v DisableExceptionChainValidation /t REG_DWORD /d 1 /f | Out-Null", "danger", "Отключает эксплойт-защиту для всех процессов (нужна перезагрузка).", null, "Нужна перезагрузка. Система уязвима к эксплойтам."],
    ],
    "Защита обновлений": [
      ["Windows Update OFF", "Stop-Service wuauserv -ErrorAction SilentlyContinue; Set-Service wuauserv -StartupType Disabled -ErrorAction SilentlyContinue; Stop-Service bits -ErrorAction SilentlyContinue; Set-Service bits -StartupType Disabled -ErrorAction SilentlyContinue", "danger", "Полностью отключает Windows Update. Никаких патчей безопасности.", null, "Никаких патчей безопасности. Критически опасно."],
      ["Delivery Optimization OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\DoSvc' /v Start /t REG_DWORD /d 4 /f | Out-Null; $svc = Get-Service -Name DoSvc -ErrorAction SilentlyContinue; if ($svc) { Stop-Service DoSvc -Force -ErrorAction SilentlyContinue; Set-Service DoSvc -StartupType Disabled -ErrorAction SilentlyContinue }", "danger", "Отключает раздачу обновлений другим компьютерам.", null, "Не раздаёт обновления другим ПК."],
      ["Update Medic OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\WaaSMedicSvc' /v Start /t REG_DWORD /d 4 /f | Out-Null; $svc = Get-Service -Name WaaSMedicSvc -ErrorAction SilentlyContinue; if ($svc) { Stop-Service WaaSMedicSvc -Force -ErrorAction SilentlyContinue; Set-Service WaaSMedicSvc -StartupType Disabled -ErrorAction SilentlyContinue }", "danger", "Отключает автоматическое восстановление обновлений.", null, "Нет автоматического восстановления обновлений."],
    ],
    "UAC и политики": [
      ["UAC OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v EnableLUA /t REG_DWORD /d 0 /f", "danger", "Полностью отключает UAC. Все приложения запускаются с правами админа без вопросов.", null, "Все приложения с правами админа. Критически опасно."],
      ["Admin Approval Mode OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v FilterAdministratorToken /t REG_DWORD /d 0 /f", "danger", "Отключает раздельные токены для встроенного админа.", null, "Отключает раздельные токены."],
      ["WDAC OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System' /v WDACOverride /t REG_DWORD /d 0 /f 2>$null", "danger", "Отключает Windows Defender Application Control.", null, "Отключает Application Control."],
    ],
    "Гипервизор и ядро": [
      ["VBS OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard' /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 0 /f", "danger", "Отключает VBS — убирает изоляцию ядра.", null, "Убирает изоляцию ядра. Немного повышает FPS."],
      ["HVCI OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity' /v Enabled /t REG_DWORD /d 0 /f", "danger", "Отключает HVCI — код не проверяется на целостность.", null, "Код не проверяется на целостность."],
      ["Credential Guard OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa' /v RunAsPPL /t REG_DWORD /d 0 /f", "danger", "Отключает защиту учётных данных — LSASS доступен для кражи.", null, "LSASS доступен для кражи учётных данных."],
      ["Spectre/Meltdown OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v FeatureSettingsOverride /t REG_DWORD /d 3 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v FeatureSettingsOverrideMask /t REG_DWORD /d 3 /f", "danger", "Отключает аппаратные митигации CPU.", null, "Отключает аппаратные митигации CPU. Немного повышает производительность."],
      ["DEP OFF", "bcdedit /set nx AlwaysOff 2>$null", "danger", "Отключает защиту выполнения данных — буферные переполнения работают.", null, "Буферные переполнения работают. Критически опасно."],
    ],
  },

  tools: {
    "Проверка системы": [
      ["SFC Scannow", "Start-Process cmd -ArgumentList '/k sfc /scannow'", "safe", "Проверка и восстановление системных файлов.", null, "Проверка и восстановление системных файлов. Занимает 10-30 мин."],
      ["DISM RestoreHealth", "Start-Process cmd -ArgumentList '/k dism /online /cleanup-image /restorehealth'", "safe", "Восстановление образа Windows из центра обновления.", null, "Восстановление образа Windows. Требует интернет."],
      ["CHKDSK C: /f /r", "Start-Process cmd -ArgumentList '/k chkdsk C: /f /r'", "warn", "Проверка диска на ошибки. Требует перезагрузки.", null, "Требует перезагрузки. Занимает 15-60 мин."],
      ["DISM Cleanup", "Start-Process cmd -ArgumentList '/k dism /online /cleanup-image /startcomponentcleanup'", "safe", "Очистка неиспользуемых компонентов Windows."],
      ["gpupdate /force", "Start-Process cmd -ArgumentList '/k gpupdate /force'", "safe", "Принудительное применение групповых политик."],
    ],
    "Сброс и перезапуск": [
      ["Сброс Winsock", "Start-Process cmd -ArgumentList '/k netsh winsock reset'", "safe", "Сброс сетевых сокетов."],
      ["Сброс TCP/IP", "Start-Process cmd -ArgumentList '/k netsh int ip reset'", "safe", "Сброс сетевого стека."],
      ["Сброс Windows Update", "Stop-Service wuauserv,bits,cryptsvc,msiserver -Force -ErrorAction SilentlyContinue; Remove-Item 'C:\\Windows\\SoftwareDistribution\\Download\\*' -Recurse -Force -ErrorAction SilentlyContinue; Start-Service wuauserv,bits,cryptsvc,msiserver -ErrorAction SilentlyContinue", "safe", "Очищает кэш загрузок Windows Update без удаления catroot2."],
      ["Сброс Microsoft Store", "wsreset.exe", "safe", "Сброс кэша Microsoft Store."],
      ["Перезапуск Explorer", "Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue; Start-Process explorer", "safe", "Быстрый перезапуск проводника."],
      ["Перезапуск Audio Service", "Restart-Service Audiosrv -Force; Restart-Service AudioEndpointBuilder -Force", "safe", "Решает проблемы со звуком."],
      ["Перезапуск Print Spooler", "Restart-Service Spooler -Force", "safe", "Решает зависший принтер."],
      ["Очистить Event Log", "wevtutil el | ForEach-Object { wevtutil cl $_ 2>$null }", "safe", "Очищает все журналы событий."],
    ],
    "Энергопотребление": [
      ["powercfg /energy", "Start-Process cmd -ArgumentList '/k powercfg /energy /output %temp%\\energy.html /duration 30'", "safe", "Анализ энергопотребления — отчёт на Desktop."],
      ["Battery Report", "Start-Process cmd -ArgumentList '/k powercfg /batteryreport /output %userprofile%\\Desktop\\battery.html'", "safe", "Отчёт о состоянии батареи."],
    ],
  },
};

// ============================================================
//  SERVICES (для startup tab)
// ============================================================

const SERVICES = [
  ["Поиск Windows", "WSearch"],
  ["Печать (Spooler)", "Spooler"],
  ["Xbox Auth", "XblAuthManager"],
  ["Xbox Networking", "XboxNetApiSvc"],
  ["Xbox Game Save", "XblGameSave"],
  ["Геолокация", "lfsvc"],
  ["Bluetooth Support", "bthserv"],
  ["Телеметрия (DiagTrack)", "DiagTrack"],
  ["dmwappushservice", "dmwappushservice"],
  ["Синхронизация OneSync", "OneSyncSvc"],
  ["Superfetch / SysMain", "SysMain"],
  ["Windows Update", "wuauserv"],
  ["Биометрия", "WbioSrvc"],
  ["Смарт-карты", "SCardSvr"],
  ["Факс", "Fax"],
  ["Удалённый реестр", "RemoteRegistry"],
  ["Вторичный вход", "seclogon"],
  ["Автономные файлы", "CscService"],
  ["Доставка обновлений (DoSvc)", "DoSvc"],
  ["Push-уведомления", "WpnService"],
  ["Touch Keyboard", "TabletInputService"],
  ["Phone Service", "PhoneSvc"],
  ["Mobile Hotspot", "icssvc"],
  ["Connected Devices", "CDPSvc"],
  ["Network Connection Broker", "NcbService"],
  ["Windows Error Reporting", "WerSvc"],
  ["Windows Image Acquisition", "stisvc"],
  ["Diagnostic Service Host", "WdiServiceHost"],
  ["Diagnostic System Host", "WdiSystemHost"],
  ["Program Compatibility Assistant", "PcaSvc"],
  ["Device Setup Manager", "DsmSvc"],
  ["Map Broker", "MapsBroker"],
  ["Retail Demo", "RetailDemo"],
  ["Служба времени (W32Time)", "W32Time"],
  ["Диагностическая политика (DPS)", "DPS"],
  ["Уведомления печати (PrintNotify)", "PrintNotify"],
  ["Сенсорная служба (SensorService)", "SensorService"],
  ["Сенсорная навигация (SensrSvc)", "SensrSvc"],
  ["Дефрагментация диска (defragsvc)", "defragsvc"],
  ["Distributed Link Tracking (TrkWks)", "TrkWks"],
  ["Xbox Accessory (XboxGipSvc)", "XboxGipSvc"],
  ["SSDP Discovery (SSDPSRV)", "SSDPSRV"],
  ["LLTD Discovery (lltdsvc)", "lltdsvc"],
  ["UPnP Device Host (upnphost)", "upnphost"],
];

const APPS = [
  ["Discord",                  "https://discord.com/download"],
  ["Steam",                    "https://store.steampowered.com/about/"],
  ["Epic Games Launcher",      "https://store.epicgames.com/download"],
  ["Battle.net",               "https://download.battle.net/"],
  ["EA App",                   "https://www.ea.com/ea-app"],
  ["Ubisoft Connect",          "https://ubisoftconnect.com/"],
  ["GOG Galaxy",               "https://www.gog.com/galaxy"],
  ["OBS Studio",               "https://obsproject.com/download"],
  ["7-Zip",                    "https://www.7-zip.org/download.html"],
  ["WinRAR",                   "https://www.win-rar.com/download.html"],
  ["Telegram",                 "https://desktop.telegram.org/"],
  ["WhatsApp",                 "https://www.whatsapp.com/download"],
  ["Spotify",                  "https://www.spotify.com/download/windows/"],
  ["VLC Media Player",         "https://www.videolan.org/vlc/download-windows.html"],
  ["Visual Studio Code",       "https://code.visualstudio.com/download"],
  ["Sublime Text",             "https://www.sublimetext.com/download"],
  ["Notepad++",                "https://notepad-plus-plus.org/downloads/"],
  ["Google Chrome",            "https://www.google.com/chrome/"],
  ["Mozilla Firefox",          "https://www.mozilla.org/firefox/download/thanks/"],
  ["Brave Browser",            "https://brave.com/download/"],
  ["Opera GX",                 "https://www.opera.com/gx"],
  ["Git",                      "https://git-scm.com/download/win"],
  ["Python",                   "https://www.python.org/downloads/windows/"],
  ["Node.js",                  "https://nodejs.org/en/download"],
  ["Docker Desktop",           "https://www.docker.com/products/docker-desktop/"],
  ["Postman",                  "https://www.postman.com/downloads/"],
  ["VK Мессенджер",            "https://vk.com/vk_desktop_app"],
  ["Zoom",                     "https://zoom.us/download"],
  ["Microsoft Teams",          "https://www.microsoft.com/microsoft-teams/download-app"],
  ["AnyDesk",                  "https://anydesk.com/download"],
  ["TeamViewer",               "https://www.teamviewer.com/download/windows/"],
  ["DaVinci Resolve",          "https://www.blackmagicdesign.com/products/davinciresolve"],
  ["Adobe Photoshop",          "https://www.adobe.com/products/photoshop.html"],
  ["Adobe Lightroom",          "https://www.adobe.com/products/photoshop-lightroom.html"],
  ["GIMP",                     "https://www.gimp.org/downloads/"],
  ["CapCut",                   "https://www.capcut.com/"],
  ["Audacity",                 "https://www.audacityteam.org/download/"],
  ["Blender",                  "https://www.blender.org/download/"],
  ["qBittorrent",              "https://www.qbittorrent.org/download"],
  ["Mozilla Thunderbird",      "https://www.thunderbird.net/"],
  ["HWiNFO",                   "https://www.hwinfo.com/download/"],
  ["MSI Afterburner",          "https://www.msi.com/Landing/afterburner/graphics-cards"],
  ["CPU-Z",                    "https://www.cpuid.com/softwares/cpu-z.html"],
  ["GPU-Z",                    "https://www.techpowerup.com/download/techpowerup-gpu-z/"],
  ["Process Lasso",            "https://bitsum.com/"],
  ["Razer Cortex",             "https://www.razer.com/cortex"],
  ["Twitch",                   "https://www.twitch.tv/downloads"],
  ["NVIDIA GeForce Experience","https://www.nvidia.com/en-us/geforce/geforce-experience/"],
];

// ============================================================
//  ONE-CLICK OPTIMIZATION PACK — grouped, safe only
// ============================================================

const OPTIMIZE_PACK = {
  "Очистка системы": [
    ["Очистка Temp", "Remove-Item -Path $env:TEMP\\* -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item -Path 'C:\\Windows\\Temp\\*' -Recurse -Force -ErrorAction SilentlyContinue", "Удаляет временные файлы пользователя и системную папку Temp. Безопасно, не влияет на работу программ.", "Первое запускайте — освободит от 500 МБ до 5 ГБ. Можно запускать регулярно."],
    ["Очистка Prefetch", "Remove-Item -Path 'C:\\Windows\\Prefetch\\*' -Recurse -Force -ErrorAction SilentlyContinue", "Очищает папку предварительной загрузки. Windows пересоздаст нужные файлы при следующем запуске.", "Следующие 1-2 запуска программ будут чуть медленнее — система пересоздаёт кэш."],
    ["Очистка корзины", "Clear-RecycleBin -Force -ErrorAction SilentlyContinue", "Полностью очищает корзину. Удаляет файлы безвозвратно.", "Убедитесь, что не нужного в корзине — отменить будет нельзя."],
    ["DNS-кэш", "ipconfig /flushdns | Out-Null", "Сбрасывает кэш DNS-резолвера. Полезно при проблемах с доступом к сайтам.", "Безопасно — можно запускать при любых проблемах с доступом к сайтам."],
    ["Кэш Windows Update", "net stop wuauserv 2>$null; net stop bits 2>$null; Remove-Item -Path 'C:\\Windows\\SoftwareDistribution\\*' -Recurse -Force -ErrorAction SilentlyContinue; net start wuauserv 2>$null; net start bits 2>$null", "Очищает кэш скачанных обновлений Windows. Может помочь при застрявших обновлениях.", "Если Windows Update завис — этот твик частично решает проблему."],
    ["Crash Dumps", "Remove-Item \"$env:LocalAppData\\CrashDumps\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "Удаляет дампы памяти при аварийных завершениях программ. Освобождает место.", "Каждый дамп может занимать сотни МБ. Безопасно удалять."],
    ["Кэш NVIDIA", "Get-ChildItem -Path \"$env:LocalAppData\\NVIDIA\\DXCache\",\"$env:LocalAppData\\NVIDIA\\GLCache\" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue", "Очищает кэш шейдеров NVIDIA. Шейдеры будут перекомпилированы при следующем запуске игр.", "При первом запуске игры после очистки будет микро-фриз при компиляции шейдеров."],
    ["Кэш DirectX", "Remove-Item \"$env:LocalAppData\\D3DSCache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "Очищает кэш шейдеров DirectX. Устраняет графические артефакты.", "Помогает при артефактах в играх — кэши DXCache и D3DSCache пересоздадутся автоматически."],
    ["Thumbnails", "Remove-Item \"$env:LocalAppData\\Microsoft\\Windows\\Explorer\\thumbcache_*.db\" -Force -ErrorAction SilentlyContinue", "Удаляет кэш миниатюр проводника. Миниатюры будут пересозданы автоматически.", "Проводник будет первое время генерировать превью заново — нормально."],
    ["Журналы", "wevtutil el 2>$null | ForEach-Object { wevtutil cl $_ 2>$null }", "Очищает все журналы событий Windows (Event Viewer). Освобождает место на диске.", "Полезно перед продажей/передачей ПК. Для отладки проблем лучше не чистить."],
  ],

  "Процессор": [
    ["Fast Startup OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power' /v HiberbootEnabled /t REG_DWORD /d 0 /f", "Отключает быстрый запуск Windows. Чистая загрузка каждое включение — стабильнее.", "Загрузка станет на 5-10 сек медленнее, но система стабильнее и обновления ставятся чище."],
    ["Auto-End Tasks", "reg add 'HKCU\\Control Panel\\Desktop' /v AutoEndTasks /t REG_SZ /d 1 /f; reg add 'HKCU\\Control Panel\\Desktop' /v HungAppTimeout /t REG_SZ /d 5000 /f", "Зависшие приложения закрываются автоматически через 5 секунд вместо долгого ожидания.", "Безопасно — только зависшие процессы будут закрываться быстрее."],
  ],

  "Память и диски": [
    ["TRIM ON", "fsutil behavior set DisableDeleteNotify 0 | Out-Null", "Включает TRIM для SSD. Поддерживает скорость записи на долгосрочной перспективе.", "Критично для SSD. Без TRIM скорость записи падает со временем. Включено по умолчанию."],
    ["Снять лимит памяти (MAXMEM)", "bcdedit /deletevalue '{current}' truncatememory 2>$null", "Убирает ограничение объёма памяти из BCD (msconfig «Максимум памяти» / MAXMEM), из-за которого система видит только часть оперативки (например 2 ГБ из 16).", "Нужна перезагрузка. Лимит обычно стоит в msconfig или от сторонних утилит."],
  ],

  "Клавиатура и ввод": [
    ["FilterKeys: идеал (Kalash)", "reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v AutoRepeatDelay /t REG_DWORD /d 150 /f; reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v AutoRepeatRate /t REG_DWORD /d 25 /f; reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v BounceTime /t REG_DWORD /d 0 /f; reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v DelayBeforeAcceptance /t REG_DWORD /d 0 /f; reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v Flags /t REG_DWORD /d 3 /f", "Фильтрация клавиш: задержка повтора 150 мс, скорость 25 мс (40 пов/сек), игнор быстрых кликов выкл.", "Вступает в силу после повторного входа в Windows."],
  ],

  "NVIDIA": [
    ["NVIDIA Telemetry OFF", "sc config NvTelemetryContainer start= disabled; Stop-Service NvTelemetryContainer -Force -EA 0; reg add 'HKCU\\SOFTWARE\\NVIDIA Corporation\\NVControlPanel2\\Client' /v OptInOrOutPreference /t REG_DWORD /d 0 /f; Get-ScheduledTask -ErrorAction SilentlyContinue | Where-Object {$_.TaskName -like 'NvTm*' -or $_.TaskName -like 'NvProfileUpdater*'} | ForEach-Object { Disable-ScheduledTask -TaskName $_.TaskName -TaskPath $_.TaskPath -ErrorAction SilentlyContinue }", "Отключает службу телеметрии NVIDIA и фоновые задачи NvTm/NvProfileUpdater. Карта и драйвер продолжают работать.", "Применяется на ПК с видеокартой NVIDIA. Обновления Game Ready — вручную."],
  ],

  "Сбор данных (сводно)": [
    ["Доступы приложений OFF (ConsentStore)", "@('userAccountInformation','videosLibrary','picturesLibrary','documentsLibrary','appDiagnostics','userDataTasks','appointments','webcam','contacts','chat','downloadsFolder','radios','phoneCall','userNotificationListener','broadFileSystemAccess','email','phoneCallHistory') | ForEach-Object { reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\$_\" /v Value /t REG_SZ /d Deny /f | Out-Null }", "Запрещает приложениям доступ к камере, микрофону, контактам, документам, почте и другим данным (17 ключей ConsentStore).", "Одним твиком закрывает все 17 доступов приложений Windows."],
    ["Доп. телеметрия OFF (реестр)", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v Start_TrackProgs /t REG_DWORD /d 0 /f; reg add 'HKCU\\Control Panel\\International\\User Profile' /v HttpAcceptLanguageOptOut /t REG_DWORD /d 1 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\InputPersonalization\\TrainedDataStore' /v HarvestContacts /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SubscribedContent-353696Enabled /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Diagnostics\\DiagTrack\\EventTranscriptKey' /v EnableEventTranscript /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat' /v AITEnable /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat' /v DisableInventory /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat' /v DisableUAR /t REG_DWORD /d 1 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Attachments' /v SaveZoneInformation /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Schedule\\Maintenance' /v MaintenanceDisabled /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Personalization' /v NoLockScreenCamera /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\TabletPC' /v PreventHandwritingDataSharing /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\HandwritingErrorReports' /v PreventHandwritingErrorReports /t REG_DWORD /d 1 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Input\\TIPC' /v Enabled /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors' /v DisableWindowsLocationProvider /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors' /v DisableLocationScripting /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v UploadUserActivities /t REG_DWORD /d 0 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\WMI\\AutoLogger\\AutoLogger-Diagtrack-Listener' /v Start /t REG_DWORD /d 0 /f", "Отключает доп. телеметрию: трекинг запусков, Accept-Language, сбор контактов, рекомендованный контент, Event Transcript, AppCompat AIT/Inventory, MOTW, обслуживание, камеру Lock Screen, рукописный ввод, TIPC, геопровайдер, UploadUserActivities, AutoLogger DiagTrack.", "18 параметров реестра за один прогон."],
    ["Задачи планировщика (телеметрия) OFF", "schtasks /change /tn \"Microsoft\\Windows\\Application Experience\\AitAgent\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Application Experience\\ProgramDataUpdater\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Application Experience\\StartupAppTask\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\DiskDiagnostic\\Microsoft-Windows-DiskDiagnosticDataCollector\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\DiskDiagnostic\\Microsoft-Windows-DiskDiagnosticResolver\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Maintenance\\WinSAT\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\NetTrace\\GatherNetworkInfo\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\PI\\Sqm-Tasks\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Feedback\\Siuf\\DmClient\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Feedback\\Siuf\\DmClientOnScenarioDownload\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Diagnosis\\Scheduled\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Diagnosis\\RecommendedTroubleshootingScanner\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\.NET Framework\\.NET Framework NGEN v4.0.30319\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\.NET Framework\\.NET Framework NGEN v4.0.30319 64\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\.NET Framework\\.NET Framework NGEN v4.0.30319 Critical\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\.NET Framework\\.NET Framework NGEN v4.0.30319 64 Critical\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\ApplicationData\\appuriverifierdaily\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\ApplicationData\\appuriverifierinstall\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\DiskFootprint\\Diagnostics\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\DiskFootprint\\StorageSense\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Device Information\\Device\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Maps\\MapsUpdateTask\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Maps\\MapsToastTask\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\International\\Synchronize Language Settings\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\LanguageComponentsInstaller\\Installation\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\LanguageComponentsInstaller\\ReconcileLanguageResources\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\PushToInstall\\Registration\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Setup\\SetupCleanupTask\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Speech\\SpeechModelDownloadTask\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Windows Error Reporting\\QueueReporting\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\WindowsColorSystem\\Calibration Loader\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Work Folders\\Work Folders Logon Synchronization\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\Autochk\\Proxy\" /disable 2>$null; reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting\" /v Disabled /t REG_DWORD /d 1 /f", "Отключает фоновые задачи телеметрии и обслуживания в планировщике: Application Experience, DiskDiagnostic, WinSAT, NetTrace, SQM, Siuf/DmClient, Diagnosis, .NET NGEN, Maps, WER и др. (35 задач).", "Диагностика вручную продолжит работать."],
    ["diagnosticshub OFF", "sc config diagnosticshub.standardcollector.service start= disabled; Stop-Service diagnosticshub.standardcollector.service -Force -EA 0", "Отключает Diagnostics Hub — службу сбора данных для отладки приложений.", "Не влияет на работу приложений."],
  ],

  "Сеть и интернет": [
    ["Эко-режим сети OFF", "$cls='HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e972-e325-11ce-bfc1-08002be10318}'; Get-ChildItem $cls -EA 0 | Where-Object {$_.PSChildName -match '^\\d+$'} | ForEach-Object { $k=$cls+'\\'+$_.PSChildName; if((Get-ItemProperty $k -EA 0).DriverDesc){ Set-ItemProperty $k -Name PnPCapabilities -Value 24 -Type DWord -EA 0 } }; Get-NetAdapter -EA 0 | Where-Object {$_.Status -eq 'Up'} | ForEach-Object { try{ Set-NetAdapterAdvancedProperty -Name $_.Name -RegistryKeyword '*EEE' -RegistryValue 0 -NoRestart -EA 0 }catch{}; try{ Set-NetAdapterAdvancedProperty -Name $_.Name -RegistryKeyword 'EnergyEfficientEthernet' -RegistryValue 0 -NoRestart -EA 0 }catch{} }; powercfg /setacvalueindex scheme_current 19cbb8fa-5279-450e-9fac-8a3d5fedd0c1 12bbebe6-58d6-4636-95bb-3217ef867c1a 0; powercfg /setdcvalueindex scheme_current 19cbb8fa-5279-450e-9fac-8a3d5fedd0c1 12bbebe6-58d6-4636-95bb-3217ef867c1a 0; powercfg /setactive scheme_current", "Полностью отключает энергосбережение сетевых адаптеров: PnPCapabilities=24 на всех NIC (запрет отключения устройства), EEE (Green Ethernet) и энергосбережение Wi-Fi — максимум производительности.", "Для десктопов и игровых ПК. На ноутбуках от батареи расход вырастет."],
    ["Запуски по интернету OFF", "reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications\" /v GlobalUserDisabled /t REG_DWORD /d 1 /f; schtasks /change /tn \"Microsoft\\Windows\\UpdateOrchestrator\\USOClient\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\UpdateOrchestrator\\Schedule Scan\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\WindowsUpdate\\Scheduled Start\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\WindowsUpdate\\Automatic App Update\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\WS\\WSUpdateOrchestrator\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\ApplicationData\\appuriverifierdaily\" /disable 2>$null; schtasks /change /tn \"Microsoft\\Windows\\ApplicationData\\appuriverifierinstall\" /disable 2>$null; reg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU\" /v NoAutoUpdate /t REG_DWORD /d 1 /f; reg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsStore\" /v AutoDownload /t REG_DWORD /d 2 /f", "Отключает фоновые запуски по сети: задачи планировщика UpdateOrchestrator/Scheduled Start, Background Apps (UWP), автообновление Store и автозагрузку Windows Update (NoAutoUpdate).", "Windows Update останется доступен вручную через Параметры."],
  ],
};

const OPTIMIZE_PACK_PRO = {
  "Процессор": [
    ["Ultimate Performance", "powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 2>$null; powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61", "Активирует план питания Ultimate Performance. Максимальная производительность CPU без энергосбережения.", "Для десктопов — идеально. На ноутбуках: только от сети, время батареи сильно падает."],
    ["Power Throttling OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' /v PowerThrottlingOff /t REG_DWORD /d 1 /f", "Отключает троттлинг мощности Windows. Фоновые процессы не будут замедляться системой.", "Фоновые приложения (обновления, антивирус) перестанут замедляться. Нагрев может вырасти."],
    ["Win32Priority = 38", "reg add 'HKLM\\System\\CurrentControlSet\\Control\\PriorityControl' /v Win32PrioritySeparation /t REG_DWORD /d 38 /f", "Устанавливает приоритет процессов: foreground boost + короткие кванты. Оптимально для отзывчивости.", "Десктопный профиль — активное окно получает больше ресурсов. Стабильно."],
    ["DPC Latency 10000", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v DpcWatchdogProfileOffset /t REG_DWORD /d 10000 /f", "Снижает DPC-задержки. Меньше фризов и прерываний при обработке прерываний.", "Хорошо для аудио/видео работы и стриминга. Безопасный твик."],
    ["Background Apps OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications' /v GlobalUserDisabled /t REG_DWORD /d 1 /f", "Запрещает UWP-приложениям работать в фоне. Освобождает RAM и CPU.", "Почта, календарь и мессенджеры Microsoft перестанут обновляться в фоне."],
    ["Timer Resolution", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v GlobalTimerResolutionRequests /t REG_DWORD /d 1 /f", "Глобальный запрос timer resolution 1мс. Плавный ввод и меньше статтеров.", "Критично для FPS-игр и аудио. Немного повышает энергопотребление."],
    ["DistributeTimers ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v DistributeTimers /t REG_DWORD /d 1 /f", "Распределяет таймеры между ядрами CPU. Снижает contention на многоядерных системах.", "Полезно на 8+ ядрах. На 4 ядрах может быть нейтрально."],
    ["Dynamic Tick OFF", "bcdedit /set disabledynamictick yes 2>$null", "Отключает динамический тик. Стабильнее таймеры, но чуть выше энергопотребление.", "На десктопе — однозначно OFF. На ноутбуке — чуть больше нагрев."],
    ["Boot Timeout 3с", "bcdedit /timeout 3 2>$null", "Сокращает задержку boot menu до 3 секунд. Быстрее загрузка.", "Стандарт — 30 сек. 3 сек — достаточно для входа в меню при необходимости."],
  ],

  "Графика": [
    ["HAGS ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v HwSchMode /t REG_DWORD /d 2 /f", "Hardware-Accelerated GPU Scheduling — GPU сам планирует задачи, снижает задержку.", "Требует Windows 10 2004+ и совместимый драйвер GPU. Перезагрузка обязательна."],
    ["GPU Priority 8", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'GPU Priority' /t REG_DWORD /d 8 /f", "Максимальный приоритет GPU для игровых процессов в MMCSS.", "Безопасно — влияет только на приложения в папке Games SystemProfile."],
    ["RAM Priority 8", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'Priority' /t REG_DWORD /d 8 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'GPU Priority' /t REG_DWORD /d 8 /f", "Максимальный приоритет выделения RAM для игровых процессов + приоритет видеокарте (GPU Priority) в той же Games-задаче.", "Игры будут получать RAM и GPU в первую очередь при нехватке памяти."],
    ["MMCSS Audio High", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio' /v Priority /t REG_DWORD /d 6 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio' /v 'Scheduling Category' /t REG_SZ /d High /f", "Высокий приоритет аудио-потока. Без щелчков и пропусков звука.", "Важно для стриминга, записи и прослушивания музыки при нагрузке."],
    ["GPU Preemption OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v GpuPreemption /t REG_DWORD /d 0 /f", "Отключает предварительное перехват GPU. Ниже латентность, возможны краткие фризы.", "Снижает input lag, но может вызвать микро-фризы в некоторых играх. Тестируйте."],
    ["TDR Delay 8", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDelay /t REG_DWORD /d 8 /f", "TDR таймаут 8 секунд. Меньше ложных сбросов GPU при тяжёлых задачах.", "По умолчанию 2 сек — мало для тяжёлых вычислений. 8 сек — безопасный компромисс."],
    ["NVIDIA Ultra Low Latency", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v UltraLowLatencyMode /t REG_DWORD /d 1 /f", "Включает Ultra Low Latency Mode для NVIDIA GPU.", "Для GPU NVIDIA GTX 10xx+. На AMD — не действует. Перезагрузка нужна."],
    ["NVIDIA Threaded Opt", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v PerfLevelSrc /t REG_DWORD /d 8738 /f; reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v DisableP9Powersaving /t REG_DWORD /d 1 /f", "Многопоточная оптимизация NVIDIA + отключение энергосбережения P9.", "Для NVIDIA GPU. Отключение P9 убирает микро-фризы при смене нагрузки."],
    ["NVIDIA Low Latency ON", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v LowLatencyMode /t REG_DWORD /d 1 /f", "Включает NVIDIA Low Latency Mode — меньше input lag.", "Для NVIDIA GPU. Снижает input lag."],
    ["AMD ULPS OFF", "Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*' -Name EnableUlps -ErrorAction SilentlyContinue | ForEach-Object { Set-ItemProperty $_.PSPath -Name EnableUlps -Value 0 }", "Отключает Ultra Low Power State — GPU не засыпает и не тормозит при пробуждении.", "Для AMD GPU. Убирает задержки при пробуждении и микро-фризы."],
    ["DX12 Low Latency", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v MaxFrameLatency /t REG_DWORD /d 1 /f", "Максимальная задержка кадра = 1. Минимальный input lag в DirectX приложениях.", "Может вызвать микро-фризы при нестабильном FPS — снижает input lag ценой плавности."],
    ["Flip Model ON", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v FlipModelSwapchain /t REG_DWORD /d 1 /f", "Flip Model presentation — быстрее рендеринг в играх без композита DWM.", "Включает более эффективную модель presentation. Уменьшает задержку отрисовки."],
    ["DWM Optimize", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\DWM' /v OverlayTestMode /t REG_DWORD /d 5 /f", "Оптимизация Desktop Window Manager. Меньше overhead при переключении окон.", "Убирает лишние оверлеи DWM. Визуально ничего не меняется, но overhead меньше."],
    ["Visual Effects Perf", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects' /v VisualFXSetting /t REG_DWORD /d 2 /f; reg add 'HKCU\\Control Panel\\Desktop' /v UserPreferencesMask /t REG_BINARY /d 901203801000000000000000 /f; reg add 'HKCU\\Control Panel\\Desktop\\WindowMetrics' /v MinAnimate /t REG_SZ /d 0 /f", "Отключает визуальные эффекты Windows. Больше ресурсов для приложений.", "Прозрачность, анимации, тени отключаются. Эффект вступит в силу после перезапуска Explorer или ПК."],
  ],

  "Сеть": [
    ["Network Throttling OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f", "Снимает лимит сетевого трафика. Без искусственного троттлинга.", "Рекомендуется для стриминга, онлайн-игр и загрузок. Полностью безопасно."],
    ["Nagle OFF (все адаптеры)", "Get-NetAdapter | Where-Object {$_.Status -eq 'Up'} | ForEach-Object { $id = $_.InterfaceGuid; reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\$id\" /v TcpAckFrequency /t REG_DWORD /d 1 /f; reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\$id\" /v TCPNoDelay /t REG_DWORD /d 1 /f }", "Отключает алгоритм Нэгла на всех активных адаптерах. Мгновенная отправка пакетов без буферизации. Чуть больше трафика.", "Влияет на ICMP-пинг — может вырасти на 1-2 мс. Для онлайн-игр — однозначно лучше."],
    ["DNS Cloudflare", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('1.1.1.1','1.0.0.1') -ErrorAction SilentlyContinue", "Меняет DNS на Cloudflare (1.1.1.1). Самый быстрый публичный DNS-сервер.", "Можно вернуть на автоматический: «Восстановить DNS» в разделе Исправления."],
    ["TCP Fast Open", "netsh int tcp set global fastopen=enabled 2>$null", "Ускоряет повторные TCP-соединения. Меньше задержка при подключении к серверам.", "Безопасно. Работает с современными серверами, не поддерживающие TFO не пострадают."],
    ["ECN ON", "netsh int tcp set global ecncapability=enabled 2>$null", "Explicit Congestion Notification. Уведомляет о перегрузке сети раньше, снижает потерю пакетов.", "Повышает качество связи при перегрузке. Некоторые ISP не поддерживают — тогда не действует."],
    ["MaxUserPort 65534", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v MaxUserPort /t REG_DWORD /d 65534 /f", "Максимум доступных TCP-портов. Важно при большом количестве одновременных соединений.", "Стандарт 5000 — мало для торентов/стриминга. 65534 — максимум, безопасно."],
    ["TcpTimedWaitDelay 30", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f", "Быстрее освобождение закрытых портов. Стандартная задержка 120с сокращена до 30с.", "Ускоряет переподключение. Стандарт 120с — пережиток, 30с безопасно для всех."],
  ],

  "Память и диски": [
    ["DisablePagingExecutive", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v DisablePagingExecutive /t REG_DWORD /d 1 /f", "Ядро Windows и драйверы всегда в ОЗУ. Быстрее отклик, но на <8 ГБ RAM будет нехватка.", "Только для 16+ ГБ RAM. На 8 ГБ и меньше — оставьте по умолчанию."],
    ["LargeSystemCache OFF (desktop)", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v LargeSystemCache /t REG_DWORD /d 0 /f", "Стандартный файловый кэш (не серверный). Приоритет приложениям, а не кэшу файлов.", "Для десктопа — оптимально. Серверный режим LargeSystemCache не нужен."],
    ["Last Access OFF", "fsutil behavior set disablelastaccess 1 | Out-Null", "Не обновляет метки времени последнего доступа к файлам. Меньше записей на диск.", "Некоторые программы (роботы-архиваторы) могут полагаться на это. Обычно безопасно."],
    ["Disks no sleep", "powercfg /setacvalueindex scheme_current sub_disk DISKIDLE 0; powercfg /setactive scheme_current", "Диски не засыпают в простое. Мгновенный доступ к файлам без задержки пробуждения.", "Только для десктопов. На ноутбуках — HDD будет издавать шум при простоях."],
    ["Hibernation OFF", "powercfg /hibernate off", "Отключает гибернацию. Удаляет hiberfil.sys — освобождает место на диске (размер RAM).", "Освобождает место = объём RAM (16 ГБ RAM = 16 ГБ места). Ноутбук не будет гибернировать."],
    ["Снять лимит памяти (MAXMEM)", "bcdedit /deletevalue '{current}' truncatememory 2>$null", "Убирает ограничение объёма памяти из BCD (msconfig «Максимум памяти» / MAXMEM). После перезагрузки система увидит всю оперативку.", "Нужна перезагрузка. Лимит обычно выставляется в msconfig или сторонними утилитами."],
  ],

  "Приватность": [
    ["Cortana OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search' /v AllowCortana /t REG_DWORD /d 0 /f", "Полностью отключает Cortana. Не отправляет голосовые запросы в облако.", "Поиск Windows продолжит работать — отключается только голосовой помощник Cortana."],
    ["Advertising ID OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo' /v Enabled /t REG_DWORD /d 0 /f", "Отключает рекламный идентификатор. Приложения не могут отслеживать по рекламе.", "Реклама не исчезнет полностью, но персонализация от Microsoft отключится."],
    ["Bing Search OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search' /v BingSearchEnabled /t REG_DWORD /d 0 /f", "Убирает результаты Bing из локального поиска Windows. Только локальные файлы.", "Поиск в меню Пуск покажет только файлы и приложения — без веб-результатов."],
    ["Activity History OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v EnableActivityFeed /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v PublishUserActivities /t REG_DWORD /d 0 /f", "Отключает историю активности. Windows не хранит какие файлы/сайты вы открывали.", "Функция «Таймлайн» (Win+Tab) перестанет показывать недавние действия."],
    ["Feedback OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Siuf\\Rules' /v NumberOfSIUFInPeriod /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection' /v DoNotShowFeedbackNotifications /t REG_DWORD /d 1 /f", "Убирает запросы обратной связи от Microsoft и отключает уведомления о фидбеке.", "Больше никаких всплывающих окон «Поделитесь мнением» от Windows."],
    ["Location OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location' /v Value /t REG_SZ /d Deny /f", "Отключает доступ к геолокации для всех приложений.", "Карты и навигаторы потеряют геолокацию. Включите вручную при необходимости."],
    ["Camera Privacy OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy' /v LetAppsAccessCamera /t REG_DWORD /d 2 /f", "Запрещает UWP-приложениям доступ к камере. Сторонние приложения не затронуты.", "Zoom/Teams (Win32) не пострадают — ограничение касается только UWP-приложений из Store."],
    ["Contacts Privacy OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy' /v LetAppsAccessContacts /t REG_DWORD /d 2 /f", "Запрещает приложениям доступ к списку контактов.", "UWP-приложения не увидят ваши контакты. Для почтовых клиентов это безопасно."],
    ["Calendar Privacy OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy' /v LetAppsAccessCalendar /t REG_DWORD /d 2 /f", "Запрещает приложениям доступ к календарю.", "UWP-приложения не увидят события календаря. Outlook (Win32) не затронут."],
    ["Ink Analysis OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\HandwritingErrorReports' /v PreventHandwritingErrorReports /t REG_DWORD /d 1 /f", "Отключает анализ рукописного ввода. Данные не отправляются для обучения.", "Для пользователей с планшетами/стилусами — можно оставить ON. Иначе — OFF."],
    ["Find My Device OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\FindMyDevice' /v AllowFindMyDevice /t REG_DWORD /d 0 /f", "Отключает функцию «Найти устройство». GPS не отслеживается.", "Десктопам не нужен. Ноутбуки — на ваше усмотрение, теряете возможность найти."],
    ["Speech Data OFF", "reg add 'HKCU\\Software\\Microsoft\\Speech_OneCore\\Settings\\OnlineSpeechPrivacy' /v HasAccepted /t REG_DWORD /d 0 /f", "Отключает распознавание речи через облако. Голосовые данные не отправляются.", "Диктовка (Win+H) потеряет точность. Если не пользуетесь — безопасно отключить."],
    ["Edge Background OFF", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v StartupBoostEnabled /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v BackgroundModeEnabled /t REG_DWORD /d 0 /f", "Запрещает Microsoft Edge работать в фоне. Не потребляет RAM и CPU.", "Edge запускается в фоне для уведомлений. Отключение — 200-400 МБ экономии RAM."],
    ["Office Telemetry OFF", "reg add 'HKCU\\SOFTWARE\\Policies\\Microsoft\\Office\\16.0\\Common\\ClientTelemetry' /v DisableTelemetry /t REG_DWORD /d 1 /f", "Отключает сбор телеметрии в Microsoft Office 2016/2019/365.", "Office перестанет отправлять данные об использовании. Функции не пострадают."],
  ],

  "Проводник и интерфейс": [
    ["Classic Context Menu", "reg add 'HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32' /ve /t REG_SZ /d \"\" /f", "Возвращает классическое контекстное меню (без пункта «Ещё»). Удобнее и быстрее.", "Для возврата: удалите ключ реестра. Или используйте Fixes → Вернуть контекстное меню."],
    ["Show Extensions", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v HideFileExt /t REG_DWORD /d 0 /f", "Показывает расширения файлов (.txt, .exe и т.д.). Важно для безопасности.", "Помогает отличить document.txt от document.exe — защита от фишинга."],
    ["Show Hidden Files", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v Hidden /t REG_DWORD /d 1 /f", "Показывает скрытые файлы и папки в Проводнике.", "Полезно для разработчиков и продвинутых пользователей. Визуально не нагружает."],
    ["Widgets OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarDa /t REG_DWORD /d 0 /f", "Убирает виджеты с панели задач. Освобождает место и снижает фоновую активность.", "Виджеты потребляют 50-150 МБ RAM в фоне. Отключение безопасно."],
    ["Chat OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarMn /t REG_DWORD /d 0 /f", "Убирает иконку Teams Chat с панели задач.", "Можно вернуть в any time. Teams (приложение) не затронется."],
    ["Copilot Button OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v ShowCopilotButton /t REG_DWORD /d 0 /f", "Убирает кнопку Copilot с панели задач.", "Кнопка не нужна большинству пользователей. Copilot остаётся доступен через Edge."],
    ["Task View OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v ShowTaskViewButton /t REG_DWORD /d 0 /f", "Убирает кнопку Task View с панели задач. Используйте Win+Tab.", "Экономит место. Win+Tab продолжает работать для просмотра рабочих столов."],
    ["Search Box → иконка", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search' /v SearchboxTaskbarMode /t REG_DWORD /d 0 /f", "Компактная иконка поиска вместо широкого поля. Больше места.", "3 варианта: 0=иконка, 1=поле, 2=большое поле. 0 — компактнее всего."],
    ["Left Align Taskbar", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarAl /t REG_DWORD /d 0 /f", "Иконки панели задач слева как в Windows 10.", "0=лево, 1=центр. Классическое расположение для привычки."],
    ["Small Taskbar", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v TaskbarSmallIcons /t REG_DWORD /d 1 /f", "Компактная панель задач с маленькими иконками.", "1=маленькие, 0=большие. Маленькие иконки — больше места для окон."],
    ["Snap Assist OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v SnapAssist /t REG_DWORD /d 0 /f", "Отключает помощник привязки окон. При перетаскивании не появляется подсказка.", "Привязка окон (Win+→/←) продолжает работать, убирается только подсказка."],
    ["Recent Files OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer' /v ShowRecent /t REG_DWORD /d 0 /f", "Убирает недавние файлы из быстрого доступа.", "Быстрый доступ станет чище. История в самой программе (Word) не затронута."],
    ["Freq Folders OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer' /v ShowFrequent /t REG_DWORD /d 0 /f", "Убирает часто используемые папки из быстрого доступа.", "Быстрый доступ станет чище — показываются только закреплённые папки."],
    ["Recommendations OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced' /v Start_TrackDocs /t REG_DWORD /d 0 /f", "Убирает рекомендации в меню Пуск.", "Меню Пуск станет чище — без блока «Рекомендации» от Microsoft."],
    ["Content Delivery OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v PreInstalledAppsEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SilentInstalledAppsEnabled /t REG_DWORD /d 0 /f", "Отключает облачный контент и автозастановку приложений Microsoft.", "Windows перестанет ставить Candy Crush и подобное без вашего согласия."],
    ["Tips OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v SoftLandingEnabled /t REG_DWORD /d 0 /f", "Убирает подсказки и рекомендации Windows.", "Больше никаких всплывающих советов «Попробуйте Windows Hello» и т.д."],
    ["AutoPlay OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\AutoplayHandlers' /v DisableAutoplay /t REG_DWORD /d 1 /f", "Отключает автозапуск с USB/дисков. Безопаснее — ничего не запускается автоматически.", "Важно для защиты от вирусов через USB. Запускайте файлы вручную."],
    ["Sticky Keys OFF", "reg add 'HKCU\\Control Panel\\Accessibility\\StickyKeys' /v Flags /t REG_SZ /d 506 /f", "Отключает залипание клавиш. Не активируется по 5x Shift.", "Исправляет проблему случайной активации залипания при быстрой игре."],
    ["Filter Keys OFF", "reg add 'HKCU\\Control Panel\\Accessibility\\Keyboard Response' /v Flags /t REG_SZ /d 122 /f", "Отключает фильтрацию клавиш. Быстрый ввод не будет замедляться.", "Клавиатура не будет задерживать повторные и быстрые нажатия."],
    ["Toggle Keys OFF", "reg add 'HKCU\\Control Panel\\Accessibility\\ToggleKeys' /v Flags /t REG_SZ /d 58 /f", "Отключает звуковые сигналы при CapsLock/NumLock.", "Больше никаких писков при случайном нажатии CapsLock."],
    ["Dark Mode", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v AppsUseLightTheme /t REG_DWORD /d 0 /f; reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v SystemUsesLightTheme /t REG_DWORD /d 0 /f", "Включает тёмную тему для приложений и системы.", "Уменьшает нагрузку на глаза ночью. OLED-экраны экономят заряд."],
    ["Transparency OFF", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' /v EnableTransparency /t REG_DWORD /d 0 /f", "Отключает прозрачность окон. Меньше нагрузка на GPU.", "Акриловые/стеклянные эффекты убираются. Немного повышает производительность."],
    ["Lock Screen Spotlight OFF", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager' /v RotatingLockScreenOverlayEnabled /t REG_DWORD /d 0 /f", "Убирает авто-смену обоев на экране блокировки.", "Убирает рекламные обои Microsoft. Остаётся ваша фотография/цвет."],
    ["NumLock ON", "reg add 'HKU\\.DEFAULT\\Control Panel\\Keyboard' /v InitialKeyboardIndicators /t REG_SZ /d 2 /f", "NumLock включается автоматически при загрузке.", "2=вкл, 0=выкл. Удобно для десктопов с нумпадом."],
    ["Menu Delay = 0", "reg add 'HKCU\\Control Panel\\Desktop' /v MenuShowDelay /t REG_SZ /d 0 /f", "Мгновенное открытие контекстных меню без задержки.", "Стандартная задержка 400мс — заметная. 0 — мгновенно. Быстрее работает."],
  ],

  "Глубокие (hardcore)": [
    ["AFD Fast Copy ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\AFD\\Parameters' /v AfdFastCopySend /t REG_DWORD /d 1 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\AFD\\Parameters' /v AfdFastCopyReceive /t REG_DWORD /d 1 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\AFD\\Parameters' /v AfdMaxFastSendEvents /t REG_DWORD /d 2 /f", "Ускоряет сетевой стек Winsock/AFD: быстрый путь копирования пакетов минуя лишние копирования ядра. Снижает сетевой пинг и потерю пакетов.", "Глубокий твик. Путь в обход каскада копирования — меньше CPU на пакет. Влияет на сетевую производительность всех приложений."],
    ["MMCSS SFIO Priority High", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'SFIO Priority' /t REG_SZ /d High /f", "SFIO (Socket Fast I/O) — приоритет игр в сетевых операциях MMCSS выше системных. Меньше задержек в онлайн-играх.", "Скрытый твик MMCSS. Для Games-задачи выставляет SFIO High — сетевые приоритеты игрового планировщика."],
    ["Clear Pagefile On Shutdown", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v ClearPageFileAtShutdown /t REG_DWORD /d 1 /f", "Очищает файл подкачки при выключении — удаляет следы паролей и данных из pagefile.sys на диске.", "Медленнее выключение (несколько секунд). Безопасность приватности — стоит того."],
    ["WaitToKill 2000", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control' /v WaitToKillServiceTimeout /t REG_SZ /d 2000 /f; reg add 'HKCU\\Control Panel\\Desktop' /v WaitToKillAppTimeout /t REG_SZ /d 2000 /f", "Сокращает таймаут ожидания завершения приложений при выключении с 20 сек до 2 сек. Быстрее выход из Windows.", "Приложения не успеют сохранить данные при зависании — небольшой риск потери несохранённой работы."],
    ["TcpMaxDupAcks 2", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v TcpMaxDupAcks /t REG_DWORD /d 2 /f", "Быстрее повторная передача потерянных пакетов (recovery от трёх до двух дубль-ACK). Стабильнее при лаг-спайках.", "Агрессивная ретрансмиссия — чуть больше служебного трафика, но быстрее восстановление соединения."],
    ["Nagle OFF (AFD/сеть)", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v GlobalNoDelay /t REG_DWORD /d 1 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v TCPNoDelay /t REG_DWORD /d 1 /f", "Отключает алгоритм Нэгла глобально (TCPNoDelay=1). Пакеты отправляются мгновенно без ожидания подтверждений.", "Глобальный вариант. Дублирует интерфейсные TcpAckFrequency/TCPNoDelay, но работает для всех соединений сразу."],
    ["MSMQ OFF (очереди сообщений)", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f", "Снимает сетевое троттлингование MMCSS (аналог Network Throttling, но глобально безопасно).", "Убирает резервирование 10% пропускной способности под мультимедиа-задачи."],
    ["Cache Manager Workingset Trim", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v RemovePageFileFromWorkingSet /t REG_DWORD /d 1 /f", "Убирает страницы pagefile из рабочего набора ядра — память быстрее освобождается для игр.", "Глубокий твик памяти. Снижает кэширование подкачки, рабочий набор чище."],
    ["Memory Compression OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v DisableCompression /t REG_DWORD /d 1 /f", "Отключает сжатие памяти Windows. Меньше нагрузка на CPU при нехватке RAM — стабильнее FPS.", "На 16+ ГБ почти не влияет, на 8 ГБ может увеличить чтения с диска. Рекомендуется тестировать."],
    ["Mitigations OFF (Meltdown/Spectre)", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v FeatureSettingsOverride /t REG_DWORD /d 3 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v FeatureSettingsOverrideMask /t REG_DWORD /d 3 /f", "Отключает аппаратные защиты от Spectre/Meltdown — на старых CPU даёт до 10-20% в играх.", "Снижает безопасность системы против атак ядра. Для игрового ПК без чувствительных данных — разумно. Требует перезагрузки."],
    ["NDU OFF (служба сетевых данных)", "sc.exe config Ndu start= disabled 2>$null | Out-Null; sc.exe stop Ndu 2>$null | Out-Null", "Отключает NDU (Network Data Usage Monitor) — меньше фоновых записей и CPU при переменном трафике.", "Может временно не показывать статистику трафика в Параметрах. Безопасно отключить."],
    ["WER OFF (отчёты об ошибках)", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting' /v Disabled /t REG_DWORD /d 1 /f", "Отключает Windows Error Reporting — меньше фоновой нагрузки и записей на диск при вылетах.", "Microsoft не получит отчёты об ошибках. В отладке приложений — минус."],
    ["Boot Optimization Delay OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'Background Only' /t REG_DWORD /d 0 /f", "MMCSS Games не ждёт завершения фоновых задач перед стартом — игра стартует мгновенно даже при загрузке.", "Скрытый твик MMCSS. Игра получает приоритет сразу, без задержки на фоновые процессы."],
    ["NT Kernel Pageable OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v DisablePagingExecutive /t REG_DWORD /d 1 /f", "Ядро и драйверы никогда не выгружаются на диск — отклик системы мгновенный.", "Требует 16+ ГБ RAM, иначе нехватка памяти для приложений."],
  ],

};


// ============================================================
//  REGISTRY PAGE

const REG_RISK_LABELS = { safe: "Безопасно", warn: "С осторожностью", danger: "Опасно" };

const REGISTRY_TWEAKS = {
  "CPU": [
    { name: "Win32PrioritySeparation = 38", cmd: "reg add 'HKLM\\System\\CurrentControlSet\\Control\\PriorityControl' /v Win32PrioritySeparation /t REG_DWORD /d 38 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Более длинные кванты и приоритет активных процессов — выше FPS.", tip: "Оптимально для игр и тяжёлых приложений. Активное окно получает больше ресурсов CPU." },
    { name: "Win32Priority = 2 (стандарт)", cmd: "reg add 'HKLM\\System\\CurrentControlSet\\Control\\PriorityControl' /v Win32PrioritySeparation /t REG_DWORD /d 2 /f", risk: "safe", rec: ["work", "battery"], desc: "Стандартный приоритет Windows — стабильность и предсказуемость.", tip: "Для офисной работы и батареи. Все процессы получают ресурсы равномерно." },
    { name: "Timer Resolution = 1 мс", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v GlobalTimerResolutionRequests /t REG_DWORD /d 1 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Разрешение таймера 1 мс — плавный FPS и меньше статтеров.", tip: "Критично для FPS-игр, стриминга и аудио-записи. Снижает input lag." },
    { name: "Timer Resolution OFF", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v GlobalTimerResolutionRequests /t REG_DWORD /d 0 /f", risk: "safe", rec: ["work", "battery"], desc: "Обычный таймер — меньше энергопотребления в простое.", tip: "Экономит батарею. Для десктопов — без разницы." },
    { name: "DistributeTimers ON", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel' /v DistributeTimers /t REG_DWORD /d 1 /f", risk: "warn", rec: ["gaming", "perf"], desc: "Распределение таймеров между ядрами CPU. На некоторых системах может снизить производительность.", tip: "Полезно на 8+ ядрах. На 4 ядрах — может не помочь или навредить. Тестируйте." },
    { name: "Dynamic Tick OFF", cmd: "bcdedit /set disabledynamictick yes 2>$null", risk: "warn", rec: ["gaming", "perf"], desc: "Отключает dynamic tick. Нужна перезагрузка, чуть выше нагрев.", tip: "Стабильнее таймеры для игр. Перезагрузка обязательна. На ноутбуках — лишний нагрев." },
    { name: "TSC Sync Enhanced", cmd: "bcdedit /set tscsyncpolicy enhanced 2>$null", risk: "warn", rec: ["gaming", "perf"], desc: "Улучшает синхронизацию таймеров на многоядерных CPU.", tip: "Безопасно для большинства CPU. Ребут обязателен после применения." },
    { name: "Power Throttling OFF", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' /v PowerThrottlingOff /t REG_DWORD /d 1 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Запрещает троттлинг фоновых процессов.", tip: "Фоновые приложения (обновления, антивирус) не будут замедляться. Нагрев может вырасти." },
    { name: "Power Throttling ON", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' /v PowerThrottlingOff /t REG_DWORD /d 0 /f", risk: "safe", rec: ["work", "battery"], desc: "Разрешает троттлинг фоновых процессов — экономия энергии.", tip: "Для ноутбуков от батареи. Фоновые процессы замедляются, экономя заряд." },
    { name: "Core Parking 100%", cmd: "powercfg /setacvalueindex scheme_current sub_processor CPMINCORES 100; powercfg /setactive scheme_current", risk: "warn", rec: ["gaming", "perf"], desc: "Все ядра всегда активны. Выше температура.", tip: "Для десктопов — ок. На ноутбуках — лишний нагрев и расход батареи." },
    { name: "CPU Min 100%", cmd: "powercfg /setacvalueindex scheme_current sub_processor PROCTHROTTLEMIN 100; powercfg /setactive scheme_current", risk: "warn", rec: ["gaming", "perf"], desc: "Процессор не снижает частоту ниже максимума от сети.", tip: "Максимальная производительность, но и максимальное энергопотребление. Только для десктопов." },
    { name: "Turbo Boost Max", cmd: "powercfg /setacvalueindex scheme_current sub_processor PERFBOOSTMODE 1; powercfg /setactive scheme_current", risk: "safe", rec: ["gaming", "perf"], desc: "Турбо-разгон на максимум.", tip: "Требует хорошего кулера. Температура может вырасти на 10-15°C." },
    { name: "Ultimate Performance", cmd: "powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 2>$null; powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61", risk: "warn", rec: ["perf"], desc: "План питания Ultimate Performance.", tip: "Максимальная производительность для десктопов. На ноутбуках — только от сети." },
    { name: "Balanced Power", cmd: "powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e", risk: "safe", rec: ["work", "battery"], desc: "Стандартный план «Сбалансированный».", tip: "Восстанавливает стандартное поведение. Стабильно и предсказуемо." },
    { name: "Fast Startup OFF", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power' /v HiberbootEnabled /t REG_DWORD /d 0 /f", risk: "warn", rec: ["perf", "work"], desc: "Отключает быстрый запуск — чистая загрузка системы.", tip: "Загрузка станет на 5-10 сек медленнее, но система стабильнее и обновления ставятся чище." },
  ],
  "GPU": [
    { name: "HAGS ON", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v HwSchMode /t REG_DWORD /d 2 /f", risk: "warn", rec: ["gaming"], desc: "Аппаратный планировщик GPU (Windows 11). Требует совместимый драйвер.", tip: "Требует Windows 10 2004+ и совместимый драйвер GPU. Перезагрузка обязательна." },
    { name: "GPU Priority = 8", cmd: "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'GPU Priority' /t REG_DWORD /d 8 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Приоритет GPU для игр в Multimedia SystemProfile.", tip: "Безопасно — влияет только на приложения в папке Games SystemProfile." },
    { name: "Max PreRendered = 1", cmd: "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v MaxFrameLatency /t REG_DWORD /d 1 /f", risk: "safe", rec: ["gaming", "perf"], desc: "MaxFrameLatency = 1 — минимальная задержка кадра.", tip: "Может вызвать микро-фризы при нестабильном FPS — снижает input lag ценой плавности." },
    { name: "Flip Model ON", cmd: "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v FlipModelSwapchain /t REG_DWORD /d 1 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Включает Flip Model для приложений DirectX.", tip: "Включает более эффективную модель presentation. Уменьшает задержку отрисовки." },
    { name: "DWM Optimize", cmd: "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\DWM' /v OverlayTestMode /t REG_DWORD /d 5 /f", risk: "warn", rec: ["gaming", "perf"], desc: "OverlayTestMode = 5 — оптимизация Desktop Window Manager.", tip: "Убирает лишние оверлеи DWM. Визуально ничего не меняется, но overhead меньше." },
    { name: "TDR Delay 8", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDelay /t REG_DWORD /d 8 /f", risk: "warn", rec: ["gaming", "perf"], desc: "Таймаут сброса GPU 8 секунд — безопаснее нуля, снижает ложные TDR.", tip: "По умолчанию 2 сек — мало для тяжёлых вычислений. 8 сек — безопасный компромисс." },
    { name: "GPU Preemption OFF", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v GpuPreemption /t REG_DWORD /d 0 /f", risk: "warn", rec: ["gaming", "perf"], desc: "Отключает вытеснение GPU — ниже латентность, возможны фризы.", tip: "Снижает input lag, но может вызвать микро-фризы в некоторых играх. Тестируйте." },
    { name: "NVIDIA Threaded Opt ON", cmd: "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v PerfLevelSrc /t REG_DWORD /d 8738 /f; reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v DisableP9Powersaving /t REG_DWORD /d 1 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Потоковая оптимизация драйвера NVIDIA.", tip: "Для NVIDIA GPU. Отключение P9 убирает микро-фризы при смене нагрузки." },
    { name: "NVIDIA Ultra Low Latency", cmd: "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v UltraLowLatencyMode /t REG_DWORD /d 1 /f", risk: "safe", rec: ["gaming"], desc: "Ультра-низкая задержка для NVIDIA GPU.", tip: "Для GPU NVIDIA GTX 10xx+. На AMD — не действует. Перезагрузка нужна." },
  ],
  "Сеть": [
    { name: "Network Throttling OFF", cmd: "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Убирает ограничение сетевого трафика системой.", tip: "Рекомендуется для стриминга, онлайн-игр и загрузок. Полностью безопасно." },
    { name: "Nagle OFF", cmd: "Get-NetAdapter | Where-Object {$_.Status -eq 'Up'} | ForEach-Object { $id = $_.InterfaceGuid; reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\$id\" /v TcpAckFrequency /t REG_DWORD /d 1 /f; reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\$id\" /v TCPNoDelay /t REG_DWORD /d 1 /f }", risk: "warn", rec: ["gaming"], desc: "TCPNoDelay на активных адаптерах — меньше пинг, чуть больше трафика.", tip: "Влияет на ICMP-пинг — может вырасти на 1-2 мс. Для онлайн-игр — однозначно лучше." },
    { name: "MaxUserPort 65534", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v MaxUserPort /t REG_DWORD /d 65534 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Максимум одновременных TCP-портов.", tip: "Стандарт 5000 — мало для торентов/стриминга. 65534 — максимум, безопасно." },
    { name: "TcpTimedWaitDelay 30", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Быстрое освобождение закрытых портов.", tip: "Ускоряет переподключение. Стандарт 120с — пережиток, 30с безопасно для всех." },
    { name: "TCP Fast Open", cmd: "netsh int tcp set global fastopen=enabled 2>$null", risk: "safe", rec: ["gaming"], desc: "Ускоряет установку TCP-соединений.", tip: "Безопасно. Работает с современными серверами, не поддерживающие TFO не пострадают." },
    { name: "DNS → Cloudflare 1.1.1.1", cmd: "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('1.1.1.1','1.0.0.1') -ErrorAction SilentlyContinue", risk: "warn", rec: ["gaming", "work"], desc: "Меняет DNS на Cloudflare (1.1.1.1 / 1.0.0.1).", tip: "Самый быстрый публичный DNS. Можно вернуть через «Восстановить DNS» в Fixes." },
    { name: "DNS → Google 8.8.8.8", cmd: "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('8.8.8.8','8.8.4.4') -ErrorAction SilentlyContinue", risk: "warn", rec: ["work"], desc: "Меняет DNS на Google (8.8.8.8 / 8.8.4.4).", tip: "Стабильный и проверенный DNS от Google. Подходит для офисной работы." },
  ],
  "Память": [
    { name: "DisablePagingExecutive", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v DisablePagingExecutive /t REG_DWORD /d 1 /f", risk: "warn", rec: ["gaming", "perf"], desc: "Ядро и драйверы всегда в ОЗУ.", tip: "Только для 16+ ГБ RAM. На 8 ГБ и меньше будет нехватка памяти." },
    { name: "Paging ON", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v DisablePagingExecutive /t REG_DWORD /d 0 /f", risk: "safe", rec: ["work", "battery"], desc: "Стандартный пейджинг ядра.", tip: "Стандартное поведение Windows. Безопасно для всех систем." },
    { name: "LargeSystemCache OFF", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v LargeSystemCache /t REG_DWORD /d 0 /f", risk: "safe", rec: ["gaming", "work"], desc: "Обычный файловый кэш (не серверный).", tip: "Для десктопа — оптимально. Серверный режим LargeSystemCache не нужен." },
    { name: "ClearPageFileAtShutdown OFF", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v ClearPageFileAtShutdown /t REG_DWORD /d 0 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Не чистить pagefile при выключении — быстрее выключение.", tip: "Ускоряет выключение на 10-30 сек. Для безопасности — оставьте ON." },
    { name: "LargePageMinimum 0", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management' /v LargePageMinimum /t REG_DWORD /d 0 /f", risk: "warn", rec: ["perf"], desc: "Разрешает большие страницы памяти.", tip: "Требует включённой опции в групповых политиках. Для специфичных приложений." },
  ],
  "Диски": [
    { name: "TRIM ON", cmd: "fsutil behavior set DisableDeleteNotify 0 | Out-Null", risk: "safe", rec: ["gaming", "perf", "work"], desc: "TRIM для SSD — поддержание скорости.", tip: "Критично для SSD. Без TRIM скорость записи падает со временем." },
    { name: "Last Access OFF", cmd: "fsutil behavior set disablelastaccess 1 | Out-Null", risk: "safe", rec: ["gaming", "perf"], desc: "Не обновлять метки последнего доступа — меньше нагрузки на диск.", tip: "Некоторые программы (роботы-архиваторы) могут полагаться на это. Обычно безопасно." },
    { name: "Hibernation OFF", cmd: "powercfg /hibernate off", risk: "warn", rec: ["gaming", "perf"], desc: "Отключает гибернацию — освобождает место, убирает быстрый запуск.", tip: "Освобождает место = объём RAM (16 ГБ RAM = 16 ГБ места). Ноутбук не будет гибернировать." },
    { name: "Hibernation ON", cmd: "powercfg /hibernate on", risk: "safe", rec: ["battery", "work"], desc: "Включает гибернацию и быстрый запуск.", tip: "Восстанавливает гибернацию и hiberfil.sys. Полезно для ноутбуков." },
    { name: "Disks no sleep", cmd: "powercfg /setacvalueindex scheme_current sub_disk DISKIDLE 0; powercfg /setactive scheme_current", risk: "warn", rec: ["gaming", "perf"], desc: "Диск не засыпает — ниже задержки, выше потребление.", tip: "Только для десктопов. На ноутбуках — HDD будет издавать шум при простоях." },
    { name: "AHCI Link Power OFF", cmd: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power' /v AhciLinkPowerManagement /t REG_DWORD /d 0 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power' /v AhciHipmDState /t REG_DWORD /d 0 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Отключает энергосбережение AHCI — быстрее пробуждение SSD.", tip: "SSD быстрее откликается после простоя. Немного повышает нагрев." },
  ],
  "Ввод": [
    { name: "Mouse Acceleration OFF", cmd: "reg add 'HKCU\\Control Panel\\Mouse' /v MouseSpeed /t REG_SZ /d 0 /f; reg add 'HKCU\\Control Panel\\Mouse' /v MouseThreshold1 /t REG_SZ /d 0 /f; reg add 'HKCU\\Control Panel\\Mouse' /v MouseThreshold2 /t REG_SZ /d 0 /f", risk: "safe", rec: ["gaming"], desc: "Убирает ускорение мыши.", tip: "Для FPS-игр — обязательно. Мышь двигается пропорционально расстоянию физически." },
    { name: "Pointer Precision OFF", cmd: "reg add 'HKCU\\Control Panel\\Mouse' /v MouseSensitivity /t REG_SZ /d 10 /f", risk: "safe", rec: ["gaming"], desc: "Снимает повышение точности указателя.", tip: "Убирает 'ускорение на малых расстояниях'. Стабильнее и предсказуемее." },
  ],
  "Система и фон": [
    { name: "Edge Background OFF", cmd: "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v StartupBoostEnabled /t REG_DWORD /d 0 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v BackgroundModeEnabled /t REG_DWORD /d 0 /f", risk: "safe", rec: ["gaming", "perf", "work"], desc: "Запрещает фоновые процессы Edge.", tip: "Edge перестанет потреблять RAM и CPU в фоне. Экономия 200-400 МБ RAM." },
    { name: "Background Apps OFF", cmd: "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications' /v GlobalUserDisabled /t REG_DWORD /d 1 /f", risk: "safe", rec: ["gaming", "perf"], desc: "Запрещает фоновые приложения UWP.", tip: "UWP-приложения (Почта, Календарь) перестанут обновляться в фоне." },
    { name: "Background Apps ON", cmd: "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications' /v GlobalUserDisabled /t REG_DWORD /d 0 /f", risk: "safe", rec: ["work", "battery"], desc: "Разрешает фоновые приложения.", tip: "UWP-приложения снова работают в фоне. Полезно для мессенджеров." },
    { name: "Cortana OFF", cmd: "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search' /v AllowCortana /t REG_DWORD /d 0 /f", risk: "safe", rec: ["gaming", "perf", "work"], desc: "Отключает Кортану.", tip: "Поиск Windows продолжит работать — отключается только голосовой помощник." },
    { name: "Telemetry OFF", cmd: "Stop-Service DiagTrack -ErrorAction SilentlyContinue; Set-Service DiagTrack -StartupType Disabled -ErrorAction SilentlyContinue", risk: "safe", rec: ["gaming", "perf", "work"], desc: "Отключает службу телеметрии DiagTrack.", tip: "Windows перестаёт собирать данные об использовании. Функции не пострадают." },
  ],
};


//  HELPERS
// ============================================================

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v != null && v !== false) node.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
  }
  return node;
};

const SAFETY_LABEL = { safe: "Безопасно", warn: "Осторожно", danger: "Опасно" };

const showToast = (msg, type = "success", durationMs = 3000) => {
  const t = el("div", { class: `toast toast--${type}` }, msg);
  $("#toasts").appendChild(t);
  setTimeout(() => {
    t.classList.add("toast--out");
    t.addEventListener("animationend", () => t.remove());
  }, durationMs);
  return t;
};

const animateNumber = (node, target, duration = 700) => {
  const start = parseFloat(node.dataset.value || "0");
  const startTime = performance.now();
  const step = (now) => {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = start + (target - start) * eased;
    node.firstChild.textContent = value.toFixed(0);
    if (t < 1) requestAnimationFrame(step);
    else node.dataset.value = target;
  };
  requestAnimationFrame(step);
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const api = (method, ...args) => {
  try {
    const fn = window.pywebview?.api?.[method];
    if (!fn) { console.warn("api method not found:", method); return Promise.resolve(null); }
    return fn.call(window.pywebview?.api, ...args);
  } catch (e) {
    console.warn(`api.${method} failed:`, e);
    return Promise.resolve(null);
  }
};

const runTweakSafe = (cmd, timeoutMs = 20000) => {
  return new Promise((resolve) => {
    let done = false;
    const timer = setTimeout(() => {
      if (!done) { done = true; resolve({ ok: false, skipped: true, stdout: "", stderr: "timeout" }); }
    }, timeoutMs);
    api("run_tweak", cmd).then((r) => {
      if (!done) { done = true; clearTimeout(timer); resolve(r || { ok: false }); }
    }).catch(() => {
      if (!done) { done = true; clearTimeout(timer); resolve({ ok: false }); }
    });
  });
};

const runProTweakSafe = (cmd, timeoutMs = 20000) => {
  return new Promise((resolve) => {
    let done = false;
    const timer = setTimeout(() => {
      if (!done) { done = true; resolve({ ok: false, skipped: true, stdout: "", stderr: "timeout" }); }
    }, timeoutMs);
    api("run_pro_tweak", cmd).then((r) => {
      if (!done) { done = true; clearTimeout(timer); resolve(r || { ok: false }); }
    }).catch(() => {
      if (!done) { done = true; clearTimeout(timer); resolve({ ok: false }); }
    });
  });
};

// ============================================================
//  GLOBAL APPLY QUEUE — единый флоу: очередь → подтверждение → прогресс
// ============================================================

const QUEUE_SEP = "\u0000";
const QUEUE = new Map();
const queueSubs = new Set();
let queueApplying = false;

const queueKey = (section, name) => section + QUEUE_SEP + name;
const queueItems = () => Array.from(QUEUE.values());
const queueCount = () => QUEUE.size;
const isQueued = (section, name) => QUEUE.has(queueKey(section, name));

const onQueueChange = (fn) => { queueSubs.add(fn); return () => queueSubs.delete(fn); };

const emitQueueChange = () => {
  refreshQueueBar();
  queueSubs.forEach((fn) => { try { fn(); } catch (e) { console.warn("queue sub:", e); } });
};

const queueCmdKey = (item) => {
  const c = (item.cmd || item.name || "").replace(/\s+/g, " ").trim();
  return "cmd:" + c;
};

const queueCmdTaken = (item) => {
  const ck = queueCmdKey(item);
  if (!ck) return false;
  for (const it of QUEUE.values()) {
    if (queueCmdKey(it) === ck) return true;
  }
  return false;
};

const toggleQueued = (item) => {
  const key = queueKey(item.section, item.name);
  if (QUEUE.has(key)) { QUEUE.delete(key); emitQueueChange(); return false; }
  if (queueCmdTaken(item)) { showToast("Этот твик уже в очереди", "info"); return QUEUE.has(key); }
  QUEUE.set(key, item);
  emitQueueChange();
  return true;
};

const stageQueued = (items) => {
  let added = 0;
  items.forEach((it) => {
    const key = queueKey(it.section, it.name);
    if (QUEUE.has(key)) return;
    if (queueCmdTaken(it)) return;
    QUEUE.set(key, it);
    added++;
  });
  emitQueueChange();
  return added;
};

const clearQueue = () => { QUEUE.clear(); emitQueueChange(); };

const pluralActions = (n) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "действие";
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return "действия";
  return "действий";
};

let queueBarEl = null;
const refreshQueueBar = () => {
  if (!queueBarEl) {
    queueBarEl = el("div", { class: "queue-bar", id: "queueBar" });
    document.body.appendChild(queueBarEl);
  }
  const n = QUEUE.size;
  queueBarEl.classList.toggle("queue-bar--visible", n > 0);
  queueBarEl.innerHTML = "";
  if (!n) return;
  queueBarEl.appendChild(el("span", { class: "queue-bar__count" }, `${n} ${pluralActions(n)}`));
  const clear = el("button", { class: "btn btn--soft btn--sm" },
    el("span", { class: "btn__icon", html: ICONS.cross }),
    el("span", { class: "btn__label" }, "Очистить"));
  clear.addEventListener("click", () => clearQueue());
  const apply = el("button", { class: "btn btn--primary btn--lg" },
    el("span", { class: "btn__icon", html: ICONS.zap }),
    el("span", { class: "btn__label" }, `Применить (${n})`));
  apply.addEventListener("click", async () => {
    if (queueApplying) return;
    const result = await openQueueConfirm();
    if (!result) return;
    runQueueApply(result.restorePoint);
  });
  queueBarEl.appendChild(clear);
  queueBarEl.appendChild(apply);
};

const openQueueConfirm = () => new Promise((resolve) => {
  const items = queueItems();
  if (!items.length) { resolve(false); return; }
  const secs = new Map();
  for (const it of items) {
    const sec = it.section || "Действия";
    if (!secs.has(sec)) secs.set(sec, new Map());
    const grps = secs.get(sec);
    const g = it.group || sec;
    if (!grps.has(g)) grps.set(g, []);
    grps.get(g).push(it);
  }
  const danger = items.filter((it) => it.risk === "danger").length;

  const overlay = el("div", { class: "modal-overlay" });
  const modal = el("div", { class: "modal modal--wide" });
  const content = el("div", { class: "modal__content" });
  const close = (val) => { overlay.remove(); resolve(val); };

  content.appendChild(el("h3", { class: "modal__title" }, `Подтверждение — ${items.length} ${pluralActions(items.length)}`));
  content.appendChild(el("p", { class: "modal__sub" }, "Применение по секциям. Выбери, нужна ли точка восстановления перед запуском."));

  let confirmInput = null;
  const _prefConfirm = () => getSetting("confirm_danger", true);
  if (danger && _prefConfirm()) {
    content.appendChild(el("div", { class: "modal__warn" },
      el("span", { class: "modal__warn-icon", html: ICONS.alert }),
      el("span", { class: "modal__warn-text" }, `В очереди ${danger} ${danger === 1 ? "опасное действие" : "опасных действий"}. Для подтверждения введи KALASH.`),
    ));
    confirmInput = el("input", {
      type: "text",
      class: "search__input",
      placeholder: "Введи KALASH для опасных действий",
      style: "width:100%;margin:10px 0 4px;text-transform:uppercase;",
      autocomplete: "off",
    });
    content.appendChild(confirmInput);
  }

  const listWrap = el("div", { class: "modal__list" });
  for (const [sec, grps] of secs) {
    listWrap.appendChild(el("div", { class: "modal__section" },
      el("span", { class: "modal__section-name" }, sec),
      el("span", { class: "modal__section-count" }, String(Array.from(grps.values()).reduce((s, a) => s + a.length, 0))),
    ));
    for (const [g, list] of grps) {
      listWrap.appendChild(el("div", { class: "modal__group" },
        el("span", { class: "modal__group-label" }, g),
        el("span", { class: "modal__group-count" }, String(list.length)),
      ));
      for (const it of list) {
        listWrap.appendChild(el("div", { class: "modal__item" },
          el("span", { class: `badge badge--${it.risk || "warn"}` }, (REG_RISK_LABELS && REG_RISK_LABELS[it.risk]) || SAFETY_LABEL[it.risk] || "?"),
          el("span", { class: "modal__item-name" }, it.name),
        ));
      }
    }
  }
  content.appendChild(listWrap);

  const rpCheckbox = el("label", { class: "modal__rp-check", style: "display:flex;align-items:center;gap:10px;padding:14px 16px;margin:12px 0 0;background:rgba(255,255,255,0.06);border-radius:12px;cursor:pointer;font-size:14px;font-weight:600;color:var(--text-primary);user-select:none;" },
    el("input", { type: "checkbox", id: "rpCheckbox", style: "width:18px;height:18px;accent-color:var(--ios-green);cursor:pointer;", checked: getSetting("create_restore_point", true) }),
    el("span", { style: "display:flex;flex-direction:column;gap:2px;" },
      el("span", {}, "Создать точку восстановления"),
      el("span", { style: "font-size:11px;font-weight:500;color:var(--text-muted);" }, "Рекомендуется — позволит откатить изменения"),
    ),
  );
  content.appendChild(rpCheckbox);

  const btns = el("div", { class: "modal__actions" },
    el("button", { class: "btn btn--soft", id: "qConfirmCancel" }, "Отмена"),
    el("button", { class: "btn btn--primary", id: "qConfirmOk" },
      el("span", { class: "btn__icon", html: ICONS.check }),
      el("span", { class: "btn__label" }, "Подтвердить")),
  );
  btns.querySelector("#qConfirmCancel").addEventListener("click", () => close(false));
  btns.querySelector("#qConfirmOk").addEventListener("click", () => {
    if (danger && _prefConfirm()) {
      const v = (confirmInput?.value || "").trim().toUpperCase();
      if (v !== "KALASH") {
        showToast("Для опасных действий введи KALASH", "error");
        confirmInput?.focus();
        return;
      }
    }
    const cb = overlay.querySelector("#rpCheckbox");
    close({ restorePoint: cb ? cb.checked : true });
  });
  content.appendChild(btns);
  modal.appendChild(content);
  overlay.appendChild(modal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(false); });
  document.body.appendChild(overlay);
});

const queueSetItemStatus = (item, state) => {
  const st = item.querySelector(".reg-progress__status");
  item.classList.remove("reg-progress__item--pending", "reg-progress__item--working", "reg-progress__item--done", "reg-progress__item--fail");
  item.classList.add(`reg-progress__item--${state}`);
  st.innerHTML = "";
  if (state === "working") st.appendChild(el("span", { class: "spinner spinner--sm" }));
  else if (state === "done") st.appendChild(el("span", { class: "reg-progress__mark reg-progress__mark--ok", html: ICONS.check }));
  else if (state === "fail") st.appendChild(el("span", { class: "reg-progress__mark reg-progress__mark--bad", html: ICONS.cross }));
};

const runQueueApply = async (createRestorePoint = true) => {
  if (queueApplying) return;
  const items = queueItems();
  if (!items.length) return;
  queueApplying = true;
  try {
    const overlay = el("div", { class: "modal-overlay" });
    const modal = el("div", { class: "modal modal--wide" });
    const content = el("div", { class: "modal__content" });

    content.appendChild(el("div", { class: "reg-progress__head" },
      el("span", { class: "reg-progress__title" }, "Применяем настройки…"),
      el("span", { class: "reg-progress__counter" }, `0 / ${items.length}`),
    ));
    const fill = el("div", { class: "reg-progress__fill", style: "width:0%" });
    content.appendChild(el("div", { class: "reg-progress__bar" }, fill));
    const current = el("div", { class: "reg-progress__current" }, "Создание точки восстановления…");
    content.appendChild(current);

    const log = el("div", { class: "reg-progress__log" });
    items.forEach((it) => {
      log.appendChild(el("div", { class: "reg-progress__item reg-progress__item--pending" },
        el("span", { class: "reg-progress__status" }),
        el("span", { class: "reg-progress__group" }, it.group || it.section),
        el("span", { class: "reg-progress__name" }, it.name),
      ));
    });
    content.appendChild(log);

    const closeBtn = el("button", { class: "btn btn--primary btn--block", style: "display:none;margin-top:16px;" }, "Готово");
    content.appendChild(closeBtn);

    modal.appendChild(content);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const counter = overlay.querySelector(".reg-progress__counter");
    const logItems = Array.from(log.querySelectorAll(".reg-progress__item"));

    const hasDanger = items.some((it) => it.risk === "danger");
    let rp = null;
    if (createRestorePoint) {
      rp = await api("create_restore_point");
      current.textContent = rp?.ok ? "Точка восстановления создана" : "Точка не создана (System Protection может быть отключён)";
    } else {
      current.textContent = "Точка восстановления пропущена";
    }
    if (hasDanger && !createRestorePoint) {
      current.textContent = "Остановлено: для опасных действий обязательна точка восстановления";
      showToast("Для опасных действий нужно создать точку восстановления", "error");
      closeBtn.style.display = "";
      closeBtn.textContent = "Закрыть";
      closeBtn.addEventListener("click", () => overlay.remove());
      queueApplying = false;
      return;
    }
    if (hasDanger && createRestorePoint && !(rp && rp.ok)) {
      current.textContent = "Остановлено: для опасных действий нужна точка восстановления";
      showToast("Включи защиту системы и создай точку восстановления", "error");
      closeBtn.style.display = "";
      closeBtn.textContent = "Закрыть";
      closeBtn.addEventListener("click", () => overlay.remove());
      queueApplying = false;
      return;
    }

    let backedUp = 0;
    // Registry changes are recoverable only when the original key is saved
    // before application. This applies to every risk level, not just danger.
    const registryCmds = items.map((it) => it.cmd).filter((cmd) => /\breg\s+add\b/i.test(cmd || ""));
    if (registryCmds.length) {
      current.textContent = "Бэкап реестра перед применением…";
      const br = await api("backup_registry_keys", JSON.stringify(registryCmds));
      backedUp = br?.ok ? (br.backed_up || 0) : 0;
      if (!(br && br.ok)) current.textContent = "Бэкап реестра не создан (продолжаем без него)";
    }

    const appliedIds = [];
    let okCount = 0, failCount = 0;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      queueSetItemStatus(logItems[i], "working");
      current.textContent = `Применяю: ${it.name}`;
      counter.textContent = `${i + 1} / ${items.length}`;
      fill.style.width = `${Math.round((i / items.length) * 100)}%`;
      const timeout = it.timeout || ((it.cmd || "").toLowerCase().includes("dism") ? 120000 : 20000);
      const r = it.run ? await Promise.race([
        it.run(),
        new Promise((res) => setTimeout(() => res({ ok: false, stderr: "время применения истекло" }), timeout)),
      ])
        : isProSection(it.section)
          ? await runProTweakSafe(it.cmd, timeout)
          : await runTweakSafe(it.cmd, timeout);
      if (r && r.ok) {
        queueSetItemStatus(logItems[i], "done");
        okCount++;
        const tid = `${(it.section || "app")}|${it.name}`;
        appliedIds.push(tid);
        api("log_tweak_application", tid, it.name, it.cmd || it.name, (it.section || "app").toLowerCase().replace(/[^a-z0-9_]+/gi, "_"))
          .catch((e) => console.error("log_tweak_application:", e));
        QUEUE.delete(queueKey(it.section, it.name));
      } else {
        queueSetItemStatus(logItems[i], "fail");
        failCount++;
      }
      if (it.cmd && it.cmd.includes("powercfg")) await sleep(30);
    }
    if (appliedIds.length) api("bulk_mark_applied", JSON.stringify(appliedIds)).catch((e) => console.error("bulk_mark_applied:", e));
    fill.style.width = "100%";
    counter.textContent = `${items.length} / ${items.length}`;
    const allOk = failCount === 0;
    current.textContent = allOk ? "Все действия выполнены" : `Завершено: ${okCount} успешно, ${failCount} с ошибками`;
    emitQueueChange();

    const doneBox = el("div", { class: "reg-progress__done" },
      el("div", { class: `reg-progress__done-icon ${allOk ? "" : "reg-progress__done-icon--bad"}`, html: allOk ? ICONS.check : ICONS.alert }),
      el("div", { class: "reg-progress__done-title" }, allOk ? "ГОТОВО!" : "Завершено с ошибками"),
      el("div", { class: "reg-progress__done-text" }, allOk
        ? (backedUp ? `Готово! Бэкап реестра: ${backedUp} ключей. ` : "Готово! ") + "Перезагрузи игру, чтобы настройки вступили в силу. Удачи в бою!"
        : "Часть действий не удалась — перезагрузи игру и проверь настройки. Удачи в бою!"),
    );
    content.insertBefore(doneBox, closeBtn);

    closeBtn.style.display = "";
    closeBtn.innerHTML = "";
    closeBtn.appendChild(el("span", { class: "btn__icon", html: ICONS.zap }));
    closeBtn.appendChild(el("span", { class: "btn__label" }, "В бой!"));
    const done = () => overlay.remove();
    closeBtn.addEventListener("click", done);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) done(); });
  } finally {
    queueApplying = false;
  }
};

refreshQueueBar();

// ============================================================
//  NAV
// ============================================================

let activeCategory = "home";
let APP_VERSION = "2.0"; // fallback until get_app_version() resolves in boot()
let searchQuery = "";
let activeIntervals = [];
const clearActiveIntervals = () => { activeIntervals.forEach(id => clearInterval(id)); activeIntervals = []; monitoringInterval = null; };

const renderNav = (filterText = "") => {
  const nav = $("#nav");
  if (!nav) return;
  nav.innerHTML = "";
  const q = (filterText || "").trim().toLowerCase();
  let visible = 0;
  let lastDivider = null;

  for (const cat of CATEGORIES) {
    if (cat.divider) {
      lastDivider = cat.divider;
      continue;
    }
    if (cat.id === "deep" && isWin11()) continue;
    if (q && !cat.label.toLowerCase().includes(q) && !(cat.id || "").includes(q)) continue;

    if (lastDivider && !q) {
      nav.appendChild(el("div", { class: "nav__divider" }, lastDivider));
      lastDivider = null;
    }

    const count = getCategoryCount(cat.id);
    const classes = [
      "nav__item",
      cat.id === activeCategory ? "active" : "",
      cat.hot ? "nav__item--hot" : "",
      cat.danger ? "nav__item--danger" : "",
    ].filter(Boolean).join(" ");

    const item = el("div",
      {
        class: classes,
        "data-id": cat.id,
        onclick: () => setCategory(cat.id),
      },
      el("span", { class: "nav__icon-wrap" },
        el("span", { class: "nav__icon", html: cat.icon }),
      ),
      el("span", { class: "nav__label" }, cat.label),
      (cat.hot ? el("span", { class: "nav__hot" }, "ХИТ") : (count != null ? el("span", { class: "nav__count" }, String(count)) : null)),
    );
    nav.appendChild(item);
    visible += 1;
  }

  if (!visible) {
    nav.appendChild(el("div", { class: "nav__divider" }, "Ничего не найдено"));
  }
};

const RECENT_KEY = "kalash_recent_cats";
const getRecentCats = () => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
};
const pushRecentCat = (id) => {
  if (!id || id === "home") return;
  const next = [id, ...getRecentCats().filter((x) => x !== id)].slice(0, 5);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch {}
};


const FAV_KEY = "kalash_favorites";
const getFavorites = () => {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); } catch { return []; }
};
const isFavorite = (section, name) => getFavorites().some((f) => f.section === section && f.name === name);
const toggleFavorite = (item) => {
  const list = getFavorites().filter((f) => !(f.section === item.section && f.name === item.name));
  if (list.length === getFavorites().length) list.unshift({ section: item.section, name: item.name, cmd: item.cmd, risk: item.risk || "safe" });
  try { localStorage.setItem(FAV_KEY, JSON.stringify(list.slice(0, 40))); } catch {}
  return isFavorite(item.section, item.name);
};

const setCategory = (id) => {
  if (id === activeCategory) return;
  activeCategory = id;
  searchQuery = "";
  pushRecentCat(id);
  try { localStorage.setItem("kalash_last_cat", id); } catch {}
  $$(".nav__item").forEach((n) => n.classList.toggle("active", n.dataset.id === id));
  closeCmdk();
  renderContent();
};

// ============================================================
//  TWEAK BUILDERS
// ============================================================

const buildBadge = (safety) => {
  const cls = safety === "safe" ? "badge--safe"
            : safety === "danger" ? "badge--danger" : "badge--warn";
  return el("span", { class: `badge ${cls}` }, SAFETY_LABEL[safety]);
};

const buildCompatBadge = (compat) => {
  if (!compat) return null;
  const labels = { nvidia: ["NVIDIA", "badge--nvidia"], amd: ["AMD", "badge--amd"], intel: ["Intel", "badge--intel"], any: null };
  const [label, cls] = labels[compat] || [compat, "badge--warn"];
  return cls ? el("span", { class: `badge ${cls}` }, label) : null;
};

let APPLIED_STATE = {};
let pageTransTimer = null;
const PAGE_TRANS_MS = 200;
let APP_SETTINGS = { theme: "dark", confirm_danger: true, create_restore_point: true, autostart: false, notify_applied: true };
const refreshSettings = async () => {
  try {
    const r = await api("get_settings");
    if (r?.ok && r.settings) {
      APP_SETTINGS = Object.assign({}, APP_SETTINGS, r.settings);
      document.body.classList.toggle("theme-light", APP_SETTINGS.theme === "light");
    }
  } catch {}
};
const getSetting = (key, dflt) => (key in APP_SETTINGS ? APP_SETTINGS[key] : dflt);
const refreshAppliedState = async () => {
  try {
    const r = await api("get_tweaks_state");
    if (r?.ok && r.state) APPLIED_STATE = r.state;
  } catch {}
};
const isApplied = (section, name) => {
  const tid = `${section}|${name}`;
  return !!(APPLIED_STATE[tid] && APPLIED_STATE[tid].applied);
};

const buildTweakRow = ([title, command, safety, desc, compat, tip], index = 0, opts = {}) => {
  const sectionName = (TITLES[activeCategory] ? TITLES[activeCategory][0] : activeCategory) || "Твики";
  const proCat = PRO_CATS.has(activeCategory);
  const isLocked = false;
  const toggle = el("div", {
    class: `ios-toggle${safety === "danger" ? " ios-toggle--danger" : ""}${isLocked ? " ios-toggle--locked" : ""}`,
    role: "button",
    tabindex: "0",
    title: "Добавить в очередь",
  });
  if (isLocked) toggle.appendChild(el("span", { class: "ios-toggle__lock", html: ICONS.lock }));

  const sync = () => {
    const s = isQueued(sectionName, title);
    toggle.classList.toggle("ios-toggle--on", s);
  };

  const onToggle = () => {
    if (isLocked) { showToast(PRO_LOCK_MSG, "info"); return; }
    toggleQueued({
      section: sectionName,
      group: sectionName,
      name: title,
      cmd: command,
      risk: safety,
      timeout: /dism|\/Cleanup-Image/i.test(command) ? 120000 : 20000,
      run: (opts.pro || proCat) ? () => api("run_pro_tweak", command) : undefined,
    });
    sync();
  };
  toggle.addEventListener("click", onToggle);
  toggle.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } });

  const favBtn = el("button", {
    type: "button",
    class: `fav-btn${isFavorite(sectionName, title) ? " fav-btn--on" : ""}`,
    title: "В избранное",
  }, "★");
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isLocked) { showToast(PRO_LOCK_MSG, "info"); return; }
    const on = toggleFavorite({ section: sectionName, name: title, cmd: command, risk: safety });
    favBtn.classList.toggle("fav-btn--on", on);
    showToast(on ? "В избранном" : "Убрано из избранного", "success");
  });

  sync();

  const badges = [buildBadge(safety), buildCompatBadge(compat)];
  if (isApplied(sectionName, title)) badges.push(el("span", { class: "badge badge--safe" }, "Применено"));

  const infoBtn = desc ? el("button", { class: "tweak-info-btn", "data-name": title, "data-desc": desc, "data-tip": tip || "", "data-safety": safety || "", html: ICONS.info }) : null;

  return el("div",
    { class: `tweak${isLocked ? " tweak--locked" : ""}`, style: `animation-delay: ${Math.min(index, 24) * 16}ms` },
    favBtn,
    el("div", { class: "tweak__main" },
      el("div", { class: "tweak__head" },
        el("div", { class: "tweak__title" }, title),
        el("div", { class: "tweak__badges" }, ...badges.filter(Boolean)),
      ),
      el("div", { class: "tweak__desc" }, desc),
    ),
    el("div", { class: "tweak__actions" }, infoBtn, toggle),
  );
};

const buildSearchBar = (placeholder, onChange) => {
  const input = el("input", {
    type: "text",
    class: "search__input",
    placeholder: placeholder || "Поиск…",
    value: searchQuery,
  });
  let timer = null;
  input.addEventListener("input", (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchQuery = e.target.value;
      onChange();
    }, 100);
  });
  return el("div", { class: "search" },
    el("span", { class: "search__icon", html: ICONS.search }),
    input,
  );
};

// ============================================================
//  HOME
// ============================================================

const renderHome = () => {
  const healthRingFg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  healthRingFg.setAttribute("class", "health-ring__fg");
  healthRingFg.setAttribute("cx", "70"); healthRingFg.setAttribute("cy", "70"); healthRingFg.setAttribute("r", "58");
  healthRingFg.setAttribute("stroke-dasharray", "364.42");
  healthRingFg.setAttribute("stroke-dashoffset", "364.42");

  const healthSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  healthSvg.setAttribute("viewBox", "0 0 140 140");
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  grad.setAttribute("id", "healthGrad");
  grad.setAttribute("x1", "0%"); grad.setAttribute("y1", "0%");
  grad.setAttribute("x2", "100%"); grad.setAttribute("y2", "100%");
  const s1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  s1.setAttribute("offset", "0%"); s1.setAttribute("stop-color", "#34C759");
  const s2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  s2.setAttribute("offset", "100%"); s2.setAttribute("stop-color", "#30B350");
  grad.appendChild(s1); grad.appendChild(s2);
  defs.appendChild(grad);
  healthSvg.appendChild(defs);
  const hBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hBg.setAttribute("class", "health-ring__bg");
  hBg.setAttribute("cx", "70"); hBg.setAttribute("cy", "70"); hBg.setAttribute("r", "58");
  healthSvg.appendChild(hBg);
  healthSvg.appendChild(healthRingFg);

  const recent = getRecentCats()
    .map((id) => CATEGORIES.find((c) => c.id === id))
    .filter(Boolean);

  return el("div", {},
    el("div", { class: "hero" },
      el("h1", { class: "hero__title", html: `KALASH<sup>v${APP_VERSION}</sup>` }),
      el("p", { class: "hero__sub" },
        "Легкая и быстрая настройка твоего железа."),
      el("div", { class: "hero__actions" },
        el("button",
          { class: "btn btn--ghost btn--lg", onclick: () => setCategory("optimize") },
          el("span", { class: "btn__icon", html: ICONS.optimize }),
          el("span", {}, "Оптимизация")),
        el("button",
          { class: "btn btn--ghost btn--lg", onclick: () => openCmdk() },
          el("span", { class: "btn__icon", html: ICONS.search }),
          el("span", {}, "Поиск")),
      ),
      el("div", { class: "home-control" },
        el("button", { class: "home-control__btn", type: "button", onclick: async () => {
          const r = await api("create_restore_point");
          showToast(r?.ok ? "Точка восстановления создана" : (r?.stderr || "Не удалось создать точку"), r?.ok ? "success" : "error");
        }}, el("span", { html: ICONS.restore }), el("span", {}, "Точка восстановления")),
        el("button", { class: "home-control__btn", type: "button", onclick: async () => {
          const r = await api("export_system_snapshot_dialog");
          if (r?.ok) { showToast(`Настройки сохранены (${r.settings_count} параметров)`, "success"); api("open_export_folder"); }
          else if (!r?.canceled) showToast(r?.stderr || "Не удалось экспортировать настройки", "error");
        }}, el("span", { html: ICONS.upload }), el("span", {}, "Экспорт настроек")),
        el("button", { class: "home-control__btn", type: "button", onclick: async () => {
          const r = await api("import_system_snapshot_dialog");
          if (r?.ok) {
            const total = (r.reg_applied || 0) + (r.power_applied || 0);
            const errCount = (r.errors || []).length;
            let msg = `Применено: ${total} настроек (реестр: ${r.reg_applied}, питание: ${r.power_applied})`;
            if (errCount) msg += `. Ошибок: ${errCount}`;
            showToast(msg, errCount ? "warn" : "success");
            if (r.reg_details && r.reg_details.length) {
              console.log("Snapshot import details:", r.reg_details);
            }
            await refreshAppliedState();
          }
          else if (!r?.canceled) showToast(r?.stderr || "Не удалось импортировать настройки", "error");
        }}, el("span", { html: ICONS.download }), el("span", {}, "Импорт настроек")),
        el("button", { class: "home-control__btn", type: "button", onclick: () => setCategory("history") },
          el("span", { html: ICONS.clock }), el("span", {}, "История / откат")),
        el("button", { class: "home-control__btn", type: "button", onclick: async () => {
          showToast("Проверяю обновления…", "info", 3000);
          await checkUpdateOnBoot(false);
        }}, el("span", { html: ICONS.search }), el("span", {}, "Проверить обновления")),
        el("button", { class: "home-control__btn", type: "button", onclick: async () => {
          const confirmed = window.confirm(
            "Добавить KALASH TWEAKER в исключения Windows Defender?\n\n" +
            "Это отключает проверку папки и процесса приложения антивирусом. " +
            "Делай это только если Defender ложно детектит саму программу " +
            "(типично для PyInstaller-сборок) — не для обхода защиты системы."
          );
          if (!confirmed) return;
          const r = await api("add_defender_exclusion", true);
          showToast(r?.ok
            ? `Добавлено в исключения Defender: ${r?.exe || ""}`
            : (r?.stderr || "Не удалось добавить исключение"), r?.ok ? "success" : "error");
        }}, el("span", { html: ICONS.shield }), el("span", {}, "Исключить в Defender")),
      ),
      recent.length ? el("div", { class: "recent-chips" },
        ...recent.map((c) =>
          el("button", { class: "recent-chip", type: "button", onclick: () => setCategory(c.id) },
            el("span", { html: c.icon }),
            el("span", {}, c.label),
          )
        )
      ) : null,
    ),

    el("div", { class: "quick-actions" },
      ...[
        { label: "Оптимизация", sub: "1 клик", icon: ICONS.optimize, cls: "blue", cat: "optimize" },
        { label: "Очистка", sub: "Кэши", icon: ICONS.clean, cls: "green", cat: "clean" },
        { label: "Исправления", sub: "Fix pack", icon: ICONS.fix, cls: "orange", cat: "fixes" },
        { label: "Процессы", sub: "CPU/RAM", icon: ICONS.process, cls: "purple", cat: "processes" },
      ].map((a) =>
        el("div", { class: "quick-action", onclick: () => setCategory(a.cat) },
          el("div", { class: `quick-action__icon quick-action__icon--${a.cls}`, html: a.icon }),
          el("div", { class: "quick-action__label" }, a.label),
          el("div", { class: "quick-action__sub" }, a.sub),
        )
      ),
    ),

    el("div", { class: "home-grid" },
      el("div", { class: "health-card", id: "healthCard" },
        el("div", { class: "health-ring" },
          healthSvg,
          el("div", { class: "health-ring__value" },
            el("div", { class: "health-ring__num", id: "healthScore" }, "—"),
            el("div", { class: "health-ring__label" }, "Оптимизировано"),
          ),
        ),
        el("div", { class: "health-card__status", id: "healthStatus" }, "Загрузка данных…"),
      ),
      el("div", { class: "sys-strip", id: "sysStrip" },
        el("div", { class: "sys-strip__item" },
          el("div", { class: "sys-strip__label" }, "Процессор"),
          el("div", { class: "sys-strip__value", id: "sysCpu" }, "—"),
          el("div", { class: "sys-strip__sub", id: "sysCpuSub" }, "—"),
        ),
        el("div", { class: "sys-strip__item" },
          el("div", { class: "sys-strip__label" }, "Windows"),
          el("div", { class: "sys-strip__value", id: "sysWin" }, "—"),
          el("div", { class: "sys-strip__sub", id: "sysWinSub" }, "—"),
        ),
        el("div", { class: "sys-strip__item" },
          el("div", { class: "sys-strip__label" }, "CPU Temp"),
          el("div", { class: "sys-strip__value", id: "sysCpuTemp" }, "—"),
          el("div", { class: "sys-strip__sub" }, "температура"),
        ),
        el("div", { class: "sys-strip__item" },
          el("div", { class: "sys-strip__label" }, "GPU Temp"),
          el("div", { class: "sys-strip__value", id: "sysGpuTemp" }, "—"),
          el("div", { class: "sys-strip__sub" }, "температура"),
        ),
      ),
    ),

    el("div", { class: "section" },
      el("div", { class: "section__head" },
        el("div", { class: "section__title" }, "Мониторинг в реальном времени"),
        el("div", { class: "section__count" }, "обновляется каждую секунду"),
      ),
      (() => {
        const grid = el("div", { class: "stats-grid", id: "statsGrid" });
        for (const card of [
          { id: "cpu",    label: "Загрузка ЦП",  icon: ICONS.cpu },
          { id: "ram",    label: "Память",       icon: ICONS.ram },
          { id: "disk",   label: "Диск C:",      icon: ICONS.disk },
          { id: "uptime", label: "Аптайм",       icon: ICONS.clock, type: "raw" },
        ]) {
          grid.appendChild(buildStatCard(card));
        }
        return grid;
      })(),
    ),

    el("div", { class: "section" },
      el("div", { class: "section__head" },
        el("div", { class: "section__title" }, "Сообщество"),
      ),
      el("div", { class: "social" },
        buildSocialCard("Telegram-канал",  "@Kalash_Optimization", "https://t.me/Kalash_Optimization", ICONS.telegram, "#22d3ee"),
        buildSocialCard("Создатель",       "@WhyOtto77",   "https://t.me/WhyOtto77",  ICONS.user,     "#f97316"),
      ),
    ),

    el("div", { class: "reg-footer reg-footer--home" },
el("p", { class: "reg-footer__text" },
        "KALASH TWEAKER v2.0 · Otto.rpf",
      ),
    ),
  );
};

const buildStatCard = ({ id, label, icon, type }) => {
  const isPercent = type !== "raw";
  const valueEl = el("span", {}, "0");
  const subEl   = el("div", { class: "stat-card__sub" }, "—");
  const ringFg  = isPercent ? document.createElementNS("http://www.w3.org/2000/svg", "circle") : null;
  if (ringFg) {
    ringFg.setAttribute("class", "ring-progress__fg");
    ringFg.setAttribute("cx", "32"); ringFg.setAttribute("cy", "32"); ringFg.setAttribute("r", "26");
    ringFg.setAttribute("stroke-dasharray", "163.36");
    ringFg.setAttribute("stroke-dashoffset", "163.36");
  }

  const ring = isPercent ? el("div", { class: "ring-progress" },
    (() => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 64 64");
      const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      bg.setAttribute("class", "ring-progress__bg");
      bg.setAttribute("cx", "32"); bg.setAttribute("cy", "32"); bg.setAttribute("r", "26");
      svg.appendChild(bg);
      svg.appendChild(ringFg);
      return svg;
    })(),
  ) : null;

  return el("div", { class: "stat-card", "data-stat": id },
    el("div", { class: "stat-card__head" },
      el("div", { class: "stat-card__label" }, label),
      el("div", { class: "stat-card__icon", html: icon }),
    ),
    el("div", { class: "stat-card__body" },
      el("div", {},
        el("div", { class: "stat-card__value", "data-value-node": id, "data-value": "0" },
          valueEl,
          el("span", { class: "stat-card__value-suffix" }, isPercent ? "%" : "ч"),
        ),
        subEl,
      ),
      ring,
    ),
  );
};

const buildSocialCard = (name, handle, url, icon, accent) => {
  return el("div",
    { class: "social-card", style: `--accent:${accent}`, onclick: () => api("open_url", url) },
    el("div", { class: "social-card__icon", html: icon }),
    el("div", { class: "social-card__text" },
      el("div", { class: "social-card__name" }, name),
      el("div", { class: "social-card__handle" }, handle),
    ),
    el("span", { class: "social-card__arrow", html: ICONS.external }),
  );
};

// ============================================================
//  TWEAKS PAGES
// ============================================================

const TITLES = {
  clean:   ["Глубокая очистка",       "Удаляет временные файлы, кэши и журналы для освобождения места и стабильности."],
  cpu:     ["Оптимизация процессора", "Схемы питания, парковка ядер, приоритеты и таймеры для максимума FPS."],
  ram:     ["Настройка памяти",       "Управление кэшем, pagefile и приоритетами оперативной памяти."],
  gpu:     ["Оптимизация графики",    "HAGS, GPU-приоритеты, низкая задержка кадров, NVIDIA/AMD-фиксы."],
  net:     ["Сеть и низкий пинг",     "Алгоритмы TCP, DNS, MTU, IPv6 и сброс стека."],
  disk:    ["SSD-оптимизация",        "TRIM, кэширование, энергопотребление, отключение дефрагментации и лишних сервисов."],
  priv:    ["Приватность",            "Телеметрия, реклама, Cortana, история активности и геолокация."],
  cust:    ["Интерфейс",              "Контекстное меню, анимации, прозрачность, Snap Assist."],
  nuke_security: ["Нукер безопасности", "Полное отключение всех средств защиты Windows. Будет уничтожена безопасность системы — вирусы, руткиты и эксплойты работают без ограничений. Используйте только на свой страх и риск."],
  tools:   ["Системные инструменты",  "Запуск SFC, DISM, CHKDSK, перезапуск служб, сброс настроек."],
  input:   ["Мышь и клавиатура",      "Задержка ввода, буферизация HID-устройств, кривая ускорения курсора."],
  history: ["История твиков",          "Все применённые твики с возможностью отката каждого."],
  games:   ["Игры",                    "Оптимизация для FPS и низкого input lag."],
  nvidia:  ["NVIDIA",                  "Оптимизация NVIDIA GPU: панель, TDR, кэш шейдеров."],
  startup: ["Службы Windows",          "Отключение фоновых служб для CPU и RAM."],
  datacoll: ["Сбор данных",            "Телеметрия и сбор данных Windows."],
  perfosec: ["Производительность/Защита", "Безопасный баланс FPS и защиты. Жёсткое отключение Defender/Firewall — только в «Нукер безопасности»."],
};

const buildApplyAllButton = (groupName, items, isDangerCat) => {
  const btnClass = isDangerCat ? "btn btn--danger btn--sm" : "btn btn--primary btn--sm";
  const btn = el("button", { class: btnClass },
    el("span", { class: "btn__icon", html: ICONS.zap }),
    el("span", { class: "btn__label" }, "Применить все"),
  );
  btn.addEventListener("click", () => {
    if (PRO_CATS.has(activeCategory) && !PRO.activated) { showToast(PRO_LOCK_MSG, "info"); return; }
    const sectionName = (TITLES[activeCategory] ? TITLES[activeCategory][0] : activeCategory) || "Твики";
    const groupItems = items.map(([title, command, safety, desc]) => ({
      section: sectionName,
      group: groupName,
      name: title,
      cmd: command,
      risk: safety,
      timeout: 20000,
      run: PRO_CATS.has(activeCategory) ? () => api("run_pro_tweak", command) : undefined,
    }));
    stageQueued(groupItems);
    showToast(`В очередь добавлено ${groupItems.length} ${pluralActions(groupItems.length)}`, "success");
  });
  return btn;
};

const renderListPage = (id, title, desc, list, searchPlaceholder, sectionTitle) => {
  const body = el("div", { class: "tweaks", id: "tweaksBody" });
  const isGrouped = list && typeof list === "object" && !Array.isArray(list);
  const totalCount = isGrouped ? Object.values(list).reduce((n, a) => n + a.length, 0) : (list?.length || 0);

  const renderBody = () => {
    body.innerHTML = "";
    if (isGrouped) {
      for (const [groupName, groupItems] of Object.entries(list)) {
        const filtered = groupItems.filter((t) => tweakMatchesSearch(t, searchQuery));
        if (!filtered.length) continue;
        const isDanger = id === "nuke_security";
        const grpClass = isDanger ? "tweak-group tweak-group--danger" : "tweak-group";
        const grp = el("div", { class: grpClass },
          el("div", { class: "tweak-group__head" },
            el("span", { class: "tweak-group__title" }, groupName),
            el("div", { class: "tweak-group__actions" },
              el("span", { class: "tweak-group__count" }, `${filtered.length}`),
              buildApplyAllButton(groupName, filtered, isDanger),
            ),
          ),
        );
        const inner = el("div", { class: "tweaks" });
        filtered.forEach((t, i) => inner.appendChild(buildTweakRow(t, i)));
        grp.appendChild(inner);
        body.appendChild(grp);
      }
    } else {
      const f = (list || []).filter((t) => tweakMatchesSearch(t, searchQuery));
      if (!f.length) body.appendChild(el("div", { class: "empty" }, "Ничего не найдено."));
      else f.forEach((t, i) => body.appendChild(buildTweakRow(t, i)));
    }
    if (!body.children.length) body.appendChild(el("div", { class: "empty" }, "Ничего не найдено."));
  };
  renderBody();

  const catObj = CATEGORIES.find(c => c.id === id);
  const eyebrowClass = catObj?.danger ? "page-eyebrow page-eyebrow--danger" : "page-eyebrow";
  const eyebrowText = catObj?.danger ? "ОПАСНО" : "Категория";

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: eyebrowClass }, eyebrowText),
      el("h1", { class: "page-title" }, title),
      el("p", { class: "page-desc" }, desc),
    ),
    el("div", { class: "section__head section__head--with-search" },
      el("div", {},
        el("div", { class: "section__title" }, sectionTitle),
        el("div", { class: "section__count" }, `${totalCount} элементов`),
      ),
      buildSearchBar(searchPlaceholder, renderBody),
    ),
    body,
  );
};

const renderTweaksPage = (id) => {
  const [title, desc] = TITLES[id] || [id, ""];
  const page = renderListPage(id, title, desc, TWEAKS[id] || {}, "Поиск по твикам…", "Твики");

  if (id === "nuke_security") {
    const warnCard = el("div", { class: "pro-status__card", style: "margin-top:16px;border-color:rgba(239,68,68,.35);background:linear-gradient(180deg,rgba(239,68,68,.08),rgba(239,68,68,.02));" },
      el("div", { class: "pro-status__title", style: "color:#f87171;margin-bottom:6px;font-size:14px;" }, "⚠️ ВАЖНО: игры с античитами"),
      el("p", { class: "pro-status__desc", style: "margin:0 0 6px;", html: "Эти отключения <b>сломают запуск и баны в онлайн-играх с жёсткими античитами</b>:" }),
      el("div", { style: "font-size:13px;line-height:1.5;color:#e5e7eb;", html:
        "• <b>Valorant (Vanguard)</b> — обязателен Secure Boot, TPM 2.0 и HVCI. Отключение VBS/HVCI/Defender → ошибка «VAN 84/1067» или вход в аккаунт невозможен.<br/>" +
        "• <b>FACEIT AC (CS2/CS:GO, Kovaaks и др.)</b> — при старте требует включённую защиту памяти (HVCI) и VBS; без них матчмейкинг заблокирован, античит не запустится.<br/>" +
        "• <b>Riot Vanguard / EasyAntiCheat / BattlEye / Ricochet (CoD)</b> — также требуют совместимую защиту системы." }),
      el("div", { style: "margin-top:8px;font-size:13px;line-height:1.5;", html:
        "Для игры: <b>не отключай</b> из раздела «Гипервизор и ядро» пункты VBS/HVCI/Credential Guard, а также «Полный стоп Defender».<br/>" +
        "Если ты играешь в <b>Valorant</b> или на <b>FACEIT</b> — применяй нюкер безопасности только с осознанием, что античитам понадобятся включённые VBS/HVCI/Defender." }),
    );
    const bodyNode = page.querySelector("#tweaksBody");
    if (bodyNode) page.insertBefore(warnCard, bodyNode.parentNode.nextSibling);
    else page.appendChild(warnCard);

    // Единая кнопка «Применить все» — ставит весь нюкер в очередь.
    const nukeAll = el("button", { class: "btn btn--danger btn--lg btn--block", style: "margin-top:14px;" },
      el("span", { class: "btn__icon", html: ICONS.zap }),
      el("span", { class: "btn__label" }, "Применить все (весь нюкер безопасности)"),
    );
    const nukeItems = Object.values(TWEAKS[id] || {}).flatMap((grp) =>
      grp.map(([title, command, safety, desc]) => ({
        section: TITLES[id] ? TITLES[id][0] : "Нукер безопасности",
        group: id,
        name: title,
        cmd: command,
        risk: safety || "danger",
        timeout: 20000,
        run: () => api("run_tweak", command),
      }))
    );
    nukeAll.addEventListener("click", () => {
      if (getSetting("confirm_danger", true)) {
        showToast("Применение нюкера потребует указать секретное слово в подтверждении", "info");
      }
      const added = stageQueued(nukeItems);
      showToast(`В очередь добавлено ${added} ${pluralActions(added)}`, "success");
    });
    if (bodyNode) page.insertBefore(nukeAll, bodyNode.parentNode.nextSibling);
    else page.appendChild(nukeAll);
  }

  if (id === "clean") {
    const schedCard = el("div", { class: "pro-status__card", style: "margin-top:20px", id: "cleanupSched" },
      el("div", { class: "pro-status__title", style: "margin-bottom:8px" }, "⏰ Автоочистка по расписанию"),
      el("div", { class: "pro-status__desc" }, "Загрузка…"),
    );
    page.appendChild(schedCard);

    const loadSched = async () => {
      const r = await api("get_cleanup_schedule");
      schedCard.innerHTML = "";
      if (!r?.ok) {
        schedCard.appendChild(el("div", { class: "pro-status__desc" }, "Не удалось загрузить расписание."));
        return;
      }
      const freq = r.frequency || "daily";
      const time = r.time || "03:00";
      const enabled = !!r.enabled;

      const info = el("div", { class: "pro-status__desc" },
        enabled
          ? `Автоочистка включена: ${freq === "daily" ? "каждый день" : freq === "weekly" ? "каждую неделю" : "раз в месяц"} в ${time}`
          : "Автоочистка выключена."
      );
      schedCard.appendChild(info);

      const select = el("select", { class: "search__input", style: "width:auto;min-width:120px" },
        el("option", { value: "daily", selected: freq === "daily" }, "Каждый день"),
        el("option", { value: "weekly", selected: freq === "weekly" }, "Каждую неделю"),
        el("option", { value: "monthly", selected: freq === "monthly" }, "Раз в месяц"),
      );
      const timeInput = el("input", { type: "time", class: "search__input", style: "width:auto", value: time });
      const onBtn = el("button", { class: "btn btn--primary btn--lg" },
        el("span", { class: "btn__label" }, "Включить"));
      const offBtn = el("button", { class: "btn btn--soft btn--lg" },
        el("span", { class: "btn__label" }, "Выключить"));

      onBtn.addEventListener("click", async () => {
        onBtn.disabled = true;
        onBtn.querySelector(".btn__label").textContent = "Сохраняю…";
        const rr = await api("schedule_cleanup", select.value, timeInput.value || "03:00");
        if (rr?.ok) showToast("Автоочистка включена!", "success");
        else showToast(rr?.stderr || "Ошибка", "error");
        loadSched();
      });
      offBtn.addEventListener("click", async () => {
        offBtn.disabled = true;
        offBtn.querySelector(".btn__label").textContent = "Отключаю…";
        const rr = await api("schedule_cleanup", "off");
        if (rr?.ok) showToast("Автоочистка выключена.", "info");
        loadSched();
      });

      const controls = el("div", { class: "pro-status__row", style: "margin-top:10px;gap:8px;flex-wrap:wrap;align-items:center" },
        select, timeInput, onBtn,
      );
      if (enabled) controls.appendChild(offBtn);
      schedCard.appendChild(controls);
    };
    loadSched();
  }

  return page;
};

const renderStartup = () => {
  const list = SERVICES.map(([label, svc]) => [
    `Отключить: ${label}`,
    `Stop-Service ${svc} -ErrorAction SilentlyContinue; Set-Service ${svc} -StartupType Disabled -ErrorAction SilentlyContinue`,
    "safe",
    `Останавливает и отключает службу ${svc}.`,
  ]);
  return renderListPage("startup", "Службы Windows",
    "Отключение фоновых служб, которые большинству пользователей не нужны. Освобождает CPU и RAM.",
    list, "Поиск службы…", "Службы");
};

const domainOf = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return url; }
};

const renderApps = () => {
  const grid = el("div", { class: "apps-grid", id: "appsBody" });
  const buildRow = ([name, url], idx) => {
    const btn = el("button", { class: "btn btn--ghost app-row__btn" },
      el("span", { class: "btn__icon", html: ICONS.external }),
      el("span", { class: "btn__label" }, "Скачать"),
    );
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      const lbl = btn.querySelector(".btn__label");
      lbl.textContent = "Открываем…";
      const r = await api("open_url", url);
      if (r && r.ok) {
        showToast(`Открыта страница: ${name}`, "success");
        lbl.textContent = "Открыто";
      } else {
        showToast(`Не удалось: ${name}`, "error");
        lbl.textContent = "Ошибка";
      }
      setTimeout(() => { lbl.textContent = "Скачать"; btn.disabled = false; }, 2400);
    });
    return el("div", { class: "app-row", style: `animation-delay: ${Math.min(idx, 30) * 10}ms` },
      el("div", { class: "app-row__main" },
        el("div", { class: "app-row__name" }, name),
        el("div", { class: "app-row__id" }, domainOf(url)),
      ),
      btn,
    );
  };

  const renderBody = () => {
    grid.innerHTML = "";
    const ql = searchQuery.toLowerCase();
    const f = APPS.filter(([n, u]) => !ql || n.toLowerCase().includes(ql) || u.toLowerCase().includes(ql));
    if (!f.length) grid.appendChild(el("div", { class: "empty" }, "Ничего не найдено."));
    else f.forEach((a, i) => grid.appendChild(buildRow(a, i)));
  };
  APPS.forEach((a, i) => grid.appendChild(buildRow(a, i)));

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, "Скачивание"),
      el("h1", { class: "page-title" }, "Каталог приложений"),
      el("p", { class: "page-desc" },
        "Откроется страница загрузки на официальном сайте разработчика. " +
        "Никакой зависимости от winget или Microsoft Store — только прямые ссылки."),
    ),
    el("div", { class: "section__head section__head--with-search" },
      el("div", {},
        el("div", { class: "section__title" }, "Доступно"),
        el("div", { class: "section__count" }, `${APPS.length} приложений`),
      ),
      buildSearchBar("Поиск приложения…", renderBody),
    ),
    grid,
  );
};

const renderBench = () => {
  const setVal = (key, value) => {
    const node = $(`[data-bench="${key}"]`);
    if (!node) return;
    const unit = node.querySelector(".bench-card__unit");
    node.querySelector(".bench-card__num").textContent = value;
    if (unit) node.appendChild(unit);
  };

  const buildCard = (key, title, icon, unit, runFn) => {
    const valueEl = el("div", { class: "bench-card__value", "data-bench": key },
      el("span", { class: "bench-card__num" }, "—"),
      unit ? el("span", { class: "bench-card__unit" }, unit) : null,
    );
    const subEl = el("div", { class: "bench-card__sub" }, "не запущено");
    const btn = el("button", { class: "btn btn--ghost btn--block bench-card__btn" },
      el("span", { class: "btn__icon", html: ICONS.zap }),
      el("span", { class: "btn__label" }, "Запустить"),
    );
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      btn.querySelector(".btn__icon").replaceWith(el("span", { class: "spinner btn__icon" }));
      btn.querySelector(".btn__label").textContent = "Идёт тест…";
      subEl.textContent = "тестируем…";
      try {
        await runFn(setVal, subEl);
      } catch (e) {
        subEl.textContent = "ошибка";
      }
      btn.querySelector(".btn__icon")?.replaceWith(el("span", { class: "btn__icon", html: ICONS.zap }));
      btn.querySelector(".btn__label").textContent = "Запустить ещё раз";
      btn.disabled = false;
    });

    return {
      node: el("div", { class: "bench-card" },
        el("div", { class: "bench-card__head" },
          el("div", { class: "bench-card__icon", html: icon }),
          el("div", { class: "bench-card__title" }, title),
        ),
        valueEl,
        subEl,
        btn,
      ),
      run: async () => {
        try { await runFn(setVal, subEl); } catch (e) {}
      },
    };
  };

  let baseline = null;
  (async () => { baseline = await api("get_benchmark_baseline"); })();

  const levelLabel = (value, thresholds, higherIsBetter = true) => {
    if (!thresholds || value == null) return "";
    const { low, mid, high } = thresholds;
    const passed = higherIsBetter
      ? (value >= high ? 3 : value >= mid ? 2 : value >= low ? 1 : 0)
      : (value <= high ? 3 : value <= mid ? 2 : value <= low ? 1 : 0);
    return ["Ниже среднего", "Средне", "Хорошо", "Отлично"][passed];
  };

  const cpuCard = buildCard("cpu", "Процессор", ICONS.cpu, "MB/s",
    async (set, sub) => {
      const r = await api("run_cpu_bench");
      if (r?.ok) {
        set("cpu", r.sha256_mbs);
        const lvl = levelLabel(r.sha256_mbs, baseline?.cpu_sha256_mbs);
        sub.textContent = `SHA-256 · ${r.iterations} MB · ${r.duration_s}s${lvl ? " · " + lvl : ""}`;
      } else { sub.textContent = "ошибка"; }
    });

  const ramCard = buildCard("ram", "Память", ICONS.ram, "MB/s",
    async (set, sub) => {
      const r = await api("run_ram_bench");
      if (r?.ok) {
        set("ram", r.copy_mbs);
        const lvl = levelLabel(r.copy_mbs, baseline?.ram_copy_mbs);
        sub.textContent = `Memory copy · блок ${r.size_mb} MB${lvl ? " · " + lvl : ""}`;
      } else { sub.textContent = "ошибка"; }
    });

  const diskWriteCard = buildCard("disk_w", "Диск (запись)", ICONS.disk, "MB/s",
    async (set, sub) => {
      const r = await api("run_disk_bench");
      if (r?.ok) {
        set("disk_w", r.write_mbs);
        set("disk_r", r.read_mbs);
        const lvlW = levelLabel(r.write_mbs, baseline?.disk_write_mbs);
        const lvlR = levelLabel(r.read_mbs, baseline?.disk_read_mbs);
        sub.textContent = `Sequential · ${r.size_mb} MB${lvlW ? " · " + lvlW : ""}`;
        $(`[data-bench="disk_r"]`)?.parentElement.querySelector(".bench-card__sub")
          ?.replaceChildren(`Sequential · ${r.size_mb} MB${lvlR ? " · " + lvlR : ""}`);
      } else { sub.textContent = "ошибка"; }
    });

  const diskReadCard = buildCard("disk_r", "Диск (чтение)", ICONS.disk, "MB/s",
    async (set, sub) => {
      const r = await api("run_disk_bench");
      if (r?.ok) {
        set("disk_w", r.write_mbs);
        set("disk_r", r.read_mbs);
        const lvlW = levelLabel(r.write_mbs, baseline?.disk_write_mbs);
        const lvlR = levelLabel(r.read_mbs, baseline?.disk_read_mbs);
        sub.textContent = `Sequential · ${r.size_mb} MB${lvlR ? " · " + lvlR : ""}`;
        $(`[data-bench="disk_w"]`)?.parentElement.querySelector(".bench-card__sub")
          ?.replaceChildren(`Sequential · ${r.size_mb} MB${lvlW ? " · " + lvlW : ""}`);
      } else { sub.textContent = "ошибка"; }
    });

  const jitterCard = buildCard("jitter", "Таймер", ICONS.bench, "ms",
    async (set, sub) => {
      const r = await api("run_jitter_test");
      if (r?.ok && r.jitter != null) {
        set("jitter", r.jitter);
        const lvl = levelLabel(r.jitter, baseline?.jitter_ms, false);
        sub.textContent = `Jitter · avg ${r.avg} · min ${r.min} · max ${r.max}${lvl ? " · " + lvl : ""}`;
      } else { sub.textContent = "ошибка"; }
    });

  const allBtn = el("button", { class: "btn btn--primary btn--lg btn--block" },
    el("span", { class: "btn__icon", html: ICONS.zap }),
    el("span", { class: "btn__label" }, "Запустить все тесты"),
  );
  allBtn.addEventListener("click", async () => {
    allBtn.disabled = true;
    allBtn.querySelector(".btn__icon").replaceWith(el("span", { class: "spinner btn__icon" }));
    allBtn.querySelector(".btn__label").textContent = "Идёт прогон тестов…";
    await cpuCard.run();
    await ramCard.run();
    await diskWriteCard.run();
    await jitterCard.run();
    allBtn.querySelector(".btn__icon")?.replaceWith(el("span", { class: "btn__icon", html: ICONS.check }));
    allBtn.querySelector(".btn__label").textContent = "Готово · запустить ещё раз";
    showToast("Бенчмарк завершён", "success");
    setTimeout(() => {
      allBtn.querySelector(".btn__icon")?.replaceWith(el("span", { class: "btn__icon", html: ICONS.zap }));
      allBtn.querySelector(".btn__label").textContent = "Запустить все тесты";
      allBtn.disabled = false;
    }, 2000);
  });

  const sysInfoEl = el("div", { class: "sysinfo" },
    el("div", { class: "sysinfo__item" },
      el("div", { class: "sysinfo__label" }, "ПРОЦЕССОР"),
      el("div", { class: "sysinfo__value", id: "siCpu" }, "—"),
      el("div", { class: "sysinfo__sub", id: "siCpuSub" }, "—"),
    ),
    el("div", { class: "sysinfo__item" },
      el("div", { class: "sysinfo__label" }, "ВИДЕОКАРТА"),
      el("div", { class: "sysinfo__value", id: "siGpu" }, "—"),
      el("div", { class: "sysinfo__sub", id: "siGpuSub" }, "—"),
    ),
  );

  (async () => {
    try {
      const cpu = await api("get_cpu_info");
      if (cpu?.ok) {
        $("#siCpu").textContent = cpu.name;
        $("#siCpuSub").textContent = `${cpu.cores}C / ${cpu.threads}T · до ${cpu.max_ghz} GHz`;
      }
      const gpu = await api("get_gpu_info");
      if (gpu?.ok) {
        $("#siGpu").textContent = gpu.name;
        $("#siGpuSub").textContent = `${gpu.vram_gb} GB VRAM · driver ${gpu.driver}`;
      }
    } catch (e) {}
  })();

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, "Тестирование"),
      el("h1", { class: "page-title" }, "Бенчмарк системы"),
      el("p", { class: "page-desc" },
        "Реальные тесты CPU, RAM, диска и стабильности таймера. Запустите по отдельности или все сразу. " +
        "Сравните результаты до и после применения твиков."),
    ),
    sysInfoEl,
    el("div", { class: "bench-grid" },
      cpuCard.node,
      ramCard.node,
      diskWriteCard.node,
      diskReadCard.node,
      jitterCard.node,
    ),
    el("div", { class: "bench-allbtn" }, allBtn),
  );
};

// ============================================================
//  ONE-CLICK OPTIMIZE
// ============================================================

const renderOptimize = () => {
  // ── Умная оптимизация в один клик ─────────────────────────────────────
  // Сначала собираем реальное состояние ОС (план питания + ключевой реестр),
  // потом под нужды железа строим собственный план питания «с нуля» и догоняем
  // только те твики, которые ещё не выставлены оптимально. Пропускаем лишнее.
  const findTweak = (name) => {
    for (const arr of Object.values(OPTIMIZE_PACK)) {
      for (const t of arr) if (t[0] === name) return { it: t, pro: false };
    }
    for (const arr of Object.values(OPTIMIZE_PACK_PRO)) {
      for (const t of arr) if (t[0] === name) return { it: t, pro: true };
    }
    return null;
  };

  const diskLabel = (pc) => {
    const m = { ssd: "SSD", hdd: "HDD", mixed: "SSD + HDD", unknown: "неизвестно" };
    return (pc && m[pc.disk_type]) || "неизвестно";
  };
  // Панель «Подбор под железо»: показывает обнаруженные характеристики ПК,
  // по которым строится план питания и отбираются твики.
  const fillHwPanel = (a) => {
    const panel = document.getElementById("hwPanel");
    if (!panel) return;
    const pc = a.pc || {};
    const chip = (k, v) => el("span", { class: "hw-chip" },
      el("b", {}, k), " " + (v == null || v === "" ? "—" : v));
    const comps = [
      chip("ПК", pc.is_laptop ? "Ноутбук" : "Десктоп"),
      chip("CPU", pc.cpu_name),
      chip("Ядра", `${pc.cores || "?"}C / ${pc.threads || pc.cores || "?"}T`),
      chip("RAM", pc.ram_gb ? pc.ram_gb + " ГБ" : ""),
      chip("GPU", pc.gpu_name),
      chip("VRAM", pc.gpu_vram ? pc.gpu_vram + " ГБ" : ""),
      chip("Диск", diskLabel(pc)),
      chip("Сеть", pc.wifi === true ? "Wi-Fi" : pc.wifi === false ? "Проводная" : ""),
      chip("Профиль", profName(a)),
    ];
const smartSum = el("div", { class: "tweak-group__count", style: "margin-top:6px" },
        `План питания и твики собраны под эти характеристики. Профиль «${profName(a)}».` +
        ((PROF_RANK[(a.pc && a.pc.recommended) || "optimal"] ?? 1) < 1
          ? " Глубокие (hardcore) твики пропущены." : ""));
      panel.replaceChildren(el("div", { class: "tweak-group" },
        el("div", { class: "tweak-group__title" }, "ПОДБОР ПОД ЖЕЛЕЗО"),
        el("div", { class: "hw-chips" }, ...comps),
        smartSum,
        el("div", { id: "smartCounter", class: "smart-summary" },
          "Анализ не запускался — нажми «Умная оптимизация»."),
      ));
    panel.style.display = "";
  };

  // План питания под конкретное железо и профиль (фиксированный GUID → идемпотентно).
  const OPT_PLAN_GUID = "B2F0D8A3-6C9E-4A7B-8D1C-2E5F93A4B7C2";
  const OPT_PLAN_GUID_OLD = "B2F0D8A3-6C9E-4A7B-8D1C-2E5F93A4B7C1";
  const POWER_SRC = {
    desktop: "8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c",
    laptop: "381b4222-f694-41f0-9685-ff5bb260df2e",
    ultimate: "e9a42b02-d5df-448d-aa00-03f14749eb61",
  };
  const USB_SUSP_SG = "2a737441-1930-4402-8d77-b2bebba308a3";
  const USB_SUSP_SK = "48e6b7a6-50f5-4782-a5d4-53bb8f07e226";
  const COOL_POLICY = "94D3A615-A899-4AC5-AE2B-E4D8F634367F";
  const powerPlanCmd = (a, mode = "balanced") => {
    const g = OPT_PLAN_GUID;
    const oldG = OPT_PLAN_GUID_OLD;
    const pc = (a && a.pc) || {};
    const laptop = !!pc.is_laptop;
    const rec = pc.recommended || "optimal";
    const cpuVendor = pc.cpu_vendor || "unknown";
    const maxProfile = mode === "maximum" && !laptop;
    let base = POWER_SRC.desktop;
    if (laptop) base = POWER_SRC.laptop;
    else if (maxProfile) base = POWER_SRC.ultimate;
    else if (cpuVendor === "amd") base = POWER_SRC.laptop; // AMD: Balanced-база с CPPC + наши значения
    else base = POWER_SRC.desktop;
// Игровой режим на десктопе держит AC-минимальную частоту на 100%: CPU
    // не сбрасывает тактовую при чтении с диска/фоне, меньше просадок FPS.
    // На ноутбуке от сети оставляем 20% (нагрев/батарея), на бережном плане — 5%.
    const isGaming = mode === "gaming" || mode === "maximum";
    const cpuMinAc = mode === "maximum" && !laptop ? 100 : (isGaming ? (laptop ? 20 : 100) : 5);
    const AC = isGaming
      ? { disk: 0, usb: 0, pcie: 0, cpuMin: cpuMinAc, cpuMax: 100, boost: 2, incThr: 20, decThr: 80, cool: 1, sleep: laptop ? 900 : 0, hib: laptop ? 3600 : 0, hybrid: 0, unat: 0, video: laptop ? 300 : 0 }
      : { disk: 600, usb: 1, pcie: 1, cpuMin: 5, cpuMax: 100, boost: 2, incThr: 40, decThr: 60, cool: 0, sleep: 1800, hib: 7200, hybrid: 1, unat: 0, video: 600 };
    // От батареи всегда оставляем CPU возможность снижать частоту и сохраняем гибернацию.
    const DC = laptop
      ? { disk: 300, usb: 1, pcie: 1, cpuMin: 5, cpuMax: 100, boost: 2, incThr: 50, decThr: 50, cool: 0, sleep: 900, hib: 3600, hybrid: 1, unat: 0, video: 300 }
      : { ...AC };
    const FEAT = [
      ["sub_disk", "DISKIDLE", "disk"],
      ["sub_usb", `${USB_SUSP_SG} ${USB_SUSP_SK}`, "usb"],
      ["sub_pciexpress", "ASPM", "pcie"],
      ["sub_processor", "PROCTHROTTLEMIN", "cpuMin"],
      ["sub_processor", "PROCTHROTTLEMAX", "cpuMax"],
      ["sub_processor", "PROCPERFBOOSTMODE", "boost"],
      ["sub_processor", "PROCPERFINCTHRESHOLD", "incThr"],
      ["sub_processor", "PROCPERFDECTHRESHOLD", "decThr"],
      ["sub_processor", COOL_POLICY, "cool"],
      ["sub_sleep", "STANDBYIDLE", "sleep"],
      ["sub_sleep", "HIBERNATEIDLE", "hib"],
      ["sub_sleep", "ALLOWHYBRIDSLEEP", "hybrid"],
      ["sub_sleep", "UNATTENDTIMEOUTSLEEP", "unat"],
      ["sub_video", "VIDEOIDLE", "video"],
    ];
    let s = `$g='${g}'; $old='${oldG}'; `;
    s += `if (-not (powercfg -list | Select-String $g)) { try { powercfg -duplicatescheme '${base}' $g 2>$null | Out-Null } catch {} }; `;
    s += `if (-not (powercfg -list | Select-String $g)) { powercfg -duplicatescheme '${POWER_SRC.desktop}' $g 2>$null | Out-Null }; `;
    const planLabel = mode === "maximum" ? "Maximum" : mode === "gaming" ? "Gaming" : "Balanced";
    s += `powercfg -changename $g "KALASH ${planLabel}" "Optimized by KALASH TWEAKER (${planLabel} profile)" 2>$null | Out-Null; `;
    FEAT.forEach(([sub, cmp, key]) => {
      s += `powercfg -setacvalueindex $g ${sub} ${cmp} ${AC[key]}; `;
      if (laptop || DC[key] !== AC[key]) s += `powercfg -setdcvalueindex $g ${sub} ${cmp} ${DC[key]}; `;
    });
    // Распарковка ядер — только в явно выбранном максимальном режиме на десктопе.
    if (!laptop && mode === "maximum") {
      const CPMIN = "0cc5b647-c1df-4637-891a-dec35c318583";
      const CPMAX = "ea062a2f-d34d-4f01-a863-20db4dfaa7ed";
      s += `if (powercfg -query $g sub_processor ${CPMIN}) { powercfg -setacvalueindex $g sub_processor ${CPMIN} 100 }; `;
      s += `if (powercfg -query $g sub_processor ${CPMAX}) { powercfg -setacvalueindex $g sub_processor ${CPMAX} 100 }; `;
    }
    // HDD-десктоп: диску с механикой нужен короткий idle (350с), SSD/смешанный — отключить сон совсем.
    if (!laptop && a.pc && a.pc.disk_type === "hdd") {
      s += `powercfg -setacvalueindex $g sub_disk DISKIDLE 350; `;
    }
    s += `powercfg -setactive $g 2>$null | Out-Null; `;
    s += `try { if ((powercfg -list | Select-String $old) -and -not (powercfg /getactivescheme | Select-String $old)) { powercfg -delete $old 2>$null | Out-Null } } catch {}; `;
    return s;
  };

  // Твики, состояние которых мы реально проверяем: нужен ли их повторный прогон.
  // Каждая проверка возвращает true, когда твик УЖЕ применён оптимально (или не нужен
  // для этого железа) — тогда умная оптимизация пропускает его.
  const SMART_CHECKS = {
    // ── Безопасные (база) ──
    "Fast Startup OFF": (a) => a.reg.fast_startup === 0,
    "Auto-End Tasks": (a) => a.reg.auto_end === 1 || a.reg.auto_end === "1",
    "TRIM ON": (a) => a.reg.trims === 1,

    // ── Процессор ──
    "Power Throttling OFF": (a) => a.reg.power_throttling === 1,
    "Win32Priority = 38": (a) => a.reg.win32_priority === 38,
    "DPC Latency 10000": (a) => a.reg.dpc_latency === 10000 || a.reg.dpc_latency === 20000,
    "Background Apps OFF": (a) => a.reg.bkg_apps === 1,
    "Timer Resolution": (a) => a.reg.timer_res === 1,
    "DistributeTimers ON": (a) => a.reg.distribute_timers === 1,
    // TSC Sync Enhanced убран из автоматики: на ряде ОС bcdedit его не принимает
    // («тип данных не распознан») — твик физически не может примениться и вечно
    // возвращался в очередь. Оставлен только как ручной в разделе «Процессор».
    "Dynamic Tick OFF": (a) => a.bcd.dyn_tick === 1,
    "Boot Timeout 3с": (a) => a.bcd.timeout === 3,

    // ── Графика ──
    "HAGS ON": (a) => a.reg.hw_sched === 2,
    "GPU Priority 8": (a) => a.reg.gp_priority === 8,
    "RAM Priority 8": (a) => a.reg.ram_priority === 8 && a.reg.gp_priority === 8,
    "MMCSS Audio High": (a) => a.reg.audio_pri === 6 && a.reg.audio_cat === "High",
    "GPU Preemption OFF": (a) => a.reg.gpu_preemption === 0,
    "TDR Delay 8": (a) => a.reg.tdr_delay === 8,
    "NVIDIA Ultra Low Latency": (a) => a.reg.ullm === 1,
    "NVIDIA Threaded Opt": (a) => a.reg.nv_perf_src === 8738 && a.reg.nv_p9 === 1,
    "NVIDIA Low Latency ON": (a) => a.reg.nv_lowlat === 1,
    "AMD ULPS OFF": (a) => a.reg.ulps === 0,
    "DX12 Low Latency": (a) => a.reg.max_frame_lat === 1,
    "Flip Model ON": (a) => a.reg.flip_model === 1,
    "DWM Optimize": (a) => a.reg.dwm === 5,
    "Visual Effects Perf": (a) => a.reg.vis_fx === 2,

    // ── Сеть ──
    "Network Throttling OFF": (a) => a.reg.network_throttle === 4294967295,
    "Nagle OFF (все адаптеры)": (a) => a.reg.nagle_iface === 1,
    "DNS Cloudflare": (a) => a.reg.cf_dns === 1,
    "TCP Fast Open": (a) => a.reg.tfo === 1,
    "ECN ON": (a) => a.reg.ecn === 1,
    "MaxUserPort 65534": (a) => a.reg.max_port === 65534,
    "TcpTimedWaitDelay 30": (a) => a.reg.tcp_wait === 30,
    "Запуски по интернету OFF": (a) => a.reg.wu_auto === 1 && a.reg.bkg_apps === 1 && a.reg.wu_tasks >= 3,

    // ── Эко-сеть и сбор данных (сводные) ──
    "Эко-режим сети OFF": (a) => a.reg.nic_total > 0 && a.reg.nic_off >= a.reg.nic_total && a.reg.wlan_pwr === 0,
    "Доступы приложений OFF (ConsentStore)": (a) => a.reg.consent_deny >= 17,
    "Доп. телеметрия OFF (реестр)": (a) => a.reg.tel_extra >= 6,
    "Задачи планировщика (телеметрия) OFF": (a) => a.reg.sch_tel >= 4,
    "diagnosticshub OFF": (a) => a.reg.svc_diaghub === "Disabled",

    // ── Память и диски ──
    "DisablePagingExecutive": (a) => a.reg.dis_paging === 1,
    "NT Kernel Pageable OFF": (a) => a.reg.dis_paging === 1,
    "LargeSystemCache OFF (desktop)": (a) => a.reg.large_cache === 0,
    "Last Access OFF": (a) => a.reg.last_acc === 1,
    "Disks no sleep": (a) => a.power.disk_idle === 0,
    "Снять лимит памяти (MAXMEM)": (a) => a.reg.max_mem !== 1,
    "Hibernation OFF": (a) => a.reg.hibernate === 0,

    // ── Приватность ──
    "Cortana OFF": (a) => a.reg.cortana === 0,
    "Advertising ID OFF": (a) => a.reg.adv_id === 0,
    "Bing Search OFF": (a) => a.reg.bing === 0,
    "Activity History OFF": (a) => a.reg.act_feed === 0 && a.reg.pub_act === 0,
    "Feedback OFF": (a) => a.reg.feedback === 0,
    "Location OFF": (a) => a.reg.loc_deny === "Deny",
    "Camera Privacy OFF": (a) => a.reg.let_cam === 2,
    "Contacts Privacy OFF": (a) => a.reg.let_cont === 2,
    "Calendar Privacy OFF": (a) => a.reg.let_cal === 2,
    "Ink Analysis OFF": (a) => a.reg.ink_err === 1,
    "Find My Device OFF": (a) => a.reg.find_dev === 0,
    "Speech Data OFF": (a) => a.reg.speech === 0,
    "Edge Background OFF": (a) => a.reg.edge_start === 0 && a.reg.edge_bg === 0,
    "Office Telemetry OFF": (a) => a.reg.off_tel === 1,

    // ── Проводник и интерфейс ──
    "Classic Context Menu": (a) => a.reg.cls_menu === 1,
    "Show Extensions": (a) => a.reg.hide_ext === 0,
    "Show Hidden Files": (a) => a.reg.hidden === 1,
    "Widgets OFF": (a) => a.reg.taskbar_da === 0,
    "Chat OFF": (a) => a.reg.taskbar_mn === 0,
    "Copilot Button OFF": (a) => a.reg.copilot === 0,
    "Task View OFF": (a) => a.reg.task_view === 0,
    "Search Box → иконка": (a) => a.reg.search_mode === 0,
    "Left Align Taskbar": (a) => a.reg.taskbar_al === 0,
    "Small Taskbar": (a) => a.reg.small_task === 1,
    "Snap Assist OFF": (a) => a.reg.snap_assist === 0,
    "Recent Files OFF": (a) => a.reg.show_recent === 0,
    "Freq Folders OFF": (a) => a.reg.show_frequent === 0,
    "Recommendations OFF": (a) => a.reg.start_docs === 0,
    "Content Delivery OFF": (a) => a.reg.pre_inst === 0 && a.reg.silent_apps === 0,
    "Tips OFF": (a) => a.reg.soft_land === 0,
    "AutoPlay OFF": (a) => a.reg.autoplay === 1,
    "Sticky Keys OFF": (a) => a.reg.sticky === 506 || a.reg.sticky === "506",
    "Filter Keys OFF": (a) => a.reg.filter_k === 122 || a.reg.filter_k === "122",
    "FilterKeys: идеал (Kalash)": (a) => a.reg.filter_k === 3 || a.reg.filter_k === "3",
    "NVIDIA Telemetry OFF": (a) => a.reg.svc_ntel === "Disabled",
    "Toggle Keys OFF": (a) => a.reg.toggle_k === 58 || a.reg.toggle_k === "58",
    "Dark Mode": (a) => a.reg.dark_app === 0 && a.reg.dark_sys === 0,
    "Transparency OFF": (a) => a.reg.transp === 0,
    "Lock Screen Spotlight OFF": (a) => a.reg.lock_spot === 0,
    "NumLock ON": (a) => a.reg.numlock === 2 || a.reg.numlock === "2",
    "Menu Delay = 0": (a) => a.reg.menu_delay === 0 || a.reg.menu_delay === "0",

    // ── Глубокие (hardcore) ──
    "AFD Fast Copy ON": (a) => a.reg.afd_fast_copy_send === 1 && a.reg.afd_fast_copy_recv === 1 && a.reg.afd_max_events === 2,
    "MMCSS SFIO Priority High": (a) => a.reg.sfio_pri === "High",
    "Clear Pagefile On Shutdown": (a) => a.reg.clear_pagefile === 1,
    "WaitToKill 2000": (a) => a.reg.wait_kill === 2000 || a.reg.wait_kill === "2000",
    "TcpMaxDupAcks 2": (a) => a.reg.tcp_dup_acks === 2,
    "Nagle OFF (AFD/сеть)": (a) => a.reg.nagle_global === 1,
    "MSMQ OFF (очереди сообщений)": (a) => a.reg.network_throttle === 4294967295,
    "Cache Manager Workingset Trim": (a) => a.reg.cache_trim === 1,
    "Memory Compression OFF": (a) => a.reg.mem_compress === 1,
    "Mitigations OFF (Meltdown/Spectre)": (a) => a.pc.is_laptop || (a.reg.spectre_over === 3 && a.reg.spectre_mask === 3),
    "NDU OFF (служба сетевых данных)": (a) => a.reg.svc_ndu === "Disabled",
    "WER OFF (отчёты об ошибках)": (a) => a.reg.wer_disabled === 1,
    "Boot Optimization Delay OFF": (a) => a.reg.bg_only === 0 || a.reg.bg_only === "False" || a.reg.bg_only === false,
  };

  // Применимость твика к конкретной конфигурации — отдельно от состояния ОС.
  // Возвращает true, если твик предназначен для этого железа; false — твик
  // исключается из автоподбора и попадает в «не подходит вашему ПК».
  const SMART_REQ = {
    "TRIM ON": (a) => (a.pc && a.pc.has_ssd) !== false,           // нет SSD → TRIM не нужен
    "Power Throttling OFF": (a) => a.pc ? !a.pc.is_laptop : true, // ноутбукам это может резать FPS
    "DistributeTimers ON": (a) => (a.pc && a.pc.cores || 0) >= 8,
    "Dynamic Tick OFF": (a) => a.pc ? !a.pc.is_laptop : true,
    "HAGS ON": (a) => !((a.pc && a.pc.gpu_vendor) === "intel" && ((a.pc && a.pc.gpu_vram) || 0) < 2),
    "TDR Delay 8": (a) => ["nvidia", "amd", "intel"].includes(a.pc && a.pc.gpu_vendor),
    "NVIDIA Ultra Low Latency": (a) => (a.pc && a.pc.gpu_vendor) === "nvidia",
    "NVIDIA Threaded Opt": (a) => (a.pc && a.pc.gpu_vendor) === "nvidia",
    "NVIDIA Low Latency ON": (a) => (a.pc && a.pc.gpu_vendor) === "nvidia",
    "NVIDIA Telemetry OFF": (a) => (a.pc && a.pc.gpu_vendor) === "nvidia",
    "AMD ULPS OFF": (a) => (a.pc && a.pc.gpu_vendor) === "amd",
    "DisablePagingExecutive": (a) => true,
    "NT Kernel Pageable OFF": (a) => true,
    "LargeSystemCache OFF (desktop)": (a) => a.pc ? !a.pc.is_laptop : true,
    "Disks no sleep": (a) => a.pc ? !a.pc.is_laptop && a.pc.disk_type !== "hdd" : true,
    "Hibernation OFF": (a) => a.pc ? !a.pc.is_laptop : true,
    "Cache Manager Workingset Trim": (a) => a.pc ? !a.pc.is_laptop : true,
    "Memory Compression OFF": (a) => a.pc ? !a.pc.is_laptop : true,
    "Эко-режим сети OFF": (a) => a.pc ? !a.pc.is_laptop : true, // ноутбуки: расход батареи
  };

  // «Глубокие (hardcore)» твики применяем только на системах уровня optimal/maximum:
  // слабые десктопы и ноутбуки их не получают (риск стабильности/батареи лишний).
  const PROF_RANK = { default: 0, optimal: 1, maximum: 2 };
// «Умная» оптимизация по выбору пользователя включает сводные твики
  // приватности и сбора данных (ConsentStore, доп. телеметрия, планировщик,
  // diagnosticshub) и эко-режима сети. ДНС, оформление меню/виджетов и
  // гибернацию она НЕ трогает — это личные привычки, они остаются ручными
  // твиками. Защиту ОС автопакет не отключает. Сводные твики не вредят
  // слабым системам, поэтому даются всем профилям (эко-сеть — только десктопам).
  const SMART_PROFILE_TWEAKS = {
balanced: new Set([
      "TRIM ON",
      "Fast Startup OFF", "Auto-End Tasks", "Background Apps OFF",
      "LargeSystemCache OFF (desktop)",
      "FilterKeys: идеал (Kalash)", "NVIDIA Telemetry OFF",
      "Запуски по интернету OFF", "Эко-режим сети OFF",
      "Доступы приложений OFF (ConsentStore)", "Доп. телеметрия OFF (реестр)",
"Задачи планировщика (телеметрия) OFF", "diagnosticshub OFF",
      "Снять лимит памяти (MAXMEM)",
    ]),
gaming: new Set([
      "TRIM ON", "Power Throttling OFF", "Win32Priority = 38",
      // Базовые системные/CPU-твики, безопасные на любом рабочем ПК:
      "Fast Startup OFF", "Auto-End Tasks", "Background Apps OFF",
      "Boot Timeout 3с",
      "FilterKeys: идеал (Kalash)", "NVIDIA Telemetry OFF",
      "Эко-режим сети OFF", "Запуски по интернету OFF",
      "Доступы приложений OFF (ConsentStore)", "Доп. телеметрия OFF (реестр)",
      "Задачи планировщика (телеметрия) OFF", "diagnosticshub OFF",
      "Снять лимит памяти (MAXMEM)",
      "HAGS ON", "GPU Priority 8", "RAM Priority 8", "MMCSS Audio High",
      "TDR Delay 8", "NVIDIA Ultra Low Latency", "NVIDIA Threaded Opt",
      "NVIDIA Low Latency ON", "AMD ULPS OFF", "DX12 Low Latency",
      "DWM Optimize", "Network Throttling OFF", "TCP Fast Open",
      // Сетевые твики пинга для онлайн-игр (без DNS/приватности):
      "ECN ON", "MaxUserPort 65534", "TcpTimedWaitDelay 30",
      "Nagle OFF (все адаптеры)",
      "LargeSystemCache OFF (desktop)", "Last Access OFF", "Disks no sleep",
      // Углублённая настройка для игрового ПК: сетевые и системные deep-твики.
      // Они безопасны на 16+ ГБ RAM и не трогают приватность/защиту ОС.
      "AFD Fast Copy ON", "MMCSS SFIO Priority High", "WaitToKill 2000",
      "TcpMaxDupAcks 2", "Nagle OFF (AFD/сеть)", "MSMQ OFF (очереди сообщений)",
      "WER OFF (отчёты об ошибках)", "Boot Optimization Delay OFF",
      "NDU OFF (служба сетевых данных)",
    ]),
    maximum: new Set([
      "TRIM ON", "Power Throttling OFF", "Win32Priority = 38",
      "Fast Startup OFF", "Auto-End Tasks", "Background Apps OFF",
      "Boot Timeout 3с",
      "DPC Latency 10000", "Timer Resolution", "DistributeTimers ON",
      "Dynamic Tick OFF", "FilterKeys: идеал (Kalash)", "NVIDIA Telemetry OFF",
      "Эко-режим сети OFF", "Запуски по интернету OFF",
      "Доступы приложений OFF (ConsentStore)", "Доп. телеметрия OFF (реестр)",
      "Задачи планировщика (телеметрия) OFF", "diagnosticshub OFF",
      "Снять лимит памяти (MAXMEM)",
      "HAGS ON", "GPU Priority 8", "RAM Priority 8",
      "MMCSS Audio High", "TDR Delay 8", "NVIDIA Ultra Low Latency",
      "NVIDIA Threaded Opt", "NVIDIA Low Latency ON", "AMD ULPS OFF",
      "DX12 Low Latency", "DWM Optimize", "Network Throttling OFF",
      "TCP Fast Open",
      // Максимальный профиль (мощный десктоп): сетевые настройки пинга.
      // GPU Preemption / Flip Model сознательно НЕ авто-применяются: ломают
      // отрисовку Chromium-приложений (Discord, Chrome). Доступны вручную.
      "ECN ON", "MaxUserPort 65534", "TcpTimedWaitDelay 30",
      "Nagle OFF (все адаптеры)",
      "LargeSystemCache OFF (desktop)", "Last Access OFF",
      "Disks no sleep",
      "AFD Fast Copy ON", "MMCSS SFIO Priority High", "WaitToKill 2000",
      "TcpMaxDupAcks 2", "Nagle OFF (AFD/сеть)", "MSMQ OFF (очереди сообщений)",
      "WER OFF (отчёты об ошибках)", "Boot Optimization Delay OFF",
      "NDU OFF (служба сетевых данных)",
      // Максимальный профиль (32+ ГБ RAM, 8+ ядер): добавляем глубокие твики
      // памяти. Проверки ниже сами гейтят их по RAM — на малых объёмах не дадутся.
      "DisablePagingExecutive", "NT Kernel Pageable OFF",
      "Cache Manager Workingset Trim", "Memory Compression OFF",
      "Clear Pagefile On Shutdown",
    ]),
  };
  const DEEP_TWEAKS = new Set([
    "AFD Fast Copy ON",
    "MMCSS SFIO Priority High",
    "Clear Pagefile On Shutdown",
    "TcpMaxDupAcks 2",
    "Nagle OFF (AFD/сеть)",
    "MSMQ OFF (очереди сообщений)",
    "Cache Manager Workingset Trim",
    "Memory Compression OFF",
    "Mitigations OFF (Meltdown/Spectre)",
    "NDU OFF (служба сетевых данных)",
    "WER OFF (отчёты об ошибках)",
    "Boot Optimization Delay OFF",
  ]);
  const profName = (a) => ({
    default: "бережный (слабый ПК / ноутбук)",
    optimal: "игровой",
    maximum: "максимальный",
  })[(a.pc && a.pc.recommended) || "optimal"] || "оптимальный";

const resolveSmartMode = (a) => {
    const pc = a.pc || {};
    // Один автоподбор: максимум производительности, который не жертвует
    // стабильностью и тепловым режимом конкретного ПК.
    if (pc.is_laptop && pc.on_ac === false) return "balanced";
    const rec = pc.recommended || "optimal";
    // Слабые/офисные ПК и ноутбуки (в т.ч. на батарее) получают только
    // щадящий набор; режим «игровой» — средним игровым системам.
    if (rec === "default") return "balanced";
    return !pc.is_laptop && rec === "maximum" ? "maximum" : "gaming";
  };
const smartPick = (a) => {
    const list = [];
    let skippedProf = 0;
    let skippedByMode = 0;
    let skippedHw = 0;
    let alreadyOpt = 0;
    const mode = resolveSmartMode(a);
    const allowed = SMART_PROFILE_TWEAKS[mode] || SMART_PROFILE_TWEAKS.balanced;
    const seenCmds = new Set();
    const rank = PROF_RANK[(a.pc && a.pc.recommended) || "optimal"] ?? 1;
    for (const name of Object.keys(SMART_CHECKS)) {
      const hit = findTweak(name);
      if (!hit) continue;
      if (!allowed.has(name)) { skippedByMode++; continue; }
      // Профиль: deep-твики только для оптимальных/мощных систем.
      if (DEEP_TWEAKS.has(name) && rank < 1) { skippedProf++; continue; }
      // Твик подходит ли конфигурации (видеокарта, RAM, ноутбук)?
      let applicable = true;
      if (SMART_REQ[name]) { try { applicable = !!SMART_REQ[name](a); } catch (e) { /* неизвестно → применяем */ } }
      if (!applicable) { skippedHw++; continue; }
      let needed = true;
      try { needed = !SMART_CHECKS[name](a); } catch (e) { /* сбой пробы → применяем */ }
      if (!needed) { alreadyOpt++; continue; }
      if (seenCmds.has(hit.it[1])) { skippedByMode++; continue; }
      seenCmds.add(hit.it[1]);
      list.push({
        section: "Оптимизация", group: hit.pro ? "Расширенные" : "Безопасные",
        name: hit.it[0], cmd: hit.it[1], desc: hit.it[2] || "", risk: "safe", timeout: 15000,
        run: () => api(hit.pro ? "run_pro_tweak" : "run_tweak", hit.it[1]),
      });
    }
    return { list, skippedProf, skippedByMode, skippedHw, alreadyOpt, mode };
  };

  const smartBtn = el("button", { class: "btn btn--primary btn--lg btn--block", id: "smartOptBtn" },
    el("span", { class: "btn__icon", html: ICONS.optimize }),
    el("span", { class: "btn__label" }, "Умная оптимизация в один клик"),
    el("span", { class: "btn__sub", style: "font-size:11px;opacity:.8;font-weight:500" },
      "анализ ОС · план под железо · CPU/GPU/диск/сеть · приватность · ReBAR → BIOS"),
  );
  smartBtn.addEventListener("click", async () => {
    if (smartBtn.disabled) return;
    smartBtn.disabled = true;
    const lbl = smartBtn.querySelector(".btn__label");
    const orig = lbl.textContent;
    lbl.textContent = "Анализирую систему…";
    try {
      const a = await api("analyze_optimization");
      if (!a || !a.ok) { showToast("Не удалось проанализировать систему.", "error"); return; }
      fillHwPanel(a);
      const powerItem = {
        section: "Оптимизация", group: "План питания",
        name: "Собственный план питания (KALASH Optimal)",
        cmd: powerPlanCmd(a, resolveSmartMode(a)), desc: "Создание и активация индивидуального плана питания под обнаруженное железо.",
        risk: "warn", timeout: 20000, run: () => api("run_tweak", powerPlanCmd(a, resolveSmartMode(a))),
      };
const picked = smartPick(a);
      const tweaks = picked.list;
      // План применяем всегда: команда идемпотентна, а обновляет значения — это
      // единственный способ «догонять» новые правки на уже созданных планах.
      const planned = [powerItem, ...tweaks];
      // Resizable BAR (ReBAR) включается только в BIOS — если GPU NVIDIA/AMD и бар выключен,
      // добавляем переход в BIOS-гайд вместо бесполезной команды.
      const gv = (a.pc && a.pc.gpu_vendor) || "unknown";
      const rebar = a.hw && a.hw.rebar;
      const rebarOk = rebar === 1;
      if ((gv === "nvidia" || gv === "amd") && !rebarOk) {
        const biosDesc = rebar === 0
          ? "Resizable BAR выключен. Включить его можно только в BIOS — открою пошаговый гайд (Above 4G Decoding + Re-Size BAR Support)."
          : "Не удалось проверить Resizable BAR. Рекомендуется включить его в BIOS — открою пошаговый гайд.";
        planned.push({
          section: "Оптимизация", group: "BIOS",
          name: "Resizable BAR — включить в BIOS (гайд)",
          cmd: "rbar-bios-guide",
          desc: biosDesc,
          risk: "warn", timeout: 20000,
          run: () => { gotoCategory("bios"); return { ok: true }; },
        });
      }
const added = stageQueued(planned);
      const planName = (a.power && a.power.active_name) ? `Текущий план: «${a.power.active_name}»` : "Текущий план питания не определён";
      const deepNote = picked.skippedProf > 0
        ? `, ${picked.skippedProf} глубоких пропущено (профиль «${profName(a)}»)`
        : "";
      const hwNote = picked.skippedHw > 0
        ? ` · ${picked.skippedHw} не подходят вашему ПК`
        : "";
      const modeName = { balanced: "бережный", gaming: "игровой", maximum: "максимальный" }[picked.mode];
      const profNote = ` Автоподбор: «${modeName}»${a.pc && a.pc.is_laptop ? ", ноутбук" : ""}.`;
      showToast(
        `Умная оптимизация: ${added} ${pluralActions(added)} в очередь · ` +
        `${picked.alreadyOpt} уже оптимально · ${picked.skippedByMode} оставлено ручными` +
        `${hwNote}${deepNote}. ${planName}${profNote}`,
        "success",
      );
      const smartCounter = document.getElementById("smartCounter");
      if (smartCounter) {
        smartCounter.textContent =
          `План питания и ${added} ${pluralActions(added)} в очереди · ` +
          `${picked.alreadyOpt} уже оптимально · ${picked.skippedByMode} оставлено ручными` +
          `${hwNote} · ${picked.skippedProf} глубоких пропущено по профилю. ` +
          `Профиль: ${profName(a)}.`;
      }
    } catch (e) {
      showToast("Ошибка анализа: " + (e && e.message ? e.message : e), "error");
    } finally {
      lbl.textContent = orig;
      smartBtn.disabled = false;
    }
  });

  const groups = Object.entries(OPTIMIZE_PACK).map(([groupName, tweaks]) => {
    const items = tweaks.map((t) => {
      const infoBtn = el("button", { class: "tweak-info-btn", "data-name": t[0], "data-desc": t[2] || "", "data-tip": t[3] || "", "data-safety": "safe", html: ICONS.info });
      const row = el("div", { class: "tweak-row" },
        el("span", { class: "tweak-row__name" }, t[0]),
        infoBtn,
      );
      return row;
    });
    return el("div", { class: "tweak-group" },
      el("div", { class: "tweak-group__title" }, groupName),
      ...items,
    );
  });

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow page-eyebrow--hot" }, "ХИТ · Умная оптимизация"),
      el("h1", { class: "page-title page-title--big" }, "Оптимизация одной кнопкой"),
      el("p", { class: "page-desc" },
        "Умная оптимизация: анализ ОС и железа, собственный план питания, твики CPU/GPU/сети/памяти — " +
        "только то, чего реально не хватает. Всё открыто и без поломок."),
    ),

    el("div", { class: "opt" },
      el("div", { class: "opt__action opt__action--stack" },
        smartBtn,
        el("div", { id: "hwPanel", class: "opt__hint", style: "display:none;margin-top:10px" }),
      ),

      el("div", { class: "opt__hint", html: "<b>Умный клик</b>: приложение считывает текущее состояние системы (план питания, RAM, ядра, тип ПК, вендор CPU/GPU), " +
        "создаёт собственный план питания под твоё железо и добавляет в очередь только действительно подходящие настройки. " +
        "Автоматически включает сводные твики приватности и сбора данных (ConsentStore, телеметрия, планировщик, diagnosticshub), но не трогает интерфейс, DNS, гибернацию и защиту Windows. " +
        "Для мощного десктопа включается максимальный профиль; на ноутбуке и слабом ПК — щадящий, но стабильный набор. Опасные и глубокие твики остаются ручными."
      }),

      el("div", { class: "opt__hint" },
        "Нажми кнопку — пак появится в панели применения внизу экрана. " +
        "Затем «Применить»: подтверждение по группам и прогресс по каждому шагу. " +
        "После применения рекомендуется перезагрузка — часть настроек вступает в силу только после ребута."
      ),

      ...groups,
    ),
  );
};


const classifyFix = (name) => {
  const n = name.toLowerCase();
  if (n.includes("исправит") && n.includes("вс")) return { label: "Пак",        cls: "badge--danger", desc: "Большой пак исправлений — запускает множество скриптов подряд", cat: "system" };
  if (n.startsWith("включить "))                   return { label: "Включить",   cls: "badge--safe",   desc: "Включает обратно компонент, который был отключён твиками или сторонним софтом", cat: "system" };
  if (n.startsWith("отключить "))                  return { label: "Отключить",  cls: "badge--warn",   desc: "Отключает компонент Windows", cat: "system" };
  if (n.startsWith("вернуть "))                    return { label: "Откат",      cls: "badge--safe",   desc: "Возвращает компонент к стандартным настройкам Windows", cat: "system" };
  if (n.startsWith("восстанов")) {
    if (n.includes("dns") || n.includes("сеть") || n.includes("network") || n.includes("bluetooth")) return { label: "Восстановл.", cls: "badge--safe", desc: "Восстанавливает работоспособность компонента", cat: "network" };
    if (n.includes("звук") || n.includes("audio") || n.includes("sound")) return { label: "Восстановл.", cls: "badge--safe", desc: "Восстанавливает работоспособность компонента", cat: "sound" };
    if (n.includes("яркость") || n.includes("hdmi") || n.includes("экран") || n.includes("display") || n.includes("photo")) return { label: "Восстановл.", cls: "badge--safe", desc: "Восстанавливает работоспособность компонента", cat: "graphics" };
    if (n.includes("edge") || n.includes("store") || n.includes("поиск") || n.includes("search") || n.includes(".net")) return { label: "Восстановл.", cls: "badge--safe", desc: "Восстанавливает работоспособность компонента", cat: "system" };
    return { label: "Восстановл.", cls: "badge--safe", desc: "Восстанавливает работоспособность компонента", cat: "system" };
  }
  if (n.startsWith("сброс ") || n.endsWith(" сброс")) {
    if (n.includes("dns") || n.includes("кеш") || n.includes("стек") || n.includes("сет")) return { label: "Сброс", cls: "badge--warn", desc: "Сбрасывает настройки компонента к дефолту", cat: "network" };
    if (n.includes("мыш") || n.includes("mouse")) return { label: "Сброс", cls: "badge--warn", desc: "Сбрасывает настройки компонента к дефолту", cat: "input" };
    if (n.includes("процесс") || n.includes("priority")) return { label: "Сброс", cls: "badge--warn", desc: "Сбрасывает настройки компонента к дефолту", cat: "system" };
    if (n.includes("брандмауэр") || n.includes("firewall")) return { label: "Сброс", cls: "badge--warn", desc: "Сбрасывает настройки компонента к дефолту", cat: "network" };
    if (n.includes("uac") || n.includes("группов") || n.includes("policy")) return { label: "Сброс", cls: "badge--warn", desc: "Сбрасывает настройки компонента к дефолту", cat: "system" };
    return { label: "Сброс", cls: "badge--warn", desc: "Сбрасывает настройки компонента к дефолту", cat: "system" };
  }
  if (n.startsWith("фикс ") || n.startsWith("фикс."))  return { label: "Фикс",   cls: "badge--safe",   desc: "Исправляет известную проблему с этим компонентом", cat: "system" };
  if (n.startsWith("не работает") || n.startsWith("не запускается") || n.startsWith("не работают")) return { label: "Проблема", cls: "badge--warn", desc: "Запускай если перестал работать указанный компонент или приложение", cat: "system" };
  if (n.startsWith("пропал") || n.startsWith("пропала") || n.startsWith("пропали")) return { label: "Пропало", cls: "badge--warn", desc: "Возвращает компонент, который пропал из системы", cat: "system" };
  if (n.startsWith("лагает") || n.startsWith("просел") || n.startsWith("статер") || n.startsWith("упал ") || n.startsWith("повысил")) return { label: "Игры", cls: "badge--warn", desc: "Решает игровые проблемы: лаги, просадки FPS, температура", cat: "graphics" };
  if (n.startsWith("микро лаги") || n.startsWith("медленно")) return { label: "Производит.", cls: "badge--warn", desc: "Чинит медленную работу системы или игр", cat: "system" };
  if (n.endsWith(" бекап") || n.endsWith(" бэкап")) return { label: "Бэкап",     cls: "badge--safe",   desc: "Откатывает к сохранённой версии настроек", cat: "system" };
  if (n.startsWith("долгое "))                     return { label: "Скорость",   cls: "badge--warn",   desc: "Решает медленные операции (выключение, сворачивание)", cat: "system" };
  if (n.startsWith("чёрный экран") || n.startsWith("черный экран")) return { label: "Графика", cls: "badge--warn", desc: "Чинит чёрный экран в играх и при сворачивании", cat: "graphics" };
  if (n.startsWith("откат "))                      return { label: "Откат",      cls: "badge--safe",   desc: "Откатывает применённые твики к предыдущему состоянию", cat: "system" };
  if (n.startsWith("обновление") || n.startsWith("обновлен")) return { label: "Обновление", cls: "badge--safe", desc: "Связано с Windows Update", cat: "system" };
  if (n.startsWith("резка"))                       return { label: "Мышь",       cls: "badge--warn",   desc: "Чинит резкую/прыгающую чувствительность мыши", cat: "input" };
  if (n.startsWith("плавает"))                     return { label: "Мышь",       cls: "badge--warn",   desc: "Чинит плавающую/нестабильную мышь", cat: "input" };
  if (n.startsWith("иконки"))                      return { label: "Интерфейс",  cls: "badge--safe",   desc: "Возвращает пропавшие иконки", cat: "system" };
  if (n.startsWith("папки в "))                    return { label: "Интерфейс",  cls: "badge--safe",   desc: "Восстанавливает стандартные папки в Проводнике", cat: "system" };
  if (n.startsWith("если "))                       return { label: "Если…",      cls: "badge--warn",   desc: "Запускай при описанной проблеме", cat: "system" };
  if (n.startsWith("стать владельцем"))            return { label: "Доступ",     cls: "badge--warn",   desc: "Получает права на защищённые ключи реестра", cat: "system" };
  if (n.startsWith("драйвера ") || n.includes("драйвер")) return { label: "Драйверы", cls: "badge--warn", desc: "Связано с восстановлением драйверов", cat: "system" };
  if (n.startsWith("загрузка"))                    return { label: "Запуск",     cls: "badge--warn",   desc: "Чинит зависающую загрузку приложения", cat: "system" };
  if (n.startsWith("обычный приоритет"))           return { label: "Игры",       cls: "badge--safe",   desc: "Возвращает стандартный приоритет процесса игры", cat: "system" };
  if (n.startsWith("просит сменить"))              return { label: "Аккаунт",    cls: "badge--warn",   desc: "Решает проблему с принудительной сменой пароля", cat: "system" };
  if (n.startsWith("анти") || n.startsWith("anti")) return { label: "Античит",   cls: "badge--warn",   desc: "Связано с античитами игр (Faceit, Vanguard, etc.)", cat: "system" };
  if (n.startsWith("faceit") || n.startsWith("fortnite") || n.startsWith("гта") || n.startsWith("valorant")) return { label: "Игра", cls: "badge--warn", desc: "Решает проблему с конкретной игрой", cat: "graphics" };
  if (n.startsWith("microsoft store") || n.startsWith("ms store")) return { label: "Store", cls: "badge--safe", desc: "Восстанавливает Microsoft Store", cat: "system" };
  if (n.startsWith("ping") || n.startsWith("пинг")) return { label: "Пинг",      cls: "badge--safe",   desc: "Снижает пинг и улучшает сеть", cat: "network" };
  if (n.startsWith("directx") || n.startsWith("hdcp") || n.startsWith("uvm")) return { label: "Графика", cls: "badge--warn", desc: "Сброс графического подсистемы", cat: "graphics" };
  if (n.startsWith("recall"))                      return { label: "Win11",      cls: "badge--warn",   desc: "Возвращает функцию Recall в Windows 11", cat: "system" };
  if (n.startsWith("вкл мягчение"))                return { label: "Игра",       cls: "badge--warn",   desc: "Совместимость антиреада с Valorant", cat: "graphics" };
  if (n.startsWith("edge"))                        return { label: "Edge",       cls: "badge--safe",   desc: "Восстанавливает Microsoft Edge", cat: "system" };
  if (n.startsWith("bcd"))                         return { label: "BCD",        cls: "badge--warn",   desc: "Восстанавливает Boot Configuration Data", cat: "system" };
  if (n.startsWith("поиск"))                       return { label: "Поиск",      cls: "badge--safe",   desc: "Восстанавливает поиск Windows", cat: "system" };
  if (n.startsWith("панель nvidia"))               return { label: "NVIDIA",     cls: "badge--safe",   desc: "Восстанавливает NVIDIA Control Panel", cat: "graphics" };
  if (n.includes("bluetooth") || n.includes("блютуз")) return { label: "Bluetooth", cls: "badge--safe", desc: "Восстанавливает Bluetooth", cat: "network" };
  if (n.includes("принтер") || n.includes("print")) return { label: "Принтер", cls: "badge--safe", desc: "Исправляет печать и spooler", cat: "system" };
  if (n.includes("подключ") && n.includes("облак")) return { label: "Облако", cls: "badge--warn", desc: "Исправляет подключение к Microsoft Account", cat: "network" };
  return { label: "Утилита", cls: "badge--warn", desc: "Системное исправление / утилита", cat: "system" };
};

const renderFixes = () => {
  const restoreBtn = el("button", { class: "btn btn--soft btn--lg" },
    el("span", { class: "btn__icon", html: ICONS.restore }),
    el("span", { class: "btn__label" }, "Создать точку восстановления"),
  );
  restoreBtn.addEventListener("click", async () => {
    const lbl = restoreBtn.querySelector(".btn__label");
    const orig = lbl.textContent;
    restoreBtn.disabled = true;
    restoreBtn.querySelector(".btn__icon").replaceWith(el("span", { class: "spinner btn__icon" }));
    lbl.textContent = "Создаём…";
    const r = await api("create_restore_point");
    restoreBtn.querySelector(".btn__icon")?.replaceWith(el("span", { class: "btn__icon", html: r?.ok ? ICONS.check : ICONS.cross }));
    if (r?.ok) {
      lbl.textContent = "Точка создана";
      showToast("Точка восстановления создана", "success");
    } else {
      lbl.textContent = "Ошибка";
      showToast("Не удалось создать точку. Возможно отключено в Windows.", "error");
    }
    setTimeout(() => {
      restoreBtn.disabled = false;
      restoreBtn.querySelector(".btn__icon")?.replaceWith(el("span", { class: "btn__icon", html: ICONS.restore }));
      lbl.textContent = orig;
    }, 3500);
  });

  const fixAllBtn = el("button", { class: "btn btn--danger btn--lg" },
    el("span", { class: "btn__icon", html: ICONS.zap }),
    el("span", { class: "btn__label" }, "ИСПРАВИТЬ ВСЕ"),
  );
  fixAllBtn.addEventListener("click", () => {
    if (!fixesData.length) { showToast("Список ещё загружается — попробуй через секунду", "warn"); return; }
    const items = fixesData.map((fx) => {
      const cls = classifyFix(fx.name);
      return { section: "Исправления", group: "Все исправления", name: fx.name, risk: cls.cls === "badge--safe" ? "safe" : "warn", run: () => api("run_fix", fx.name) };
    });
    stageQueued(items);
    showToast(`В очередь добавлено ${items.length} ${pluralActions(items.length)}`, "success");
  });

  const fixAllSafeBtn = el("button", { class: "btn btn--primary btn--lg" },
    el("span", { class: "btn__icon", html: ICONS.zap }),
    el("span", { class: "btn__label" }, "ИСПРАВИТЬ БЕЗОПАСНЫЕ"),
  );
  fixAllSafeBtn.addEventListener("click", () => {
    if (!fixesData.length) { showToast("Список ещё загружается — попробуй через секунду", "warn"); return; }
    const safeFixes = fixesData.filter((fx) => classifyFix(fx.name).cls === "badge--safe");
    if (!safeFixes.length) { showToast("Безопасные исправления не найдены", "error"); return; }
    stageQueued(safeFixes.map((fx) => ({ section: "Исправления", group: "Безопасные", name: fx.name, risk: "safe", run: () => api("run_fix", fx.name) })));
    showToast(`В очередь добавлено ${safeFixes.length} ${pluralActions(safeFixes.length)}`, "success");
  });

  const FIX_CATEGORIES = [
    { id: "all",    label: "Все" },
    { id: "system", label: "Система" },
    { id: "network",label: "Сеть" },
    { id: "sound",  label: "Звук" },
    { id: "graphics",label: "Графика" },
    { id: "input",  label: "Ввод" },
  ];

  let activeFixCat = "all";

  const catBar = el("div", { class: "fix-cat-bar" });
  const catBtns = FIX_CATEGORIES.map(c => {
    const btn = el("button", { class: `fix-cat-btn ${c.id === "all" ? "fix-cat-btn--active" : ""}` }, c.label);
    btn.addEventListener("click", () => {
      activeFixCat = c.id;
      catBtns.forEach(b => b.classList.remove("fix-cat-btn--active"));
      btn.classList.add("fix-cat-btn--active");
      renderBody();
      updateCount();
    });
    catBar.appendChild(btn);
    return btn;
  });

  const body = el("div", { class: "tweaks", id: "fixesBody" },
    el("div", { class: "empty" }, "Загрузка списка…")
  );

  const REBOOT_NAMES = ["Исправление HDMI", "Сброс сетевого стека", "Ремонт BCD"];
  const needsReboot = (name) => REBOOT_NAMES.some(r => name.includes(r));

  const buildFixRow = (fix, index) => {
    const cls = classifyFix(fix.name);
    const hasReboot = needsReboot(fix.name);
    const SECTION = "Исправления";
    const risk = cls.cls === "badge--safe" ? "safe" : "warn";
    const toggle = el("div", { class: "ios-toggle", role: "button", tabindex: "0", title: "Добавить в очередь" });
    const sync = () => {
      const s = isQueued(SECTION, fix.name);
      toggle.classList.toggle("ios-toggle--on", s);
    };
    toggle.addEventListener("click", () => {
      toggleQueued({ section: SECTION, group: cls.cat || "Система", name: fix.name, risk, run: () => api("run_fix", fix.name) });
      sync();
    });
    toggle.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleQueued({ section: SECTION, group: cls.cat || "Система", name: fix.name, risk, run: () => api("run_fix", fix.name) }); sync(); } });
    sync();
    const badges = [el("span", { class: `badge ${cls.cls}` }, cls.label)];
    if (hasReboot) badges.push(el("span", { class: "badge badge--warn" }, "↻ Reboot"));
    return el("div", { class: "tweak", style: `animation-delay: ${Math.min(index, 24) * 16}ms` },
      el("div", { class: "tweak__main" },
        el("div", { class: "tweak__head" },
          el("div", { class: "tweak__title" }, fix.name),
          el("div", { class: "tweak__badges" }, ...badges),
        ),
        el("div", { class: "tweak__desc" }, cls.desc),
      ),
      toggle,
    );
  };

  let fixesData = [];
  const updateCount = () => {
    const cnt = $("#fixesCount");
    if (!cnt) return;
    const ql = searchQuery.toLowerCase();
    const filtered = fixesData.filter(fx => {
      if (ql && !fx.name.toLowerCase().includes(ql)) return false;
      if (activeFixCat === "all") return true;
      return classifyFix(fx.name).cat === activeFixCat;
    });
    cnt.textContent = `${filtered.length} из ${fixesData.length}`;
  };

  const renderBody = () => {
    body.innerHTML = "";
    const ql = searchQuery.toLowerCase();
    const f = fixesData.filter(fx => {
      if (ql && !fx.name.toLowerCase().includes(ql)) return false;
      if (activeFixCat === "all") return true;
      return classifyFix(fx.name).cat === activeFixCat;
    });
    if (!f.length) body.appendChild(el("div", { class: "empty" }, fixesData.length ? "Ничего не найдено." : "Файлов fix.bat не найдено — отфильтровано или не добавлено в сборку. Напиши @WhyOtto77."));
    else f.forEach((fx, i) => body.appendChild(buildFixRow(fx, i)));
  };

  (async () => {
    const r = await api("list_fixes");
    if (r?.ok) {
      fixesData = r.fixes || [];
      renderBody();
      updateCount();
    } else {
      body.innerHTML = "";
      body.appendChild(el("div", { class: "empty" }, "Не удалось загрузить список исправлений: " + (r?.stderr || "неизвестная ошибка")));
    }
  })();

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, "Решение проблем"),
      el("h1", { class: "page-title" }, "Исправления"),
      el("p", { class: "page-desc" },
        "Готовые скрипты для отката твиков, восстановления компонентов Windows и решения частых проблем " +
        "(сеть, звук, FPS, чёрный экран, клавиатура, мышь). Отмечай исправления в очередь, затем нажми «Применить» внизу."),
    ),
    el("div", { class: "fixes-actions" },
      restoreBtn,
      fixAllBtn,
      fixAllSafeBtn,
    ),
    el("div", { class: "section__head section__head--with-search" },
      el("div", {},
        el("div", { class: "section__title" }, "Список"),
        el("div", { class: "section__count", id: "fixesCount" }, "загружаем…"),
      ),
      buildSearchBar("Поиск исправления…", () => { renderBody(); updateCount(); }),
    ),
    catBar,
    body,
  );
};

const renderDeep = () => {
  return el("div", {},
    el("div", { style: "background: rgba(239,68,68,0.04); border: 2px solid var(--red); border-radius: 16px; padding: 28px 24px; margin-bottom: 24px; text-align: center;" },
      el("div", { style: "font-size: 48px; margin-bottom: 12px;" }, "⚠️"),
      el("div", { style: "font-size: 24px; font-weight: 800; color: var(--red); margin-bottom: 8px; letter-spacing: 2px;" }, "ОПАСНО"),
      el("div", { style: "font-size: 15px; font-weight: 700; color: var(--red); margin-bottom: 12px;" }, "ОБЯЗАТЕЛЬНО СДЕЛАЙТЕ БЭКАП СИСТЕМЫ ПЕРЕД ИСПОЛЬЗОВАНИЕМ!"),
      el("div", { style: "font-size: 13px; color: var(--text-secondary); line-height: 1.6;" },
        "Только для Windows 10. На Windows 11 ломает taskbar, поиск, виджеты и многое другое.",
        el("br"),
        "Если что-то сломается — запусти KALASH_ROLLBACK.bat для отката."
      ),
    ),
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow", style: "color: var(--red);" }, "ОПАСНО · ТОЛЬКО WINDOWS 10"),
      el("h1", { class: "page-title page-title--big", style: "background: linear-gradient(90deg, #fff 0%, #ff8888 60%, #ef4444 100%); -webkit-background-clip: text; background-clip: text; color: transparent;" }, "Глубокая оптимизация"),
      el("p", { class: "page-desc" },
        "Расширенный пак из ", el("span", { "data-deep-count": "" }, DEEP_COUNT_TEXT()),
        " твиков. Применяется одной кнопкой в отдельном окне."
      ),
    ),
    renderDeepPack(),
  );
};

const renderDeepPack = () => {
  const btn = el("button", { class: "btn btn--danger btn--lg btn--block" },
    el("span", { class: "btn__icon", html: ICONS.zap }),
    el("span", { class: "btn__label" }, "Добавить в очередь (", el("span", { "data-deep-count": "" }, DEEP_COUNT_TEXT()), " шагов)"),
  );
  setTimeout(refreshDeepCount, 120);
  btn.addEventListener("click", async () => {
    if (isWin11()) {
      showToast("Глубокий пак только для Windows 10", "error");
      return;
    }
    const probe = await api("privacy_pack_exists");
    if (probe?.exists === false) {
      showToast("privacy_pack.dat не найден — положи файл в extras", "error");
      return;
    }
    stageQueued([{
      section: "Глубокая оптимизация",
      group: "Win10 Deep Pack",
      name: `Глубокая оптимизация (${DEEP_COUNT_TEXT()} шагов)`,
      risk: "danger",
      run: async () => api("run_privacy_pack"),
    }]);
    showToast("Глубокая оптимизация добавлена в очередь", "success");
  });

  return el("div", { class: "danger-pack" },
    el("div", { class: "danger-pack__head" },
      el("div", { class: "danger-pack__badge" }, "ОПАСНО · ТОЛЬКО WINDOWS 10"),
      el("h2", { class: "danger-pack__title" }, "Глубокая оптимизация"),
    ),
    el("p", { class: "danger-pack__desc" },
      "Расширенный пак из ", el("span", { "data-deep-count": "" }, DEEP_COUNT_TEXT()),
      " твиков: приватность, телеметрия, ускорение системы. ",
      el("strong", {}, "Только для Windows 10. "),
      "На Windows 11 часть команд может сломать taskbar, поиск, виджеты и центр уведомлений. ",
      "Создайте точку восстановления перед запуском."
    ),
    el("div", { class: "danger-pack__meta" },
      el("div", { class: "danger-pack__meta-item" },
        el("div", { class: "danger-pack__meta-num" }, el("span", { "data-deep-count": "" }, DEEP_COUNT_TEXT())),
        el("div", { class: "danger-pack__meta-label" }, "ШАГОВ"),
      ),
      el("div", { class: "danger-pack__meta-item" },
        el("div", { class: "danger-pack__meta-num" }, "5-10"),
        el("div", { class: "danger-pack__meta-label" }, "МИНУТ"),
      ),
      el("div", { class: "danger-pack__meta-item" },
        el("div", { class: "danger-pack__meta-num" }, "WIN 10"),
        el("div", { class: "danger-pack__meta-label" }, "ТОЛЬКО"),
      ),
    ),
    btn,
    el("div", { class: "opt__hint", style: "text-align:center;" },
      "Пак запустится в отдельном окне. Перед запуском будет создана точка восстановления."
    ),
  );
};


const renderProcesses = () => {
  const sortSelect = el("select", { class: "search__input", style: "width:160px;padding:9px 12px;" },
    el("option", { value: "cpu" }, "По CPU"),
    el("option", { value: "ram" }, "По RAM"),
  );

  const table = el("div", { class: "tweaks", id: "processList" },
    el("div", { class: "empty" }, "Загрузка процессов…"),
  );

  let procsData = [];
  let sortMode = "cpu";

  const renderTable = () => {
    table.innerHTML = "";
    if (!procsData.length) {
      table.appendChild(el("div", { class: "empty" }, "Процессы не найдены."));
      return;
    }

    const header = el("div", { class: "tweak", style: "background: var(--bg-card-hover); border-color: var(--border-strong); animation: none;" },
      el("div", { class: "tweak__main", style: "display:grid;grid-template-columns:60px minmax(120px,1fr) 70px 70px auto;gap:8px;font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.1em;text-transform:uppercase;" },
        el("span", {}, "PID"),
        el("span", {}, "Имя"),
        el("span", {}, "CPU %"),
        el("span", {}, "RAM"),
        el("span", {}, ""),
      ),
    );
    table.appendChild(header);

    procsData.forEach((p, i) => {
      const killBtn = el("button", { class: "btn btn--danger", style: "padding:5px 10px;font-size:11px;" },
        el("span", { class: "btn__label" }, "Завершить"),
      );
      killBtn.addEventListener("click", async () => {
        if (!confirm(`Завершить процесс "${p.name}" (PID ${p.pid})?`)) return;
        killBtn.disabled = true;
        const r = await api("kill_process", p.pid);
        if (r?.ok) {
          showToast(`Процесс ${p.name} завершён`, "success");
          killBtn.querySelector(".btn__label").textContent = "вњ“";
          setTimeout(() => loadProcesses(), 500);
        } else {
          showToast(`Ошибка: ${r?.stderr || "?"}`, "error");
          killBtn.disabled = false;
        }
      });

      const cpuColor = p.cpu > 50 ? "var(--red)" : p.cpu > 20 ? "var(--yellow)" : "var(--text-primary)";

      const row = el("div", { class: "tweak", style: `animation-delay:${Math.min(i, 30)*8}ms;` },
        el("div", { class: "tweak__main", style: "display:grid;grid-template-columns:60px minmax(120px,1fr) 70px 70px auto;gap:8px;align-items:center;" },
          el("span", { style: "font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-muted);" }, String(p.pid)),
          el("span", { style: "font-size:13px;font-weight:500;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" }, p.name),
          el("span", { style: `font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:${cpuColor};` }, `${p.cpu}%`),
          el("span", { style: "font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-secondary);" }, `${p.ram_mb} MB`),
          killBtn,
        ),
      );
      table.appendChild(row);
    });
  };

  const loadProcesses = async () => {
    try {
      const sortProp = sortMode === "ram" ? "WorkingSet64" : "CPU";
      const r = await api("get_top_processes", sortMode, 40);
      if (r?.ok && Array.isArray(r.processes)) {
        procsData = r.processes.map((p) => ({
          pid: p.pid,
          name: p.name || "?",
          cpu: Number(p.cpu_percent ?? p.cpu ?? 0),
          ram_mb: Number(p.memory_mb ?? p.ram_mb ?? 0),
        }));
        renderTable();
        const cnt = document.getElementById("procCount");
        if (cnt) cnt.textContent = `${procsData.length} процессов`;
      } else {
        // fallback to PowerShell
        const sortProp = sortMode === "ram" ? "WorkingSet64" : "CPU";
        const rr = await runTweakSafe(`Get-Process | Sort-Object -Property ${sortProp} -Descending | Select-Object -First 40 | ForEach-Object { "$($_.Id)|$($_.ProcessName)|$([math]::Round($_.CPU,1))|$([math]::Round($_.WorkingSet64/1MB,1))" }`, 20000);
        if (rr?.ok && rr.stdout) {
          const lines = rr.stdout.split("\n").filter(l => l.trim());
          procsData = lines.map(l => {
            const [pid, name, cpu, ram_mb] = l.trim().split("|");
            return { pid: parseInt(pid, 10), name, cpu: parseFloat(cpu) || 0, ram_mb: parseFloat(ram_mb) || 0 };
          });
          renderTable();
        }
      }
    } catch (e) {}
  };

  sortSelect.addEventListener("change", (e) => {
    sortMode = e.target.value;
    loadProcesses();
  });

  const refreshBtn = el("button", { class: "btn btn--ghost" },
    el("span", { class: "btn__icon", html: ICONS.restore }),
    el("span", { class: "btn__label" }, "Обновить"),
  );
  refreshBtn.addEventListener("click", async () => {
    refreshBtn.disabled = true;
    await loadProcesses();
    refreshBtn.disabled = false;
  });

  loadProcesses();
  activeIntervals.push(setInterval(loadProcesses, 10000));

  return el("div", { "data-processes-page": "1" },
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, "Управление"),
      el("h1", { class: "page-title" }, "Процессы"),
      el("p", { class: "page-desc" },
        "Топ-40 процессов по нагрузке. Обновляется каждые 5 секунд. Можно завершить любой процесс."),
    ),
    el("div", { class: "section__head section__head--with-search" },
      el("div", {},
        el("div", { class: "section__title" }, "Процессы"),
        el("div", { class: "section__count", id: "procCount" }, "загрузка…"),
      ),
      el("div", { style: "display:flex;gap:10px;align-items:center;" },
        sortSelect,
        refreshBtn,
      ),
    ),
    table,
  );
};

// ============================================================
//  HISTORY PAGE
// ============================================================

const renderHistory = () => {
  const body = el("div", { class: "tweaks", id: "historyBody" },
    el("div", { class: "empty" }, "Загрузка истории…")
  );

  const loadHistory = async () => {
    body.innerHTML = "";
    try {
      const r = await api("get_tweak_history");
      if (r?.ok && r.history?.length) {
        const reversed = [...r.history].reverse();
        reversed.forEach((entry, i) => {
          const canRevert = entry.old_value != null || /stop-service|set-service/i.test(entry.command || "");
          const revertBtn = el("button", { class: "btn btn--ghost" },
            el("span", { class: "btn__icon", html: ICONS.restore }),
            el("span", { class: "btn__label" }, canRevert ? "Откатить" : "Нет данных"),
          );
          revertBtn.disabled = !canRevert;
          if (canRevert) {
            revertBtn.addEventListener("click", async () => {
              revertBtn.disabled = true;
              revertBtn.querySelector(".btn__label").textContent = "Откат…";
              const rr = await api("revert_tweak", entry.id);
              if (rr?.ok) {
                revertBtn.querySelector(".btn__label").textContent = "Откачено";
                showToast(`Откат: ${entry.title}`, "success");
              } else {
                revertBtn.querySelector(".btn__label").textContent = "Ошибка";
                showToast(`Не удалось откатить: ${entry.title}`, "error");
                revertBtn.disabled = false;
              }
              setTimeout(() => {
                revertBtn.querySelector(".btn__label").textContent = "Откатить";
              }, 2500);
            });
          }

          const timeStr = entry.applied_at ? new Date(entry.applied_at).toLocaleString("ru-RU") : "—";
          const catLabel = entry.category || "";

          body.appendChild(el("div", { class: "tweak", style: `animation-delay:${Math.min(i, 30) * 8}ms` },
            el("div", { class: "tweak__main" },
              el("div", { class: "tweak__head" },
                el("div", { class: "tweak__title" }, entry.title),
                el("div", { class: "tweak__badges" },
                  el("span", { class: "badge badge--safe" }, timeStr),
                  catLabel ? el("span", { class: "badge badge--warn" }, catLabel) : null,
                ),
              ),
              el("div", { class: "tweak__desc" }, entry.command ? entry.command.substring(0, 120) + (entry.command.length > 120 ? "…" : "") : ""),
            ),
            revertBtn,
          ));
        });
      } else {
        body.appendChild(el("div", { class: "empty" }, "История пуста. Примени твики — они появятся здесь."));
      }
    } catch (e) {
      body.appendChild(el("div", { class: "empty" }, "Ошибка загрузки истории."));
    }
  };

  loadHistory();

  const revertAllBtn = el("button", { class: "btn btn--ghost" },
    el("span", { class: "btn__icon", html: ICONS.restore }),
    el("span", { class: "btn__label" }, "Откатить всё"),
  );
  revertAllBtn.addEventListener("click", async () => {
    if (!confirm("Откатить все твики из истории к исходным значениям?")) return;
    revertAllBtn.disabled = true;
    const r = await api("revert_all_tweaks");
    if (r?.ok) showToast(`Откат: ${r.reverted || 0} успешно, ${r.failed || 0} не удалось`, r.failed ? "warn" : "success");
    else showToast("Ошибка отката", "error");
    revertAllBtn.disabled = false;
    loadHistory();
  });

  const clearBtn = el("button", { class: "btn btn--ghost" },
    el("span", { class: "btn__icon", html: ICONS.cross }),
    el("span", { class: "btn__label" }, "Очистить журнал"),
  );
  clearBtn.addEventListener("click", async () => {
    if (!confirm("Очистить журнал без отката настроек?")) return;
    await api("clear_tweak_history");
    showToast("Журнал очищен", "success");
    loadHistory();
  });

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, "Журнал"),
      el("h1", { class: "page-title" }, "История твиков"),
      el("p", { class: "page-desc" }, "Применённые твики с откатом. «Откатить всё» возвращает значения; «Очистить журнал» только стирает список."),
    ),
    el("div", { class: "section__head" },
      el("div", {},
        el("div", { class: "section__title" }, "Применённые твики"),
      ),
      el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;" }, revertAllBtn, clearBtn),
    ),
    body,
  );
};

// ============================================================
//  MONITORING PAGE
// ============================================================

const renderMonitor = () => {
  const root = el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, "Мониторинг"),
      el("h1", { class: "page-title" }, "Система в реальном времени"),
      el("p", { class: "page-desc" }, "Нагрузка CPU по ядрам, память, диск, сеть и температура. Обновляется раз в секунду."),
    ),
  );

  const statLine = (label, id, unit = "") => {
    const value = el("span", { class: "mon-value", id, "data-base": "—" }, "—");
    root.appendChild(el("div", { class: "mon-row" },
      el("span", { class: "mon-label" }, label),
      el("span", { class: "mon-units" }, unit ? el("span", { class: "mon-unit" }, unit) : null, value),
    ));
    return value;
  };

  const cpuText = statLine("CPU", "monCpu", "%");
  const coresWrap = el("div", { class: "mon-cores" });

  statLine("Частота CPU", "monFreq", "ГГц");
  statLine("Память (RAM)", "monRam", "МБ / МБ");
  statLine("Диск C:", "monDisk", "%");
  statLine("Сеть ↓ / ↑", "monNet", "МБ/с");
  const tempWrap = el("div", { class: "mon-row" },
    el("span", { class: "mon-label" }, "Температура"),
    el("span", { class: "mon-units" },
      el("span", { class: "mon-unit", id: "monCpuTemp" }, "—"),
      el("span", { class: "mon-sep" }, " / "),
      el("span", { class: "mon-unit", id: "monGpuTemp" }, "—"),
    ),
  );

  root.appendChild(coresWrap);
  root.appendChild(el("div", { class: "section__head" },
    el("div", { class: "section__title" }, "Топ-8 процессов по CPU")));
  const topWrap = el("div", { id: "monTop" });
  root.appendChild(topWrap);
  root.appendChild(tempWrap);

  const freeRamBtn = el("button", { class: "btn btn--ghost" },
    el("span", { class: "btn__icon", html: ICONS.zap }),
    el("span", { class: "btn__label" }, "Очистить RAM (standby)"),
  );
  freeRamBtn.addEventListener("click", async () => {
    freeRamBtn.disabled = true;
    const r = await api("free_ram");
    showToast(r?.ok ? "Готово" : "Не удалось очистить RAM", r?.ok ? "success" : "error");
    freeRamBtn.disabled = false;
  });
  root.appendChild(freeRamBtn);

  const renderTop = (list) => {
    topWrap.innerHTML = "";
    if (!list || !list.length) {
      topWrap.appendChild(el("div", { class: "empty" }, "Нет данных"));
      return;
    }
    list.forEach((p) => {
      topWrap.appendChild(el("div", { class: "mon-row" },
        el("span", { class: "mon-label" }, `${p.cpu}% · ${p.ram}%`),
        el("span", { class: "mon-units" }, el("span", { class: "mon-topname" }, `${p.name} (${p.pid})`)),
      ));
    });
  };

  const tick = async () => {
    const r = await api("get_monitor");
    if (!r || !r.ok) return;
    $(`#${cpuText.id}`) && ($(`#${cpuText.id}`).textContent = Math.round(r.cpu));
    $(`#monFreq`) && ($(`#monFreq`).textContent = r.freq_ghz);
    $(`#monRam`) && ($(`#monRam`).textContent = `${r.ram_used} / ${r.ram_total}`);
    $(`#monDisk`) && ($(`#monDisk`).textContent = r.disk_percent);
    $(`#monNet`) && ($(`#monNet`).textContent = `${r.net_down_mbps} / ${r.net_up_mbps}`);
    if ($(`#monCpuTemp`)) $(`#monCpuTemp`).textContent = r.cpu_temp != null ? `${r.cpu_temp}°C` : "—";
    if ($(`#monGpuTemp`)) $(`#monGpuTemp`).textContent = r.gpu_temp != null ? `${r.gpu_temp}°C` : "—";
    if (Array.isArray(r.per_core)) {
      coresWrap.innerHTML = "";
      const cores = r.per_core.length ? r.per_core : new Array(r.cores || 0).fill(0);
      cores.forEach((pc, i) => {
        const color = pc > 90 ? "var(--red)" : pc > 70 ? "var(--yellow)" : "var(--green)";
        coresWrap.appendChild(el("div", { class: "mon-core", title: `${i + 1}: ${pc}%` },
          el("div", {}, `${Math.round(pc)}`),
          el("div", { style: `background:${color};height:4px;border-radius:2px;margin-top:4px;width:${Math.min(100, pc)}%;` }),
        ));
      });
    }
    renderTop(r.top);
  };

  activeIntervals.push(setInterval(tick, 1000));
  tick();
  return root;
};

// ============================================================
//  SETTINGS PAGE
// ============================================================

const renderSettings = () => {
  const root = el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, "Настройки"),
      el("h1", { class: "page-title" }, "Параметры приложения"),
      el("p", { class: "page-desc" }, "Предпочтения сохраняются на этом ПК и применяются при следующем запуске."),
    ),
  );

  const groupTitle = (t) => el("div", { class: "section__head" },
    el("div", {}, el("div", { class: "section__title" }, t)));

  const settingRow = (title, desc) => el("div", { class: "tweak" },
    el("div", { class: "tweak__main" },
      el("div", { class: "tweak__head" },
        el("div", { class: "tweak__title" }, title),
      ),
      desc ? el("div", { class: "tweak__desc" }, desc) : null,
    ),
  );

  const setRow = (key, label, desc, onchange) => {
    const toggle = el("div", { class: "ios-toggle" }, el("span", { class: "ios-toggle__lock", html: "" }));
    const sync = () => toggle.classList.toggle("ios-toggle--on", !!getSetting(key, false));
    const row = settingRow(label, desc);
    row.appendChild(toggle);
    toggle.addEventListener("click", async () => {
      const next = !getSetting(key, false);
      const r = await api("save_settings", { [key]: next });
      if (r?.ok && r.settings) APP_SETTINGS = Object.assign({}, APP_SETTINGS, r.settings);
      sync();
      if (key === "autostart") onchange && onchange(getSetting("autostart", false));
      showToast("Сохранено", "success", 1200);
    });
    return { row, sync };
  };

  root.appendChild(groupTitle("Внешний вид"));
  const themeRow = settingRow("Тёмная тема", "Светлая тема переключается автоматически. Требует перезапуска.");
  const themeBtn = el("button", { class: "btn btn--ghost" },
    el("span", { class: "btn__label" }, "Инверсия палитры"),
  );
  themeBtn.addEventListener("click", async () => {
    const next = getSetting("theme", "dark") === "dark" ? "light" : "dark";
    document.body.classList.toggle("theme-light", next === "light");
    const r = await api("save_settings", { theme: next });
    if (r?.ok && r.settings) APP_SETTINGS = Object.assign({}, APP_SETTINGS, r.settings);
    showToast(`Тема: ${getSetting("theme", "dark") === "light" ? "светлая" : "тёмная"}`, "success");
  });
  themeRow.appendChild(themeBtn);
  root.appendChild(themeRow);

  root.appendChild(groupTitle("Применение твиков"));
  const restore = setRow("create_restore_point", "Точка восстановления перед применением", "Хранит значение реестра для отката перед опасными твиками.");
  const confirmRow = setRow("confirm_danger", "Спрашивать подтверждение опасных твиков", "Дополнительная защита от случайного применения.");
  const notifyRow = setRow("notify_applied", "Уведомлять об успешном применении", "Показывать всплывающее уведомление после завершения.");
  root.appendChild(restore.row);
  root.appendChild(confirmRow.row);
  root.appendChild(notifyRow.row);

  root.appendChild(groupTitle("Запуск и обслуживание"));
  const auto = setRow("autostart", "Автозапуск вместе с Windows", "Добавляет KALASH в автозагрузку пользователя (HKCU Run).", async (on) => {
    const r = await api("set_autostart", on);
    if (!(r && r.ok)) { APP_SETTINGS.autostart = !on; showToast("Не удалось изменить автозапуск", "error"); }
  });
  root.appendChild(auto.row);

  root.appendChild(groupTitle("Журнал"));
  const clearHis = el("button", { class: "btn btn--ghost" },
    el("span", { class: "btn__icon", html: ICONS.cross }),
    el("span", { class: "btn__label" }, "Очистить журнал твиков"),
  );
  clearHis.addEventListener("click", async () => {
    if (!confirm("Очистить журнал без отката настроек?")) return;
    await api("clear_tweak_history");
    showToast("Журнал очищен", "success");
  });
  root.appendChild(clearHis);

  (async () => {
    await refreshSettings();
    document.body.classList.toggle("theme-light", getSetting("theme", "dark") === "light");
    restore.sync(); confirmRow.sync(); notifyRow.sync(); auto.sync();
  })();

  return root;
};

// ============================================================
//  BIOS TUNING GUIDE
// ============================================================

let biosSelectedBrand = null;

const BIOS_STORAGE_KEY = "kalash_bios_checklist";

const getBiosChecklist = () => {
  try { return JSON.parse(localStorage.getItem(BIOS_STORAGE_KEY) || "{}"); } catch { return {}; }
};

const toggleBiosCheck = (brandId, itemId) => {
  const cl = getBiosChecklist();
  const key = `${brandId}_${itemId}`;
  cl[key] = !cl[key];
  localStorage.setItem(BIOS_STORAGE_KEY, JSON.stringify(cl));
};

const renderBiosBrandCard = (brand, idx) => {
  const card = el("div", { class: "bios-brand-card", style: `animation-delay: ${idx * 60}ms` },
    el("div", { class: "bios-brand-card__logo" }, brand.logo),
    el("div", { class: "bios-brand-card__info" },
      el("div", { class: "bios-brand-card__name" }, brand.name),
      el("div", { class: "bios-brand-card__desc" }, brand.desc),
    ),
    el("div", { class: "bios-brand-card__arrow", html: ICONS.external }),
  );
  card.addEventListener("click", () => { biosSelectedBrand = brand.id; renderContent(); });
  return card;
};

const renderBiosBrandSelect = () => {
  const grid = el("div", { class: "bios-brand-grid" });
  BIOS_BRANDS.forEach((b, i) => grid.appendChild(renderBiosBrandCard(b, i)));

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, "Справочник"),
      el("h1", { class: "page-title page-title--big" }, "BIOS Tuning Guide"),
      el("p", { class: "page-desc" },
        "Пошаговое руководство по настройке BIOS для максимальной производительности в играх. " +
        "Выберите производителя вашей материнской платы."),
    ),
    el("div", { class: "section__head" },
      el("div", { class: "section__title" }, "Производители"),
      el("div", { class: "section__count" }, `${BIOS_BRANDS.length} брендов`),
    ),
    grid,
  );
};

const renderBiosGuide = (brandId) => {
  const brand = BIOS_BRANDS.find(b => b.id === brandId);
  if (!brand) return renderBiosBrandSelect();

  const checklist = getBiosChecklist();
  const completedCount = BIOS_GUIDE.filter(item => checklist[`${brandId}_${item.id}`]).length;

  const breadcrumbs = el("div", { class: "bios-breadcrumbs" },
    el("span", { class: "bios-breadcrumb", onclick: () => { biosSelectedBrand = null; renderContent(); } }, "BIOS Tuning"),
    el("span", { class: "bios-breadcrumb__sep" }, " / "),
    el("span", { class: "bios-breadcrumb bios-breadcrumb--active" }, brand.name),
  );

  const backBtn = el("button", { class: "btn btn--ghost", style: "margin-bottom:16px;" },
    el("span", { class: "btn__icon", html: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' }),
    el("span", { class: "btn__label" }, "Назад к выбору бренда"),
  );
  backBtn.addEventListener("click", () => { biosSelectedBrand = null; renderContent(); });

  const disclaimer = el("div", { class: "bios-disclaimer" },
    el("div", { class: "bios-disclaimer__icon", html: ICONS.alert }),
    el("div", { class: "bios-disclaimer__text" },
      el("div", { class: "bios-disclaimer__title" }, "Внимание"),
      el("div", {}, "Изменение настроек BIOS может повлиять на стабильность системы. " +
        "Записывайте исходные значения перед изменением. Не меняйте настройки, в которых не уверены."),
    ),
  );

  const toc = el("div", { class: "bios-toc" },
    el("div", { class: "bios-toc__title" }, "Оглавление"),
    ...BIOS_GUIDE.map(item => {
      const done = checklist[`${brandId}_${item.id}`];
      const tocItem = el("div", { class: `bios-toc__item ${done ? "bios-toc__item--done" : ""}` },
        el("span", { class: "bios-toc__check", html: done ? ICONS.check : "" }),
        el("span", {}, item.title),
      );
      tocItem.addEventListener("click", () => {
        document.getElementById(`bios-section-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return tocItem;
    }),
    el("div", { class: "bios-toc__progress" },
      el("div", { class: "bios-toc__progress-text" }, `${completedCount} / ${BIOS_GUIDE.length}`),
      el("div", { class: "bios-toc__progress-bar" },
        el("div", { class: "bios-toc__progress-fill", style: `width: ${(completedCount / BIOS_GUIDE.length) * 100}%` }),
      ),
    ),
  );

  const sections = BIOS_GUIDE.map(item => {
    const path = item.biosPaths[brandId] || item.biosPaths.asus;
    const done = checklist[`${brandId}_${item.id}`];

    const checkbox = el("div", { class: `bios-check ${done ? "bios-check--done" : ""}` },
      el("span", { class: "bios-check__icon", html: done ? ICONS.check : "" }),
      el("span", { class: "bios-check__label" }, done ? "Выполнено" : "Отметить как выполненное"),
    );
    checkbox.addEventListener("click", () => {
      toggleBiosCheck(brandId, item.id);
      renderContent();
      setTimeout(() => {
        document.getElementById(`bios-section-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    });

    return el("div", { class: `bios-section ${done ? "bios-section--done" : ""}`, id: `bios-section-${item.id}` },
      el("div", { class: "bios-section__header" },
        el("div", { class: "bios-section__icon", html: item.icon }),
        el("div", { class: "bios-section__title" }, item.title),
        checkbox,
      ),
      el("div", { class: "bios-section__path" },
        el("span", { class: "bios-section__path-label" }, "Путь:"),
        el("span", { class: "bios-section__path-value" }, path),
      ),
      el("div", { class: "bios-section__body" },
        el("div", { class: "bios-section__desc" }, item.description),
        el("div", { class: "bios-section__recommend" },
          el("span", { class: "bios-section__recommend-label" }, "Рекомендация:"),
          el("span", {}, item.recommended),
        ),
        el("div", { class: "bios-section__risk" },
          el("span", { class: "bios-section__risk-label" }, "Риски:"),
          el("span", {}, item.risks),
        ),
      ),
    );
  });

  return el("div", {},
    breadcrumbs,
    backBtn,
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow" }, `Гайд · ${brand.name}`),
      el("h1", { class: "page-title page-title--big" }, `BIOS Tuning — ${brand.name}`),
      el("p", { class: "page-desc" },
        `${BIOS_GUIDE.length} пунктов настройки. Пути меню указаны для ${brand.name} ${brand.series[0]} и могут незначительно отличаться в зависимости от модели.`),
    ),
    disclaimer,
    el("div", { class: "bios-layout" },
      toc,
      el("div", { class: "bios-sections" }, ...sections),
    ),
  );
};

// ============================================================
//  W11 DEEP OPTIMIZATION PAGE
// ============================================================


//  REGISTRY PAGE
// ============================================================

const renderRegistry = () => {
  let currentPage = localStorage.getItem("kalash_reg_page") || "";

  const pages = Object.entries(REGISTRY_TWEAKS);
  if (!REGISTRY_TWEAKS[currentPage]) currentPage = pages[0][0];

  const allTweaks = () => pages.flatMap(([, list]) => list);
  const groupOf = (name) => (pages.find(([, list]) => list.some((tw) => tw.name === name)) || [""])[0];

  const SECTION = "Реестр";
  const isRegStaged = (tw) => isQueued(SECTION, tw.name);
  const regItem = (tw) => ({ section: SECTION, group: groupOf(tw.name), name: tw.name, cmd: tw.cmd, risk: tw.risk });

  const buildBadges = (tw) => {
    const badges = [
      el("span", { class: `badge badge--${tw.risk}` }, REG_RISK_LABELS[tw.risk] || tw.risk),
    ];
    if (tw.rec && tw.rec.length) badges.push(el("span", { class: "badge badge--recommend" }, "Рекомендуется"));
    return badges;
  };

  const buildTweakRow = (tw, idx) => {
    const toggle = el("div", {
      class: "ios-toggle",
      role: "button",
      tabindex: "0",
      title: "Добавить в очередь",
    });

    const infoBtn = tw.desc ? el("button", { class: "tweak-info-btn", "data-name": tw.name, "data-desc": tw.desc, "data-tip": tw.tip || "", "data-safety": tw.risk || "", "data-rec": (tw.rec || []).join(","), html: ICONS.info }) : null;

    const row = el("div", { class: "tweak", style: `animation-delay: ${Math.min(idx, 24) * 10}ms` },
      el("div", { class: "tweak__main" },
        el("div", { class: "tweak__head" },
          el("div", { class: "tweak__title" }, tw.name),
          el("div", { class: "tweak__badges" }, ...buildBadges(tw)),
        ),
        el("p", { class: "tweak__desc" }, tw.desc),
      ),
      el("div", { class: "tweak__actions" }, infoBtn, toggle),
    );

    const sync = () => {
      const s = isRegStaged(tw);
      toggle.classList.toggle("ios-toggle--on", s);
      row.classList.toggle("tweak--staged", s);
    };

    toggle.addEventListener("click", () => {
      toggleQueued(regItem(tw));
      sync();
    });
    toggle.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleQueued(regItem(tw)); sync(); } });

    sync();
    return row;
  };

  const refreshNavCounts = () => {
    page.querySelectorAll(".reg-nav__item").forEach((item) => {
      const g = item.dataset.page;
      const list = REGISTRY_TWEAKS[g] || [];
      const n = list.filter((tw) => isQueued(SECTION, tw.name)).length;
      const badge = item.querySelector(".reg-nav__count");
      badge.textContent = n ? String(n) : "";
      badge.classList.toggle("reg-nav__count--on", n > 0);
    });
  };

  const refreshPanelStaged = () => {
    const el = page.querySelector(".reg-panel__staged");
    if (!el) return;
    const list = REGISTRY_TWEAKS[currentPage] || [];
    const staged = list.filter((tw) => isQueued(SECTION, tw.name)).length;
    el.textContent = staged ? `выбрано: ${staged}` : "ничего не выбрано";
    el.classList.toggle("reg-panel__staged--on", staged > 0);
  };

  const buildPageNav = (active) => {
    const nav = el("div", { class: "reg-nav" });
    for (const [group, list] of Object.entries(REGISTRY_TWEAKS)) {
      const n = list.filter((tw) => isQueued(SECTION, tw.name)).length;
      const item = el("button", { class: `reg-nav__item ${active === group ? "reg-nav__item--active" : ""}`, "data-page": group },
        el("span", { class: "reg-nav__label" }, group),
        el("span", { class: `reg-nav__count ${n ? "reg-nav__count--on" : ""}` }, n ? String(n) : ""),
      );
      item.addEventListener("click", () => {
        currentPage = group;
        localStorage.setItem("kalash_reg_page", group);
        refresh();
      });
      nav.appendChild(item);
    }
    return nav;
  };

  const buildSettingsPanel = () => {
    const list = REGISTRY_TWEAKS[currentPage] || [
  ];
    const total = list.length;
    const staged = list.filter((tw) => isQueued(SECTION, tw.name)).length;
    const body = el("div", { class: "tweaks" });
    list.forEach((tw, i) => body.appendChild(buildTweakRow(tw, i)));
    return el("div", { class: "reg-panel" },
      el("div", { class: "reg-panel__head" },
        el("div", { class: "reg-panel__title" }, currentPage),
        el("div", { class: "reg-panel__meta" },
          el("span", { class: "reg-panel__total" }, `${total} настроек`),
          el("span", { class: `reg-panel__staged ${staged ? "reg-panel__staged--on" : ""}` }, staged ? `выбрано: ${staged}` : "ничего не выбрано"),
        ),
      ),
      body,
    );
  };

  const page = el("div", {});
  let unsub = null;
  const refresh = () => {
    if (unsub) unsub();
    page.innerHTML = "";
    page.appendChild(el("div", {},
      el("div", { class: "page-header" },
        el("div", { class: "page-eyebrow page-eyebrow--hot" }, "РЕЕСТР · ГЛУБОКАЯ ОПТИМИЗАЦИЯ"),
        el("h1", { class: "page-title page-title--big" }, "Реестр — Глубокие настройки"),
        el("p", { class: "page-desc" },
          "Настройки разбиты на страницы. Слева — число выбранных настроек. Отмечай нужное, затем дай общее подтверждение."
        ),
      ),
      el("div", { class: "reg-layout" },
        buildPageNav(currentPage),
        buildSettingsPanel(),
      ),
      el("div", { class: "reg-footer" },
        el("p", { class: "reg-footer__text" },
          "Все изменения точечные и обратимы. Красным отмечены опасные настройки. Точка восстановления создаётся автоматически перед применением."
        ),
      ),
    ));
    unsub = onQueueChange(() => { refreshNavCounts(); refreshPanelStaged(); });
  };
  refresh();
  return page;
};



//  DEVICE CONTROL — MSI Mode + Interrupt Routing
// ============================================================

const MSI_MODE_TWEAKS = {
  "MSI Mode": [
    ["Включить MSI Mode для всех GPU", "Get-PnpDevice | Where-Object { $_.Class -eq 'Display' } | ForEach-Object { $dev = $_.InstanceId; $regPath = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\MessageSignaledInterruptProperties\"; if (!(Test-Path $regPath)) { New-Item -Path $regPath -Force | Out-Null }; Set-ItemProperty -Path $regPath -Name 'MSISupported' -Value 1 -Type DWord -ErrorAction SilentlyContinue }"],
    ["Установить приоритет прерываний GPU = High", "Get-PnpDevice | Where-Object { $_.Class -eq 'Display' } | ForEach-Object { $dev = $_.InstanceId; $regPath = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\Affinity Policy\"; if (!(Test-Path $regPath)) { New-Item -Path $regPath -Force | Out-Null }; Set-ItemProperty -Path $regPath -Name 'DevicePriority' -Value 3 -Type DWord -ErrorAction SilentlyContinue }"],
    ["Включить MSI Mode для мыши", "Get-PnpDevice | Where-Object { $_.FriendlyName -like '*HID-compliant mouse*' -or $_.FriendlyName -like '*USB Input Device*' } | ForEach-Object { $dev = $_.InstanceId; $regPath = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\MessageSignaledInterruptProperties\"; if (!(Test-Path $regPath)) { New-Item -Path $regPath -Force | Out-Null }; Set-ItemProperty -Path $regPath -Name 'MSISupported' -Value 1 -Type DWord -ErrorAction SilentlyContinue }"],
    ["Включить MSI Mode для Ethernet", "Get-PnpDevice | Where-Object { $_.Class -eq 'Net' -and $_.FriendlyName -like '*Ethernet*' } | ForEach-Object { $dev = $_.InstanceId; $regPath = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\MessageSignaledInterruptProperties\"; if (!(Test-Path $regPath)) { New-Item -Path $regPath -Force | Out-Null }; Set-ItemProperty -Path $regPath -Name 'MSISupported' -Value 1 -Type DWord -ErrorAction SilentlyContinue }"],
    ["MSI + Приоритет High для LAN (проводной)", "Get-PnpDevice | Where-Object { $_.Class -eq 'Net' -and $_.Status -eq 'OK' -and $_.PhysicalMediaType -ne 9 -and $_.FriendlyName -notmatch 'Wireless|Wi-?Fi|WLAN|802\\.11|Bluetooth' } | ForEach-Object { $dev = $_.InstanceId; $msi = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\MessageSignaledInterruptProperties\"; $aff = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\Affinity Policy\"; if (!(Test-Path $msi)) { New-Item -Path $msi -Force | Out-Null }; Set-ItemProperty -Path $msi -Name MSISupported -Value 1 -Type DWord -ErrorAction SilentlyContinue; if (!(Test-Path $aff)) { New-Item -Path $aff -Force | Out-Null }; Set-ItemProperty -Path $aff -Name DevicePriority -Value 3 -Type DWord -ErrorAction SilentlyContinue }"],
    ["MSI + Приоритет High для Wi-Fi (беспроводной)", "Get-PnpDevice | Where-Object { $_.Class -eq 'Net' -and $_.Status -eq 'OK' -and ($_.PhysicalMediaType -eq 9 -or $_.FriendlyName -match 'Wireless|Wi-?Fi|WLAN|802\\.11') } | ForEach-Object { $dev = $_.InstanceId; $msi = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\MessageSignaledInterruptProperties\"; $aff = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\Affinity Policy\"; if (!(Test-Path $msi)) { New-Item -Path $msi -Force | Out-Null }; Set-ItemProperty -Path $msi -Name MSISupported -Value 1 -Type DWord -ErrorAction SilentlyContinue; if (!(Test-Path $aff)) { New-Item -Path $aff -Force | Out-Null }; Set-ItemProperty -Path $aff -Name DevicePriority -Value 3 -Type DWord -ErrorAction SilentlyContinue }"],
  ],
  "Interrupt Affinity (режим ядра)": [
    ["GPU → Ядро 0 (самое быстрое)", "Get-PnpDevice | Where-Object { $_.Class -eq 'Display' } | ForEach-Object { $dev = $_.InstanceId; $regPath = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\Affinity Policy\"; if (!(Test-Path $regPath)) { New-Item -Path $regPath -Force | Out-Null }; Set-ItemProperty -Path $regPath -Name 'AssignmentSetOverride' -Value ([byte[]](1)) -Type Binary -ErrorAction SilentlyContinue }"],
    ["GPU → Ядра 0-1 (два быстрых ядра)", "Get-PnpDevice | Where-Object { $_.Class -eq 'Display' } | ForEach-Object { $dev = $_.InstanceId; $regPath = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\Affinity Policy\"; if (!(Test-Path $regPath)) { New-Item -Path $regPath -Force | Out-Null }; Set-ItemProperty -Path $regPath -Name 'AssignmentSetOverride' -Value ([byte[]](3)) -Type Binary -ErrorAction SilentlyContinue }"],
    ["Мышь → Ядро 1", "Get-PnpDevice | Where-Object { $_.FriendlyName -like '*HID-compliant mouse*' } | ForEach-Object { $dev = $_.InstanceId; $regPath = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\Affinity Policy\"; if (!(Test-Path $regPath)) { New-Item -Path $regPath -Force | Out-Null }; Set-ItemProperty -Path $regPath -Name 'AssignmentSetOverride' -Value ([byte[]](2)) -Type Binary -ErrorAction SilentlyContinue }"],
    ["Сбросить Affinity Policy", "Get-PnpDevice | ForEach-Object { $dev = $_.InstanceId; $regPath = \"HKLM:\\SYSTEM\\CurrentControlSet\\Enum\\$dev\\Device Parameters\\Interrupt Management\\Affinity Policy\"; if (Test-Path $regPath) { Remove-ItemProperty -Path $regPath -Name 'AssignmentSetOverride' -ErrorAction SilentlyContinue } }"],
  ],
  "Hidden Tweaks (Free)": [
    ["MSI Mode ALL (Display+Net+SCSI)", "Get-PnpDevice | Where-Object { $_.Class -eq 'Display' -or $_.Class -eq 'Net' -or $_.Class -eq 'SCSIAdapter' } | ForEach-Object { $dev = $_.InstanceId; $reg = \"HKLM:\SYSTEM\CurrentControlSet\Enum\$dev\Device Parameters\Interrupt Management\MessageSignaledInterruptProperties\"; if (!(Test-Path $reg)) { New-Item -Path $reg -Force | Out-Null }; Set-ItemProperty -Path $reg -Name MSISupported -Value 1 -Type DWord -ErrorAction SilentlyContinue }", "Enables MSI interrupts on GPU, network and storage at once. Lowers CPU load and removes micro-stutter.", "Full MSI mode for three key device classes in one click. Reboot required."],
    ["MSI Priority High GPU", "Get-PnpDevice | Where-Object { $_.Class -eq 'Display' } | ForEach-Object { $dev = $_.InstanceId; $reg = \"HKLM:\SYSTEM\CurrentControlSet\Enum\$dev\Device Parameters\Interrupt Management\Affinity Policy\"; if (!(Test-Path $reg)) { New-Item -Path $reg -Force | Out-Null }; Set-ItemProperty -Path $reg -Name DevicePriority -Value 3 -Type DWord -ErrorAction SilentlyContinue }", "Sets maximum interrupt priority for the GPU. Video card reacts faster.", "Complements MSI Mode. Makes FPS steadier under background load."],
    ["System Responsiveness 10", "reg add \"HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\" /v SystemResponsiveness /t REG_DWORD /d 10 /f", "Gives scheduler 10% CPU for multimedia instead of the default 20%. More resources for games.", "Values 10-20. 10 is aggressive for gaming."],
    ["MMCSS Games Priority 26", "reg add \"HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games\" /v \"Priority\" /t REG_DWORD /d 26 /f", "Sets maximum game-stream priority in the scheduler, above default games.", "Lowers input lag. Works on Win10/11."],
    ["NTFS Disable 8.3 Names", "fsutil behavior set disable8dot3 1 | Out-Null", "Disables short 8.3 names on the system drive. Faster writes on SSD.", "Undo: fsutil behavior set disable8dot3 0"],
    ["Disable Nagle (global)", "reg add \"HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\*\" /v TCPNoDelay /t REG_DWORD /d 1 /f", "Disables Nagle's algorithm on all adapters. Minimal ping in online games.", "Classic for shooters."],
    ["WinSAT rescore", "winsat formal", "Re-runs the full Windows Experience (WinSAT) evaluation.", "Takes a couple of minutes. Refreshes metrics after hardware changes."],
  ],
};

const renderDevices = () => {
  const total = Object.values(MSI_MODE_TWEAKS).reduce((s, g) => s + g.length, 0);

  const startBtn = el("button", { class: "btn btn--primary btn--lg btn--block" },
    el("span", { class: "btn__icon", html: ICONS.device }),
    el("span", { class: "btn__label" }, `Добавить все в очередь (${total})`),
  );

  const msiItems = [];
  for (const [group, tweaks] of Object.entries(MSI_MODE_TWEAKS)) {
    for (const [name, cmd] of tweaks) {
      msiItems.push({ section: "Устройства", group, name, cmd, risk: "warn", run: () => api("run_pro_tweak", cmd) });
    }
  }
startBtn.addEventListener("click", () => {
    const added = stageQueued(msiItems);
    showToast(`В очередь добавлено ${added} ${pluralActions(added)}`, "success");
  });

  const body = el("div", { class: "tweaks" });
  let idx = 0;
  for (const [groupName, tweaks] of Object.entries(MSI_MODE_TWEAKS)) {
    body.appendChild(el("div", { class: "tweak-group__title" }, groupName));
    for (const [name, cmd] of tweaks) {
      const toggle = el("div", { class: "ios-toggle", role: "button", tabindex: "0", title: "Добавить в очередь" });
      const sync = () => {
        toggle.classList.toggle("ios-toggle--on", isQueued("Устройства", name));
      };
      toggle.addEventListener("click", () => {
        toggleQueued({ section: "Устройства", group: groupName, name, cmd, risk: "warn", run: () => api("run_pro_tweak", cmd) });
        sync();
      });
      toggle.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleQueued({ section: "Устройства", group: groupName, name, cmd, risk: "warn", run: () => api("run_pro_tweak", cmd) }); sync(); } });
      sync();
      body.appendChild(el("div", { class: "tweak", style: `animation-delay: ${Math.min(idx, 24) * 16}ms` },
        el("div", { class: "tweak__main" },
          el("div", { class: "tweak__head" },
            el("div", { class: "tweak__title" }, name),
            el("span", { class: "badge badge--safe" }, "MSI"),
          ),
        ),
        toggle,
      ));
      idx++;
    }
  }

  const detected = el("div", { class: "device-detect", id: "deviceDetect" },
    el("div", { class: "device-detect__title" }, "Обнаруженные видеокарты"),
    el("div", { class: "device-detect__loading" }, "Сканирование…"),
  );

  (async () => {
    const r = await runTweakSafe("Get-PnpDevice | Where-Object { $_.Class -eq 'Display' -and $_.Status -eq 'OK' } | ForEach-Object { \"$($_.Class)|$($_.FriendlyName)|$($_.InstanceId)\" }");
    const el2 = $("#deviceDetect");
    if (!el2) return;
    if (r?.ok && r.stdout) {
      const lines = r.stdout.split("\n").filter(l => l.trim());
      el2.innerHTML = "";
      el2.appendChild(el("div", { class: "device-detect__title" }, `Обнаруженные видеокарты (${lines.length})`));
      for (const line of lines) {
        const [cls, name, id] = line.trim().split("|");
        el2.appendChild(el("div", { class: "device-detect__item" },
          el("span", { class: "device-detect__cls" }, cls || "?"),
          el("span", { class: "device-detect__name" }, name || "Unknown"),
        ));
      }
    } else {
      el2.innerHTML = '<div class="device-detect__title">Видеокарты не обнаружены</div>';
    }
  })();

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow page-eyebrow--hot" }, "УСТРОЙСТВА · MSI MODE"),
      el("h1", { class: "page-title page-title--big" }, "Устройства — MSI Mode"),
      el("p", { class: "page-desc" },
        "Переключение устройств в Message-Signaled Interrupts режим и настройка привязки прерываний к ядрам CPU. " +
        "Снижает латентность GPU, мыши и сети. Отмечай действия в очередь, затем «Применить» внизу."
      ),
    ),
    detected,
    el("div", { class: "fixes-actions", style: "grid-template-columns: 1fr;" }, startBtn),
    body,
  );
};

// ============================================================
//  NETWORK PROFILES — presets for network adapters
// ============================================================


// ============================================================
//  GAMES PAGE — gaming optimization presets
// ============================================================

const GAME_TWEAKS = {
  "Игровой режим": [
    ["Game Bar OFF", "reg add 'HKCU\\Software\\Microsoft\\GameBar' /v UseNexusForGameBarEnabled /t REG_DWORD /d 0 /f; reg add 'HKCU\\Software\\Microsoft\\GameBar' /v ShowStartupPanel /t REG_DWORD /d 0 /f", "safe", "Отключает Game Bar оверлей — меньше оверхед.", null, "Убирает оверлей Game Bar. Меньше оверхед и потребление RAM."],
    ["Hardware Accelerated GPU Scheduling", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v HwSchMode /t REG_DWORD /d 2 /f", "safe", "HAGS — GPU сам планирует задачи, снижает задержку.", null, "Требует Windows 10 2004+ и совместимый драйвер. Перезагрузка обязательна."],
    ["GPU Priority = 8", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games' /v 'GPU Priority' /t REG_DWORD /d 8 /f", "safe", "Максимальный приоритет GPU для игровых процессов.", null, "Безопасно, влияет только на Games SystemProfile."],
    ["Win32PrioritySeparation = 38", "reg add 'HKLM\\System\\CurrentControlSet\\Control\\PriorityControl' /v Win32PrioritySeparation /t REG_DWORD /d 38 /f", "safe", "Foreground boost + короткие кванты — оптимально для игр.", null, "Оптимально для FPS-игр. Активное окно получает больше ресурсов."],
  ],
  "GPU и рендеринг": [
    ["HAGS ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v HwSchMode /t REG_DWORD /d 2 /f", "safe", "Hardware-Accelerated GPU Scheduling.", null, "GPU сам планирует задачи. Снижает задержку в играх."],
    ["VRR ON (FreeSync/G-Sync)", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v EnableVariableRefreshRate /t REG_DWORD /d 1 /f", "safe", "Variable Refresh Rate — убирает разрывы.", null, "Требует FreeSync/G-Sync монитор и совместимый GPU."],
    ["DWM OverlayTestMode = 5", "reg add 'HKCU\\SOFTWARE\\Microsoft\\Windows\\DWM' /v OverlayTestMode /t REG_DWORD /d 5 /f", "safe", "Оптимизация DWM — меньше overhead.", null, "Убирает лишние оверлеи DWM. Визуально ничего не меняется."],
    ["Flip Model Swapchain ON", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v FlipModelSwapchain /t REG_DWORD /d 1 /f", "safe", "Быстрее рендеринг в играх.", null, "Быстрее рендеринг в играх без композита DWM."],
    ["MaxPreRenderedFrames = 1", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v MaxFrameLatency /t REG_DWORD /d 1 /f", "safe", "Один кадр в очереди — меньше input lag.", null, "Может вызвать микро-фризы при нестабильном FPS."],
    ["Low Latency Mode Ultra", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v UltraLowLatencyMode /t REG_DWORD /d 1 /f", "safe", "Ультра-низкая задержка в играх.", null, "Для NVIDIA GPU GTX 10xx+. На AMD — не действует."],
  ],
  "Сеть для игр": [
    ["Network Throttling OFF", "reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f", "safe", "Отключает троттлинг сети в мультимедиа — ниже пинг.", null, "Рекомендуется для стриминга, онлайн-игр и загрузок."],
    ["Nagle OFF (per interface)", "Get-NetAdapter | Where-Object {$_.Status -eq 'Up'} | ForEach-Object { $id = $_.InterfaceGuid; reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\$id\" /v TcpAckFrequency /t REG_DWORD /d 1 /f; reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\$id\" /v TCPNoDelay /t REG_DWORD /d 1 /f }", "warn", "Отключает алгоритм Нэгла — ниже пинг.", null, "Влияет на ICMP-пинг. Для онлайн-игр — однозначно лучше."],
    ["DNS Cloudflare 1.1.1.1", "Set-DnsClientServerAddress -InterfaceAlias '*' -ServerAddresses ('1.1.1.1','1.0.0.1') -ErrorAction SilentlyContinue", "safe", "Самый быстрый публичный DNS.", null, "Самый быстрый публичный DNS."],
    ["TCP Fast Open", "netsh int tcp set global fastopen=enabled 2>$null", "safe", "Ускоряет повторные TCP-соединения.", null, "Ускоряет повторные TCP-соединения."],
    ["MaxUserPort 65534", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v MaxUserPort /t REG_DWORD /d 65534 /f", "safe", "Максимум портов для активных соединений.", null, "Стандарт 5000 — мало для торентов. 65534 — максимум."],
    ["TcpTimedWaitDelay 30", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters' /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f", "safe", "Быстрее освобождение портов после закрытия.", null, "Стандарт 120с — пережиток. 30с безопасно."],
  ],
  "Питание": [
    ["Ultimate Performance", "powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 2>$null; powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61", "safe", "Максимальная схема питания Windows.", null, "Для десктопов — идеально. На ноутбуках — только от сети."],
    ["Core Parking 100%", "powercfg /setacvalueindex scheme_current sub_processor CPMINCORES 100; powercfg /setactive scheme_current", "safe", "Все ядра CPU всегда активны.", null, "Все ядра всегда активны. На ноутбуках — лишний нагрев."],
    ["Power Throttling OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling' /v PowerThrottlingOff /t REG_DWORD /d 1 /f", "safe", "Отключает троттлинг мощности для фоновых процессов.", null, "Фоновые приложения перестанут замедляться."],
    ["Turbo Boost Max", "powercfg /setacvalueindex scheme_current sub_processor PERFBOOSTMODE 1; powercfg /setactive scheme_current", "safe", "Агрессивный турбо-буст — CPU держит максимум.", null, "Требует хорошего кулера. Температура может вырасти."],
    ["Disks no sleep", "powercfg /setacvalueindex scheme_current sub_disk DISKIDLE 0; powercfg /setactive scheme_current", "safe", "Диски не засыпают — мгновенный доступ к файлам.", null, "Для десктопов — ок. На ноутбуках — лишний шум HDD."],
    ["План питания Kalash (макс. CPU)", "powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 2>$null; powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61 2>$null; powercfg /setacvalueindex scheme_current sub_processor PROCTHROTTLEMIN 100; powercfg /setacvalueindex scheme_current sub_processor PROCTHROTTLEMAX 100; powercfg /setacvalueindex scheme_current sub_processor CPMINCORES 100; powercfg /setacvalueindex scheme_current sub_disk DISKIDLE 0; powercfg /setacvalueindex scheme_current 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0; powercfg /setactive scheme_current", "safe", "Всё в одном: Ultimate Performance + CPU 100%/100%, все ядра, диски и USB не засыпают — фирменный план Kalash.", null, "Для десктопов с хорошим охлаждением. На ноутбуках — только от сети."],
  ],
  "Steam": [
    ["Steam: ярлык No Helper", "$p=(Get-ItemProperty 'HKCU:\\Software\\Valve\\Steam' -ErrorAction SilentlyContinue).SteamPath; if(!$p){$p=(Get-ItemProperty 'HKLM:\\SOFTWARE\\WOW6432Node\\Valve\\Steam' -ErrorAction SilentlyContinue).InstallPath}; if($p){$p=$p -replace '/','\\';$w=New-Object -ComObject WScript.Shell;$s=$w.CreateShortcut($env:USERPROFILE+'\\Desktop\\Steam (No Helper).lnk');$s.TargetPath=$p+'\\steam.exe';$s.Arguments='-no-browser -no-cef-sandbox -no-react-js -vgui -no-browser-service +open steam://open/minigameslist';$s.WorkingDirectory=$p;$s.IconLocation=$p+'\\steam.exe, 0';$s.Save();'OK'}", "safe", "Ярлык на рабочем столе: Steam без SteamWebHelper — экономит до 1.5ГБ ОЗУ.", null, "Запускайте Steam из нового ярлыка. Клиент и библиотека работают."],
    ["Steam: ярлык Ultra Performance", "$p=(Get-ItemProperty 'HKCU:\\Software\\Valve\\Steam' -ErrorAction SilentlyContinue).SteamPath; if(!$p){$p=(Get-ItemProperty 'HKLM:\\SOFTWARE\\WOW6432Node\\Valve\\Steam' -ErrorAction SilentlyContinue).InstallPath}; if($p){$p=$p -replace '/','\\';$w=New-Object -ComObject WScript.Shell;$s=$w.CreateShortcut($env:USERPROFILE+'\\Desktop\\Steam (Ultra Performance).lnk');$s.TargetPath=$p+'\\steam.exe';$s.Arguments='-no-browser -no-cef-sandbox -no-react-js -vgui -no-prefer-freetype -cef-force-32bit -cef-in-process-gpu +open steam://open/minigameslist';$s.WorkingDirectory=$p;$s.IconLocation=$p+'\\steam.exe, 0';$s.Save();'OK'}", "warn", "Максимальная экономия: WebHelper выключен, WebHelper понижен в приоритете...", null, "Самый агрессивный вариант. Если клиент тормозит UI, используйте 'No Helper'."],
    ["Steam: ярлык Game Mode", "$p=(Get-ItemProperty 'HKCU:\\Software\\Valve\\Steam' -ErrorAction SilentlyContinue).SteamPath; if(!$p){$p=(Get-ItemProperty 'HKLM:\\SOFTWARE\\WOW6432Node\\Valve\\Steam' -ErrorAction SilentlyContinue).InstallPath}; if($p){$p=$p -replace '/','\\';$w=New-Object -ComObject WScript.Shell;$s=$w.CreateShortcut($env:USERPROFILE+'\\Desktop\\Steam (Game Mode).lnk');$s.TargetPath=$p+'\\steam.exe';$s.Arguments='-no-d3d9ex -no-cef-sandbox -lowappprio -silent';$s.WorkingDirectory=$p;$s.IconLocation=$p+'\\steam.exe, 0';$s.Save();'OK'}", "safe", "Лёгкий игровой ярлык: низкий приоритет фоновых, без лишних сервисов, интерфейс сохраняется.", null, "Игры запускаются из клиента без потери UI Steam."],
    ["Steam: вернуть стандартный ярлык", "$p=(Get-ItemProperty 'HKCU:\\Software\\Valve\\Steam' -ErrorAction SilentlyContinue).SteamPath; if(!$p){$p=(Get-ItemProperty 'HKLM:\\SOFTWARE\\WOW6432Node\\Valve\\Steam' -ErrorAction SilentlyContinue).InstallPath}; if($p){$p=$p -replace '/','\\';$w=New-Object -ComObject WScript.Shell;$s=$w.CreateShortcut($env:USERPROFILE+'\\Desktop\\Steam (Default).lnk');$s.TargetPath=$p+'\\steam.exe';$s.Arguments='';$s.WorkingDirectory=$p;$s.IconLocation=$p+'\\steam.exe, 0';$s.Save();'OK'}", "safe", "Создаёт обычный ярлык Steam без флагов — откат от оптимизации.", null, "Просто стандартный ярлык Steam."],
    ["Steam: глубокая очистка кэша", "$p=(Get-ItemProperty 'HKCU:\\Software\\Valve\\Steam' -ErrorAction SilentlyContinue).SteamPath; if(!$p){$p=(Get-ItemProperty 'HKLM:\\SOFTWARE\\WOW6432Node\\Valve\\Steam' -ErrorAction SilentlyContinue).InstallPath}; if($p){$p=$p -replace '/','\\'; Remove-Item ($p+'\\appcache') -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item ($p+'\\depotcache') -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item ($p+'\\config\\htmlcache') -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item ($env:LOCALAPPDATA+'\\Steam\\htmlcache') -Recurse -Force -ErrorAction SilentlyContinue; Get-ChildItem ($p+'\\*.log') -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue; 'OK'}", "safe", "Очищает appcache, depotcache, htmlcache и логи Steam.", null, "Выйдите из Steam перед запуском, иначе файлы заняты процессом."],
    ["Steam: твики реестра", "reg add 'HKCU\\Software\\Valve\\Steam' /v RememberPassword /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f; reg add 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile' /v SystemResponsiveness /t REG_DWORD /d 0 /f", "safe", "RememberPassword=1; снятие сетевого троттлинга — ниже пинг в играх.", null, "SystemResponsiveness=0 убирает искусственные задержки мультимедиа."],
    ["Steam: закрыть фоновые процессы", "taskkill /F /IM steamwebhelper.exe 2>$null; taskkill /F /IM steamservice.exe 2>$null; taskkill /F /IM steam.exe 2>$null", "warn", "Завершает Steam, WebHelper и SteamService принудительно.", null, "Закроет и сам клиент Steam. Нужен перед очисткой кэша."],
  ],
};

const renderGames = () => {
  const body = el("div", { class: "tweaks" });
  let idx = 0;
  for (const [groupName, tweaks] of Object.entries(GAME_TWEAKS)) {
    const groupEl = el("div", { class: "tweak-group" },
      el("div", { class: "tweak-group__head" },
        el("span", { class: "tweak-group__title" }, groupName),
        el("div", { class: "tweak-group__actions" },
          el("span", { class: "tweak-group__count" }, `${tweaks.length}`),
          buildApplyAllButton(groupName, tweaks),
        ),
      ),
    );
    const inner = el("div", { class: "tweaks" });
    tweaks.forEach((t, i) => inner.appendChild(buildTweakRow(t, i)));
    groupEl.appendChild(inner);
    body.appendChild(groupEl);
    idx += tweaks.length;
  }

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow page-eyebrow--hot" }, "ИГРЫ"),
      el("h1", { class: "page-title page-title--big" }, "Игры"),
      el("p", { class: "page-desc" },
        "Оптимизация для максимального FPS и минимального input lag. Все настройки под игры."
      ),
    ),
    body,
  );
};

// ============================================================
//  NVIDIA PAGE — NVIDIA GPU tweaks
// ============================================================

const NVIDIA_TWEAKS = {
  "NVIDIA Panel (реестр)": [
    ["Threaded Optimization ON", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v ThreadedOptimization /t REG_DWORD /d 1 /f", "safe", "Многопоточная оптимизация — распараллеливание на ядра GPU.", "nvidia"],
    ["Low Latency Mode ON", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v LowLatencyMode /t REG_DWORD /d 1 /f", "safe", "NVIDIA Low Latency Mode — меньше input lag.", "nvidia"],
    ["Power Management: Max Performance", "reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v PerfLevelSrc /t REG_DWORD /d 8738 /f; reg add 'HKCU\\Software\\NVIDIA Corporation\\Global\\NVTweak' /v DisableP9Powersaving /t REG_DWORD /d 1 /f", "safe", "Максимальная производительность GPU без энергосбережения.", "nvidia"],
    ["Pre-Rendered Frames = 1", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v MaxFrameLatency /t REG_DWORD /d 1 /f", "safe", "Один кадр в очереди — минимальный input lag."],
    ["Ultra Low Latency Mode", "reg add 'HKLM\\SOFTWARE\\Microsoft\\DirectX' /v UltraLowLatencyMode /t REG_DWORD /d 1 /f", "safe", "Ультра-низкая задержка через DirectX."],
  ],
  "TDR (отображение)": [
    ["TDR Delay = 60s", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDelay /t REG_DWORD /d 60 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDdiDelay /t REG_DWORD /d 60 /f", "warn", "60с до сброса GPU при зависании.", "nvidia"],
    ["TDR Level = 0 (OFF)", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrLevel /t REG_DWORD /d 0 /f", "warn", "Отключает TDR полностью — GPU не сбрасывается при зависании.", "nvidia"],
    ["TDR Retry Count = 10", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrRetryCount /t REG_DWORD /d 10 /f", "warn", "Больше попыток перед сбросом GPU.", "nvidia"],
  ],
  "Кэш шейдеров": [
    ["Очистить кэш NVIDIA DXCache", "Get-ChildItem -Path \"$env:LocalAppData\\NVIDIA\\DXCache\" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш шейдеров DirectX NVIDIA."],
    ["Очистить кэш NVIDIA GLCache", "Get-ChildItem -Path \"$env:LocalAppData\\NVIDIA\\GLCache\" -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает кэш OpenGL NVIDIA."],
    ["Очистить кэш шейдеров DirectX", "Remove-Item \"$env:LocalAppData\\D3DSCache\\*\" -Recurse -Force -ErrorAction SilentlyContinue", "safe", "Очищает системный кэш шейдеров."],
  ],
};

const renderNvidia = () => {
  const body = el("div", { class: "tweaks" });
  let idx = 0;

  for (const [groupName, tweaks] of Object.entries(NVIDIA_TWEAKS)) {
    const groupEl = el("div", { class: "tweak-group" },
      el("div", { class: "tweak-group__head" },
        el("span", { class: "tweak-group__title" }, groupName),
        el("div", { class: "tweak-group__actions" },
          el("span", { class: "tweak-group__count" }, `${tweaks.length}`),
          buildApplyAllButton(groupName, tweaks),
        ),
      ),
    );
    const inner = el("div", { class: "tweaks" });
    tweaks.forEach((t, i) => inner.appendChild(buildTweakRow(t, i)));
    groupEl.appendChild(inner);
    body.appendChild(groupEl);
    idx += tweaks.length;
  }

  const gpuInfo = el("div", { class: "device-detect", id: "nvidiaDetect" },
    el("div", { class: "device-detect__title" }, "Обнаружение GPU…"),
  );

  (async () => {
    const r = await runTweakSafe("Get-WmiObject Win32_VideoController | ForEach-Object { \"$($_.Name)|$($_.DriverVersion)|$($_.AdapterRAM)\" }");
    const el2 = $("#nvidiaDetect");
    if (!el2) return;
    el2.innerHTML = "";
    el2.appendChild(el("div", { class: "device-detect__title" }, "Видеокарты"));
    if (r?.ok && r.stdout) {
      const lines = r.stdout.split("\n").filter(l => l.trim());
      for (const line of lines) {
        const [name, driver, vram] = line.trim().split("|");
        const isNvidia = (name || "").toLowerCase().includes("nvidia");
        const vramGB = vram ? `${(parseInt(vram, 10) / 1073741824).toFixed(0)} GB` : "?";
        el2.appendChild(el("div", { class: "device-detect__item" },
          el("span", { class: `badge ${isNvidia ? "badge--safe" : "badge--warn" }`, style: "font-size:10px;" }, isNvidia ? "NVIDIA" : "Other"),
          el("span", { class: "device-detect__name" }, name || "Unknown"),
          el("span", { class: "device-detect__cls" }, `v${driver || "?"} · ${vramGB}`),
        ));
      }
    } else {
      el2.appendChild(el("div", { class: "empty" }, "Видеокарты не обнаружены"));
    }
  })();

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow page-eyebrow--hot" }, "NVIDIA"),
      el("h1", { class: "page-title page-title--big" }, "NVIDIA"),
      el("p", { class: "page-desc" },
        "Оптимизация NVIDIA GPU: настройки панели управления, TDR, кэш шейдеров, низкая задержка."
      ),
    ),
    gpuInfo,
    body,
  );
};

// ============================================================
//  PERFORMANCE vs SECURITY
// ============================================================

const PERFOSEC_TWEAKS = {
  "Производительность →": [
    ["VBS OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard' /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 0 /f", "warn", "Отключает VBS — часто +FPS. Нужен ребут. Жёсткое отключение защиты — только в разделе «Нукер»."],
    ["HVCI / Memory Integrity OFF", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity' /v Enabled /t REG_DWORD /d 0 /f", "warn", "Отключает Memory Integrity — +FPS, ниже защита ядра. Ребут."],
    ["Defender Exclusions: Games", "Add-MpPreference -ExclusionPath 'C:\\Games','D:\\Games' -ErrorAction SilentlyContinue", "warn", "Исключает только папки игр из сканирования — без отключения Defender."],
    ["TDR Delay 8", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers' /v TdrDelay /t REG_DWORD /d 8 /f", "warn", "Безопасный таймаут GPU вместо опасного TdrDelay=0."],
  ],
  "Защита →": [
    ["VBS ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard' /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 1 /f", "safe", "Включает VBS."],
    ["HVCI ON", "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity' /v Enabled /t REG_DWORD /d 1 /f", "safe", "Включает Memory Integrity."],
    ["DEP OptIn (рекомендуется)", "bcdedit /set nx OptIn 2>$null", "safe", "Включает DEP — критично для стабильности Chrome/Steam/KALASH."],
    ["Defender Real-Time ON", "Set-MpPreference -DisableRealtimeMonitoring $false -ErrorAction SilentlyContinue", "safe", "Включает realtime-сканирование."],
    ["Defender Cloud ON", "Set-MpPreference -MAPSReporting Advanced -ErrorAction SilentlyContinue; Set-MpPreference -SubmitSamplesConsent SendSafeSamples -ErrorAction SilentlyContinue", "safe", "Включает облачные проверки."],
    ["SmartScreen ON", "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AppHost' /v EnableWebContentEvaluation /t REG_DWORD /d 1 /f; reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System' /v EnableSmartScreen /t REG_DWORD /d 1 /f", "safe", "Включает SmartScreen."],
    ["Умный экран Edge ON", "reg add 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge' /v SmartScreenEnabled /t REG_DWORD /d 1 /f", "safe", "Включает SmartScreen в Edge."],
  ],
};

const renderPerfSec = () => {
  const body = el("div", { class: "tweaks" });
  let idx = 0;
  for (const [groupName, tweaks] of Object.entries(PERFOSEC_TWEAKS)) {
    const groupEl = el("div", { class: "tweak-group" },
      el("div", { class: "tweak-group__head" },
        el("span", { class: "tweak-group__title" }, groupName),
        el("div", { class: "tweak-group__actions" },
          el("span", { class: "tweak-group__count" }, `${tweaks.length}`),
          buildApplyAllButton(groupName, tweaks),
        ),
      ),
    );
    const inner = el("div", { class: "tweaks" });
    tweaks.forEach((t, i) => inner.appendChild(buildTweakRow(t, i)));
    groupEl.appendChild(inner);
    body.appendChild(groupEl);
    idx += tweaks.length;
  }

  const statusPanel = el("div", { class: "ps-status", id: "psStatus" },
    el("div", { class: "empty" }, "Проверка текущего состояния…"),
  );

  (async () => {
    const el2 = $("#psStatus");
    if (!el2) return;
    el2.innerHTML = "";

    const checks = [
      ["VBS", "reg query 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard' /v EnableVirtualizationBasedSecurity 2>$null | Select-String '0x1'"],
      ["HVCI", "reg query 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity' /v Enabled 2>$null | Select-String '0x1'"],
      ["Defender RT", "Get-MpPreference | Select-Object -ExpandProperty DisableRealtimeMonitoring 2>$null"],
    ];

    for (const [label, cmd] of checks) {
      const r = await runTweakSafe(cmd);
      const isOn = r?.ok && r.stdout && (r.stdout.includes("0x1") || r.stdout.includes("True") || r.stdout.includes("1"));
      const isOff = r?.ok && r.stdout && (r.stdout.includes("0x0") || r.stdout.includes("False") || r.stdout.includes("0") && !isOn);
      const state = isOn ? "ON" : isOff ? "OFF" : "?";
      const color = isOn ? "var(--green)" : isOff ? "var(--red)" : "var(--text-muted)";

      el2.appendChild(el("div", { class: "ps-status-item" },
        el("span", { class: "ps-status-item__label" }, label),
        el("span", { class: "ps-status-item__value", style: `color:${color};font-weight:700;font-family:'JetBrains Mono',monospace;` }, state),
      ));
    }
  })();

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow page-eyebrow--hot" }, "ПРОИЗВОДИТЕЛЬНОСТЬ vs ЗАЩИТА"),
      el("h1", { class: "page-title page-title--big" }, "Перф. vs Защита"),
      el("p", { class: "page-desc" },
        "Баланс между производительностью и безопасностью. Отключение VBS/HVCI/Defender даёт +5-15% FPS, но снижает защиту."
      ),
    ),
    statusPanel,
    body,
  );
};

// ============================================================
//  DATA COLLECTION — Службы сбора данных
// ============================================================

const DATACOLL_TWEAKS = {
  "Телеметрия Microsoft": [
    ["Отключить DiagTrack (Main Telemetry)", 'sc config DiagTrack start= disabled; Stop-Service DiagTrack -Force -EA 0; reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', "safe", "Главная служба телеметрии. Отключает сбор данных о использовании Windows."],
    ["Отключить dmwappushservice", 'sc config dmwappushservice start= disabled; Stop-Service dmwappushservice -Force -EA 0', "safe", "WAP Push — служба push-уведомлений. Не нужна на ПК."],
    ["Отключить DiagnosticExecutionService", 'sc config diagsvc start= disabled; Stop-Service diagsvc -Force -EA 0', "safe", "Diagnostic Execution Service — выполнение диагностических задач."],
    ["Отключить Diagnostic Service Host", 'sc config WdiServiceHost start= disabled; Stop-Service WdiServiceHost -Force -EA 0', "safe", "Хост диагностических сервисов — поддержка телеметрии."],
    ["Отключить Diagnostic System Host", 'sc config WdiSystemHost start= disabled; Stop-Service WdiSystemHost -Force -EA 0', "safe", "Системный хост диагностик — фоновый сбор данных."],
    ["Отключить diagnosticshub", 'sc config diagnosticshub.standardcollector.service start= disabled; Stop-Service diagnosticshub.standardcollector.service -Force -EA 0', "safe", "Diagnostics Hub — сбор данных для отладки приложений."],
    ["Отключить Windows Error Reporting", 'sc config WerSvc start= disabled; Stop-Service WerSvc -Force -EA 0', "safe", "Отправка отчётов об ошибках Microsoft. Можно отключить без последствий."],
    ["AllowTelemetry = 0", 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', "safe", "Групповая политика: запрет телеметрии на уровне реестра."],
    ["LimitTelemetry = 1", 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v LimitTelemetry /t REG_DWORD /d 1 /f', "safe", "Ограничивает минимальный уровень телеметрии."],
  ],
  "Следящие службы": [
    ["Отключить RetailDemo", 'sc config RetailDemo start= disabled; Stop-Service RetailDemo -Force -EA 0', "safe", "Демо-режим магазина. Полностью безопасно отключить."],
    ["Отключить MapsBroker (Карты)", 'sc config MapsBroker start= disabled; Stop-Service MapsBroker -Force -EA 0', "safe", "Скачанные карты. Не нужны — отключаем."],
    ["Отключить lfsvc (Геолокация)", 'sc config lfsvc start= disabled; Stop-Service lfsvc -Force -EA 0', "safe", "Служба геолокации. Отключает отслеживание местоположения."],
    ["Отключить PcaSvc (Совместимость)", 'sc config PcaSvc start= disabled; Stop-Service PcaSvc -Force -EA 0', "safe", "Program Compatibility Assistant — фоновый мониторинг запуска."],
    ["Отключить wisvc (Windows Insider)", 'sc config wisvc start= disabled; Stop-Service wisvc -Force -EA 0', "safe", "Windows Insider Service. Отключает сбор данных инсайдеров."],
    ["Отключить DsSvc (Sharing)", 'sc config DsSvc start= disabled; Stop-Service DsSvc -Force -EA 0', "safe", "Data Sharing Service — обмен данными между приложениями."],
    ["Отключить DsmSvc (Device Setup)", 'sc config DsmSvc start= disabled; Stop-Service DsmSvc -Force -EA 0', "safe", "Device Setup Manager — автоматическая настройка устройств."],
    ["Отключить PhoneSvc", 'sc config PhoneSvc start= disabled; Stop-Service PhoneSvc -Force -EA 0', "safe", "Phone Service — поддержка телефонных функций. Не нужна на ПК."],
    ["Отключить icssvc (Hotspot)", 'sc config icssvc start= disabled; Stop-Service icssvc -Force -EA 0', "safe", "Windows Mobile Hotspot — раздача интернета. Можно отключить."],
  ],
  "Реклама и трекинг": [
    ["Отключить Connected User Experiences", 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableWindowsConsumerFeatures /t REG_DWORD /d 1 /f', "safe", "Отключает рекламные рекомендации Windows."],
    ["Отключить Advertising ID", 'reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v Enabled /t REG_DWORD /d 0 /f', "safe", "Удаляет рекламный идентификатор."],
    ["Отключить трекинг URL", 'reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v ShowSyncProviderNotifications /t REG_DWORD /d 0 /f', "safe", "Убирает уведомления синхронизации и трекинг."],
    ["Отключить Tailored Experiences", 'reg add "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableTailoredExperiencesWithDiagnosticData /t REG_DWORD /d 1 /f', "safe", "Персонализированные советы на основе diagnostics data."],
    ["Отключить feedback запросы", 'reg add "HKCU\\SOFTWARE\\Microsoft\\Siuf\\Rules" /v NumberOfSIUFInPeriod /t REG_DWORD /d 0 /f; reg add "HKCU\\SOFTWARE\\Microsoft\\Siuf\\Rules" /v PeriodInNanoSeconds /t REG_DWORD /d 0 /f', "safe", "Отключает запросы обратной связи от Microsoft."],
    ["Отключить Timeline / Activity", 'reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ActivityHistory" /v EnableActivityFeed /t REG_DWORD /d 0 /f; reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ActivityHistory" /v PublishUserActivity /t REG_DWORD /d 0 /f', "safe", "Отключает Timeline — историю активности в Windows."],
  ],
  "Браузеры (политики)": [
    ["Chrome Telemetry OFF", 'reg add "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" /v MetricsReportingEnabled /t REG_DWORD /d 0 /f; reg add "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" /v ChromeCleanupReportingEnabled /t REG_DWORD /d 0 /f; reg add "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" /v ChromeCleanupEnabled /t REG_DWORD /d 0 /f; reg add "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" /v UserFeedbackAllowed /t REG_DWORD /d 0 /f; reg add "HKLM\\SOFTWARE\\Policies\\Google\\Chrome" /v DeviceMetricsReportingEnabled /t REG_DWORD /d 0 /f', "safe", "Отключает телеметрию Google Chrome через политики (Metrics, Cleanup, Feedback).", null, "Действует на Chrome/Chromium. Не ломает работу браузера."],
    ["Edge Telemetry OFF (полный)", 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge" /v MetricsReportingEnabled /t REG_DWORD /d 0 /f; reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge" /v SendSiteInfoToImproveServices /t REG_DWORD /d 0 /f; reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge" /v SpotlightExperiencesAndRecommendationsEnabled /t REG_DWORD /d 0 /f; reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge" /v PersonalizationReportingEnabled /t REG_DWORD /d 0 /f; reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge" /v ConfigureDoNotTrack /t REG_DWORD /d 1 /f', "safe", "Расширенное отключение телеметрии Microsoft Edge + Do Not Track.", null, "Дополняет существующий твик Edge Telemetry."],
    ["Firefox Telemetry OFF", 'reg add "HKLM\\SOFTWARE\\Policies\\Mozilla\\Firefox" /v DisableTelemetry /t REG_DWORD /d 1 /f; reg add "HKLM\\SOFTWARE\\Policies\\Mozilla\\Firefox" /v DisableDefaultBrowserAgent /t REG_DWORD /d 1 /f', "safe", "Отключает телеметрию и фоновый агент Firefox.", null, "Через enterprise-политики. Работает с обычной сборкой Firefox."],
  ],
  "NVIDIA и приложения": [
    ["NVIDIA Telemetry OFF", 'sc config NvTelemetryContainer start= disabled; Stop-Service NvTelemetryContainer -Force -EA 0; reg add "HKCU\\SOFTWARE\\NVIDIA Corporation\\NVControlPanel2\\Client" /v OptInOrOutPreference /t REG_DWORD /d 0 /f; Get-ScheduledTask -ErrorAction SilentlyContinue | Where-Object {$_.TaskName -like "NvTm*" -or $_.TaskName -like "NvProfileUpdater*"} | ForEach-Object { Disable-ScheduledTask -TaskName $_.TaskName -TaskPath $_.TaskPath -ErrorAction SilentlyContinue }', "safe", "Служба и задачи телеметрии NVIDIA (NvTelemetryContainer, NvTmMon/NvTmRep/NvProfileUpdater) отключены.", null, "Карта и драйвер продолжают работать. Обновления Game Ready — вручную."],
    ["Office Telemetry задачи OFF", 'schtasks /change /tn "Microsoft\\Office\\OfficeTelemetryAgentFallBack2016" /disable 2>$null; schtasks /change /tn "Microsoft\\Office\\OfficeTelemetryAgentLogOn2016" /disable 2>$null; schtasks /change /tn "Microsoft\\Office\\OfficeTelemetryAgentFallBack" /disable 2>$null; schtasks /change /tn "Microsoft\\Office\\OfficeTelemetryAgentLogOn" /disable 2>$null; schtasks /change /tn "Microsoft\\Office\\Office ClickToRun Service Monitor" /disable 2>$null; schtasks /change /tn "Microsoft\\Office\\Office 15 Subscription Heartbeat" /disable 2>$null', "safe", "Отключает фоновые задачи телеметрии и проброса Office в планировщике.", null, "Не влияет на работу Word/Excel."],
  ],
  "Службы (Xbox/Bluetooth/печать)": [
    ["Xbox Services OFF", 'sc config XblAuthManager start= disabled; sc config XblGameSave start= disabled; sc config XboxNetApiSvc start= disabled; sc config XboxGipSvc start= disabled; Stop-Service XblAuthManager,XblGameSave,XboxNetApiSvc,XboxGipSvc -Force -EA 0', "safe", "Все службы Xbox (авторизация, Game Save, API, GIP) отключены.", null, "Xbox Game Pass / облачные функции перестанут работать."],
    ["Bluetooth OFF", 'sc config bthserv start= disabled; sc config BTAGService start= disabled; Stop-Service bthserv,BTAGService -Force -EA 0', "warn", "Полностью отключает Bluetooth на уровне служб.", null, "Блютуз-мышь/наушники перестанут работать."],
    ["Print Spooler OFF", 'sc config Spooler start= disabled; sc config PrintNotify start= disabled; Stop-Service Spooler,PrintNotify -Force -EA 0', "warn", "Отключает службы печати (Spooler, PrintNotify).", null, "Печать и виртуальные принтеры (PDF) перестанут работать."],
    ["Remote Registry OFF", 'sc config RemoteRegistry start= disabled; Stop-Service RemoteRegistry -Force -EA 0', "safe", "Удалённый доступ к реестру отключён — стандарт безопасности.", null, "Удалённое управление реестром не используется на домашних ПК."],
    ["Terminal Services OFF", 'sc config TermService start= disabled; Stop-Service TermService -Force -EA 0', "warn", "Отключает службу удалённого рабочего стола.", null, "RDP / Удалённый рабочий стол перестанут работать."],
  ],
  "Планировщик (телеметрия)": [
    ["Application Experience задачи OFF", 'schtasks /change /tn "Microsoft\\Windows\\Application Experience\\AitAgent" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Application Experience\\ProgramDataUpdater" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Application Experience\\StartupAppTask" /disable 2>$null', "safe", "Отключает фоновые сбор данных совместимости и телеметрию.", null, "Дополняет твик CompatTelRunner в разделе Приватность."],
    ["Disk Diagnostic задачи OFF", 'schtasks /change /tn "Microsoft\\Windows\\DiskDiagnostic\\Microsoft-Windows-DiskDiagnosticDataCollector" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\DiskDiagnostic\\Microsoft-Windows-DiskDiagnosticResolver" /disable 2>$null', "safe", "Отключает фоновую диагностику дисков в планировщике.", null, "SMART-статус диска по-прежнему можно смотреть вручную."],
    ["WinSAT/NetTrace/Sqm OFF", 'schtasks /change /tn "Microsoft\\Windows\\Maintenance\\WinSAT" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\NetTrace\\GatherNetworkInfo" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\PI\\Sqm-Tasks" /disable 2>$null', "safe", "Отключает оценку WinSAT, сбор данных сети и SQM-телеметрию.", null, "Оценка производительности (winsat formal) — вручную при необходимости."],
    ["Siuf/Feedback DmClient OFF", 'schtasks /change /tn "Microsoft\\Windows\\Feedback\\Siuf\\DmClient" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Feedback\\Siuf\\DmClientOnScenarioDownload" /disable 2>$null', "safe", "Отключает отправку сценариев обратной связи в Microsoft.", null, "Дополняет отключение запросов фидбека."],
    ["Diagnosis задачи OFF", 'schtasks /change /tn "Microsoft\\Windows\\Diagnosis\\Scheduled" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Diagnosis\\RecommendedTroubleshootingScanner" /disable 2>$null', "safe", "Отключает фоновую диагностику и авто-устранение неполадок.", null, "Устранение неполадок вручную продолжит работать."],
    [".NET NGEN задачи OFF", 'schtasks /change /tn "Microsoft\\Windows\\.NET Framework\\.NET Framework NGEN v4.0.30319" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\.NET Framework\\.NET Framework NGEN v4.0.30319 64" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\.NET Framework\\.NET Framework NGEN v4.0.30319 Critical" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\.NET Framework\\.NET Framework NGEN v4.0.30319 64 Critical" /disable 2>$null', "safe", "Отключает фоновую компиляцию .NET NGEN.", null, "Может замедлить первый запуск .NET-приложений."],
    ["Appx/DiskFootprint/Device OFF", 'schtasks /change /tn "Microsoft\\Windows\\ApplicationData\\appuriverifierdaily" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\ApplicationData\\appuriverifierinstall" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\DiskFootprint\\Diagnostics" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\DiskFootprint\\StorageSense" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Device Information\\Device" /disable 2>$null', "safe", "Отключает проверку UWP-приложений, анализ диска и отправку данных об устройстве.", null, "Безопасно для большинства ПК."],
    ["Maps/язык/прочее OFF", 'schtasks /change /tn "Microsoft\\Windows\\Maps\\MapsUpdateTask" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Maps\\MapsToastTask" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\International\\Synchronize Language Settings" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\LanguageComponentsInstaller\\Installation" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\LanguageComponentsInstaller\\ReconcileLanguageResources" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\PushToInstall\\Registration" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Setup\\SetupCleanupTask" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Speech\\SpeechModelDownloadTask" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Windows Error Reporting\\QueueReporting" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\WindowsColorSystem\\Calibration Loader" /disable 2>$null; schtasks /change /tn "Microsoft\\Windows\\Work Folders\\Work Folders Logon Synchronization" /disable 2>$null', "safe", "Отключает задачи карт, синхронизацию языков, установщик компонентов, PushToInstall, очистку установки, скачивание речевых моделей, очередь WER, калибровку цвета и синхронизацию рабочих папок.", null, "Карты/речь/рабочие папки — при необходимости включите вручную."],
    ["Autochk Proxy OFF", 'schtasks /change /tn "Microsoft\\Windows\\Autochk\\Proxy" /disable 2>$null', "safe", "Отключает фоновую задачу проверки дисков при загрузке.", null, "CHKDSK по-прежнему доступен вручную."],
    ["Windows Error Reporting OFF", 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting" /v Disabled /t REG_DWORD /d 1 /f', "safe", "Отключает отправку отчётов об ошибках в Microsoft.", null, "Уведомления о сбоях больше не отправляются."],
  ],
  "Office и другие": [
    ["Office Telemetry OFF", 'reg add "HKCU\\SOFTWARE\\Policies\\Microsoft\\Office\\16.0\\Common\\ClientTelemetry" /v DisableTelemetry /t REG_DWORD /d 1 /f', "safe", "Отключает телеметрию Microsoft Office 16."],
    ["Office Telemetry Toggle", 'reg add "HKCU\\SOFTWARE\\Microsoft\\Office\\16.0\\Common\\ClientTelemetry" /v SendTelemetry /t REG_DWORD /d 0 /f', "safe", "Второй параметр телеметрии Office."],
    ["Отключить Edge Telemetry", 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge" /v MetricsReportingEnabled /t REG_DWORD /d 0 /f', "safe", "Отключает сбор метрик Microsoft Edge."],
    ["Отключить Cortana", 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f', "safe", "Отключает Cortana и associated telemetry."],
    ["Отключить Location Services", 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors" /v DisableLocation /t REG_DWORD /d 1 /f', "safe", "Полностью отключает службу геолокации на уровне политики."],
  ],
};

const renderDataCollection = () => {
  const body = el("div", { class: "tweaks" });
  let idx = 0;
  for (const [groupName, tweaks] of Object.entries(DATACOLL_TWEAKS)) {
    const groupEl = el("div", { class: "tweak-group" },
      el("div", { class: "tweak-group__head" },
        el("span", { class: "tweak-group__title" }, groupName),
        el("div", { class: "tweak-group__actions" },
          el("span", { class: "tweak-group__count" }, `${tweaks.length}`),
          buildApplyAllButton(groupName, tweaks),
        ),
      ),
    );
    const inner = el("div", { class: "tweaks" });
    tweaks.forEach((t, i) => inner.appendChild(buildTweakRow(t, i)));
    groupEl.appendChild(inner);
    body.appendChild(groupEl);
    idx += tweaks.length;
  }

  return el("div", {},
    el("div", { class: "page-header" },
      el("div", { class: "page-eyebrow page-eyebrow--hot" }, "ПРИВАТНОСТЬ"),
      el("h1", { class: "page-title page-title--big" }, "Сбор данных"),
      el("p", { class: "page-desc" },
        "Отключение служб сбора данных, телеметрии и трекинга. " +
        "Убирает фоновые службы Microsoft, рекламные идентификаторы и отправку diagnostic data."
      ),
    ),
    body,
  );
};

// ============================================================
//  PRO (лицензия)
// ============================================================

const PRO = { loaded: true, activated: true, plan: "", bot_url: "", price_text: "", expiry_text: "", days_left: null };

const refreshPro = async () => PRO;


const _pageRender = (id) => {
  switch (id) {
    case "home":      return renderHome();
    case "optimize":  return renderOptimize();
    case "deep":      return renderDeep();
    case "fixes":     return renderFixes();
    case "registry":  return renderRegistry();
    case "startup":   return renderStartup();
    case "apps":      return renderApps();
    case "bench":     return renderBench();
    case "processes": return renderProcesses();
    case "history":   return renderHistory();
    case "devices":   return renderDevices();
    case "monitor":   return renderMonitor();
    case "settings":  return renderSettings();
    case "games":     return renderGames();
    case "nvidia":    return renderNvidia();
    case "perfosec":  return renderPerfSec();
    case "datacoll":  return renderDataCollection();
    case "bios":      return biosSelectedBrand ? renderBiosGuide(biosSelectedBrand) : renderBiosBrandSelect();
    default:          return renderTweaksPage(id);
  }
};

const renderContent = () => {
  clearActiveIntervals();
  const root = $("#content");
  const build = () => {
    root.innerHTML = "";
    const node = _pageRender(activeCategory);
    root.appendChild(node);
    if (activeCategory === "home") startMonitoring();

    root.classList.remove("page-exit", "page-enter");
    void root.offsetWidth;
    root.classList.add("page-enter");
  };

  if (pageTransTimer) { clearTimeout(pageTransTimer); pageTransTimer = null; }

  if (!root.children.length || root.classList.contains("page-exit")) { build(); return; }
  root.classList.add("page-exit");
  pageTransTimer = setTimeout(build, PAGE_TRANS_MS);
};

// ============================================================
//  MONITORING
// ============================================================

const updateStats = (stats) => {
  if (!stats || stats.error) return;

  const updatePercentCard = (id, percent, sub) => {
    const card = $(`[data-stat="${id}"]`);
    if (!card) return;
    const valueWrap = card.querySelector(".stat-card__value");
    const target = Math.round(percent);
    const current = parseFloat(valueWrap.dataset.value || "0");

    if (Math.abs(target - current) > 0.5) animateNumber(valueWrap, target);
    else valueWrap.firstChild.textContent = target;

    const subEl = card.querySelector(".stat-card__sub");
    if (subEl) subEl.textContent = sub;

    const ring = card.querySelector(".ring-progress__fg");
    if (ring) {
      const C = 2 * Math.PI * 26;
      ring.setAttribute("stroke-dashoffset", C - (C * percent) / 100);
      let color = "#9999b0";
      if (percent > 90) color = "#ef4444";
      else if (percent > 70) color = "#f97316";
      else if (percent > 50) color = "#eab308";
      ring.style.stroke = color;
    }
  };

  const updateRawCard = (id, value, sub) => {
    const card = $(`[data-stat="${id}"]`);
    if (!card) return;
    const valueWrap = card.querySelector(".stat-card__value");
    valueWrap.firstChild.textContent = value;
    const subEl = card.querySelector(".stat-card__sub");
    if (subEl) subEl.textContent = sub;
  };

  updatePercentCard("cpu",  stats.cpu,          `${stats.cpu.toFixed(1)} %`);
  updatePercentCard("ram",  stats.ram_percent,  `${stats.ram_used} / ${stats.ram_total} GB`);
  updatePercentCard("disk", stats.disk_percent, `${stats.disk_used} / ${stats.disk_total} GB`);
  updateRawCard("uptime", Math.floor(stats.uptime_h), "с момента запуска");

  const healthEl = $("#healthScore");
  const optScore = stats.optimization_score != null ? stats.optimization_score : (stats.health_score != null ? stats.health_score : null);
  if (healthEl && optScore != null) {
    const display = Math.round(optScore * 10) / 10;
    healthEl.textContent = display + "%";
    const ring = document.querySelector(".health-ring__fg");
    if (ring) {
      const C = 2 * Math.PI * 58;
      ring.setAttribute("stroke-dashoffset", C - (C * optScore) / 100);
      let color;
      if (optScore >= 80) color = "var(--ios-green)";
      else if (optScore >= 50) color = "var(--accent)";
      else color = "var(--orange)";
      ring.style.stroke = color;
      ring.style.filter = `drop-shadow(0 0 8px ${color}80)`;
    }
    const statusEl = $("#healthStatus");
    if (statusEl) {
      let msg = "Система ";
      if (optScore >= 90) msg += "<strong>полностью оптимизирована</strong>";
      else if (optScore >= 70) msg += "<strong>хорошо оптимизирована</strong>";
      else if (optScore >= 50) msg += "оптимизирована <strong>частично</strong>";
      else msg += "<strong>требует оптимизации</strong>";
      statusEl.innerHTML = msg;
    }
  }

  const fmtTemp = (t) => t != null ? `${t}°C` : "N/A";
  const cpuTempEl = $("#sysCpuTemp");
  const gpuTempEl = $("#sysGpuTemp");
  if (cpuTempEl) cpuTempEl.textContent = fmtTemp(stats.cpu_temp);
  if (gpuTempEl) gpuTempEl.textContent = fmtTemp(stats.gpu_temp);

  if (stats.cpu_name) {
    const cpuEl = $("#sysCpu");
    const cpuSub = $("#sysCpuSub");
    if (cpuEl) cpuEl.textContent = stats.cpu_name;
    if (cpuSub && stats.cpu_freq_ghz) cpuSub.textContent = `${stats.cpu_freq_ghz} GHz max`;
  }
  if (stats.windows_edition) {
    const winEl = $("#sysWin");
    const winSub = $("#sysWinSub");
    if (winEl) winEl.textContent = stats.windows_edition;
    if (winSub && stats.windows_build) winSub.textContent = `Build ${stats.windows_build}`;
  }
};

let monitoringInterval = null;
let osBuild = 0;

const isWin11 = () => osBuild >= 22000;

const startMonitoring = () => {
  if (monitoringInterval) return;
  monitoringInterval = setInterval(async () => {
    if (activeCategory === "home") {
      try {
        const stats = await api("get_stats");
        updateStats(stats);
      } catch (e) { /* window closing */ }
    }
  }, 1000);
  activeIntervals.push(monitoringInterval);
};

// ============================================================
//  BOOT
// ============================================================

let lastNotifiedUpdate = null;

const notifyUpdateDownloaded = (filename) => {
  showToast(`Обновление скачано: ${filename}. Запусти файл из папки Downloads.`, "success", 8000);
};

const downloadUpdate = async (btn, url) => {
  btn.disabled = true;
  btn.textContent = "Скачиваю…";
  try {
    const r = await api("download_update");
    if (r?.ok) {
      btn.textContent = "Скачано";
      notifyUpdateDownloaded(r.filename || "");
    } else {
      btn.textContent = "Скачать";
      showToast(`Не удалось скачать: ${r?.stderr || "неизвестная ошибка"}`, "error", 8000);
      if (url) api("open_url", url);
    }
  } catch (e) {
    btn.textContent = "Скачать";
    showToast("Не удалось скачать обновление.", "error", 8000);
  }
  setTimeout(() => { if (btn) { btn.disabled = false; btn.textContent = "Скачать"; } }, 2000);
};

const showUpdateNotice = (latest, current, url) => {
  const t = el("div", { class: "toast toast--info toast--update" });
  const btnDl = el("button", { class: "update-pop__btn update-pop__btn--primary" }, "Скачать");
  const btnLater = el("button", { class: "update-pop__btn" }, "Позже");
  t.appendChild(el("div", { class: "update-pop__title" }, `Вышла новая версия ${latest}`));
  t.appendChild(el("div", { class: "update-pop__text" }, `У тебя сейчас ${current}. Обнови, чтобы получить новые возможности.`));
  const actions = el("div", { class: "update-pop__actions" });
  actions.appendChild(btnDl);
  if (url) {
    const btnOpen = el("button", { class: "update-pop__btn" }, "Страница загрузки");
    btnOpen.addEventListener("click", () => api("open_url", url));
    actions.appendChild(btnOpen);
  }
  actions.appendChild(btnLater);
  t.appendChild(actions);
  btnDl.addEventListener("click", () => downloadUpdate(btnDl, url));
  btnLater.addEventListener("click", () => {
    t.classList.add("toast--out");
    setTimeout(() => t.remove(), 200);
  });
  $("#toasts").appendChild(t);
};

const checkUpdateOnBoot = async (silent = false) => {
  try {
    const r = await api("check_for_update");
    if (r?.ok && r.update_available) {
      if (silent && lastNotifiedUpdate === r.latest) return;
      lastNotifiedUpdate = r.latest;
      showUpdateNotice(r.latest, r.current, r.url);
    } else if (!silent) {
      showToast(`У тебя последняя версия: ${r?.current || "актуальная"}`, "success");
    }
  } catch (e) { /* тихо игнорируем */ }
};

const updateTitlebar = () => {
  const timeEl = $("#statusTime");
  if (timeEl) {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  }
};

let cmdkIndex = 0;
let cmdkResults = [];

const getNavCategories = () => CATEGORIES.filter((c) => {
  if (c.divider || !c.id) return false;
  if (c.id === "deep" && isWin11()) return false;
  return true;
});

const closeCmdk = () => {
  const box = $("#cmdk");
  if (!box) return;
  box.hidden = true;
  const input = $("#cmdkInput");
  if (input) input.value = "";
  cmdkIndex = 0;
  cmdkResults = [];
};

let _searchIndex = null;
const getSearchIndex = () => {
  if (_searchIndex) return _searchIndex;
  const out = [];
  const push = (cat, group, item) => {
    if (!item) return;
    const name = String(item[0] || "");
    if (!name) return;
    out.push({ type: "item", cat, group, name, desc: String(item[3] || ""), risk: item[2] || "safe", icon: ICONS.zap });
  };
  for (const [catId, data] of Object.entries(TWEAKS)) {
    if (Array.isArray(data)) data.forEach((t) => push(catId, null, t));
    else if (data && typeof data === "object") {
      for (const [g, arr] of Object.entries(data)) arr.forEach((t) => push(catId, g, t));
    }
  }
  for (const arr of [OPTIMIZE_PACK, OPTIMIZE_PACK_PRO]) {
    if (!arr || typeof arr !== "object") continue;
    for (const [g, list] of Object.entries(arr)) {
      if (!Array.isArray(list)) continue;
      list.forEach((t) => push("optimize", g, t));
    }
  }
  (SERVICES || []).forEach(([label]) => out.push({ type: "item", cat: "startup", group: "Службы", name: `Отключить: ${label}`, desc: "Отключение фоновой службы Windows", risk: "warn", icon: ICONS.zap }));
  (APPS || []).forEach(([label]) => out.push({ type: "item", cat: "apps", group: "Приложения", name: `Установить: ${label}`, desc: "Скачать и установить приложение", risk: "safe", icon: ICONS.zap }));
  _searchIndex = out;
  return out;
};

const gotoCategory = (id) => {
  closeCmdk();
  setCategory(id);
};

const gotoTweak = (cat, name) => {
  closeCmdk();
  searchQuery = "";
  pushRecentCat(cat);
  try { localStorage.setItem("kalash_last_cat", cat); } catch {}
  activeCategory = cat;
  $$(".nav__item").forEach((n) => n.classList.toggle("active", n.dataset.id === cat));
  renderContent();
  let tries = 0;
  const find = () => {
    tries++;
    if (tries > 12) return;
    const row = Array.from(document.querySelectorAll(".tweak")).find(
      (r) => r.querySelector(".tweak__title")?.textContent === name
    );
    if (!row) { setTimeout(find, 120); return; }
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    row.classList.remove("tweak--flash");
    void row.offsetWidth;
    row.classList.add("tweak--flash");
    setTimeout(() => row.classList.remove("tweak--flash"), 2600);
  };
  setTimeout(find, 150);
};

const renderCmdkList = (query = "") => {
  const list = $("#cmdkList");
  if (!list) return;
  const q = query.trim().toLowerCase();
  cmdkResults = getNavCategories()
    .filter((c) => !q || c.label.toLowerCase().includes(q) || c.id.includes(q))
    .map((c) => ({ type: "cat", cat: c.id, label: c.label, icon: c.icon, meta: "Раздел" }));
  if (q) {
    const items = getSearchIndex()
      .filter((it) =>
        it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
      )
      .slice(0, 40)
      .map((it) => ({ type: "item", cat: it.cat, name: it.name, icon: it.risk === "danger" ? ICONS.alert : it.risk === "warn" ? ICONS.alert : ICONS.optimize, meta: it.group || "Твик", danger: it.risk === "danger" }));
    cmdkResults = [...cmdkResults, ...items];
  }
  list.innerHTML = "";
  if (!cmdkResults.length) {
    list.appendChild(el("div", { class: "cmdk__empty" }, "Ничего не найдено"));
    return;
  }
  cmdkResults.forEach((r, i) => {
    const isItem = r.type === "item";
    const btn = el("button", {
      type: "button",
      class: `cmdk__item${i === cmdkIndex ? " is-active" : ""}${isItem && r.danger ? " cmdk__item--danger" : ""}`,
      onclick: () => (isItem ? gotoTweak(r.cat, r.name) : gotoCategory(r.cat)),
    },
      el("span", { class: "cmdk__item-icon", html: r.icon }),
      el("span", { class: "cmdk__item-label" }, isItem ? r.name : r.label),
      el("span", { class: "cmdk__item-meta" }, r.meta),
    );
    list.appendChild(btn);
  });
};

const openCmdk = () => {
  const box = $("#cmdk");
  if (!box) return;
  box.hidden = false;
  cmdkIndex = 0;
  renderCmdkList("");
  const input = $("#cmdkInput");
  if (input) {
    input.value = "";
    setTimeout(() => input.focus(), 20);
  }
};

const moveCmdk = (delta) => {
  if (!cmdkResults.length) return;
  cmdkIndex = (cmdkIndex + delta + cmdkResults.length) % cmdkResults.length;
  renderCmdkList(($("#cmdkInput")?.value || ""));
  const active = $$(".cmdk__item")[cmdkIndex];
  if (active) active.scrollIntoView({ block: "nearest" });
};

const renderAdminPill = (isAdmin) => {
  const pill = $("#adminPill");
  if (!pill) return;
  const text = $("#adminPillText");
  pill.classList.remove("warn-pill--admin", "warn-pill--relaunch");
  if (isAdmin) {
    pill.classList.add("warn-pill--admin");
    if (text) text.textContent = "Полные права · Администратор";
  } else {
    pill.classList.add("warn-pill--relaunch");
    if (text) text.textContent = "Запустить от админа";
    pill.addEventListener("click", async () => {
      pill.disabled = true;
      if (text) text.textContent = "Перезапуск…";
      const r = await api("relaunch_as_admin");
      if (!r?.ok) {
        pill.disabled = false;
        if (text) text.textContent = "Запустить от админа";
        showToast(r?.stderr || "Не удалось запросить права администратора.", "error");
      }
    });
  }
};

const bindChromeUi = () => {
  const navSearch = $("#navSearch");
  if (navSearch) {
    let t = null;
    navSearch.addEventListener("input", (e) => {
      clearTimeout(t);
      t = setTimeout(() => renderNav(e.target.value), 80);
    });
  }
  const cmdBtn = $("#cmdOpenBtn");
  if (cmdBtn) cmdBtn.addEventListener("click", openCmdk);
  const backdrop = $("#cmdkBackdrop");
  if (backdrop) backdrop.addEventListener("click", closeCmdk);
  const cmdInput = $("#cmdkInput");
  if (cmdInput) {
    cmdInput.addEventListener("input", (e) => {
      cmdkIndex = 0;
      renderCmdkList(e.target.value);
    });
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); moveCmdk(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveCmdk(-1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const hit = cmdkResults[cmdkIndex];
        if (!hit) return;
        if (hit.type === "item") gotoTweak(hit.cat, hit.name);
        else gotoCategory(hit.cat);
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeCmdk();
      }
    });
  }
};

let DEEP_PACK_COUNT = null;
const DEEP_COUNT_TEXT = () => (DEEP_PACK_COUNT == null ? "878" : String(DEEP_PACK_COUNT));
const patchDeepCounts = () => {
  document.querySelectorAll("[data-deep-count]").forEach((n) => { n.textContent = DEEP_COUNT_TEXT(); });
};
const refreshDeepCount = async () => {
  try {
    const r = await api("privacy_pack_exists");
    if (r && typeof r.count === "number") { DEEP_PACK_COUNT = r.count; patchDeepCounts(); }
  } catch (e) { console.warn("refreshDeepCount:", e); }
};

const boot = async () => {
  try {
    await refreshSettings();
  } catch (e) { /* ignore */ }
  try {
    const osInfo = await api("get_os_build");
    if (osInfo?.ok) osBuild = osInfo.build || 0;
  } catch (e) { /* fallback — show all */ }
  try {
    const ver = await api("get_app_version");
    if (ver?.ok && ver.version) {
      APP_VERSION = ver.version;
      const fallbackVersion = $("#fallbackVersion");
      if (fallbackVersion) fallbackVersion.textContent = `v${APP_VERSION}`;
    }
  } catch (e) { /* keep fallback APP_VERSION */ }
  try {
    const admin = await api("get_admin_status");
    const badge = $("#adminBadge");
    if (badge && admin?.ok) {
      badge.textContent = "Админ";
      badge.className = "titlebar__pill " + (admin.is_admin ? "titlebar__pill--admin" : "titlebar__pill--warn");
    }
    renderAdminPill(admin?.ok ? admin.is_admin : false);
  } catch (e) { /* ignore */ }
  try {
    const last = localStorage.getItem("kalash_last_cat");
    const allowed = getNavCategories().some((c) => c.id === last);
    if (last && allowed) activeCategory = last;
    else if (last === "sec" || last === "danger") activeCategory = "home";
  } catch {}
  updateTitlebar();
  setInterval(updateTitlebar, 30000);
  bindChromeUi();
  // Помечаем интерфейс загруженным до «некритичных» фоновых задач — тогда
  // фоллбэк-экран не сработает, а ошибки рендера станут тостами, а не
  // уничтожением всего UI. Коллбэк идемпотентен (watchdog тоже зовёт).
  const markLoaded = () => {
    window.appLoaded = true;
    const fb = document.getElementById("js-fallback");
    if (fb) fb.style.display = "none";
  };
  try {
    await refreshAppliedState();
    renderNav();
    renderContent();
  } catch (e) {
    if (typeof showToast === "function") {
      try {
        showToast("Ошибка отрисовки: " + (e && e.message ? e.message : e), "error", 8000);
      } catch (err) { /* ignore */ }
    }
  }
  markLoaded();
  try { startMonitoring(); } catch (e) { /* ignore */ }
  try { checkUpdateOnBoot(true); } catch (e) { /* ignore */ }
  setInterval(() => checkUpdateOnBoot(true), 30 * 60 * 1000);
  try { refreshDeepCount(); } catch (e) { /* ignore */ }
  // Watchdog: если какой-то await завис, всё равно прячем прелоадер.
  setTimeout(markLoaded, 10000);
};

// ============================================================
//  KEYBOARD SHORTCUTS
// ============================================================

const SHORTCUTS = [
  { key: "1", ctrl: false, action: () => setCategory("home") },
  { key: "2", ctrl: false, action: () => setCategory("optimize") },
  { key: "3", ctrl: false, action: () => setCategory("deep") },
  { key: "4", ctrl: false, action: () => setCategory("fixes") },
  { key: "5", ctrl: false, action: () => setCategory("registry") },
  { key: "6", ctrl: false, action: () => setCategory("processes") },
  { key: "7", ctrl: false, action: () => setCategory("bench") },
  { key: "8", ctrl: false, action: () => setCategory("apps") },
  { key: "9", ctrl: false, action: () => setCategory("bios") },
  { key: "F5", ctrl: false, action: () => { if (activeCategory === "home") renderContent(); } },
  { key: "Escape", ctrl: false, action: () => {
      if ($("#cmdk") && !$("#cmdk").hidden) { closeCmdk(); return; }
      searchQuery = "";
      const s = $(".search__input");
      if (s) s.value = "";
      const ns = $("#navSearch");
      if (ns) { ns.value = ""; renderNav(""); }
      renderContent();
    } },
];

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
    e.preventDefault();
    const box = $("#cmdk");
    if (box && !box.hidden) closeCmdk();
    else openCmdk();
    return;
  }
  if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
    e.preventDefault();
    const ns = $("#navSearch");
    if (ns) { ns.focus(); ns.select(); }
    return;
  }
  if (e.key === "Escape") {
    const s = SHORTCUTS.find(s => s.key === "Escape");
    if (s) s.action();
    return;
  }
  if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") return;
  for (const s of SHORTCUTS) {
    if (e.key === s.key && !!e.ctrlKey === !!s.ctrl && e.key !== "F5" && e.key !== "Escape") return s.action();
  }
  if (e.key === "F5") {
    e.preventDefault();
    const s = SHORTCUTS.find(s => s.key === "F5");
    if (s) s.action();
  }
});

document.addEventListener("mousemove", (e) => {
  const btn = e.target.closest(".tweak-info-btn");
  if (btn) {
    btn.style.setProperty("--tip-x", e.clientX + "px");
    btn.style.setProperty("--tip-y", e.clientY + "px");
  }
});

const infoTip = document.createElement("div");
infoTip.className = "info-tip";
infoTip.innerHTML = [
  '<div class="info-tip__header">',
  '  <div class="info-tip__top">',
  '    <span class="info-tip__name"></span>',
  '    <span class="info-tip__risk"></span>',
  '  </div>',
  '  <div class="info-tip__rec"></div>',
  '</div>',
  '<div class="info-tip__body">',
  '  <p class="info-tip__label">Что делает и что даёт</p>',
  '  <p class="info-tip__desc"></p>',
  '  <div class="info-tip__tip">',
  '    <div class="info-tip__tip-label">Когда включать</div>',
  '    <span class="info-tip__tip-text"></span>',
  '  </div>',
  '</div>',
].join("");
document.body.appendChild(infoTip);

const tipName = infoTip.querySelector(".info-tip__name");
const tipRisk = infoTip.querySelector(".info-tip__risk");
const tipRec = infoTip.querySelector(".info-tip__rec");
const tipDesc = infoTip.querySelector(".info-tip__desc");
const tipBox = infoTip.querySelector(".info-tip__tip");
const tipText = infoTip.querySelector(".info-tip__tip-text");
const RISK_TEXT = { safe: "Безопасно", warn: "С осторожностью", danger: "Опасно" };
const REC_TEXT = { gaming: "Игры", perf: "Производительность", work: "Работа", battery: "Батарея" };

document.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".tweak-info-btn");
  if (!btn) return;
  const name = btn.getAttribute("data-name") || "";
  const desc = btn.getAttribute("data-desc") || btn.getAttribute("title") || "";
  const tip = btn.getAttribute("data-tip") || "";
  const risk = btn.getAttribute("data-safety") || "";
  const rec = (btn.getAttribute("data-rec") || "").split(/[,\s]+/).filter(Boolean);
  tipName.textContent = name;
  tipRisk.textContent = RISK_TEXT[risk] || "";
  tipRisk.className = "info-tip__risk" + (risk ? " info-tip__risk--" + risk : "");
  tipRisk.style.display = tipRisk.textContent ? "" : "none";
  tipDesc.textContent = desc;
  if (tip) {
    tipText.textContent = tip;
    tipBox.style.display = "";
  } else {
    tipBox.style.display = "none";
  }
  tipRec.innerHTML = "";
  if (rec.length) {
    for (const r of rec) {
      if (!REC_TEXT[r]) continue;
      tipRec.appendChild(el("span", { class: "info-tip__rec-tag" }, REC_TEXT[r]));
    }
  }
  tipRec.style.display = tipRec.children.length ? "" : "none";
  infoTip.classList.add("info-tip--visible");
});

document.addEventListener("mousemove", (e) => {
  if (!infoTip.classList.contains("info-tip--visible")) return;
  const pad = 14;
  let x = e.clientX + pad;
  let y = e.clientY - pad;
  const rect = infoTip.getBoundingClientRect();
  if (x + rect.width > window.innerWidth - 10) x = e.clientX - rect.width - pad;
  if (y - rect.height < 10) y = e.clientY + pad;
  infoTip.style.left = x + "px";
  infoTip.style.top = (y - rect.height) + "px";
});

document.addEventListener("mouseout", (e) => {
  const btn = e.target.closest(".tweak-info-btn");
  if (btn) infoTip.classList.remove("info-tip--visible");
});

if (window.pywebview && window.pywebview?.api) boot();
else window.addEventListener("pywebviewready", boot);



