type TextInputProps = {
  label: string;
  name: string;
};

export default function TextInput({ label, name }: TextInputProps) {
  return (
    <label>
      {label}
      <input name={name} className="block border px-2 py-1" />
    </label>
  );
}
