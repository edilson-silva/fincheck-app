import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

interface DropdownMenuRootProps {
  children: ReactNode;
}

export function DropdownMenuRoot({ children }: DropdownMenuRootProps) {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
}
