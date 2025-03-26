
import { supabase } from '@/lib/supabase';
import { Habit } from '@/types/types';
import { getTodayDate } from '@/utils/habitUtils';
import { v4 as uuid } from 'uuid';
import { updateHabit } from './habitMutationService';

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
