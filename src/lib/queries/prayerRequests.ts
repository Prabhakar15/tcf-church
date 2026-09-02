import type { PrayerRequest, PrayerRequestForm } from '../../types';
import { supabase } from '../supabase';

/**
 * Submit a new prayer request (public)
 */
export async function submitPrayerRequest(form: PrayerRequestForm): Promise<PrayerRequest | null> {
  // Validation
  if (!form.name || !form.name.trim()) {
    throw new Error('Name is required');
  }

  if (!form.email || !form.email.trim()) {
    throw new Error('Email is required');
  }

  if (!isValidEmail(form.email)) {
    throw new Error('Please enter a valid email address');
  }

  if (!form.prayerRequest || !form.prayerRequest.trim()) {
    throw new Error('Prayer request is required');
  }

  // Enforce reasonable maximum lengths
  if (form.name.length > 255) {
    throw new Error('Name is too long');
  }

  if (form.prayerRequest.length > 5000) {
    throw new Error('Prayer request is too long');
  }

  const { data, error } = await supabase
    .from('prayer_requests')
    .insert({
      name: form.name.trim(),
      email: form.email.trim(),
      prayer_request: form.prayerRequest.trim(),
      contact_requested: form.contactRequested,
      status: 'new'
    })
    .select()
    .single();

  if (error) {
    console.error('Error submitting prayer request:', error);
    throw new Error('Unable to submit prayer request. Please try again.');
  }

  return data ? mapPrayerRequest(data) : null;
}

// ============================================================================
// ADMIN FUNCTIONS
// ============================================================================

/**
 * Get all prayer requests (admin only)
 */
export async function getPrayerRequests(): Promise<PrayerRequest[]> {
  const { data, error } = await supabase
    .from('prayer_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching prayer requests:', error);
    return [];
  }

  return data ? data.map(mapPrayerRequest) : [];
}

/**
 * Get prayer requests by status (admin only)
 */
export async function getPrayerRequestsByStatus(status: 'new' | 'read' | 'prayed' | 'archived'): Promise<PrayerRequest[]> {
  const { data, error } = await supabase
    .from('prayer_requests')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching prayer requests by status:', error);
    return [];
  }

  return data ? data.map(mapPrayerRequest) : [];
}

/**
 * Get a single prayer request by ID (admin only)
 */
export async function getPrayerRequestById(id: string): Promise<PrayerRequest | null> {
  const { data, error } = await supabase
    .from('prayer_requests')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching prayer request:', error);
    return null;
  }

  return data ? mapPrayerRequest(data) : null;
}

/**
 * Update prayer request status (admin only)
 */
export async function updatePrayerRequestStatus(id: string, status: 'new' | 'read' | 'prayed' | 'archived'): Promise<PrayerRequest | null> {
  const { data, error } = await supabase
    .from('prayer_requests')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating prayer request status:', error);
    return null;
  }

  return data ? mapPrayerRequest(data) : null;
}

/**
 * Update prayer request notes (admin only)
 */
export async function updatePrayerRequestNotes(id: string, notes: string): Promise<PrayerRequest | null> {
  const { data, error } = await supabase
    .from('prayer_requests')
    .update({ notes: notes || null })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating prayer request notes:', error);
    return null;
  }

  return data ? mapPrayerRequest(data) : null;
}

/**
 * Delete a prayer request (admin only)
 */
export async function deletePrayerRequest(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('prayer_requests')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting prayer request:', error);
    return false;
  }

  return true;
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Map database record to PrayerRequest interface
 */
function mapPrayerRequest(data: Record<string, unknown>): PrayerRequest {
  return {
    id: String(data.id),
    name: String(data.name),
    email: String(data.email),
    prayerRequest: String(data.prayer_request),
    contactRequested: Boolean(data.contact_requested),
    status: (data.status as 'new' | 'read' | 'prayed' | 'archived') || 'new',
    notes: data.notes ? String(data.notes) : undefined,
    createdAt: String(data.created_at),
    updatedAt: String(data.updated_at)
  };
}

/**
 * Get count of all prayer requests (for admin dashboard)
 */
export async function getAllPrayerRequestsCount(): Promise<number> {
  const { count, error } = await supabase
    .from('prayer_requests')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('[PrayerRequests] Error counting:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Get count of new prayer requests
 */
export async function getNewPrayerRequestsCount(): Promise<number> {
  const { count, error } = await supabase
    .from('prayer_requests')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  if (error) {
    console.error('[PrayerRequests] Error counting new:', error);
    return 0;
  }

  return count || 0;
}
