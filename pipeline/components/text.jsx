export default function Text({ text, variant = "default" }) {
  if (variant === "headline") {
    return (
      <h1
        style={{ color: "papayawhip", marginBottom: "0.5rem" }}
        className="headline"
      >
        {text}
      </h1>
    );
  }

  return (
    <div className="text" style={{ margin: "1rem 0" }}>
      {text}
    </div>
  );
}
