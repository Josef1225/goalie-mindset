
import { createClient } from '@supabase/supabase-js';

// Use default development values if environment variables are not set
// Replace these with your actual Supabase values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// For production, we still want to warn about missing environment variables
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are missing. Using development values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
