export default function Leaderboard({ leaderboard }) {
  return (
    <>
      <h2>🏆 Leaderboard</h2>
      <ul>
        {leaderboard.map(([name, score]) => (
          <li key={name}>
            {name}: {score}
          </li>
        ))}
      </ul>
    </>
  );
}