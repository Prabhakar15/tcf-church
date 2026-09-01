import type { RecurringService } from '../../types';
import { supabase } from '../supabase';

/**
 * Get all published services, ordered by display order
 */
export async function getPublishedServices(): Promise<RecurringService[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching published services:', error);
    return [];
  }

  return data ? data.map(mapService) : [];
}

/**
 * Get services by category (public)
 */
export async function getPublishedServicesByCategory(category: string): Promise<RecurringService[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching services by category:', error);
    return [];
  }

  return data ? data.map(mapService) : [];
}

/**
 * Get a single service by ID (public view)
 */
export async function getServiceById(id: string): Promise<RecurringService | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    return null;
  }

  return data ? mapService(data) : null;
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

/**
 * Get all services (admin only)
 */
export async function getAllServices(): Promise<RecurringService[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching all services:', error);
    return [];
  }

  return data ? data.map(mapService) : [];
}

/**
 * Create a new service (admin only)
 */
export async function createService(service: Omit<RecurringService, 'id' | 'createdAt' | 'updatedAt'>): Promise<RecurringService | null> {
  const { data, error } = await supabase
    .from('services')
    .insert({
      title: service.title,
      category: service.category,
      description: service.description || null,
      day_of_week: service.dayOfWeek,
      start_time: service.startTime,
      end_time: service.endTime || null,
      timezone: service.timezone,
      location: service.location || null,
      display_order: service.displayOrder,
      status: service.status || 'published'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating service:', error);
    return null;
  }

  return data ? mapService(data) : null;
}

/**
 * Update a service (admin only)
 */
export async function updateService(id: string, updates: Partial<Omit<RecurringService, 'id' | 'createdAt' | 'updatedAt'>>): Promise<RecurringService | null> {
  const updateData: Record<string, unknown> = {};

  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.category !== undefined) updateData.category = updates.category;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.dayOfWeek !== undefined) updateData.day_of_week = updates.dayOfWeek;
  if (updates.startTime !== undefined) updateData.start_time = updates.startTime;
  if (updates.endTime !== undefined) updateData.end_time = updates.endTime;
  if (updates.timezone !== undefined) updateData.timezone = updates.timezone;
  if (updates.location !== undefined) updateData.location = updates.location;
  if (updates.displayOrder !== undefined) updateData.display_order = updates.displayOrder;
  if (updates.status !== undefined) updateData.status = updates.status;

  const { data, error } = await supabase
    .from('services')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating service:', error);
    return null;
  }

  return data ? mapService(data) : null;
}

/**
 * Delete a service (admin only)
 */
export async function deleteService(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    return false;
  }

  return true;
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Map database record to RecurringService interface
 */
function mapService(data: Record<string, unknown>): RecurringService {
  return {
    id: String(data.id),
    title: String(data.title),
    category: String(data.category),
    description: data.description ? String(data.description) : undefined,
    dayOfWeek: (data.day_of_week as RecurringService['dayOfWeek']) || 'Monday',
    startTime: String(data.start_time),
    endTime: data.end_time ? String(data.end_time) : undefined,
    timezone: String(data.timezone || 'Asia/Singapore'),
    location: data.location ? String(data.location) : undefined,
    displayOrder: Number(data.display_order) || 0,
    status: (data.status as 'draft' | 'published') || 'published',
    createdAt: data.created_at ? String(data.created_at) : undefined,
    updatedAt: data.updated_at ? String(data.updated_at) : undefined
  };
}
