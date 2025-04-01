
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
    setAnalysis(null);
    
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
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    analysis,
    error,
    getProgressAnalysis,
  };
}
