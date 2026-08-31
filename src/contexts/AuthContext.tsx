import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AdminProfile } from '../types';
import { onAuthStateChange, getCurrentAdmin, getSession, signOut } from '../lib/auth';

interface AuthContextType {
  admin: AdminProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Listen to auth changes
    const { data: { subscription } } = onAuthStateChange(async (user) => {
      if (mounted) {
        setAdmin(user);
        setLoading(false);
      }
    });

    // Check initial session
    const checkInitialSession = async () => {
      const session = await getSession();
      if (session && mounted) {
        const currentAdmin = await getCurrentAdmin();
        setAdmin(currentAdmin);
      }
      if (mounted) {
        setLoading(false);
      }
    };

    checkInitialSession();

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
