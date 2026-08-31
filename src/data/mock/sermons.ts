import type { Sermon } from '../../types';

// MOCK DATA — replace with Supabase data later
// Sermons will be connected to TCF\'s YouTube channel
export const mockSermons: Sermon[] = [];

export function getLatestSermons(limit: number = 5): Sermon[] {
  return mockSermons
    .filter(s => s.youtubeVideoId)
    .sort((a, b) => new Date(b.sermonDate).getTime() - new Date(a.sermonDate).getTime())
    .slice(0, limit);
}
