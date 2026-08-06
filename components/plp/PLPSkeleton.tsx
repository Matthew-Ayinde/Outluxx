import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function PLPSkeleton() {
  return (
    <div className="bg-background">
      <div className="h-[38vh] min-h-52 animate-pulse bg-zinc-100 dark:bg-zinc-900" />
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between border-b border-border pb-5">
          <div className="h-8 w-24 animate-pulse bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-8 w-32 animate-pulse bg-zinc-100 dark:bg-zinc-900" />
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
