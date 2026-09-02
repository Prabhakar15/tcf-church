/**
 * Time and timezone formatting utilities for services
 */

/**
 * Convert 24-hour time format to 12-hour format
 * @example
 * formatServiceTime('20:00') => '8:00 PM'
 * formatServiceTime('05:00') => '5:00 AM'
 */
export function formatServiceTime(time24: string): string {
  if (!time24) return '';
  
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const min = minutes || '00';
  
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  return `${hour12}:${min} ${ampm}`;
}

/**
 * Convert timezone identifier to friendly display name
 * @example
 * formatTimezone('Asia/Singapore') => 'Singapore Time (SGT)'
 * formatTimezone('Asia/Kolkata') => 'India Standard Time (IST)'
 */
export function formatTimezone(timezone: string): string {
  const timezoneMap: Record<string, string> = {
    'Asia/Singapore': 'Singapore Time (SGT)',
    'Asia/Kolkata': 'India Standard Time (IST)',
  };
  
  return timezoneMap[timezone] || timezone;
}

/**
 * Format time range with times and timezone
 * @example
 * formatServiceSchedule('09:00', '10:00', 'Asia/Singapore')
 * => '9:00 AM – 10:00 AM Singapore Time (SGT)'
 */
export function formatServiceSchedule(
  startTime: string,
  endTime: string | undefined,
  timezone: string
): string {
  const start = formatServiceTime(startTime);
  const end = endTime ? ` – ${formatServiceTime(endTime)}` : '';
  const tz = formatTimezone(timezone);
  
  return `${start}${end} ${tz}`;
}

/**
 * Format day of week and time range
 * @example
 * formatDayAndTime('Friday', '09:00', '10:00')
 * => 'Every Friday · 9:00 AM – 10:00 AM'
 */
export function formatDayAndTime(day: string, startTime: string, endTime?: string): string {
  const start = formatServiceTime(startTime);
  const end = endTime ? ` – ${formatServiceTime(endTime)}` : '';
  
  return `Every ${day} · ${start}${end}`;
}

/**
 * Format day range for recurring services across multiple days
 * @example
 * formatDayRange(['Tuesday', 'Wednesday', 'Thursday', 'Friday'])
 * => 'Tuesday – Friday'
 */
export function formatDayRange(days: string[]): string {
  if (days.length <= 1) return days[0] || '';
  if (days.length === 2) return `${days[0]} & ${days[1]}`;
  
  // Assumes days are in order
  return `${days[0]} – ${days[days.length - 1]}`;
}
