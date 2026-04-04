import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

enum ButtonVariant {
  DANGER = "danger",
  GHOST = "ghost",
}

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: ButtonVariant;
}

function Button({
  isLoading,
  disabled,
  className,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "bg-teal-900 hover:bg-teal-800 active:bg-teal-900 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center",
        variant === ButtonVariant.DANGER &&
          "bg-red-900 hover:bg-red-800 active:bg-red-900",
        variant === ButtonVariant.GHOST &&
          "bg-transparent hover:bg-gray-800/5 active:bg-transparent border border-gray-800 text-gray-800",
        className,
      )}
    >
      {isLoading ? (
        <Spinner
          className={cn(
            "w-6 h-6",
            variant === ButtonVariant.GHOST && "fill-red-900",
          )}
        />
      ) : (
        children
      )}
    </button>
  );
}

export { Button, ButtonVariant };
