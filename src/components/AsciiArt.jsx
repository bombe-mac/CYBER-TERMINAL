import React, { useEffect, useState } from "react";

/*
  KEY 1 (hidden in source):
  KEY1=R3TR0-CYB3R-531
  hint: view source of this component or the rendered page to discover more.
*/

function AsciiArt() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onVerified = () => setRevealed(true);
    document.addEventListener("terminal:key:verified", onVerified);
    return () => document.removeEventListener("terminal:key:verified", onVerified);
  }, []);

  return (
    <div className="rounded-lg border border-text-hairline/30 bg-surface-panel p-4 shadow-neon-green">
      {/* Primary banner */}
      <pre
        className="text-neon-green text-2xl leading-none whitespace-pre-wrap select-none drop-shadow-neonGreen glitch-hover"
        aria-label="Retro ASCII logo"
      >{String.raw`
   ____      __            __       ______           __              
  / __ \_____/ /___  ____  / /____  / ____/___  _____/ /___  _________
 / / / / ___/ / __ \/ __ \/ __/ _ \/ /   / __ \/ ___/ __/ / / / ___/ _ \
/ /_/ / /  / / /_/ / /_/ / /_/  __/ /___/ /_/ / /  / /_/ /_/ / /  /  __/
\____/_/  /_/\____/\____/\__/\___/\____/\____/_/   \__/\__,_/_/   \___/
`}</pre>

      <p className="mt-2 text-xs text-text-muted">
        hover for a glitch — something hums below the phosphors
      </p>

      {/* Hidden ASCII clue: reveals only after key validation */}
      <div
        className={`mt-4 rounded-md border border-text-hairline/20 bg-surface-sunken p-3 shadow-neon-blue ascii-reveal ${
          revealed ? "ascii-reveal--open" : ""
        }`}
        aria-hidden={!revealed}
      >
        <pre className="text-neon-blue whitespace-pre-wrap drop-shadow-neonBlue">
{String.raw`
   ______ _ _            _   _            _           _       
  |  ____(_) |          | | | |          | |         | |      
  | |__   _| | ___   _  | | | |_ __   ___| |__   __ _| |_ ___ 
  |  __| | | |/ / | | | | | | | '_ \ / __| '_ \ / _\` | __/ _ \
  | |    | |   <| |_| | | |_| | | | | (__| | | | (_| | ||  __/
  |_|    |_|_|\_\\__, |  \___/|_| |_|\___|_| |_|\__,_|\__\___|
                  __/ |                                      
                 |___/                                       
`}
        </pre>
        <p className="text-sm text-text-muted mt-2">
          clue: a verified operator sees more than noise.
        </p>
      </div>
    </div>
  );
}

export default AsciiArt;