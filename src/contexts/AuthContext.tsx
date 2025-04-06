import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error("Error getting session:", error);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed: ", _event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error);
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      
      // Prepare metadata with name if provided
      const metadata = name ? { name } : undefined;
      
      // Sign up the user with email confirmation disabled
      const { error: signUpError, data: signUpData } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: metadata,
          emailRedirectTo: window.location.origin + '/dashboard',
        }
      });
      
      if (signUpError) {
        console.error("Sign up error:", signUpError);
        toast({
          title: "Error signing up",
          description: signUpError.message,
          variant: "destructive",
        });
        throw signUpError;
      }
      
      // If signup was successful but email confirmation is required
      if (signUpData?.user && !signUpData.session) {
        toast({
          title: "Email confirmation required",
          description: "Please check your email to confirm your account.",
        });
        return signUpData;
      }
      
      // If signup was successful and session was created (email confirmation disabled)
      if (signUpData?.session) {
        setSession(signUpData.session);
        setUser(signUpData.session.user);
        
        toast({
          title: "Success",
          description: "Signed up successfully!",
        });
      }
      
      return signUpData;
    } catch (error) {
      console.error('Error in sign up process:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // Redirect to home page after successful sign out
      navigate('/');
      
      toast({
        title: "Success",
        description: "Signed out successfully!",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast, navigate]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/auth/update-password',
      });
      
      if (error) {
        toast({
          title: "Error resetting password",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Check your email for the password reset link!",
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updatePassword = useCallback(async (password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        toast({
          title: "Error updating password",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Your password has been updated!",
      });
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        user, 
        loading, 
        signIn, 
        signUp, 
        signOut, 
        resetPassword,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
