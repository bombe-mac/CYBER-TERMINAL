import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="relative min-h-screen bg-surface-base text-text-primary font-mono overflow-hidden">
      <div className="scanlines pointer-events-none fixed inset-0 opacity-25 mix-blend-screen" />

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="inline-block rounded-lg border border-text-hairline/30 bg-surface-panel px-6 py-5 shadow-neon-pink">
          <pre
            aria-hidden="true"
            className="select-none text-neon-pink text-2xl leading-none whitespace-pre md:text-3xl drop-shadow-neonPink"
          >{String.raw`
  ____  ____   ___  _  _     ___   ___   ___  
 |___ \|  _ \ / _ \| || |   / _ \ / _ \ / _ \ 
   __) | |_) | | | | || |_ | | | | | | | | | |
  |__ <|  _ <| | | |__   _|| | | | | | | | | |
  ___) | |_) | |_| |  | |  | |_| | |_| | |_| |
 |____/|____/ \___/   |_|   \___/ \___/ \___/ 
          `}</pre>

          <h1 className="mt-5 text-3xl md:text-4xl text-neon-blue drop-shadow-neonBlue glitch-hover">
            404 — SIGNAL LOST
          </h1>
          <p className="mt-3 text-text-muted">
            The circuit you followed fizzled into the void.
          </p>

          <div className="mt-6">
            <Link
              to="/"
              className="neon-link inline-block rounded border border-text-hairline/30 bg-surface-sunken px-4 py-2 shadow-neon-blue neon-focus"
            >
              {'<'} return to terminal
            </Link>
          </div>
        </div>

        {/* hint: ghosts of packets murmur in comments */}
        {/* another hint: find the art source on the homepage */}
      </section>
    </main>
  );
}

export default NotFound;