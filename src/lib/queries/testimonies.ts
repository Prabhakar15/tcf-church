import type { Testimony, TestimonyForm } from '../../types';
import { supabase } from '../supabase';

// ============================================================================
// PUBLIC QUERIES
// ============================================================================

/**
 * Get all published testimonies (public)
 * Returns testimonies in display order, most recent first within same order
 */
export async function getPublishedTestimonies(): Promise<Testimony[]> {
  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published testimonies:', error);
    throw new Error('Failed to fetch testimonies');
  }

  return (data || []).map(mapTestimony);
}

/**
 * Get a single published testimony by ID (public)
 */
export async function getPublishedTestimonyById(id: string): Promise<Testimony | null> {
  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Row not found or not published
      return null;
    }
    console.error('Error fetching testimony:', error);
    throw new Error('Failed to fetch testimony');
  }

  return data ? mapTestimony(data) : null;
}

/**
 * Submit a new testimony (public)
 * Always creates as draft status - moderation required
 */
export async function submitTestimony(form: TestimonyForm): Promise<Testimony | null> {
  // Validation
  if (!form.title || !form.title.trim()) {
    throw new Error('Title is required');
  }

  if (!form.content || !form.content.trim()) {
    throw new Error('Your testimony is required');
  }

  if (!form.submittedName || !form.submittedName.trim()) {
    throw new Error('Name is required');
  }

  if (!['FULL_NAME', 'FIRST_NAME_ONLY', 'ANONYMOUS'].includes(form.displayPreference)) {
    throw new Error('Invalid display preference');
  }

  // Enforce reasonable maximum lengths
  if (form.title.length > 255) {
    throw new Error('Title is too long');
  }

  if (form.content.length > 10000) {
    throw new Error('Testimony is too long');
  }

  if (form.submittedName.length > 255) {
    throw new Error('Name is too long');
  }

  // Validate branch_id if provided
  if (form.branchId) {
    // Verify branch exists
    const { data: branch, error: branchError } = await supabase
      .from('branches')
      .select('id')
      .eq('id', form.branchId)
      .single();

    if (branchError || !branch) {
      throw new Error('Invalid branch');
    }
  }

  // Insert testimony - status is always 'draft', never set by public
  const { data, error } = await supabase
    .from('testimonies')
    .insert({
      title: form.title.trim(),
      content: form.content.trim(),
      submitted_name: form.submittedName.trim(),
      display_preference: form.displayPreference,
      branch_id: form.branchId || null,
      status: 'draft',
      display_order: 0
    })
    .select()
    .single();

  if (error) {
    console.error('Error submitting testimony:', error);
    throw new Error('Unable to submit your testimony. Please try again.');
  }

  return data ? mapTestimony(data) : null;
}

// ============================================================================
// ADMIN QUERIES
// ============================================================================

/**
 * Get all testimonies (admin only)
 */
export async function getAllTestimonies(): Promise<Testimony[]> {
  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonies:', error);
    throw new Error('Failed to fetch testimonies');
  }

  return (data || []).map(mapTestimony);
}

/**
 * Get testimonies by status (admin only)
 */
export async function getTestimoniesByStatus(
  status: 'draft' | 'published' | 'rejected'
): Promise<Testimony[]> {
  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonies by status:', error);
    throw new Error('Failed to fetch testimonies');
  }

  return (data || []).map(mapTestimony);
}

/**
 * Get a single testimony by ID (admin only)
 */
export async function getTestimonyById(id: string): Promise<Testimony | null> {
  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Row not found
      return null;
    }
    console.error('Error fetching testimony:', error);
    throw new Error('Failed to fetch testimony');
  }

  return data ? mapTestimony(data) : null;
}

/**
 * Create a testimony (admin only)
 */
