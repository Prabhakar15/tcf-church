import type { DailyWord } from '../../types';
import { supabase } from '../supabase';

/**
 * Get today's or latest published daily word
 */
export async function getTodaysDailyWord(): Promise<DailyWord | null> {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_words')
    .select('*')
    .eq('status', 'published')
    .lte('publish_date', today)
    .order('publish_date', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching today\'s daily word:', error);
    return null;
  }

  return data ? mapDailyWord(data) : null;
}

/**
 * Get all published daily words (for archive)
 */
export async function getPublishedDailyWords(): Promise<DailyWord[]> {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_words')
    .select('*')
    .eq('status', 'published')
    .lte('publish_date', today)
    .order('publish_date', { ascending: false });

  if (error) {
    console.error('Error fetching published daily words:', error);
    return [];
  }

  return data ? data.map(mapDailyWord) : [];
}

/**
 * Get a single daily word by ID (public view)
 */
export async function getDailyWordById(id: string): Promise<DailyWord | null> {
  const { data, error } = await supabase
    .from('daily_words')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching daily word:', error);
    return null;
  }

  return data ? mapDailyWord(data) : null;
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

/**
 * Get all daily words (admin only)
 */
export async function getAllDailyWords(): Promise<DailyWord[]> {
  const { data, error } = await supabase
    .from('daily_words')
    .select('*')
    .order('publish_date', { ascending: false });

  if (error) {
    console.error('Error fetching all daily words:', error);
    return [];
  }

  return data ? data.map(mapDailyWord) : [];
}

/**
 * Create a new daily word (admin only)
 */
export async function createDailyWord(dailyWord: Omit<DailyWord, 'id' | 'createdAt' | 'updatedAt'>): Promise<DailyWord | null> {
  const { data, error } = await supabase
    .from('daily_words')
    .insert({
      title: dailyWord.title,
      scripture_ref: dailyWord.scriptureReference,
      bible_verse: dailyWord.bibleVerse,
      message: dailyWord.message,
      publish_date: dailyWord.publishDate,
      author: dailyWord.author,
      youtube_video_id: dailyWord.youtubeVideoId || null,
      youtube_type: dailyWord.youtubeType || null,
      status: dailyWord.status || 'draft'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating daily word:', error);
    return null;
  }

  return data ? mapDailyWord(data) : null;
}

/**
 * Update a daily word (admin only)
 */
export async function updateDailyWord(id: string, updates: Partial<Omit<DailyWord, 'id' | 'createdAt' | 'updatedAt'>>): Promise<DailyWord | null> {
  const updateData: Record<string, unknown> = {};

  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.scriptureReference !== undefined) updateData.scripture_ref = updates.scriptureReference;
  if (updates.bibleVerse !== undefined) updateData.bible_verse = updates.bibleVerse;
  if (updates.message !== undefined) updateData.message = updates.message;
  if (updates.publishDate !== undefined) updateData.publish_date = updates.publishDate;
  if (updates.author !== undefined) updateData.author = updates.author;
  if (updates.youtubeVideoId !== undefined) updateData.youtube_video_id = updates.youtubeVideoId;
  if (updates.youtubeType !== undefined) updateData.youtube_type = updates.youtubeType;
  if (updates.status !== undefined) updateData.status = updates.status;

  const { data, error } = await supabase
    .from('daily_words')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating daily word:', error);
    return null;
  }

  return data ? mapDailyWord(data) : null;
}

/**
 * Delete a daily word (admin only)
 */
export async function deleteDailyWord(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('daily_words')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting daily word:', error);
    return false;
  }

  return true;
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Map database record to DailyWord interface
 */
function mapDailyWord(data: Record<string, unknown>): DailyWord {
  return {
    id: String(data.id),
    title: String(data.title),
    scriptureReference: String(data.scripture_ref),
    bibleVerse: String(data.bible_verse),
    message: String(data.message),
    publishDate: String(data.publish_date),
    author: data.author ? String(data.author) : undefined,
    youtubeVideoId: data.youtube_video_id ? String(data.youtube_video_id) : undefined,
    youtubeType: (data.youtube_type as 'short' | 'video' | null) || undefined,
    status: (data.status as 'draft' | 'published') || 'draft',
    createdAt: data.created_at ? String(data.created_at) : undefined,
    updatedAt: data.updated_at ? String(data.updated_at) : undefined
  };
}
