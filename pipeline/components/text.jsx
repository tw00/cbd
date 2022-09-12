export default function Text({ text, variant = "default" }) {
  if (variant === "headline") {
    return <h1 className="headline">{text}</h1>;
  }

  return <div className="text">{text}</div>;
}
