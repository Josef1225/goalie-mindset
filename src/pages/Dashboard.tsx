
import React from 'react';
import { Habit, DailyProgress } from '@/types/types';
import HabitCard from '@/components/HabitCard';
import ProgressCircle from '@/components/ProgressCircle';
import { formatDate, calculateDailyProgress, shouldCompleteToday } from '@/utils/habitUtils';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ habits, onToggleHabit }) => {
  const { toast } = useToast();
  const todayProgress: DailyProgress = calculateDailyProgress(habits);
  const todayDate = formatDate(todayProgress.date);
  
  // Filter habits that should be completed today
  const todayHabits = habits.filter(habit => 
    habit.active && shouldCompleteToday(habit)
  );

  const handleToggleHabit = (habitId: string) => {
    onToggleHabit(habitId);
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      toast({
        title: `Habit ${habit.completedDates.includes(todayProgress.date) ? 'completed' : 'uncompleted'}`,
        description: habit.name,
      });
    }
  };

  return (
    <div className="py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">{todayDate}</h1>
        <p className="text-muted-foreground">Track your daily progress</p>
      </div>
      
      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Today's Progress</h2>
            <p className="text-sm text-muted-foreground">
              {todayProgress.completed} of {todayProgress.total} habits completed
            </p>
          </div>
          
          <ProgressCircle 
            percentage={todayProgress.percentage} 
            size={80} 
            animate={true}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-lg font-medium px-1">Today's Habits</h2>
        
        {todayHabits.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No habits scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayHabits.map((habit, index) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggleCompletion={handleToggleHabit}
                animationDelay={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
