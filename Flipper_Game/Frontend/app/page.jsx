"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [objectType, setObjectType] = useState("sandwich");
  const [guess, setGuess] = useState("");
  const [player, setPlayer] = useState("");
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const play = async () => {
    const res = await fetch(`${API}/toss`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        object_type: objectType,
        guess,
        player,
      }),
    });

    const data = await res.json();
    setResult(data);
    loadLeaderboard();
  };

  const loadLeaderboard = async () => {
    const res = await fetch(`${API}/leaderboard`);
    const data = await res.json();
    setLeaderboard(data);
  };

  return (
    <main className="container">
      <h1>🥪 Flipper Game</h1>

      <input
        placeholder="Player name"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
      />

      <select value={objectType} onChange={(e) => setObjectType(e.target.value)}>
        <option value="sandwich">Sandwich</option>
        <option value="shoe">Shoe</option>
        <option value="jointed">Jointed</option>
      </select>

      <input
        placeholder="Your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button onClick={play}>Toss!</button>

      {result && (
        <div className="result">
          <p><strong>Result:</strong> {JSON.stringify(result.result)}</p>
          <p>{result.correct ? "✅ Correct!" : "❌ Wrong"}</p>
        </div>
      )}

      <h2>🏆 Leaderboard</h2>
      <ul>
        {leaderboard.map(([name, score]) => (
          <li key={name}>{name}: {score}</li>
        ))}
      </ul>
    </main>
  );
}
