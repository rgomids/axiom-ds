import * as React from 'react';
import { cn } from '../lib/utils';
import { fieldClasses } from '../lib/control';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldClasses, 'field-sizing-content min-h-20 px-3 py-2 leading-5', className)}
      {...props}
    />
  );
}

export { Textarea };
