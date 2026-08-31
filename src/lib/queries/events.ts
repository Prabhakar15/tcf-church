import type { Event } from '../../types';
import { supabase } from '../supabase';

/**
 * Get upcoming published events
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .gte('event_date', today)
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }

  return data ? data.map(mapEvent) : [];
}

/**
 * Get all published events
 */
export async function getPublishedEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching published events:', error);
    return [];
  }

  return data ? data.map(mapEvent) : [];
}

/**
 * Get a single event by ID (public view)
 */
export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return data ? mapEvent(data) : null;
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

/**
 * Get all events (admin only)
 */
export async function getAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching all events:', error);
    return [];
  }

  return data ? data.map(mapEvent) : [];
}

/**
 * Create a new event (admin only)
 */
export async function createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .insert({
      title: event.title,
      description: event.description || null,
      event_date: event.eventDate,
      start_time: event.startTime || null,
      end_time: event.endTime || null,
      location: event.location || null,
      address: event.address || null,
      image_url: event.imageUrl || null,
      status: event.status || 'draft'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    return null;
  }

  return data ? mapEvent(data) : null;
}

/**
 * Update an event (admin only)
 */
export async function updateEvent(id: string, updates: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Event | null> {
  const updateData: Record<string, unknown> = {};

  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.eventDate !== undefined) updateData.event_date = updates.eventDate;
  if (updates.startTime !== undefined) updateData.start_time = updates.startTime;
  if (updates.endTime !== undefined) updateData.end_time = updates.endTime;
  if (updates.location !== undefined) updateData.location = updates.location;
  if (updates.address !== undefined) updateData.address = updates.address;
  if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl;
  if (updates.status !== undefined) updateData.status = updates.status;

  const { data, error } = await supabase
    .from('events')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    return null;
  }

  return data ? mapEvent(data) : null;
}

/**
 * Delete an event (admin only)
 */
export async function deleteEvent(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    return false;
  }

  return true;
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Map database record to Event interface
 */
function mapEvent(data: Record<string, unknown>): Event {
  return {
    id: String(data.id),
    title: String(data.title),
    description: data.description ? String(data.description) : undefined,
    eventDate: String(data.event_date),
    startTime: data.start_time ? String(data.start_time) : undefined,
    endTime: data.end_time ? String(data.end_time) : undefined,
    location: data.location ? String(data.location) : undefined,
    address: data.address ? String(data.address) : undefined,
    imageUrl: data.image_url ? String(data.image_url) : undefined,
    status: (data.status as 'draft' | 'published' | 'cancelled') || 'draft',
    createdAt: data.created_at ? String(data.created_at) : undefined,
    updatedAt: data.updated_at ? String(data.updated_at) : undefined
  };
}
