import * as RadixPopover from "@radix-ui/react-popover";
import type { ReactNode } from "react";
import { cn } from "../../../app/utils/cn";

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

export function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          "rounded-2xl bg-white space-y-2 box-shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99] p-4",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className,
        )}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}
