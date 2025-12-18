export default function ScoreBoard({ result }) {
  if (!result) return null;

  return (
    <div className="result">
      <p>
        <strong>Result:</strong> {JSON.stringify(result.result)}
      </p>
      <p>{result.correct ? "✅ Correct!" : "❌ Wrong"}</p>
    </div>
  );
}