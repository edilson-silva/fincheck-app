export function formatDate(date: Date): string {
  return Intl.DateTimeFormat("pt-br").format(date);
}
