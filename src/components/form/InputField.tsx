import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InputFieldProps {
  label: string;
  type?: "text" | "number" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: InputFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      {type === "textarea" ? (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-primary/20 focus:border-accent min-h-[120px]"
          required={required}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-primary/20 focus:border-accent"
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;