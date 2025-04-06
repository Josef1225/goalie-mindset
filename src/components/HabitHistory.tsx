
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Habit } from '@/types/types';
import { format } from 'date-fns';
import { CheckIcon, XIcon, CalendarIcon, StarIcon } from 'lucide-react';
import { isHabitCompletedOnDate, shouldCompleteToday, formatDate, hasReachedStreakGoal } from '@/utils/habitUtils';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { fetchAllHabits } from '@/services/habitService';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from "@/components/ui/badge";
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface HabitHistoryProps {
  habits: Habit[];
}

const HabitHistory: React.FC<HabitHistoryProps> = ({ habits: initialHabits }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = selectedDate ? formatDate(format(selectedDate, 'yyyy-MM-dd')) : '';
  const formattedForComparison = format(selectedDate, 'yyyy-MM-dd');
  const { user } = useAuth();
  const [allHabits, setAllHabits] = useState<Habit[]>(initialHabits);
  const isDesktop = useBreakpoint('md');

  useEffect(() => {
    const loadAllHabits = async () => {
      if (user?.id) {
        try {
          const habits = await fetchAllHabits(user.id);
          setAllHabits(habits);
        } catch (error) {
          console.error('Error loading all habits for history:', error);
        }
      }
    };
    
    loadAllHabits();
  }, [user]);

  // Filter habits that were active on the selected date
  const activeHabitsOnDate = allHabits.filter(habit => {
    // Check if habit was created on or before the selected date
    const habitStartDate = new Date(habit.startDate);
    return habitStartDate <= selectedDate;
  });

  // Render different status indicators depending on screen size
  const renderStatus = (habit: Habit) => {
    const isCompleted = isHabitCompletedOnDate(habit, formattedForComparison);
    const isGoalReached = hasReachedStreakGoal(habit);
    
    if (isDesktop) {
      return (
        <>
          {isGoalReached ? (
            <Badge className="bg-green-500">
              <StarIcon className="h-3 w-3 mr-1" />
              Goal Reached
            </Badge>
          ) : (
            <Badge variant="outline">Active</Badge>
          )}
        </>
      );
    } else {
      // Simplified badge for mobile
      return (
        <>
          {isGoalReached ? (
            <Badge className="bg-green-500">
              <StarIcon className="h-3 w-3" />
            </Badge>
          ) : (
            <Badge variant="outline">Active</Badge>
          )}
        </>
      );
    }
  };

  // Render different completion status depending on screen size
  const renderCompletionStatus = (habit: Habit) => {
    const isCompleted = isHabitCompletedOnDate(habit, formattedForComparison);
    
    if (isDesktop) {
      return isCompleted ? (
        <div className="flex items-center text-green-600">
          <CheckIcon className="h-4 w-4 mr-2" />
          Completed
        </div>
      ) : (
        <div className="flex items-center text-amber-600">
          <XIcon className="h-4 w-4 mr-2" />
          Not completed
        </div>
      );
    } else {
      // Icon only for mobile
      return isCompleted ? (
        <div className="flex justify-center text-green-600">
          <CheckIcon className="h-5 w-5" />
        </div>
      ) : (
        <div className="flex justify-center text-amber-600">
          <XIcon className="h-5 w-5" />
        </div>
      );
    }
  };

  return (
    <div className="py-4 md:py-8 space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">Habit History</h1>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden xs:inline">{formattedDate}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border/50 shadow-sm">
        <h2 className="text-md md:text-lg font-semibold mb-4">Habits for {formattedDate}</h2>
        
        {activeHabitsOnDate.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No habits were active on this date</p>
        ) : (
          <>
            {/* Desktop table view */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Habit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeHabitsOnDate.map((habit) => (
                    <TableRow key={habit.id}>
                      <TableCell className="font-medium">{habit.name}</TableCell>
                      <TableCell>{renderStatus(habit)}</TableCell>
                      <TableCell>{renderCompletionStatus(habit)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Mobile card list view */}
            <div className="md:hidden space-y-3">
              {activeHabitsOnDate.map((habit) => (
                <div 
                  key={habit.id}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30"
                >
                  <div className="flex items-center space-x-3">
                    <div>{renderCompletionStatus(habit)}</div>
                    <span className="font-medium">{habit.name}</span>
                  </div>
                  <div>{renderStatus(habit)}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HabitHistory;
