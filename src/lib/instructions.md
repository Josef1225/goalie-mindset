
# Database Setup Instructions

To set up the database for this application, follow these steps:

1. Go to your Supabase dashboard (https://app.supabase.com)
2. Select your project
3. Navigate to the SQL Editor
4. Create a "New Query"
5. Copy and paste the contents of `src/lib/sql/init_database.sql` into the editor
6. Run the SQL query

This will:
- Create the necessary tables (`habits` and `completed_habits`)
- Set up relationships between tables
- Create indexes for better performance
- Enable Row Level Security (RLS)
- Create policies to ensure users can only access their own data

After running the SQL, the application should work properly and allow you to create habits.
