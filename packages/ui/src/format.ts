const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const relativeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const units = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
] as const;

/** "27 Oct 2026, 15:53": the absolute timestamp format for every CTX9 app. */
export function formatDateTime(value: Date | string): string {
  return dateTimeFormat.format(new Date(value));
}

/** "2 hours ago" or "in 3 days"; pair with formatDateTime in a title for the exact time. */
export function formatRelativeTime(
  value: Date | string,
  now: Date = new Date(),
): string {
  const seconds = (new Date(value).getTime() - now.getTime()) / 1000;
  const unit = units.find(([, size]) => Math.abs(seconds) >= size);
  return unit
    ? relativeFormat.format(Math.round(seconds / unit[1]), unit[0])
    : "just now";
}
