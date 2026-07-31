export default function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return (
    <div
      className={["animate-pulse bg-surface", className].join(" ")}
      aria-hidden="true"
    />
  );
}
