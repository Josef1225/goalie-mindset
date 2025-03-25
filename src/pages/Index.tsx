
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Habit } from '@/types/types';
import Dashboard from './Dashboard';
import Habits from './Habits';
import Stats from './Stats';
import Layout from '@/components/Layout';
import { getSampleHabits, toggleHabitCompletion } from '@/utils/habitUtils';

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const navigate = useNavigate();
  
  // Initialize habits on first load
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      const initialHabits = getSampleHabits();
      setHabits(initialHabits);
      localStorage.setItem('habits', JSON.stringify(initialHabits));
    }
    
    // Redirect to dashboard if we're at the root route
    if (window.location.pathname === '/') {
      navigate('/');
    }
  }, [navigate]);
  
  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits]);
  
  const handleToggleHabit = (habitId: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === habitId ? toggleHabitCompletion(habit) : habit
      )
    );
  };
  
  const handleAddHabit = (newHabit: Habit) => {
    // Check if habit already exists (for updates)
    const existingHabitIndex = habits.findIndex(h => h.id === newHabit.id);
    
    if (existingHabitIndex >= 0) {
      // Update existing habit
      setHabits(prevHabits => 
        prevHabits.map(habit => 
          habit.id === newHabit.id ? newHabit : habit
        )
      );
    } else {
      // Add new habit
      setHabits(prevHabits => [...prevHabits, newHabit]);
    }
  };
  
  return (
    <Routes>
      <Route path="/" element={<Layout habits={habits} onAddHabit={handleAddHabit} />}>
        <Route index element={<Dashboard habits={habits} onToggleHabit={handleToggleHabit} />} />
        <Route path="habits" element={
          <Habits 
            habits={habits} 
            onToggleHabit={handleToggleHabit} 
            onUpdateHabit={handleAddHabit} 
          />
        } />
        <Route path="stats" element={<Stats habits={habits} />} />
      </Route>
    </Routes>
  );
};

export default Index;
