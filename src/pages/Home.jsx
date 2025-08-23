import React from "react";
import { Link } from "react-router-dom";
import MatrixCanvas from "../components/MatrixCanvas.jsx";
import AsciiArt from "../components/AsciiArt.jsx";
import TypingIntro from "../components/TypingIntro.jsx";
import FakeTerminal from "../components/FakeTerminal.jsx";

function Home() {
  const introLines = [
    "> boot sequence: online",
    "> rendering matrix…",
    "> welcome, operator. type 'help' in the terminal below",
  ];

  return (
    <main className="relative min-h-screen bg-surface-base text-text-primary font-mono overflow-hidden">
      {/* Matrix background */}
      <MatrixCanvas />

      {/* Scanline overlay (styled in index.css) */}
      <div className="scanlines pointer-events-none fixed inset-0 opacity-25 mix-blend-screen" />

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="select-none text-4xl md:text-6xl text-neon-green drop-shadow-neonGreen glitch-hover">
            RETRO CYBER TERMINAL
          </h1>
          <p className="mt-3 text-text-muted">
            // boot sequence: online — rendering matrix — awaiting operator input
          </p>
        </header>

        <div className="grid gap-8">
          {/* ASCII art with hidden Key 1 in source comments */}
          <AsciiArt />

          {/* Typing intro (typewriter effect, respects prefers-reduced-motion) */}
          <TypingIntro lines={introLines} />

          {/* Fake terminal (help, clear, getkey -> geolocation-based Key 2) */}
          <FakeTerminal />
        </div>

        <footer className="mt-12 text-xs text-text-muted">
          <span className="opacity-70">
            hint: neon elements sometimes flicker with secrets.
          </span>
          <span className="mx-2">•</span>
          <Link
            to="/nope"
            className="underline decoration-neon-pink/50 underline-offset-4 hover:text-neon-pink transition-colors"
          >
            test 404
          </Link>
        </footer>

        {/* hint: see components/AsciiArt.jsx for Key 1; combine with terminal Key 2 */}
      </section>
    </main>
  );
}

export default Home;