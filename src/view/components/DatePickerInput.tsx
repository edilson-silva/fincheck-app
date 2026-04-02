import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/date";
import { DatePicker } from "./DatePicker";
import { ErrorInfo } from "./ErrorInfo";
import { Popover } from "./Popover";

interface DatePickerInputProps {
  className?: string;
  error?: string;
}

export function DatePickerInput({ className, error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  function handleChange(date: Date) {
    setSelectedDate(date);
    setOpenDatePicker(false);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4",
              !selectedDate && "!border-red-500",
              className,
            )}
            onClick={() => setOpenDatePicker(true)}
          >
            <span className="text-gray-700 text-xs left-[13px] top-2 pointer-events-none absolute">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>
        <Popover.Content>
          {openDatePicker && (
            <DatePicker value={selectedDate} onChange={handleChange} />
          )}
        </Popover.Content>
      </Popover.Root>

      {!selectedDate && <ErrorInfo error={error} />}
    </div>
  );
}
