import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * TypingIntro
 * - Typewriter effect for a small set of lines
 * - Respects prefers-reduced-motion
 */
function TypingIntro({ lines = [], charDelay = 18, lineDelay = 400 }) {
  const [output, setOutput] = useState([]);
  const motionReduced = useMemo(
    () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (!lines || lines.length === 0) return;

    if (motionReduced) {
      // Immediately render without animation
      setOutput(lines);
      return;
    }

    let time = 0;
    setOutput([]);
    lines.forEach((line, idx) => {
      // Add a new empty line after previous line finished
      time += idx === 0 ? 0 : lineDelay;
      const startTime = time;
      for (let i = 0; i <= line.length; i++) {
        const slice = line.slice(0, i);
        const t = startTime + i * charDelay;
        setTimeout(() => {
          if (!mountedRef.current) return;
          setOutput((prev) => {
            const next = prev.slice();
            if (next.length < idx + 1) {
              next.push(slice);
            } else {
              next[idx] = slice;
            }
            return next;
          });
        }, t);
      }
      time += line.length * charDelay;
    });

    return () => {
      mountedRef.current = false;
    };
  }, [lines, charDelay, lineDelay, motionReduced]);

  return (
    <div className="rounded-lg border border-text-hairline/30 bg-surface-panel p-4">
      <div aria-live="polite" className="text-neon-blue">
        {output.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
            {i === output.length - 1 && <span className="animate-pulse">▌</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypingIntro;