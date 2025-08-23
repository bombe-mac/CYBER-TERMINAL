import React, { useEffect, useRef, useState } from "react";

/**
 * FakeTerminal
 * Commands:
 *  - help   : show available commands
 *  - clear  : clear the screen
 *  - getkey : obtain Key 2 via geolocation (Key format: LAT[latInt]_LON[lonInt])
 *
 * Notes:
 *  - Geolocation requires a secure context. localhost is considered secure by browsers.
 *  - If permission is denied or unavailable, a helpful message is printed.
 */
function FakeTerminal() {
  const [history, setHistory] = useState([
    "Retro Cyber Terminal v1.0",
    "Type 'help' to list commands.",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Keep the latest output visible
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  const print = (lines) => {
    setHistory((prev) => [...prev, ...(Array.isArray(lines) ? lines : [lines])]);
  };

  const clear = () => setHistory([]);

  const getKey = () => {
    if (!("geolocation" in navigator)) {
      print("geolocation not supported in this environment.");
      return;
    }
    print("requesting geolocation…");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const latInt = Math.trunc(latitude);
        const lonInt = Math.trunc(longitude);
        const key = `LAT[${latInt}]_LON[${lonInt}]`;
        // KEY 2 is revealed here to the operator
        print([
          "position acquired.",
          `Key 2: ${key}`,
          "(store this safely; combine with Key 1 to win)",
        ]);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            print("permission denied. cannot retrieve Key 2 without location.");
            break;
          case err.POSITION_UNAVAILABLE:
            print("position unavailable. try again later.");
            break;
          case err.TIMEOUT:
            print("geolocation request timed out. try again.");
            break;
          default:
            print(`geolocation error: ${err.message || "unknown error"}`);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 10000,
      }
    );
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Echo command
    print(`$ ${raw}`);

    if (cmd === "help") {
      print([
        "available commands:",
        "  help   - show this help",
        "  clear  - clear the screen",
        "  getkey - obtain Key 2 using geolocation",
      ]);
      return;
    }
    if (cmd === "clear") {
      clear();
      return;
    }
    if (cmd === "getkey") {
      getKey();
      return;
    }

    print(`unknown command: ${cmd}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const value = input;
    setInput("");
    run(value);
  };

  return (
    <div className="rounded-lg border border-text-hairline/30 bg-surface-sunken p-4 shadow-neon-blue">
      {/* Output */}
      <div
        className="mb-2 max-h-72 overflow-auto text-neon-green"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <span className="text-neon-green select-none">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-neon-green placeholder:text-text-muted/60 outline-none neon-focus caret-neon-green"
          placeholder="type a command (help, clear, getkey)"
          aria-label="Terminal input"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="px-3 py-1 rounded border border-text-hairline/30 bg-surface-panel text-text-primary hover:shadow-neon-green transition-shadow neon-focus"
        >
          run
        </button>
      </form>
    </div>
  );
}

export default FakeTerminal;