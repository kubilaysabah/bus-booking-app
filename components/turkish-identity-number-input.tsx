"use client";

import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";

type TurkishIdentityNumberInputProps = {
  name?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  isError?: boolean;
  required?: boolean;
};

export default function TurkishIdentityNumberInput({
  name,
  id,
  className = '',
  placeholder = '',
  disabled = false,
  isError = false,
  required = false,
}: TurkishIdentityNumberInputProps) {
  return (
    <PatternFormat
      format="###########"
      mask="_"
      customInput={Input}
      name={name}
      id={id}
      className={className}
      disabled={disabled}
      aria-invalid={isError}
      placeholder={placeholder}
      required={required}
    />
  );
}
