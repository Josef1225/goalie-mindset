// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ergbuysiblmxkhvzarnl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZ2J1eXNpYmxteGtodnphcm5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTM3NzIsImV4cCI6MjA1ODQ2OTc3Mn0.WnrIaBOPzzXQfrmltlhyD8d9xjfKc17C3jSLlF-BibY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);