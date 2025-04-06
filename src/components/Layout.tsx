
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CreateHabitDialog from './CreateHabitDialog';
import { Habit } from '@/types/types';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface LayoutProps {
  habits: Habit[];
  onAddHabit: (habit: Habit) => void;
}

const Layout: React.FC<LayoutProps> = ({ habits, onAddHabit }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const isDesktop = useBreakpoint('lg');

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
          
          {/* Main content area - adjusted padding for mobile */}
          <div className="w-full lg:ml-64 p-4 md:p-6 pb-20 lg:pb-6">
            <div className="max-w-5xl mx-auto">
              {/* Mobile header for branding - only show on small screens */}
              <div className="lg:hidden flex items-center justify-between mb-6 pt-2">
                <h1 className="text-xl font-bold text-primary">HabitTracker</h1>
              </div>
              
              {/* Page content */}
              <Outlet />
              
              {/* Spacing div to ensure content isn't hidden behind mobile nav */}
              <div className="h-16 lg:hidden"></div>
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
