
import { useState, useEffect } from 'react';

// Breakpoints that match Tailwind's default breakpoints
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
};

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState<boolean>(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsAboveBreakpoint(window.innerWidth >= breakpoints[breakpoint]);
    };

    // Check initially
    checkBreakpoint();

    // Add resize listener
    window.addEventListener('resize', checkBreakpoint);

    // Clean up
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpoint]);

  return isAboveBreakpoint;
}
