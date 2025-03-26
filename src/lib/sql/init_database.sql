
-- Create habits table
CREATE TABLE IF NOT EXISTS public.habits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  frequency JSONB NOT NULL,
  time_of_day JSONB,
  reminder_time TEXT,
  start_date DATE NOT NULL,
  streak INTEGER DEFAULT 0,
  total_completions INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create completed_habits table
CREATE TABLE IF NOT EXISTS public.completed_habits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for improved query performance
CREATE INDEX IF NOT EXISTS habits_user_id_idx ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS completed_habits_habit_id_idx ON public.completed_habits(habit_id);
CREATE INDEX IF NOT EXISTS completed_habits_user_id_idx ON public.completed_habits(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS completed_habits_habit_date_idx ON public.completed_habits(habit_id, completed_date);

-- Setup Row Level Security (RLS)
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_habits ENABLE ROW LEVEL SECURITY;

-- Create policies for habits table
CREATE POLICY "Users can view their own habits" 
  ON public.habits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own habits" 
  ON public.habits FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits" 
  ON public.habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits" 
  ON public.habits FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for completed_habits table
CREATE POLICY "Users can view their own completed habits" 
  ON public.completed_habits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own completed habits" 
  ON public.completed_habits FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own completed habits" 
  ON public.completed_habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own completed habits" 
  ON public.completed_habits FOR DELETE
  USING (auth.uid() = user_id);
