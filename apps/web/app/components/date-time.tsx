const locale = 'en-US'; // TODO: replace with i18n
const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const timeFormatter = new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});

export function DateTime({ date }: { date: Date }) {
  const start = new Date(date);
  return <span>{`${dateFormatter.format(start)} ${timeFormatter.format(start)}`}</span>;
}
