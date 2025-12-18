"use client";

export default function GameControls({
  player,
  setPlayer,
  objectType,
  setObjectType,
  guess,
  setGuess,
  onPlay,
}) {
  return (
    <>
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
        placeholder="Your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button onClick={onPlay}>Toss!</button>
    </>
  );
}