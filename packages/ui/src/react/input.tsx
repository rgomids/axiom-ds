import * as React from 'react';
import { cn } from '../lib/utils';
import { fieldClasses } from '../lib/control';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        fieldClasses,
        'h-(--axion-component-field-height) px-3 py-1',
        'file:mr-3 file:inline-flex file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-fg',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
