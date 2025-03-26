import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import { AppUser } from '@/types/appUser';

type AuthContextType = {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: AppUser | null) => void;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null;
    data: { user: AppUser | null; session: Session | null } | null;
  }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null;
    data: { user: AppUser | null; session: Session | null } | null;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);

      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id);
        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }
        setUser(data[0] ?? null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id);
        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }
        setUser(data[0] ?? null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data.user) {
      await supabase
        .from('users')
        .insert([{ id: data.user.id, email: data.user.email }]);

      return {
        data: {
          user: { id: data.user.id, email: data.user.email } as AppUser,
          session: data.session,
        },
        error,
      };
    }

    return { data: null, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id);

      return {
        data: {
          user: userData?.[0] as AppUser,
          session: data.session,
        },
        error,
      };
    }

    return { data: null, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  };

  const value = {
    user,
    session,
    loading,
    setUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthはAuthProvider内で使用する必要があります');
  }
  return context;
}
