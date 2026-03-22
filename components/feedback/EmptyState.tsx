type EmptyStateProps = {
  title: string;
};

export default function EmptyState({ title }: EmptyStateProps) {
  return <div>{title}</div>;
}
