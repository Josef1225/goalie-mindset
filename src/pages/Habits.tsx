
import React, { useState } from 'react';
import { Habit } from '@/types/types';
import HabitCard from '@/components/HabitCard';
import CreateHabitDialog from '@/components/CreateHabitDialog';
import ProgressAnalysisDialog from '@/components/ProgressAnalysisDialog';
import { Button } from '@/components/ui/button';
import { PlusIcon, BarChartIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAIProgressAnalysis } from '@/hooks/useAIProgressAnalysis';

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
  const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { 
    loading: analysisLoading, 
    analysis, 
    error: analysisError, 
    getProgressAnalysis 
  } = useAIProgressAnalysis();

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
  
  const handleAnalyzeProgress = () => {
    getProgressAnalysis(habits);
    setAnalysisDialogOpen(true);
  };

  return (
    <div className="py-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Habits</h1>
        
        {habits.length > 0 && (
          <Button
            variant="outline"
            className="flex items-center space-x-1"
            onClick={handleAnalyzeProgress}
          >
            <BarChartIcon className="h-4 w-4 mr-1" />
            <span>Analyze Progress</span>
          </Button>
        )}
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
      
      <ProgressAnalysisDialog
        open={analysisDialogOpen}
        onOpenChange={setAnalysisDialogOpen}
        analysis={analysis}
        loading={analysisLoading}
        error={analysisError}
      />
    </div>
  );
};

export default Habits;
