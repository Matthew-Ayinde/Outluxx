import PageScaffold from "@/components/system/PageScaffold";

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;

  return (
    <PageScaffold
      title={`Order ${orderId}`}
      description="Order detail scaffold."
    />
  );
}
