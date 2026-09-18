(() => {
  const cv = document.getElementById("bgNet");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const LINK = 165;
  const AREA_PER_POINT = 20000;
  const C_BLUE = [155, 195, 255];
  const C_PINK = [255, 158, 195];
  const mix = (cb, cp, t) => Math.round(cb + (cp - cb) * t);
  let W = 0, H = 0, dpr = 1, raf = 0, pts = [], figs = [], mx = null, my = null;

  const FIG_DEFS = [
    { kind: "round",  s: 170, c: "0,168,197",   a: 0.09 },
    { kind: "tri",    s: 140, c: "10,132,255",  a: 0.09 },
    { kind: "circle", s: 90,  c: "48,168,220",  a: 0.09 },
    { kind: "round",  s: 110, c: "30,150,210",  a: 0.08 },
  ];

  const makeFigs = () => {
    figs = [];
    for (const d of FIG_DEFS) {
      figs.push({
        ...d,
        x: 60 + Math.random() * (W - 120),
        y: 60 + Math.random() * (H - 120),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        rot: 0,
        vr: (Math.random() - 0.5) * 0.004,
      });
    }
  };

  const drawFig = (f) => {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rot);
    const r = f.s / 2;
    const grad = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r);
    grad.addColorStop(0, "rgba(" + f.c + "," + f.a + ")");
    grad.addColorStop(1, "rgba(" + f.c + ",0)");
    if (f.kind === "circle") {
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
    } else if (f.kind === "round") {
      ctx.fillStyle = grad;
      ctx.beginPath();
      roundRectPath(f.s, f.s, Math.min(38, f.s * 0.25));
      ctx.fill();
    } else if (f.kind === "ring") {
      ctx.strokeStyle = "rgba(" + f.c + "," + (f.a * 0.9) + ")";
      ctx.lineWidth = f.s * 0.16;
      ctx.beginPath();
      ctx.arc(0, 0, r - f.s * 0.14, 0, Math.PI * 2);
      ctx.stroke();
    } else if (f.kind === "tri") {
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(r, r);
      ctx.lineTo(-r, r);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  };

  const roundRectPath = (w, h, rad) => {
    const x = -w / 2, y = -h / 2;
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    cv.style.width = W + "px";
    cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(26, Math.min(120, Math.round((W * H) / AREA_PER_POINT)));
    pts = [];
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        hue: Math.random() < 0.35 ? 1 : 0,
      });
    }
    makeFigs();
  };

  const step = () => {
    ctx.clearRect(0, 0, W, H);
    for (const f of figs) {
      f.x += f.vx;
      f.y += f.vy;
      f.rot += f.vr;
      const pad = 160;
      if (f.x < -pad) f.x = W + pad; else if (f.x > W + pad) f.x = -pad;
      if (f.y < -pad) f.y = H + pad; else if (f.y > H + pad) f.y = -pad;
      drawFig(f);
    }
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx;
      p.y += p.vy;
      const pad = 24;
      if (p.x < -pad) p.x = W + pad; else if (p.x > W + pad) p.x = -pad;
      if (p.y < -pad) p.y = H + pad; else if (p.y > H + pad) p.y = -pad;
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          const t = 1 - Math.sqrt(d2) / LINK;
          const mixT = (a.hue + b.hue) / 2;
          ctx.strokeStyle = "rgba(" + mix(C_BLUE[0], C_PINK[0], mixT) + "," + mix(C_BLUE[1], C_PINK[1], mixT) + "," + mix(C_BLUE[2], C_PINK[2], mixT) + "," + (0.42 * t).toFixed(3) + ")";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      if (mx != null) {
        const dx = a.x - mx, dy = a.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 > 0 && d2 < LINK * LINK) {
          const t = 1 - Math.sqrt(d2) / LINK;
          const mc = a.hue ? C_PINK : C_BLUE;
          ctx.strokeStyle = "rgba(" + mix(mc[0], 235, 0.6) + "," + mix(mc[1], 235, 0.6) + "," + mix(mc[2], 235, 0.6) + "," + (0.36 * t).toFixed(3) + ")";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
      const dotR = a.hue ? "255,178,206" : "220,228,255";
      ctx.fillStyle = "rgba(" + dotR + ",0.95)";
      ctx.beginPath();
      ctx.arc(a.x, a.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      const haloR = a.hue ? "255,150,190" : "155,195,255";
      ctx.fillStyle = "rgba(" + haloR + ",0.5)";
      ctx.beginPath();
      ctx.arc(a.x, a.y, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(step);
  };

  const start = () => { if (!raf) raf = requestAnimationFrame(step); };
  const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
  document.addEventListener("visibilitychange", () => { document.hidden ? stop() : start(); });
  resize();
  start();
})();
