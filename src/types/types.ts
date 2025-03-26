
export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  frequency: {
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    days?: number[]; // 0-6 for weekly (Sunday-Saturday)
    dates?: number[]; // 1-31 for monthly
    customDays?: number; // For custom frequency (every X days)
  };
  timesPerDay?: number; // New field to track how many times per day
  timeOfDay?: {
    morning?: boolean;
    afternoon?: boolean;
    evening?: boolean;
  };
  reminderTime?: string; // HH:MM format
  startDate: string; // YYYY-MM-DD format
  completedDates: string[]; // Array of YYYY-MM-DD strings
  streak: number;
  totalCompletions: number;
  active: boolean;
  createdAt: string;
}

export interface DailyProgress {
  date: string;
  completed: number;
  total: number;
  percentage: number;
}

export interface HabitStats {
  habitId: string;
  habitName: string;
  streak: number;
  completionRate: number;
  totalCompletions: number;
  bestStreak: number;
}
