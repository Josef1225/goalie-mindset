
import { useState } from 'react';
import { Habit } from '@/types/types';

export function useAIProgressAnalysis() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getProgressAnalysis = async (habits: Habit[]) => {
    setLoading(true);
    setError(null);
    
    try {
      // Prepare the data about habits for analysis
      const habitsData = habits.map(habit => ({
        name: habit.name,
        streak: habit.streak,
        totalCompletions: habit.totalCompletions,
        completedDates: habit.completedDates,
        startDate: habit.startDate,
      }));
      
      // Instead of an external API, generate the analysis locally
      const analysisText = generateLocalAnalysis(habitsData);
      setAnalysis(analysisText);
    } catch (error) {
      console.error('Error generating analysis:', error);
      setError('Failed to generate progress analysis. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Local analysis generation function
  const generateLocalAnalysis = (habitsData: any[]) => {
    if (habitsData.length === 0) {
      return "You haven't created any habits yet. Start by adding some habits to track your progress!";
    }

    // Find the habit with the highest streak
    const topStreakHabit = [...habitsData].sort((a, b) => b.streak - a.streak)[0];
    
    // Find the habit with the most completions
    const topCompletionsHabit = [...habitsData].sort((a, b) => b.totalCompletions - a.totalCompletions)[0];
    
    // Calculate average streak
    const averageStreak = habitsData.reduce((sum, habit) => sum + habit.streak, 0) / habitsData.length;
    
    // Calculate total completions across all habits
    const totalCompletions = habitsData.reduce((sum, habit) => sum + habit.totalCompletions, 0);
    
    // Generate a personalized analysis message
    let analysis = `## Your Habit Progress Summary\n\n`;
    
    // Add streak information
    analysis += `You're doing great! Your best streak is **${topStreakHabit.streak} days** with "${topStreakHabit.name}". `;
    
    if (averageStreak > 3) {
      analysis += `Your average streak of ${averageStreak.toFixed(1)} days across all habits shows consistent commitment.\n\n`;
    } else {
      analysis += `Keep going to increase your average streak of ${averageStreak.toFixed(1)} days.\n\n`;
    }
    
    // Add completions information
    analysis += `You've completed habits a total of **${totalCompletions} times**, with "${topCompletionsHabit.name}" being your most completed habit (${topCompletionsHabit.totalCompletions} times).\n\n`;
    
    // Add encouragement
    if (totalCompletions > 10) {
      analysis += `**Impressive progress!** Your consistency is building strong foundations for these habits.\n\n`;
    } else {
      analysis += `**Good start!** Remember that consistency is key to building lasting habits.\n\n`;
    }
    
    // Add suggestions
    analysis += `### Suggestions for improvement:\n\n`;
    
    if (habitsData.some(h => h.streak === 0)) {
      analysis += `- Focus on restarting habits with zero streaks\n`;
    }
    
    if (habitsData.some(h => h.streak > 0 && h.streak < 3)) {
      analysis += `- Pay extra attention to newer habits (streaks under 3 days) as they're still forming\n`;
    }
    
    analysis += `- Consider adding reminder times to any habits you frequently forget\n`;
    analysis += `- Celebrate your achievements, even small ones count!\n\n`;
    
    analysis += `Keep up the great work! Consistency over time leads to transformative results.`;
    
    return analysis;
  };

  return {
    loading,
    analysis,
    error,
    getProgressAnalysis,
  };
}
