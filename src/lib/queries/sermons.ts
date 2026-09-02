import type { Sermon } from '../../types';
import { supabase } from '../supabase';

/**
 * Get latest published sermons
 */
export async function getLatestSermons(limit: number = 5): Promise<Sermon[]> {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .eq('status', 'published')
    .order('sermon_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest sermons:', error);
    return [];
  }

  return data ? data.map(mapSermon) : [];
}

/**
 * Get all published sermons
 */
export async function getPublishedSermons(): Promise<Sermon[]> {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .eq('status', 'published')
    .order('sermon_date', { ascending: false });

  if (error) {
    console.error('Error fetching published sermons:', error);
    return [];
  }

  return data ? data.map(mapSermon) : [];
}

/**
 * Get a single sermon by ID (public view)
 */
export async function getSermonById(id: string): Promise<Sermon | null> {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching sermon:', error);
    return null;
  }

  return data ? mapSermon(data) : null;
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

/**
 * Get all sermons (admin only)
 */
export async function getAllSermons(): Promise<Sermon[]> {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .order('sermon_date', { ascending: false });

  if (error) {
    console.error('Error fetching all sermons:', error);
    return [];
  }

  return data ? data.map(mapSermon) : [];
}

/**
 * Create a new sermon (admin only)
 */
export async function createSermon(sermon: Omit<Sermon, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sermon | null> {
  const { data, error } = await supabase
    .from('sermons')
    .insert({
      title: sermon.title,
      description: sermon.description || null,
      speaker: sermon.speaker || null,
      sermon_date: sermon.sermonDate,
      youtube_video_id: sermon.youtubeVideoId,
      youtube_type: sermon.youtubeType || 'video',
      status: sermon.status || 'draft'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating sermon:', error);
    return null;
  }

  return data ? mapSermon(data) : null;
}

/**
 * Update a sermon (admin only)
 */
export async function updateSermon(id: string, updates: Partial<Omit<Sermon, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Sermon | null> {
  const updateData: Record<string, unknown> = {};

  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.speaker !== undefined) updateData.speaker = updates.speaker;
  if (updates.sermonDate !== undefined) updateData.sermon_date = updates.sermonDate;
  if (updates.youtubeVideoId !== undefined) updateData.youtube_video_id = updates.youtubeVideoId;
  if (updates.youtubeType !== undefined) updateData.youtube_type = updates.youtubeType;
  if (updates.status !== undefined) updateData.status = updates.status;

  const { data, error } = await supabase
    .from('sermons')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating sermon:', error);
    return null;
  }

  return data ? mapSermon(data) : null;
}

/**
 * Delete a sermon (admin only)
 */
export async function deleteSermon(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('sermons')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting sermon:', error);
    return false;
  }

  return true;
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Map database record to Sermon interface
 */
function mapSermon(data: Record<string, unknown>): Sermon {
  return {
    id: String(data.id),
    title: String(data.title),
    description: data.description ? String(data.description) : undefined,
    speaker: data.speaker ? String(data.speaker) : undefined,
    sermonDate: String(data.sermon_date),
    youtubeVideoId: String(data.youtube_video_id),
    youtubeType: (data.youtube_type as 'video') || 'video',
    status: (data.status as 'draft' | 'published') || 'draft',
    createdAt: data.created_at ? String(data.created_at) : undefined,
    updatedAt: data.updated_at ? String(data.updated_at) : undefined
  };
}

/**
 * Get count of all sermons (for admin dashboard)
 */
export async function getAllSermonsCount(): Promise<number> {
  const { count, error } = await supabase
    .from('sermons')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('[Sermons] Error counting:', error);
    return 0;
  }

  return count || 0;
}
