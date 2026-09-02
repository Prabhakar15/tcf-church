import type { RecurringService } from '../../types';
import { supabase } from '../supabase';

export interface ServiceQueryResult {
  data: RecurringService[];
  error: string | null;
  isLoading: boolean;
}

/**
 * Get all published services, ordered by display order
 * Better error handling for debugging
 */
export async function getPublishedServices(): Promise<RecurringService[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[Services] Error fetching published services:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    return [];
  }

  if (!data) {
    console.warn('[Services] No data returned from published services query');
    return [];
  }

  return data.map(mapService);
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
    console.error('[Services] Error fetching services by category:', { category, error });
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
    console.error('[Services] Error fetching service by ID:', { id, error });
    return null;
  }

  return data ? mapService(data) : null;
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

/**
 * Get all services (admin only) - including drafts
 */
export async function getAllServices(): Promise<RecurringService[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[Services] Error fetching all services for admin:', error);
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
      title: service.title.trim(),
      category: service.category,
      description: service.description?.trim() || null,
      day_of_week: service.dayOfWeek,
      start_time: service.startTime,
      end_time: service.endTime || null,
      timezone: service.timezone,
      location: service.location?.trim() || null,
      display_order: service.displayOrder,
      status: service.status || 'published',
      service_category: service.serviceCategory || null,
      region: service.region || null,
      fellowship_group: service.fellowshipGroup || null,
      branch_id: service.branchId || null
    })
    .select()
    .single();

  if (error) {
    console.error('[Services] Error creating service:', error);
    return null;
  }

  return data ? mapService(data) : null;
}

/**
 * Update a service (admin only)
 */
export async function updateService(id: string, updates: Partial<Omit<RecurringService, 'id' | 'createdAt' | 'updatedAt'>>): Promise<RecurringService | null> {
  const updateData: Record<string, unknown> = {};

  if (updates.title !== undefined) updateData.title = updates.title.trim();
  if (updates.category !== undefined) updateData.category = updates.category;
  if (updates.description !== undefined) updateData.description = updates.description?.trim() || null;
  if (updates.dayOfWeek !== undefined) updateData.day_of_week = updates.dayOfWeek;
  if (updates.startTime !== undefined) updateData.start_time = updates.startTime;
  if (updates.endTime !== undefined) updateData.end_time = updates.endTime;
  if (updates.timezone !== undefined) updateData.timezone = updates.timezone;
  if (updates.location !== undefined) updateData.location = updates.location?.trim() || null;
  if (updates.displayOrder !== undefined) updateData.display_order = updates.displayOrder;
  if (updates.status !== undefined) updateData.status = updates.status;
  if (updates.serviceCategory !== undefined) updateData.service_category = updates.serviceCategory;
  if (updates.region !== undefined) updateData.region = updates.region;
  if (updates.fellowshipGroup !== undefined) updateData.fellowship_group = updates.fellowshipGroup;
  if (updates.branchId !== undefined) updateData.branch_id = updates.branchId;

  const { data, error } = await supabase
    .from('services')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Services] Error updating service:', { id, error });
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
    console.error('[Services] Error deleting service:', { id, error });
    return false;
  }

  return true;
}

/**
 * Get count of published services (for dashboard)
 */
export async function getPublishedServicesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  if (error) {
    console.error('[Services] Error counting published services:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Get count of all services (for admin dashboard)
 */
export async function getAllServicesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('[Services] Error counting all services:', error);
    return 0;
  }

  return count || 0;
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
    serviceCategory: data.service_category ? String(data.service_category) as any : undefined,
    region: data.region ? String(data.region) as any : undefined,
    fellowshipGroup: data.fellowship_group ? String(data.fellowship_group) as any : undefined,
    branchId: data.branch_id ? String(data.branch_id) : undefined,
    createdAt: data.created_at ? String(data.created_at) : undefined,
    updatedAt: data.updated_at ? String(data.updated_at) : undefined
  };
}
