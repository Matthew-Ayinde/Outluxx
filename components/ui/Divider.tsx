type DividerProps = {
  label?: string;
  className?: string;
};

export function Divider({ label, className = "" }: DividerProps) {
  if (!label) {
    return <hr className={["border-border", className].join(" ")} />;
  }
  return (
    <div className={["flex items-center gap-5", className].join(" ")}>
      <hr className="flex-1 border-border" />
      <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
        {label}
      </span>
      <hr className="flex-1 border-border" />
    </div>
  );
}
