
import { useState } from 'react';
import { Habit } from '@/types/types';

// API key for the AI service
const API_KEY = "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";

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
      
      // Create a summary of the habits for the AI prompt
      const habitsDescription = habits.map(habit => 
        `- ${habit.name}: Current streak: ${habit.streak} days, Total completions: ${habit.totalCompletions}`
      ).join('\n');
      
      // Calculate overall stats
      const totalHabits = habits.length;
      const avgStreak = habits.reduce((sum, h) => sum + h.streak, 0) / Math.max(1, totalHabits);
      const totalCompletions = habits.reduce((sum, h) => sum + h.totalCompletions, 0);
      
      // Create the prompt for the AI analysis
      const prompt = `
        Analyze this habit tracking data and provide personalized insights and suggestions:
        
        Overall Stats:
        - Number of habits: ${totalHabits}
        - Average streak: ${avgStreak.toFixed(1)} days
        - Total completions: ${totalCompletions}
        
        Individual Habits:
        ${habitsDescription}
        
        Please provide:
        1. A congratulatory introduction that acknowledges their progress
        2. Analysis of their best performing habits and areas for improvement
        3. Specific actionable suggestions to improve consistency
        4. Motivational conclusion encouraging continued progress
        
        Format your response with markdown headers, bolding key points, and bullet points for easy reading.
      `;
      
      // Make request to OpenRouter API
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': 'https://lovable.ai', // Replace with your app's URL in production
          'X-Title': 'Habit Tracker'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an encouraging and insightful AI assistant specialized in analyzing habit tracking data. You provide personalized insights, constructive feedback, and specific actionable suggestions to help users improve their habit consistency.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 750
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate analysis');
      }
      
      const data = await response.json();
      const analysisText = data.choices[0].message.content;
      
      setAnalysis(analysisText);
    } catch (error) {
      console.error('Error generating analysis:', error);
      setError('Failed to generate progress analysis. Please try again later.');
      
      // Fallback to local analysis if API fails
      const fallbackAnalysis = generateLocalAnalysis(habits);
      setAnalysis(fallbackAnalysis);
    } finally {
      setLoading(false);
    }
  };

  // Local analysis generation function as fallback
  const generateLocalAnalysis = (habitsData: Habit[]) => {
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
