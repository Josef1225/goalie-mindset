
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Habit } from '@/types/types';
import { generateId, getTodayDate } from '@/utils/habitUtils';

interface CreateHabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (habit: Habit) => void;
  initialHabit?: Habit;
}

const defaultHabit: Omit<Habit, 'id' | 'createdAt'> = {
  name: '',
  description: '',
  frequency: { type: 'daily' },
  startDate: getTodayDate(),
  completedDates: [],
  streak: 0,
  streakGoal: 7, // Default streak goal
  totalCompletions: 0,
  active: true,
};

const CreateHabitDialog: React.FC<CreateHabitDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  initialHabit,
}) => {
  const [formData, setFormData] = useState<Omit<Habit, 'id' | 'createdAt'>>(
    initialHabit ? {
      name: initialHabit.name,
      description: initialHabit.description || '',
      icon: initialHabit.icon,
      color: initialHabit.color,
      frequency: initialHabit.frequency,
      timeOfDay: initialHabit.timeOfDay,
      reminderTime: initialHabit.reminderTime,
      startDate: initialHabit.startDate,
      completedDates: initialHabit.completedDates,
      streak: initialHabit.streak,
      streakGoal: initialHabit.streakGoal || 7, // Default to 7 if not set
      totalCompletions: initialHabit.totalCompletions,
      active: initialHabit.active,
    } : defaultHabit
  );

  // Reset form data when the dialog opens or initialHabit changes
  React.useEffect(() => {
    if (open) {
      setFormData(
        initialHabit ? {
          name: initialHabit.name,
          description: initialHabit.description || '',
          icon: initialHabit.icon,
          color: initialHabit.color,
          frequency: initialHabit.frequency,
          timeOfDay: initialHabit.timeOfDay,
          reminderTime: initialHabit.reminderTime,
          startDate: initialHabit.startDate,
          completedDates: initialHabit.completedDates,
          streak: initialHabit.streak,
          streakGoal: initialHabit.streakGoal || 7,
          totalCompletions: initialHabit.totalCompletions,
          active: initialHabit.active,
        } : defaultHabit
      );
    }
  }, [open, initialHabit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue) && numberValue > 0) {
      setFormData((prev) => ({ ...prev, [name]: numberValue }));
    }
  };

  const handleFrequencyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      frequency: { type: value as 'daily' | 'weekly' | 'monthly' | 'custom' },
    }));
  };

  const handleSave = () => {
    // Validate form data
    if (!formData.name.trim()) {
      alert('Habit name is required');
      return;
    }

    // Ensure streak goal is at least 1
    if (!formData.streakGoal || formData.streakGoal < 1) {
      formData.streakGoal = 7; // Default to 7 if invalid
    }

    // Create a new habit or update an existing one
    const newHabit: Habit = {
      id: initialHabit?.id || generateId(),
      createdAt: initialHabit?.createdAt || new Date().toISOString(),
      ...formData,
    };

    onSave(newHabit);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {initialHabit ? 'Edit Habit' : 'Create New Habit'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Drink Water"
              className="rounded-md"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Drink 8 glasses of water daily"
              className="rounded-md"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={formData.frequency.type}
              onValueChange={handleFrequencyChange}
            >
              <SelectTrigger id="frequency" className="rounded-md">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="streakGoal">Streak Goal (Days)</Label>
            <Input
              id="streakGoal"
              name="streakGoal"
              type="number"
              min="1"
              value={formData.streakGoal}
              onChange={handleNumberChange}
              placeholder="e.g. 7"
              className="rounded-md"
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-md">
            Cancel
          </Button>
          <Button onClick={handleSave} className="rounded-md">
            {initialHabit ? 'Save Changes' : 'Create Habit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHabitDialog;
