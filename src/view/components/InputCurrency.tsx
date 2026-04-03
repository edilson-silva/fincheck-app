import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";
import { ErrorInfo } from "./ErrorInfo";

interface InputCurrencyProps {
  error?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        className={cn(
          "w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none",
          error && "text-red-900",
        )}
        thousandSeparator="."
        decimalSeparator=","
        onValueChange={(values) => onChange?.(values.value)}
        value={value}
      />
      {error && <ErrorInfo error={error} />}
    </div>
  );
}
