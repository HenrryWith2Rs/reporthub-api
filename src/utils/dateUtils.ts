import { subDays, format } from 'date-fns';

export function getToday(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getLastNDays(n: number): {
  startDate: Date;
  endDate: Date;
} {
  const currentDate = new Date();
  const startDate = subDays(currentDate, 1);
  const endDate = subDays(currentDate, n);
  return { startDate, endDate };
}

export function formatDate(date: Date | null): string {
  return date ? format(date, 'yyyy-MM-dd') : '';
}
