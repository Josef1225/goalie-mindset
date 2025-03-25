
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key must be provided');
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
