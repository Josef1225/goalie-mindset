
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { HomeIcon, ListTodoIcon, ActivityIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onCreateHabit: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCreateHabit }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      path: '/',
      icon: <HomeIcon className="h-5 w-5" />,
      label: 'Today',
    },
    {
      path: '/habits',
      icon: <ListTodoIcon className="h-5 w-5" />,
      label: 'Habits',
    },
    {
      path: '/stats',
      icon: <ActivityIcon className="h-5 w-5" />,
      label: 'Stats',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 backdrop-blur-lg z-10">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-2 relative">
          {/* Navigation links */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors',
                currentPath === item.path
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
          
          {/* Create button */}
          <Button
            onClick={onCreateHabit}
            className="h-12 w-12 rounded-full shadow-lg"
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
