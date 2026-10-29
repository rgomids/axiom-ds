import * as React from 'react';
import { Button, type ButtonProps } from './button';

type IconButtonProps = Omit<ButtonProps, 'size' | 'aria-label'> & {
  /** Required accessible name; also used as the native tooltip unless `title` is set. */
  label: string;
  size?: 'sm' | 'default' | 'lg';
};

const sizes = { sm: 'icon-sm', default: 'icon', lg: 'icon-lg' } as const;

/** Button that renders only an icon. The accessible name is mandatory. */
function IconButton({
  label,
  size = 'default',
  variant = 'ghost',
  title,
  ...props
}: IconButtonProps) {
  return (
    <Button
      data-slot="icon-button"
      variant={variant}
      size={sizes[size]}
      aria-label={label}
      title={title ?? label}
      {...props}
    />
  );
}

export { IconButton, type IconButtonProps };
