import type { Event } from '../../types';

// MOCK DATA — replace with Supabase data later
// No confirmed upcoming events at this time
export const mockEvents: Event[] = [];

export function getUpcomingEvents(): Event[] {
  return mockEvents.filter(event => event.status === 'published');
}
