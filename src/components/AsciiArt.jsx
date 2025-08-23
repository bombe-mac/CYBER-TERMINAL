import React from "react";

/*
  KEY 1 (hidden in source):
  KEY1=R3TR0-CYB3R-531
  hint: view source of this component or the rendered page to discover more.
*/

function AsciiArt() {
  return (
    <div className="rounded-lg border border-text-hairline/30 bg-surface-panel p-4 shadow-neon-green">
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
    </div>
  );
}

export default AsciiArt;