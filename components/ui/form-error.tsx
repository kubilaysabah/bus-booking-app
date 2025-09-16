interface FormErrorProps {
  errors?: string[];
}

export function FormError({ errors }: FormErrorProps) {
  if (!errors?.length) return null;
  
  return (
    <ul className="space-y-2">
      {errors.map((error, index) => (
        <li key={index}>
          <small className="text-xs text-red-600">
            {error}
          </small>
        </li>
      ))}
    </ul>
  );
}