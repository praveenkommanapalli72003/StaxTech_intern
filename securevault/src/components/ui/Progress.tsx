import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
  variant?: 'default' | 'gradient' | 'striped';
}

export function Progress({
  value,
  max = 100,
  color,
  showLabel = false,
  className,
  variant = 'gradient',
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const getBackground = () => {
    if (color) return color;
    if (percentage < 33) return '#ef4444';
    if (percentage < 66) return '#f59e0b';
    if (percentage < 85) return '#10b981';
    return '#8b5cf6';
  };

  const gradientBg = `linear-gradient(90deg, #8b5cf6 0%, #06b6d4 50%, #10b981 100%)`;

  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variant === 'gradient' && 'bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500',
            variant === 'striped' && 'bg-gradient-to-r striped',
            variant === 'default'
          )}
          style={{
            width: `${percentage}%`,
            background: variant === 'default' ? getBackground() : undefined,
          }}
        />
      </div>
    </div>
  );
}