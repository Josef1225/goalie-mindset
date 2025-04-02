
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
      
      // Create the prompt for the AI
      const prompt = `Please analyze my habit tracking data and provide encouraging feedback on my progress:
      
${JSON.stringify(habitsData, null, 2)}

Focus on:
1. Streaks and consistency
2. Overall progress
3. Suggestions for improvement
4. Encouraging comments
      
Keep your response friendly, supportive, and concise (maximum 150 words).`;

      // Make the API request to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const analysisText = data.choices?.[0]?.message?.content || 'No analysis available.';
      
      setAnalysis(analysisText);
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      setError('Failed to get progress analysis. Please try again later.');
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
