export function formatISODateJSTSimple(isoString: string) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Tokyo',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  };
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid ISO date string: ${isoString}`);
  }
  const dateString = date.toLocaleString('ja-JP', options);

  const [datePart, timePart] = dateString.split(' ');

  const [month, day] = datePart.split('/');

  const [hour, minute] = timePart.split(':');

  return `${month}月${day}日 ${hour}時${minute}分`;
}
