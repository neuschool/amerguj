export function formatDate(date: string, showYear: boolean = true) {
  return new Date(date).toLocaleDateString("en-US", {
    year: showYear ? "numeric" : undefined,
    month: "long",
    day: "numeric"
  });
}
