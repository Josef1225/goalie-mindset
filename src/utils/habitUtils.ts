import { Habit, DailyProgress, HabitStats } from '../types/types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Format date for display (e.g., "Monday, January 1")
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

// Check if habit should be completed today based on frequency
export const shouldCompleteToday = (habit: Habit): boolean => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0-6, where 0 is Sunday
  const dayOfMonth = today.getDate(); // 1-31

  switch (habit.frequency.type) {
    case 'daily':
      return true;
    case 'weekly':
      return habit.frequency.days?.includes(dayOfWeek) ?? false;
    case 'monthly':
      return habit.frequency.dates?.includes(dayOfMonth) ?? false;
    case 'custom':
      if (!habit.frequency.customDays || !habit.startDate) return false;
      
      const startDate = new Date(habit.startDate);
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays % habit.frequency.customDays === 0;
    default:
      return false;
  }
};

// Check if habit is completed for a specific date
export const isHabitCompletedOnDate = (habit: Habit, date: string): boolean => {
  return habit.completedDates.includes(date);
};

// Toggle habit completion for today
export const toggleHabitCompletion = (habit: Habit): Habit => {
  const todayDate = getTodayDate();
  let updatedCompletedDates = [...habit.completedDates];
  let updatedStreak = habit.streak;

  if (isHabitCompletedOnDate(habit, todayDate)) {
    // Remove today from completed dates
    updatedCompletedDates = updatedCompletedDates.filter(
      (date) => date !== todayDate
    );
    
    // Decrement streak only if it's greater than 0
    if (updatedStreak > 0) {
      updatedStreak -= 1;
    }
  } else {
    // Add today to completed dates
    updatedCompletedDates.push(todayDate);
    updatedStreak += 1;
  }

  return {
    ...habit,
    completedDates: updatedCompletedDates,
    streak: updatedStreak,
    totalCompletions: updatedCompletedDates.length,
  };
};

// Calculate daily progress
export const calculateDailyProgress = (
  habits: Habit[],
  date: string = getTodayDate()
): DailyProgress => {
  const relevantHabits = habits.filter(
    (habit) => habit.active && shouldCompleteToday(habit)
  );
  
  const completed = relevantHabits.filter((habit) =>
    isHabitCompletedOnDate(habit, date)
  ).length;
  
  const total = relevantHabits.length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return {
    date,
    completed,
    total,
    percentage,
  };
};

// Calculate habit statistics with progress towards streak goal
export const calculateHabitStats = (habit: Habit): HabitStats => {
  const totalDays = habit.active 
    ? Math.floor((new Date().getTime() - new Date(habit.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;
  
  // Only count days that match the habit frequency
  const requiredDays = totalDays; // This is simplified, ideally we'd filter by frequency
  
  const completionRate = requiredDays > 0 
    ? (habit.totalCompletions / requiredDays) * 100 
    : 0;
    
  // Calculate progress towards streak goal
  const streakProgress = habit.streakGoal > 0 
    ? (habit.streak / habit.streakGoal) * 100 
    : 0;

  return {
    habitId: habit.id,
    habitName: habit.name,
    streak: habit.streak,
    streakGoal: habit.streakGoal,
    streakProgress: Math.min(100, Math.round(streakProgress)), // Cap at 100%
    completionRate: Math.round(completionRate * 10) / 10, // Round to 1 decimal place
    totalCompletions: habit.totalCompletions,
    bestStreak: habit.streak, // This is simplified, ideally we'd track best streak separately
  };
};

// Get sample data for initial app state
export const getSampleHabits = (): Habit[] => {
  const today = getTodayDate();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  return [
    {
      id: generateId(),
      name: 'Drink Water',
      description: 'Drink 8 glasses of water daily',
      icon: 'droplet',
      color: '#3498db',
      frequency: { type: 'daily' },
      timeOfDay: { morning: true, afternoon: true, evening: true },
      startDate: '2023-01-01',
      completedDates: [yesterdayStr, today],
      streak: 2,
      streakGoal: 8, // Added streak goal
      totalCompletions: 2,
      active: true,
      createdAt: '2023-01-01',
    },
    {
      id: generateId(),
      name: 'Read',
      description: 'Read for 30 minutes',
      icon: 'book-open',
      color: '#9b59b6',
      frequency: { type: 'daily' },
      timeOfDay: { evening: true },
      startDate: '2023-01-01',
      completedDates: [yesterdayStr],
      streak: 1,
      streakGoal: 10, // Added streak goal
      totalCompletions: 1,
      active: true,
      createdAt: '2023-01-01',
    },
    {
      id: generateId(),
      name: 'Exercise',
      description: 'Work out for 30 minutes',
      icon: 'dumbbell',
      color: '#e74c3c',
      frequency: { type: 'weekly', days: [1, 3, 5] }, // Monday, Wednesday, Friday
      timeOfDay: { morning: true },
      startDate: '2023-01-01',
      completedDates: [],
      streak: 0,
      streakGoal: 5, // Added streak goal
      totalCompletions: 0,
      active: true,
      createdAt: '2023-01-01',
    },
  ];
};
