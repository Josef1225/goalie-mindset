
import React from 'react';
import { Habit } from '@/types/types';
import { isHabitCompletedOnDate, getTodayDate } from '@/utils/habitUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, MoreHorizontalIcon } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (habitId: string) => void;
  onEditHabit?: (habit: Habit) => void;
  animationDelay?: number;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleCompletion,
  onEditHabit,
  animationDelay = 0,
}) => {
  const isCompleted = isHabitCompletedOnDate(habit, getTodayDate());
  const habitColor = habit.color || 'hsl(var(--primary))';
  
  return (
    <div 
      className={cn(
        'bg-card rounded-xl p-4 shadow-sm border border-border/30 relative overflow-hidden',
        'transition-all duration-300 transform hover:shadow-md animate-slide-up',
      )}
      style={{ animationDelay: `${animationDelay * 50}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'h-12 w-12 rounded-full transition-all duration-300',
              isCompleted ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:text-primary'
            )}
            onClick={() => onToggleCompletion(habit.id)}
          >
            {isCompleted ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-current" />
            )}
          </Button>
          
          <div className="flex-1">
            <h3 className="font-medium text-lg">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{habit.description}</p>
            )}
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEditHabit?.(habit)}>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <span>Streak:</span>
            <span className="font-medium text-foreground">{habit.streak}</span>
          </span>
        </div>
        
        <div 
          className={cn(
            'px-2 py-1 text-xs rounded-full',
            isCompleted ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
          )}
        >
          {isCompleted ? 'Completed' : 'Todo'}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
