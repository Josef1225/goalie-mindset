
import { supabase } from '@/lib/supabase';
import { Habit } from '@/types/types';
import { v4 as uuid } from 'uuid';
import { mapAppHabitToDbHabit } from './utils/habitMappers';

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
