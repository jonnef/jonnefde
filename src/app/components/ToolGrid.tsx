import ToolCard from "./ToolCard";

export default function ToolGrid({ tools }: { tools: any[] }) {
  return (
    <div
      className="
        grid gap-6 justify-center
        sm:grid-cols-2 lg:grid-cols-2
        max-w-5xl mx-auto
      "
    >
      {tools.map((t) => (
        <ToolCard key={t.link} {...t} />
      ))}
    </div>
  );
}
