import type { TransactionCategoryType } from "../../../app/utils/types";
import { iconsMap } from "./iconsMap";

interface CategoryIconProps {
  type: keyof typeof TransactionCategoryType;
  category?: string;
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const strType = type.toLowerCase() as keyof typeof iconsMap;

  const Icon =
    iconsMap[strType][
      (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ??
        "default"
    ] ?? iconsMap[strType].default;

  return <Icon />;
}
