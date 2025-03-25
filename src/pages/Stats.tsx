
import React from 'react';
import { Habit, HabitStats } from '@/types/types';
import ProgressCircle from '@/components/ProgressCircle';
import { calculateHabitStats } from '@/utils/habitUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface StatsProps {
  habits: Habit[];
}

const Stats: React.FC<StatsProps> = ({ habits }) => {
  // Calculate overall completion rate
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.totalCompletions, 0);
  const totalPossibleCompletions = habits.reduce((sum, habit) => {
    const daysSinceStart = Math.floor(
      (new Date().getTime() - new Date(habit.startDate).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    return sum + daysSinceStart;
  }, 0);
  
  const overallCompletionRate = totalPossibleCompletions > 0
    ? (totalCompletions / totalPossibleCompletions) * 100
    : 0;
  
  // Get stats for all habits
  const habitStats: HabitStats[] = habits.map(calculateHabitStats);
  
  // Prepare data for chart
  const chartData = habitStats.map(stat => ({
    name: stat.habitName,
    completionRate: stat.completionRate,
  }));

  return (
    <div className="py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Statistics</h1>
        <p className="text-muted-foreground">Track your progress over time</p>
      </div>
      
      <Card className="rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Overall Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <ProgressCircle
              percentage={overallCompletionRate}
              size={120}
              strokeWidth={8}
              showPercentage={true}
              animate={true}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Habits</p>
              <p className="text-xl font-semibold">{habits.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completions</p>
              <p className="text-xl font-semibold">{totalCompletions}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Best Streak</p>
              <p className="text-xl font-semibold">
                {Math.max(...habits.map(habit => habit.streak), 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {habits.length > 0 && (
        <Card className="rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completion Rate by Habit</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Bar
                    dataKey="completionRate"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Habit Details</h2>
        {habitStats.map((stat) => (
          <Card key={stat.habitId} className="rounded-xl border border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{stat.habitName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.totalCompletions} completions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Current Streak: {stat.streak}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Completion: {stat.completionRate}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stats;
