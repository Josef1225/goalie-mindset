
import { supabase } from '@/lib/supabase';
import { Habit } from '@/types/types';
import { mapDbHabitToAppHabit } from './utils/habitMappers';

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
