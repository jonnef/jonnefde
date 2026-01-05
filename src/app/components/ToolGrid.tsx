import ToolCard from "./ToolCard";

export default function ToolGrid({ tools }: { tools: any[] }) {
  return (
    <div
      className="
        grid gap-6 justify-center
        sm:grid-cols-3 lg:grid-cols-3
        max-w-5xl mx-auto
      "
    >
      {tools.map((t, i) => (
  <ToolCard key={`${t.link}-${i}`} {...t} />
))}
    </div>
  );
}
