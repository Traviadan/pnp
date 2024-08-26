import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";

type FormInputProps = {
  name: string;
  type: string;
  className?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
};

function FormInput({
  name,
  type,
  className,
  label,
  defaultValue,
  placeholder,
  required = false,
}: FormInputProps) {
  return (
    <div className={cn('mb-2', className)}>
      <Label htmlFor={name}>
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
export default FormInput;
