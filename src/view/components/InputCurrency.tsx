import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";
import { ErrorInfo } from "./ErrorInfo";

interface InputCurrencyProps {
  error?: string;
  onChange: (value: string) => void;
}

export function InputCurrency({ error, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        className={cn(
          "w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none",
          error && "text-red-900",
        )}
        thousandSeparator="."
        decimalSeparator=","
        defaultValue="0"
        onValueChange={(values) => onChange(values.value)}
      />
      {error && <ErrorInfo error={error} />}
    </div>
  );
}
