
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { HomeIcon, ListTodoIcon, ActivityIcon, PlusIcon, User2Icon, BrainIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onCreateHabit: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCreateHabit }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, signOut } = useAuth();

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

  const isDesktop = window.innerWidth >= 1024;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-col space-y-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center px-4 py-3 rounded-lg transition-colors',
              currentPath === item.path
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </Link>
        ))}
        
        <Button 
          onClick={onCreateHabit}
          className="w-full justify-start btn-hover-effect"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Create Habit</span>
        </Button>
        
        <Link
          to="/stats"
          className="flex items-center px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
          onClick={(e) => {
            e.preventDefault();
            // This will be linked to AI progress analysis
          }}
        >
          <BrainIcon className="h-5 w-5" />
          <span className="ml-3">AI Analysis</span>
        </Link>
        
        {/* User profile dropdown */}
        <div className="mt-auto pt-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <User2Icon className="h-5 w-5 mr-2" />
                <span className="truncate">Profile</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Signed in as:</span>
                <span>{user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 backdrop-blur-lg z-10 lg:hidden">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-2 relative">
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

            {/* User profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center justify-center px-4 py-2 rounded-md"
                >
                  <User2Icon className="h-5 w-5" />
                  <span className="text-xs mt-1">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">Signed in as:</span>
                  <span>{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
