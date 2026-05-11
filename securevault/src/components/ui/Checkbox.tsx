import React from 'react';
import { cn } from '../../utils/cn';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, description, className }: CheckboxProps) {
  return (
    <label className={cn('flex items-start gap-3 cursor-pointer group', className)}>
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            'w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center',
            checked
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 border-transparent'
              : 'border-border group-hover:border-primary/50'
          )}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white animate-in zoom-in duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <div>
        {label && (
          <span className="text-sm font-medium text-foreground">{label}</span>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </label>
  );
}