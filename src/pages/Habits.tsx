
import React, { useState } from 'react';
import { Habit } from '@/types/types';
import HabitCard from '@/components/HabitCard';
import CreateHabitDialog from '@/components/CreateHabitDialog';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface HabitsProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  onUpdateHabit: (habit: Habit) => void;
  onDeleteHabit: (habitId: string) => void;
}

const Habits: React.FC<HabitsProps> = ({ 
  habits, 
  onToggleHabit, 
  onUpdateHabit,
  onDeleteHabit
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState<Habit | undefined>(undefined);
  const { toast } = useToast();

  const handleEditHabit = (habit: Habit) => {
    setHabitToEdit(habit);
    setEditDialogOpen(true);
  };

  const handleSaveHabit = (updatedHabit: Habit) => {
    onUpdateHabit(updatedHabit);
    toast({
      title: "Habit Updated",
      description: `${updatedHabit.name} has been updated.`,
    });
  };

  return (
    <div className="py-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Habits</h1>
      </div>
      
      {habits.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-muted-foreground">You don't have any habits yet</p>
          <Button
            className={cn("rounded-lg")}
            onClick={() => setEditDialogOpen(true)}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Your First Habit
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit, index) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleCompletion={onToggleHabit}
              onEditHabit={handleEditHabit}
              onDeleteHabit={onDeleteHabit}
              animationDelay={index}
            />
          ))}
        </div>
      )}
      
      <CreateHabitDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveHabit}
        initialHabit={habitToEdit}
      />
    </div>
  );
};

export default Habits;
