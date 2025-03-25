
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  showPercentage?: boolean;
  animate?: boolean;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  size = 60,
  strokeWidth = 5,
  color = 'hsl(var(--primary))',
  className,
  showPercentage = true,
  animate = true,
}) => {
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        className={cn('transform -rotate-90', animate && 'transition-all duration-1000 ease-out')}
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="text-muted stroke-current"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          className={cn(
            'stroke-current transition-all duration-1000 ease-in-out',
            animate && 'animate-progress-fill'
          )}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animate ? 0 : strokeDashoffset}
          stroke={color}
          fill="none"
          style={!animate ? { strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' } : {}}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium">{Math.round(normalizedPercentage)}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
