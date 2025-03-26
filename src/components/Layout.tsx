
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
      <div className="mx-auto bg-gradient-to-b from-blue-50 to-background">
        {/* Desktop layout with sidebar-like navigation */}
        <div className="flex">
          {/* Side navigation for desktop */}
          <div className="hidden lg:block w-64 h-screen fixed left-0 border-r border-border/30 bg-white/70 backdrop-blur-sm">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-primary mb-8">HabitTracker</h1>
              <nav className="space-y-1">
                <Navbar onCreateHabit={() => setCreateDialogOpen(true)} />
              </nav>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="w-full lg:ml-64 p-6">
            <div className="max-w-5xl mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="lg:hidden">
        <Navbar onCreateHabit={() => setCreateDialogOpen(true)} />
      </div>
      
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
