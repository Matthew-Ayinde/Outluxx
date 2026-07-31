type TextInputProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({ label, name, ...props }: TextInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
        {label}
      </span>
      <input
        name={name}
        {...props}
        className="w-full border border-hairline bg-transparent px-4 py-3.5 text-sm font-light text-foreground placeholder:text-faint outline-none transition-colors duration-300 focus:border-foreground"
      />
    </label>
  );
}
