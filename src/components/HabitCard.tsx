
import React from 'react';
import { Habit } from '@/types/types';
import { isHabitCompletedOnDate, getTodayDate } from '@/utils/habitUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, MoreHorizontalIcon, StarIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (habitId: string) => void;
  onEditHabit?: (habit: Habit) => void;
  onDeleteHabit?: (habitId: string) => void;
  animationDelay?: number;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleCompletion,
  onEditHabit,
  onDeleteHabit,
  animationDelay = 0,
}) => {
  const isCompleted = isHabitCompletedOnDate(habit, getTodayDate());
  const habitColor = habit.color || 'hsl(var(--primary))';
  
  // Calculate a percentage for the progress bar (using streak as a proxy)
  const progressValue = Math.min(habit.streak * 10, 100);
  
  return (
    <div 
      className={cn(
        'bg-card rounded-xl p-4 shadow-sm relative overflow-hidden',
        'transition-all duration-300 transform hover:shadow-md animate-slide-up',
      )}
      style={{ animationDelay: `${animationDelay * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-medium text-lg">{habit.name}</h3>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={cn(
            'flex items-center px-2 py-1 rounded-full text-sm',
            isCompleted ? 'text-green-600' : 'text-gray-500'
          )}>
            <CheckIcon className={cn(
              "h-4 w-4 mr-1",
              isCompleted ? 'text-green-600' : 'text-gray-400'
            )} />
            <span>{habit.streak} days</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEditHabit && (
                <DropdownMenuItem onClick={() => onEditHabit(habit)}>
                  Edit
                </DropdownMenuItem>
              )}
              {onDeleteHabit && (
                <DropdownMenuItem 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
                      onDeleteHabit(habit.id);
                    }
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="mt-3">
        <Progress 
          value={progressValue} 
          className="h-2 bg-gray-100"
          indicatorClassName="bg-gradient-to-r from-green-400 to-blue-500" 
        />
      </div>
      
      <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center opacity-0">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-10 w-10 rounded-full transition-all duration-300',
            isCompleted ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground hover:text-primary'
          )}
          onClick={() => onToggleCompletion(habit.id)}
        >
          {isCompleted ? (
            <CheckIcon className="h-5 w-5" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-current" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default HabitCard;
