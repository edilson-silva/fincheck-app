interface FieldErrorProps {
  error?: string;
}

import { CrossCircledIcon } from "@radix-ui/react-icons";

export function ErrorInfo({ error }: FieldErrorProps) {
  return (
    error && (
      <div className="flex gap-2 items-center mt-2 text-red-500 font-normal text-xs">
        {<CrossCircledIcon />}
        <span>{error}</span>
      </div>
    )
  );
}
