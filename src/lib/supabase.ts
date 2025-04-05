import { createClient } from '@supabase/supabase-js';

// Use the provided Supabase URL and API key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ergbuysiblmxkhvzarnl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZ2J1eXNpYmxteGtodnphcm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTM3NzIsImV4cCI6MjA1ODQ2OTc3Mn0.WnrIaBOPzzXQfrmltlhyD8d9xjfKc17C3jSLlF-BibY';

// For production, we still want to warn about missing environment variables
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are missing. Using hardcoded values.');
}

// Get the current hostname to use for redirects
const getURL = () => {
  // Check if we're running in the browser
  if (typeof window !== 'undefined') {
    const url = window.location.origin;
    return url;
  }
  // Default fallback URL (should not be localhost in production)
  return 'https://b84e1a1f-8d50-4ff9-b39e-781b5ffeee93.lovableproject.com';
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  }
});

// Types for database
export type Database = {
  public: {
    Tables: {
      habits: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          icon: string | null;
          color: string | null;
          frequency: {
            type: 'daily' | 'weekly' | 'monthly' | 'custom';
            days?: number[]; 
            dates?: number[];
            customDays?: number;
          };
          time_of_day: {
            morning?: boolean;
            afternoon?: boolean;
            evening?: boolean;
          } | null;
          reminder_time: string | null;
          start_date: string;
          streak: number;
          streak_goal: number; // Add the streak_goal field to the database type
          total_completions: number;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          icon?: string | null;
          color?: string | null;
          frequency: {
            type: 'daily' | 'weekly' | 'monthly' | 'custom';
            days?: number[]; 
            dates?: number[];
            customDays?: number;
          };
          time_of_day?: {
            morning?: boolean;
            afternoon?: boolean;
            evening?: boolean;
          } | null;
          reminder_time?: string | null;
          start_date: string;
          streak?: number;
          streak_goal?: number; // Add the streak_goal field to Insert type
          total_completions?: number;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          icon?: string | null;
          color?: string | null;
          frequency?: {
            type: 'daily' | 'weekly' | 'monthly' | 'custom';
            days?: number[]; 
            dates?: number[];
            customDays?: number;
          };
          time_of_day?: {
            morning?: boolean;
            afternoon?: boolean;
            evening?: boolean;
          } | null;
          reminder_time?: string | null;
          start_date?: string;
          streak?: number;
          streak_goal?: number; // Add the streak_goal field to Update type
          total_completions?: number;
          active?: boolean;
        };
      };
      completed_habits: {
        Row: {
          id: string;
          habit_id: string;
          user_id: string;
          completed_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          habit_id: string;
          user_id: string;
          completed_date: string;
          created_at?: string;
        };
        Update: {
          habit_id?: string;
          user_id?: string;
          completed_date?: string;
        };
      };
    };
  };
};
