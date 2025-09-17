"use client";

import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";

type PhoneInputProps = {
  name?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  isError?: boolean;
  required?: boolean;
};

export default function PhoneInput({
  name,
  id,
  className = '',
  placeholder = '',
  disabled = false,
  isError = false,
  required = false,
}: PhoneInputProps) {
  return (
    <PatternFormat
      format="##########"
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
