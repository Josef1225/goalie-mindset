
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

interface HabitHistoryProps {
  habits: Habit[];
}

const HabitHistory: React.FC<HabitHistoryProps> = ({ habits: initialHabits }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const formattedDate = selectedDate ? formatDate(format(selectedDate, 'yyyy-MM-dd')) : '';
  const formattedForComparison = format(selectedDate, 'yyyy-MM-dd');
  const { user } = useAuth();
  const [allHabits, setAllHabits] = useState<Habit[]>(initialHabits);

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

  return (
    <div className="py-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Habit History</h1>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {formattedDate}
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
      
      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Habits for {formattedDate}</h2>
        
        {activeHabitsOnDate.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No habits were active on this date</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Habit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeHabitsOnDate.map((habit) => {
                const isCompleted = isHabitCompletedOnDate(habit, formattedForComparison);
                const isGoalReached = hasReachedStreakGoal(habit);
                
                return (
                  <TableRow key={habit.id}>
                    <TableCell className="font-medium">{habit.name}</TableCell>
                    <TableCell>
                      {isGoalReached ? (
                        <Badge className="bg-green-500">
                          <StarIcon className="h-3 w-3 mr-1" />
                          Goal Reached
                        </Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {isCompleted ? (
                          <div className="flex items-center text-green-600">
                            <CheckIcon className="h-4 w-4 mr-2" />
                            Completed
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600">
                            <XIcon className="h-4 w-4 mr-2" />
                            Not completed
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default HabitHistory;
