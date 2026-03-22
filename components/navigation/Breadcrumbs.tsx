type BreadcrumbsProps = {
  items: Array<{ label: string; href?: string }>;
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return <nav aria-label="Breadcrumbs">{items.map((item) => item.label).join(" / ")}</nav>;
}
