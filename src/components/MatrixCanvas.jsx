import React, { useEffect, useRef } from "react";

/**
 * MatrixCanvas
 * Canvas-based "code rain" rendered behind content.
 * - Fixed to viewport
 * - Responsive to resize and DPR
 * - Uses neon green glyphs with subtle glow trails
 */
function MatrixCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const state = {
      width: 0,
      height: 0,
      dpr: Math.max(1, Math.min(window.devicePixelRatio || 1, 2)),
      fontSize: 16,
      columns: 0,
      drops: [],
      lastTime: 0,
      targetFPS: 30,
      chars: "0123456789",
    };

    const resize = () => {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      state.dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;

      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;

      // Font size scales a bit with viewport
      const base = Math.max(12, Math.min(22, Math.floor(state.width / 80)));
      state.fontSize = base;

      state.columns = Math.ceil(state.width / state.fontSize);
      state.drops = Array(state.columns).fill(0).map(() => Math.random() * state.height / state.fontSize);
      ctx.font = `${state.fontSize}px VT323, ui-monospace, monospace`;
    };

    const draw = (ts) => {
      const elapsed = ts - state.lastTime;
      const frameInterval = 1000 / state.targetFPS;
      if (elapsed < frameInterval) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      state.lastTime = ts;

      // Faint background fill for trail effect
      ctx.fillStyle = "rgba(10, 15, 20, 0.08)";
      ctx.fillRect(0, 0, state.width, state.height);

      for (let i = 0; i < state.columns; i++) {
        const text = state.chars[Math.floor(Math.random() * state.chars.length)];
        const x = i * state.fontSize;
        const y = state.drops[i] * state.fontSize;

        // Neon green glow
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#39FF14";

        ctx.fillText(text, x, y);

        // Reset drop to top at random to vary density
        if (y > state.height && Math.random() > 0.975) {
          state.drops[i] = 0;
        } else {
          state.drops[i] += Math.random() > 0.99 ? 0 : 1; // occasional pause
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0"
    />
  );
}

export default MatrixCanvas;