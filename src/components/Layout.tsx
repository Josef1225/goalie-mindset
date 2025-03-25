
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CreateHabitDialog from './CreateHabitDialog';
import { Habit } from '@/types/types';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

interface LayoutProps {
  habits: Habit[];
  onAddHabit: (habit: Habit) => void;
}

const Layout: React.FC<LayoutProps> = ({ habits, onAddHabit }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveHabit = (habit: Habit) => {
    onAddHabit(habit);
    toast({
      title: "Habit Created",
      description: `${habit.name} has been added to your habits.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto px-4 pb-20">
        <Outlet />
      </div>
      
      <Navbar onCreateHabit={() => setCreateDialogOpen(true)} />
      
      <CreateHabitDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSave={handleSaveHabit}
      />
      
      <Toaster />
    </div>
  );
};

export default Layout;
