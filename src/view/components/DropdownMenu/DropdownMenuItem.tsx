import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";
import { cn } from "../../../app/utils/cn";

interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  onSelect?(): void;
}

export function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-[48px] outline-none flex items-center p-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer",
        className,
      )}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}
