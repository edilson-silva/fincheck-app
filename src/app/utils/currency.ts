export function formatCurrencty(value: number): string {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
