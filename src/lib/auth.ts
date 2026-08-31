import { supabase } from './supabase';
import type { AdminProfile } from '../types';

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<{ user: AdminProfile | null; error: string | null }> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return { user: null, error: authError.message };
    }

    if (!authData.user) {
      return { user: null, error: 'No user returned' };
    }

    // Check admin profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profileData) {
      // User exists in auth but not in profiles (not an admin)
      await supabase.auth.signOut();
      return { user: null, error: 'Not authorized as admin' };
    }

    const admin: AdminProfile = {
      id: profileData.id,
      email: profileData.email,
      role: profileData.role,
      fullName: profileData.full_name,
      createdAt: profileData.created_at,
      updatedAt: profileData.updated_at
    };

    return { user: admin, error: null };
  } catch (err) {
    return { user: null, error: String(err) };
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

/**
 * Get current session
 */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Get current admin profile
 */
export async function getCurrentAdmin(): Promise<AdminProfile | null> {
  try {
    const session = await getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      email: data.email,
      role: data.role,
      fullName: data.full_name,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch {
    return null;
  }
}

/**
 * Listen to auth changes
 */
export function onAuthStateChange(callback: (user: AdminProfile | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session && event === 'SIGNED_IN') {
      const admin = await getCurrentAdmin();
      callback(admin);
    } else {
      callback(null);
    }
  });
}
