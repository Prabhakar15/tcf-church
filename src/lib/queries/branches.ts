import { supabase } from '../supabase';
import type { Branch } from '../../types';

// ============================================================================
// Public Queries
// ============================================================================

export async function getPublishedBranches(): Promise<Branch[]> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('status', 'published')
    .order('region', { ascending: true })
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching published branches:', error);
    throw new Error('Failed to fetch branches');
  }

  return (data || []).map(convertBranchRecord);
}

export async function getPublishedBranchesByRegion(region: 'SINGAPORE' | 'INDIA'): Promise<Branch[]> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('status', 'published')
    .eq('region', region)
    .order('display_order', { ascending: true });

  if (error) {
    console.error(`Error fetching branches for region ${region}:`, error);
    throw new Error('Failed to fetch branches');
  }

  return (data || []).map(convertBranchRecord);
}

// ============================================================================
// Admin Queries
// ============================================================================

export async function getAllBranches(): Promise<Branch[]> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .order('region', { ascending: true })
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching all branches:', error);
    throw new Error('Failed to fetch branches');
  }

  return (data || []).map(convertBranchRecord);
}

export async function createBranch(
  branch: Omit<Branch, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Branch> {
  const { data, error } = await supabase
    .from('branches')
    .insert([
      {
        region: branch.region,
        branch_name: branch.branchName,
        location: branch.location || null,
        address: branch.address || null,
        map_url: branch.mapUrl || null,
        display_order: branch.displayOrder,
        status: branch.status,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating branch:', error);
    throw new Error('Failed to create branch');
  }

  return convertBranchRecord(data);
}

export async function updateBranch(
  id: string,
  branch: Partial<Omit<Branch, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Branch> {
  const updateData: Record<string, any> = {};

  if (branch.region !== undefined) updateData.region = branch.region;
  if (branch.branchName !== undefined) updateData.branch_name = branch.branchName;
  if (branch.location !== undefined) updateData.location = branch.location || null;
  if (branch.address !== undefined) updateData.address = branch.address || null;
  if (branch.mapUrl !== undefined) updateData.map_url = branch.mapUrl || null;
  if (branch.displayOrder !== undefined) updateData.display_order = branch.displayOrder;
  if (branch.status !== undefined) updateData.status = branch.status;

  const { data, error } = await supabase
    .from('branches')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating branch:', error);
    throw new Error('Failed to update branch');
  }

  return convertBranchRecord(data);
}

export async function deleteBranch(id: string): Promise<void> {
  const { error } = await supabase.from('branches').delete().eq('id', id);

  if (error) {
    console.error('Error deleting branch:', error);
    throw new Error('Failed to delete branch');
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function convertBranchRecord(record: any): Branch {
  return {
    id: record.id,
    region: record.region,
    branchName: record.branch_name,
    location: record.location,
    address: record.address,
    mapUrl: record.map_url,
    displayOrder: record.display_order,
    status: record.status,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}
