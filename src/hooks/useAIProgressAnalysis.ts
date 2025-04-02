
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

      // Make the API request to OpenRouter
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'HTTP-Referer': window.location.href,
          'X-Title': 'Habit Tracker',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemma-3-1b-it:free',
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
