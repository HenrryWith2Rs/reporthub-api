import { subDays, format } from 'date-fns';

export function generateCustomID() {}

export function getLastNDays(n: number): {
  startDate: Date;
  endDate: Date;
} {
  const currentDate = new Date();
  const startDate = subDays(currentDate, 1);
  const endDate = subDays(currentDate, n);
  return { startDate, endDate };
}
