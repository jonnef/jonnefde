import Link from "next/link";

export default function ToolCard({
  title, description, icon, link, disabled,
}: {
  title: string; description: string; icon: string; link: string; disabled?: boolean;
}) {
  return (
    <div
      className={[
        "max-w-sm rounded-2xl border border-base-300 bg-base-200 text-base-content",
        "p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5",
        "mx-auto", disabled ? "opacity-60 pointer-events-none" : ""
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl leading-none select-none">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="opacity-80 mb-4">{description}</p>
          <Link
            href={link}
            className={`btn btn-primary btn-sm ${disabled ? "pointer-events-none opacity-50" : ""}`}
          >
            Tool öffnen
          </Link>
        </div>
      </div>
    </div>
  );
}
