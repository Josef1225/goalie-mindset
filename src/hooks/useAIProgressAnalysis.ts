
import { useState } from 'react';
import { Habit } from '@/types/types';
import { fetchAllHabits } from '@/services/habitService';
import { useAuth } from '@/contexts/AuthContext';

export function useAIProgressAnalysis() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const getProgressAnalysis = async (habits: Habit[]) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch ALL habits including completed ones for better analysis
      let habitsToAnalyze = habits;
      
      // If we have a user ID, fetch the complete habit history
      if (user?.id) {
        try {
          habitsToAnalyze = await fetchAllHabits(user.id);
        } catch (err) {
          console.error("Error fetching all habits for analysis:", err);
          // Continue with provided habits if fetch fails
        }
      }
      
      // Prepare the data about habits for analysis
      const habitsData = habitsToAnalyze.map(habit => ({
        name: habit.name,
        streak: habit.streak,
        totalCompletions: habit.totalCompletions,
        completedDates: habit.completedDates,
        startDate: habit.startDate,
        streakGoal: habit.streakGoal,
        active: habit.active,
      }));
      
      // Create the enhanced prompt for the AI
      const prompt = `Please analyze my habit tracking data and provide encouraging, constructive feedback on my progress:
      
${JSON.stringify(habitsData, null, 2)}

Focus on:
1. Streaks and consistency - highlight my achievements
2. Overall progress and patterns
3. Specific, actionable suggestions for improvement
4. Encouraging comments that acknowledge my efforts
5. Suggest 2-3 NEW complementary habits that would work well with my existing habits (be specific and explain WHY they would be beneficial)

For suggested habits, consider common habits like:
- Meditation/mindfulness
- Reading
- Exercise variations (walking, running, strength training)
- Journaling
- Learning a new skill
- Healthy eating habits
- Social connection habits
- Sleep hygiene practices
- Gratitude practices
- Creativity habits

Your response should be supportive, constructive, and motivating. Format your response with clear sections using markdown (headers, bullet points, etc.). Maximum 250 words.`;

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
