
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
      totalCompletions: initialHabit.totalCompletions,
      active: initialHabit.active,
    } : defaultHabit
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFrequencyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      frequency: { type: value as 'daily' | 'weekly' | 'monthly' | 'custom' },
    }));
  };

  const handleSave = () => {
    const newHabit: Habit = {
      id: initialHabit?.id || generateId(),
      createdAt: initialHabit?.createdAt || new Date().toISOString(),
      ...formData,
    };
    onSave(newHabit);
    onOpenChange(false);
    if (!initialHabit) {
      setFormData(defaultHabit);
    }
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
