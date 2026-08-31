import type { Announcement } from '../../types';

// MOCK DATA — replace with Supabase data later
export const mockAnnouncements: Announcement[] = [];

export function getPublishedAnnouncements(): Announcement[] {
  return mockAnnouncements.filter(a => a.status === 'published');
}
