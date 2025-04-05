
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
  timeOfDay?: {
    morning?: boolean;
    afternoon?: boolean;
    evening?: boolean;
  };
  reminderTime?: string; // HH:MM format
  startDate: string; // YYYY-MM-DD format
  completedDates: string[]; // Array of YYYY-MM-DD strings
  streak: number;
  streakGoal: number; // New field for tracking streak goal
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
  streakGoal: number; // Added streakGoal property
  streakProgress: number; // Added streakProgress property
  completionRate: number;
  totalCompletions: number;
  bestStreak: number;
}
