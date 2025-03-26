
import { Habit } from '@/types/types';

// Convert from API format to application format
export const mapDbHabitToAppHabit = (dbHabit: any): Habit => {
  return {
    id: dbHabit.id,
    name: dbHabit.name,
    description: dbHabit.description || undefined,
    icon: dbHabit.icon || undefined,
    color: dbHabit.color || undefined,
    frequency: dbHabit.frequency,
    timeOfDay: dbHabit.time_of_day || undefined,
    reminderTime: dbHabit.reminder_time || undefined,
    startDate: dbHabit.start_date,
    completedDates: [], // Will be populated separately
    streak: dbHabit.streak || 0,
    totalCompletions: dbHabit.total_completions || 0,
    active: dbHabit.active !== false, // Default to true
    createdAt: dbHabit.created_at || new Date().toISOString()
  };
};

// Convert from application format to API format
export const mapAppHabitToDbHabit = (habit: Habit, userId: string) => {
  return {
    id: habit.id,
    user_id: userId,
    name: habit.name,
    description: habit.description || null,
    icon: habit.icon || null,
    color: habit.color || null,
    frequency: habit.frequency,
    time_of_day: habit.timeOfDay || null,
    reminder_time: habit.reminderTime || null,
    start_date: habit.startDate,
    streak: habit.streak,
    total_completions: habit.totalCompletions,
    active: habit.active
  };
};