export async function createTestimony(
  testimony: Omit<Testimony, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Testimony | null> {
  // Validation
  if (!testimony.title || !testimony.title.trim()) {
    throw new Error('Title is required');
  }

  if (!testimony.content || !testimony.content.trim()) {
    throw new Error('Content is required');
  }

  if (!testimony.submittedName || !testimony.submittedName.trim()) {
    throw new Error('Name is required');
  }

  if (!['FULL_NAME', 'FIRST_NAME_ONLY', 'ANONYMOUS'].includes(testimony.displayPreference)) {
    throw new Error('Invalid display preference');
  }

  if (!['draft', 'published', 'rejected'].includes(testimony.status)) {
    throw new Error('Invalid status');
  }

  const { data, error } = await supabase
    .from('testimonies')
    .insert({
      title: testimony.title.trim(),
      content: testimony.content.trim(),
      submitted_name: testimony.submittedName.trim(),
      display_preference: testimony.displayPreference,
      branch_id: testimony.branchId || null,
      status: testimony.status,
      display_order: testimony.displayOrder || 0,
      published_at: testimony.status === 'published' ? new Date().toISOString() : null
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating testimony:', error);
    throw new Error('Failed to create testimony');
  }

  return data ? mapTestimony(data) : null;
}

/**
 * Update a testimony (admin only)
 */
export async function updateTestimony(
  id: string,
  updates: Partial<Omit<Testimony, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Testimony | null> {
  const updateData: Record<string, any> = {};

  if (updates.title !== undefined) updateData.title = updates.title.trim();
  if (updates.content !== undefined) updateData.content = updates.content.trim();
  if (updates.submittedName !== undefined) updateData.submitted_name = updates.submittedName.trim();
  if (updates.displayPreference !== undefined) updateData.display_preference = updates.displayPreference;
  if (updates.branchId !== undefined) updateData.branch_id = updates.branchId || null;
  if (updates.displayOrder !== undefined) updateData.display_order = updates.displayOrder;

  // Handle status changes
  if (updates.status !== undefined) {
    updateData.status = updates.status;

    // When publishing, set published_at if not already set
    if (updates.status === 'published' && !updates.publishedAt) {
      updateData.published_at = new Date().toISOString();
    }
  }

  if (updates.publishedAt !== undefined) {
    updateData.published_at = updates.publishedAt;
  }

  const { data, error } = await supabase
    .from('testimonies')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating testimony:', error);
    throw new Error('Failed to update testimony');
  }

  return data ? mapTestimony(data) : null;
}

/**
 * Delete a testimony (admin only)
 */
export async function deleteTestimony(id: string): Promise<boolean> {
  const { error } = await supabase.from('testimonies').delete().eq('id', id);

  if (error) {
    console.error('Error deleting testimony:', error);
    throw new Error('Failed to delete testimony');
  }

  return true;
}

/**
 * Publish a testimony (admin convenience function)
 */
export async function publishTestimony(id: string): Promise<Testimony | null> {
  return updateTestimony(id, {
    status: 'published',
    publishedAt: new Date().toISOString()
  } as Partial<Testimony>);
}

/**
 * Reject a testimony (admin convenience function)
 */
export async function rejectTestimony(id: string): Promise<Testimony | null> {
  return updateTestimony(id, {
    status: 'rejected'
  } as Partial<Testimony>);
}

// ============================================================================
// ADMIN STATISTICS
// ============================================================================

/**
 * Get count of all testimonies (admin)
 */
export async function getAllTestimoniesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('testimonies')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error counting testimonies:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Get count of draft testimonies (admin)
 */
export async function getDraftTestimoniesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('testimonies')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft');

  if (error) {
    console.error('Error counting draft testimonies:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Get count of published testimonies (public)
 */
export async function getPublishedTestimoniesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('testimonies')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  if (error) {
    console.error('Error counting published testimonies:', error);
    return 0;
  }

  return count || 0;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Map database record to Testimony interface
 * Converts snake_case column names to camelCase TypeScript properties
 */
function mapTestimony(data: Record<string, unknown>): Testimony {
  return {
    id: String(data.id),
    title: String(data.title),
    content: String(data.content),
    submittedName: String(data.submitted_name),
    displayPreference: (data.display_preference as 'FULL_NAME' | 'FIRST_NAME_ONLY' | 'ANONYMOUS') || 'FIRST_NAME_ONLY',
    branchId: data.branch_id ? String(data.branch_id) : undefined,
    status: (data.status as 'draft' | 'published' | 'rejected') || 'draft',
    displayOrder: Number(data.display_order) || 0,
    publishedAt: data.published_at ? String(data.published_at) : undefined,
    createdAt: String(data.created_at),
    updatedAt: String(data.updated_at)
  };
}
