export function handleTime(time: string, showMinute: boolean = false): string {
  const timeSplit = time.split(':');
  let meridian: string;
  let hour = Number(timeSplit[0]);
  const minutes = Number(timeSplit[1]);

  if (hour > 12) {
    meridian = 'PM';
    hour -= 12;
  } else if (hour < 12) {
    meridian = 'AM';
    if (hour === 0) {
      hour = 12;
    }
  } else {
    meridian = 'PM';
  }

  if (showMinute) {
    return `${hour}:${minutes} ${meridian}`;
  } else {
    return `${hour} ${meridian}`;
  }
}

export function sortByTime(data: any): any {
  return data.sort((a: any, b: any) => a.time.localeCompare(b.time));
}
