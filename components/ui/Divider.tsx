type DividerProps = {
  label?: string;
  className?: string;
};

export function Divider({ label, className = "" }: DividerProps) {
  if (!label) {
    return <hr className={["border-black/10", className].join(" ")} />;
  }
  return (
    <div className={["flex items-center gap-4", className].join(" ")}>
      <hr className="flex-1 border-black/10" />
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </span>
      <hr className="flex-1 border-black/10" />
    </div>
  );
}
