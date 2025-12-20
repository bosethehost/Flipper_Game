"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [objectType, setObjectType] = useState("sandwich");
  const [guess, setGuess] = useState("");
  const [player, setPlayer] = useState("");
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  const play = async () => {
    setError("");
    try {
      const res = await fetch(`${API}/toss`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          object_type: objectType,
          guess,
          player,
        }),
      });

      if (!res.ok) {
        throw new Error("Toss failed");
      }

      const data = await res.json();
      setResult(data);
      loadLeaderboard();
    } catch (err) {
      setError("❌ Could not reach the game server");
    }
  };

  const loadLeaderboard = async () => {
    try {
      const res = await fetch(`${API}/leaderboard`);
      if (!res.ok) return;

      const data = await res.json();
      setLeaderboard(data);
    } catch {
      // silently ignore leaderboard errors
    }
  };

  return (
    <main className="container">
      <h1>🥪 Flipper Game</h1>

      <input
        placeholder="Player name"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
      />

      <select
        value={objectType}
        onChange={(e) => setObjectType(e.target.value)}
      >
        <option value="sandwich">Sandwich</option>
        <option value="shoe">Shoe</option>
        <option value="jointed">Jointed</option>
      </select>

      <input
        placeholder="Your guess (e.g. Jam Side Up)"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button onClick={play}>Toss!</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="result">
          <p>
            <strong>Result:</strong>{" "}
            {typeof result.result === "object"
              ? JSON.stringify(result.result)
              : result.result}
          </p>
          <p>{result.correct ? "✅ Correct!" : "❌ Wrong"}</p>
        </div>
      )}

      <h2>🏆 Leaderboard</h2>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry.player}>
            {entry.player}: {entry.score}
          </li>
        ))}
      </ul>
    </main>
  );
}
