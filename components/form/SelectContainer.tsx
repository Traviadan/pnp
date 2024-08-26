"use client"

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectProps = {
  name: string;
  css?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  children: React.ReactNode;
};

export function SelectContainer({
  name,
  css,
  defaultValue,
  placeholder,
  required = false,
  children
}: SelectProps) {
  return (
    <Select name={name} defaultValue={defaultValue} required={required}>
        <SelectTrigger className={css}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      <SelectContent>
        {children}
      </SelectContent>
    </Select>
  )
}
