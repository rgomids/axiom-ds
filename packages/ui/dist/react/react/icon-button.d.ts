import * as React from 'react';
import { type ButtonProps } from './button';
type IconButtonProps = Omit<ButtonProps, 'size' | 'aria-label'> & {
    /** Required accessible name; also used as the native tooltip unless `title` is set. */
    label: string;
    size?: 'sm' | 'default' | 'lg';
};
/** Button that renders only an icon. The accessible name is mandatory. */
declare function IconButton({ label, size, variant, title, ...props }: IconButtonProps): React.JSX.Element;
export { IconButton, type IconButtonProps };
