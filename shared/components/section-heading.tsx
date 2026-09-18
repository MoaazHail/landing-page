import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
}

export function SectionHeading({
  id,
  title,
  eyebrow,
  subtitle,
  tone = "light",
  align = "center",
  className,
}: SectionHeadingProps) {
  const onDark = tone === "dark";

  return (
    <div className={cn(align === "center" ? "text-center" : "text-start", className)}>
      {eyebrow && (
        <p
          className={cn(
            "font-mono text-[12.5px] font-medium tracking-[.22em]",
            onDark ? "text-sky" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={cn("text-h2 font-bold", eyebrow && "mt-2.5")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-2.5 text-lead", onDark ? "text-white/72" : "text-muted")}>{subtitle}</p>
      )}
    </div>
  );
}
