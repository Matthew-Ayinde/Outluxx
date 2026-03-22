type CheckoutStepsProps = {
  steps: string[];
};

export default function CheckoutSteps({ steps }: CheckoutStepsProps) {
  return <ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol>;
}
