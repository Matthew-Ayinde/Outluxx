type SelectInputProps = {
  label: string;
  name: string;
  options: string[];
};

export default function SelectInput({ label, name, options }: SelectInputProps) {
  return (
    <label>
      {label}
      <select name={name} className="block border px-2 py-1">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
