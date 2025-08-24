import React, { useEffect, useRef, useState } from "react";

function FakeTerminal() {
  const [history, setHistory] = useState([
    { text: "Retro Cyber Terminal v1.2", className: "text-neon-green" },
    { text: "Type 'help' to list commands.", className: "text-text-muted" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const print = (lines, className = "") => {
    const newLines = Array.isArray(lines)
      ? lines.map((text) => ({ text, className }))
      : [{ text: lines, className }];
    setHistory((prev) => [...prev, ...newLines]);
  };

  const clear = () => setHistory([]);

  const computeSecret = (latitude, longitude) => {
    const latScaled = Math.abs(Math.round(latitude * 1e7));
    const lonScaled = Math.abs(Math.round(longitude * 1e7));
    const secret = `${latScaled}${lonScaled}`;
    return { key: BigInt(secret), len: secret.length };
  };

  const validateKey = (userKey) => {
    if (!navigator.geolocation) {
      print("❌ Geolocation not supported in this browser.", "term-error");
      return;
    }

    if (!window.isSecureContext) {
      print(
        [
          "❌ Geolocation requires a secure context.",
          "Please run this on HTTPS or http://localhost.",
        ],
        "term-error"
      );
      return;
    }

    let userKeyBigInt;
    try {
      userKeyBigInt = BigInt(userKey);
    } catch {
      print("❌ Invalid key format. Please use digits only.", "term-error");
      return;
    }

    print(
      "🛰️ Requesting geolocation... please check your browser for a permission prompt.",
      "text-text-muted"
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const { key: secretKey, len: expectedLen } = computeSecret(
          latitude,
          longitude
        );
        const userKeyAbs = userKeyBigInt < 0n ? -userKeyBigInt : userKeyBigInt;

        if (userKeyAbs === secretKey) {
          print("✅ Access granted. Key verified.", "term-success");
          print(
            "Your location is: " + latitude + ", " + longitude,
            "text-text-muted"
          );
        } else {
          const providedLen = userKey.length;
          print(
            `❌ Access denied. Incorrect key. (Digits: provided ${providedLen}, expected ${expectedLen})`,
            "term-error"
          );
        }
      },
      (error) => {
        const messages = {
          [error.PERMISSION_DENIED]:
            "Permission denied. Please enable location services and retry.",
          [error.POSITION_UNAVAILABLE]:
            "Position unavailable. Could not acquire location.",
          [error.TIMEOUT]: "Request timed out. Please try again.",
        };
        const errorMessage =
          messages[error.code] || "An unknown geolocation error occurred.";
        print(`❌ ${errorMessage}`, "term-error");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const commands = {
    help: () =>
      print(
        [
          "Available commands:",
          "  help                    - Show this help message",
          "  clear                   - Clear the terminal screen",
          "  checkkey <key>          - Validate a key using your geolocation",
          "  hints one|two|three     - Display puzzle hints",
        ],
        "text-text-muted"
      ),
    clear,
    checkkey: (arg) => {
      if (!arg || !/^\d+$/.test(arg)) {
        print("Usage: checkkey <number>", "term-error");
        return;
      }
      validateKey(arg);
    },
    hints: (arg) => {
      const a = (arg || "").trim().toLowerCase();
      const type = (line) => print([line], "term-type text-neon-blue");

      if (a === "1" || a === "one") {
        return type("hint1: Everyone has a different key");
      }
      if (a === "2" || a === "two") {
        return type(
          "hint2: Learn how to get latitude and longitude from the terminal"
        );
      }
      if (a === "3" || a === "three") {
        return type(
          "hint3: Explore the corners to get console code to know your current location"
        );
      }

      print(
        ["Usage: hints <one|two|three>", "Example: hints one"],
        "text-text-muted"
      );
    },
  };

  const handleCommand = (commandStr) => {
    if (!commandStr) return;
    print(`$ ${commandStr}`, "text-neon-green");
    const [cmd, ...args] = commandStr.trim().split(/\s+/);
    if (commands[cmd]) {
      commands[cmd](args.join(" "));
    } else {
      print(`Command not found: ${cmd}. Type 'help'.`, "term-error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="font-mono rounded-lg border border-text-hairline/30 bg-surface-panel p-4 md:p-5 shadow-neon-blue">
      <div className="mb-3 max-h-72 md:max-h-[28rem] min-h-[8rem] overflow-auto pr-1">
        {history.map((item, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${item.className || ""}`}
          >
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-neon-green select-none">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-neon-green placeholder-gray-500 outline-none focus:ring-0"
          placeholder="type a command..."
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="px-3 py-1 rounded border border-text-hairline/30 bg-surface-sunken text-text-primary shadow-neon-blue hover:shadow-neon-pink transition-shadow neon-focus"
        >
          run
        </button>
      </form>
    </div>
  );
}

export default FakeTerminal;
