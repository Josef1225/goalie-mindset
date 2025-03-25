
import { supabase } from '@/lib/supabase';
import { Habit } from '@/types/types';
import { getTodayDate } from '@/utils/habitUtils';
import { v4 as uuid } from 'uuid';

// Convert from API format to application format
const mapDbHabitToAppHabit = (dbHabit: any): Habit => {
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
const mapAppHabitToDbHabit = (habit: Habit, userId: string) => {
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

export const fetchHabits = async (userId: string): Promise<Habit[]> => {
  // Fetch habits
  const { data: habitsData, error: habitsError } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (habitsError) {
    console.error('Error fetching habits:', habitsError);
    throw habitsError;
  }
  
  if (!habitsData || habitsData.length === 0) {
    return [];
  }
  
  // Map to application format
  const habits: Habit[] = habitsData.map(mapDbHabitToAppHabit);
  
  // Fetch completed dates for all habits
  const { data: completionsData, error: completionsError } = await supabase
    .from('completed_habits')
    .select('*')
    .eq('user_id', userId)
    .in('habit_id', habits.map(h => h.id));
  
  if (completionsError) {
    console.error('Error fetching completions:', completionsError);
    throw completionsError;
  }
  
  // Merge completed dates with habits
  if (completionsData && completionsData.length > 0) {
    for (const habit of habits) {
      habit.completedDates = completionsData
        .filter(c => c.habit_id === habit.id)
        .map(c => c.completed_date);
    }
  }
  
  return habits;
};

export const createHabit = async (habit: Habit, userId: string): Promise<Habit> => {
  const newHabit = {
    ...mapAppHabitToDbHabit(habit, userId),
    id: uuid(),
    created_at: new Date().toISOString()
  };
  
  const { error } = await supabase
    .from('habits')
    .insert(newHabit);
  
  if (error) {
    console.error('Error creating habit:', error);
    throw error;
  }
  
  return {
    ...habit,
    id: newHabit.id,
    createdAt: newHabit.created_at
  };
};

export const updateHabit = async (habit: Habit, userId: string): Promise<Habit> => {
  const { error } = await supabase
    .from('habits')
    .update(mapAppHabitToDbHabit(habit, userId))
    .eq('id', habit.id)
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error updating habit:', error);
    throw error;
  }
  
  return habit;
};

export const toggleHabitCompletion = async (habit: Habit, userId: string): Promise<Habit> => {
  const today = getTodayDate();
  const isCompleted = habit.completedDates.includes(today);
  
  let updatedHabit = { ...habit };
  
  if (isCompleted) {
    // Remove completion
    const { error } = await supabase
      .from('completed_habits')
      .delete()
      .eq('habit_id', habit.id)
      .eq('user_id', userId)
      .eq('completed_date', today);
    
    if (error) {
      console.error('Error removing completion:', error);
      throw error;
    }
    
    updatedHabit.completedDates = habit.completedDates.filter(date => date !== today);
    updatedHabit.streak = Math.max(0, habit.streak - 1);
    updatedHabit.totalCompletions = Math.max(0, habit.totalCompletions - 1);
    
    // Update habit stats
    await updateHabit(updatedHabit, userId);
  } else {
    // Add completion
    const { error } = await supabase
      .from('completed_habits')
      .insert({
        id: uuid(),
        habit_id: habit.id,
        user_id: userId,
        completed_date: today,
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error adding completion:', error);
      throw error;
    }
    
    updatedHabit.completedDates = [...habit.completedDates, today];
    updatedHabit.streak = habit.streak + 1;
    updatedHabit.totalCompletions = habit.totalCompletions + 1;
    
    // Update habit stats
    await updateHabit(updatedHabit, userId);
  }
  
  return updatedHabit;
};

export const deleteHabit = async (habitId: string, userId: string): Promise<void> => {
  // First delete completions
  const { error: completionsError } = await supabase
    .from('completed_habits')
    .delete()
    .eq('habit_id', habitId)
    .eq('user_id', userId);
  
  if (completionsError) {
    console.error('Error deleting completions:', completionsError);
    throw completionsError;
  }
  
  // Then delete the habit
  const { error: habitError } = await supabase
    .from('habits')
    .delete()
    .eq('id', habitId)
    .eq('user_id', userId);
  
  if (habitError) {
    console.error('Error deleting habit:', habitError);
    throw habitError;
  }
};
