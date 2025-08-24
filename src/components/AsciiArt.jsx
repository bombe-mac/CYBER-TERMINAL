import React, { useEffect, useState } from "react";


function AsciiArt() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onVerified = () => setRevealed(true);
    document.addEventListener("terminal:key:verified", onVerified);
    return () => document.removeEventListener("terminal:key:verified", onVerified);
  }, []);

  return (
    <div className="rounded-lg border border-text-hairline/30 bg-surface-panel p-4 md:p-5 shadow-neon-green">
      {/* Primary banner */}
      <pre
        className="text-neon-green text-2xl leading-none whitespace-pre-wrap select-none drop-shadow-neonGreen glitch-hover"
        aria-label="WELCOME TO THE MATRIX ASCII"
      >{String.raw`
__        __   _                            _        _            __  __      _        _
\ \      / /__| | ___ ___  _ __ ___   ___  | | _____| |_ ___     |  \/  | ___| |_ __ _(_)_ __   ___
 \ \ /\ / / _ \ |/ __/ _ \| '_ \` _ \ / _ \ | |/ / _ \ __/ __|    | |\/| |/ _ \ __/ _\` | | '_ \ / _ \
  \ V  V /  __/ | (_| (_) | | | | | |  __/ |   <  __/ |_\__ \    | |  | |  __/ || (_| | | | | |  __/
   \_/\_/ \___|_|\___\___/|_| |_| |_|\___| |_|\_\___|\__|___/    |_|  |_|\___|\__\__,_|_|_| |_|\___|
                                                                                                    
                   W E L C O M E   T O   T H E   M A T R I X
 `}</pre>

      <p className="mt-2 text-xs text-text-muted">
        hover for a glitch — something hums below the phosphors
      </p>

      {/* Hidden ASCII clue: reveals only after key validation */}
      <div
        className={`mt-4 rounded-md border border-text-hairline/20 bg-surface-sunken p-3 md:p-4 shadow-neon-blue ascii-reveal ${
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