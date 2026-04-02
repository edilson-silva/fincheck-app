import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker, type DateLibOptions } from "react-day-picker";
import { StringUtils } from "../../app/utils/string";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange(date ?? new Date())}
      classNames={{
        button_previous:
          "flex items-center justify-center !bg-transparent [&>svg]:stroke-teal-800 [&>svg]:fill-teal-800",
        button_next:
          "flex items-center justify-center !bg-transparent [&>svg]:stroke-teal-800 [&>svg]:fill-teal-800",
        today: "bg-gray-100 font-bold text-gray-900 rounded-full",
        selected: "!bg-teal-900 text-white font-medium rounded-full",
      }}
      formatters={{
        formatCaption: (date: Date, options: DateLibOptions | undefined) => {
          return StringUtils.capitalizeFirstLetter(
            format(date, "LLLL yyyy", options),
          );
        },
        formatWeekdayName: (date) =>
          format(date, "EEE", { locale: ptBR }).toUpperCase().substring(0, 3),
      }}
    />
  );
}
