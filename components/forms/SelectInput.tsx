type SelectInputProps = {
  label: string;
  name: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectInput({ label, name, options, ...props }: SelectInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
        {label}
      </span>
      <div className="relative">
        <select
          name={name}
          {...props}
          className="w-full cursor-pointer appearance-none border border-hairline bg-background px-4 py-3.5 pr-10 text-sm font-light text-foreground outline-none transition-colors duration-300 focus:border-foreground"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-faint"
          width="11" height="11" viewBox="0 0 12 12" fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  );
}
