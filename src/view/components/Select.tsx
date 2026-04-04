import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as RdxSelect from "@radix-ui/react-select";
import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { ErrorInfo } from "./ErrorInfo";
import { Spinner } from "./Spinner";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  value?: string;
  isLoading?: boolean;
}

export function Select({
  className,
  error,
  placeholder,
  options,
  onChange,
  value,
  isLoading = false,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            "absolute z-[1] top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none",
            selectedValue &&
              "text-xs left-[13px] top-2 transition-all translate-y-0",
          )}
        >
          {placeholder}
        </label>
        <RdxSelect.Root
          onValueChange={handleSelect}
          value={selectedValue}
          disabled={isLoading}
        >
          <RdxSelect.Trigger
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none text-left relative pt-4",
              !selectedValue && "!border-red-500",
              className,
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden bg-white rounded-2xl border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]">
              {isLoading ? (
                <Spinner />
              ) : (
                <div>
                  <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                    <ChevronUpIcon />
                  </RdxSelect.ScrollUpButton>

                  {options.map((option) => (
                    <RdxSelect.Viewport className="p-2" key={option.value}>
                      <RdxSelect.Item
                        className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold data-[highlighted]:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                        value={option.value}
                      >
                        <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                      </RdxSelect.Item>
                    </RdxSelect.Viewport>
                  ))}

                  <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                    <ChevronDownIcon />
                  </RdxSelect.ScrollDownButton>
                </div>
              )}
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>
      {!selectedValue && <ErrorInfo error={error} />}
    </div>
  );
}
