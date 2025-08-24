import React from "react";
import { Link } from "react-router-dom";
import MatrixCanvas from "../components/MatrixCanvas.jsx";
import TypingIntro from "../components/TypingIntro.jsx";
import FakeTerminal from "../components/FakeTerminal.jsx";

function Home() {
  const introLines = [
    "> initializing...",
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
            Welcome to the Matrix
          </h1>
          
        </header>

        <div className="grid gap-8">
  
          

          {/* Typing intro (typewriter effect, respects prefers-reduced-motion) */}
          <TypingIntro lines={introLines} />

          {/* Fake terminal (help, clear, getkey -> geolocation-based Key 2) */}
          <FakeTerminal />
        </div>


   
        <div className="fixed bottom-3 right-3 z-20 group/popup select-none">
          {/* Invisible hover target in the corner */}
          <div
            className="h-6 w-6 opacity-0"
            aria-hidden="true"
            title="corner"
          />
          {/* Revealed popup on hover */}
          <div className="pointer-events-none absolute bottom-8 right-0 w-[200px] max-w-[70vw] translate-y-2 opacity-0 scale-95 transition-all duration-200 group-hover/popup:opacity-100 group-hover/popup:translate-y-0 group-hover/popup:scale-100">
  <div className="rounded-md border border-text-hairline/30 bg-surface-panel/95 backdrop-blur-sm p-3 shadow-neon-blue">
    <div className="text-xs text-neon-blue drop-shadow-neonBlue hover:animate-[glitch-jitter_140ms_steps(2)_2]">
      // system hint
    </div>
    <div className="mt-1 text-sm text-text-muted">
      {`Concatenate the latitude and longitude without decimals and enter checkkey <secretkey>.`}
    </div>
  </div>
</div>
        </div>
      </section>
    </main>
  );
}

export default Home;