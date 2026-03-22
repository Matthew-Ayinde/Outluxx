type VariantSelectorProps = {
  label: string;
  options: string[];
};

export default function VariantSelector({ label, options }: VariantSelectorProps) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div>{options.join(", ")}</div>
    </fieldset>
  );
}
