export function formatCurrencty(value: number): string {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function parseCurrency(value: string | number): number {
  if (typeof value === "number") return value;

  const numericValue = value.replace(/\./g, "").replace(",", ".");

  return parseFloat(numericValue);
}
