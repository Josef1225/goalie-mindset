
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Habit } from '@/types/types';
import Dashboard from './Dashboard';
import Habits from './Habits';
import Stats from './Stats';
import Layout from '@/components/Layout';
import HabitHistory from '@/components/HabitHistory';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchHabits, 
  createHabit, 
  updateHabit, 
  toggleHabitCompletion as toggleHabitCompletionService,
  deleteHabit
} from '@/services/habitService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch habits from Supabase
  const { data: habits = [], isLoading } = useQuery({
    queryKey: ['habits', user?.id],
    queryFn: () => user?.id ? fetchHabits(user.id) : Promise.resolve([]),
    enabled: !!user?.id,
  });
  
  // Add habit mutation
  const addHabitMutation = useMutation({
    mutationFn: (newHabit: Habit) => createHabit(newHabit, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits', user?.id] });
      toast({
        title: "Habit Created",
        description: "Your new habit has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem creating your habit.",
        variant: "destructive",
      });
      console.error('Error creating habit:', error);
    },
  });
  
  // Update habit mutation
  const updateHabitMutation = useMutation({
    mutationFn: (updatedHabit: Habit) => updateHabit(updatedHabit, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits', user?.id] });
      toast({
        title: "Habit Updated",
        description: "Your habit has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem updating your habit.",
        variant: "destructive",
      });
      console.error('Error updating habit:', error);
    },
  });
  
  // Toggle habit completion mutation
  const toggleHabitMutation = useMutation({
    mutationFn: (habitId: string) => {
      const habit = habits.find(h => h.id === habitId);
      if (!habit || !user?.id) throw new Error("Habit not found");
      return toggleHabitCompletionService(habit, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits', user?.id] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem updating your habit completion.",
        variant: "destructive",
      });
      console.error('Error toggling habit completion:', error);
    },
  });
  
  // Delete habit mutation
  const deleteHabitMutation = useMutation({
    mutationFn: (habitId: string) => user?.id ? deleteHabit(habitId, user.id) : Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits', user?.id] });
      toast({
        title: "Habit Deleted",
        description: "Your habit has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem deleting your habit.",
        variant: "destructive",
      });
      console.error('Error deleting habit:', error);
    },
  });
  
  // Redirect to dashboard if we're at the base dashboard URL
  React.useEffect(() => {
    if (window.location.pathname === '/dashboard') {
      // Keep us at /dashboard as it's a valid route
      console.log('On dashboard route');
    }
  }, [navigate]);
  
  const handleToggleHabit = (habitId: string) => {
    toggleHabitMutation.mutate(habitId);
  };
  
  const handleAddHabit = (newHabit: Habit) => {
    if (newHabit.id && habits.some(h => h.id === newHabit.id)) {
      // Update existing habit
      updateHabitMutation.mutate(newHabit);
    } else {
      // Add new habit
      addHabitMutation.mutate(newHabit);
    }
  };
  
  const handleDeleteHabit = (habitId: string) => {
    deleteHabitMutation.mutate(habitId);
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading habits...</div>;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Layout habits={habits} onAddHabit={handleAddHabit} />}>
        <Route index element={<Dashboard habits={habits} onToggleHabit={handleToggleHabit} />} />
        <Route path="habits" element={
          <Habits 
            habits={habits} 
            onToggleHabit={handleToggleHabit} 
            onUpdateHabit={handleAddHabit}
            onDeleteHabit={handleDeleteHabit}
          />
        } />
        <Route path="stats" element={<Stats habits={habits} />} />
        <Route path="history" element={<HabitHistory habits={habits} />} />
      </Route>
    </Routes>
  );
};

export default Index;
