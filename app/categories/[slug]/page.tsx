import PageScaffold from "@/components/system/PageScaffold";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <PageScaffold
      title={`Category: ${slug}`}
      description="Category listing template scaffold."
    />
  );
}
