import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

interface DropdownMenuTriggerProps {
  children: ReactNode;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  return (
    <RadixDropdownMenu.Trigger className="outline-none">
      {children}
    </RadixDropdownMenu.Trigger>
  );
}
