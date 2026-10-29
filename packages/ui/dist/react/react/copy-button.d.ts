import * as React from 'react';
import { type IconButtonProps } from './icon-button';
type CopyButtonProps = Omit<IconButtonProps, 'label' | 'onClick' | 'children'> & {
    value: string;
    /** Accessible name before copying. */
    label?: string;
    /** Name announced after a successful copy. */
    copiedLabel?: string;
    copy?: (value: string) => Promise<void>;
    onCopied?: () => void;
};
/** Copies `value` to the clipboard and confirms with an icon swap for 2 seconds. */
declare function CopyButton({ value, label, copiedLabel, copy, onCopied, ...props }: CopyButtonProps): React.JSX.Element;
export { CopyButton, type CopyButtonProps };
