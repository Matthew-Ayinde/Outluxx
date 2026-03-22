type ErrorStateProps = {
  title: string;
};

export default function ErrorState({ title }: ErrorStateProps) {
  return <div>{title}</div>;
}
