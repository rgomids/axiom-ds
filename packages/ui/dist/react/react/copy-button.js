'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { IconButton } from './icon-button';
/** Copies `value` to the clipboard and confirms with an icon swap for 2 seconds. */
function CopyButton({ value, label = 'Copiar', copiedLabel = 'Copiado', copy, onCopied, ...props }) {
    const [copied, setCopied] = React.useState(false);
    React.useEffect(() => {
        if (!copied)
            return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);
    return (_jsx(IconButton, { "data-slot": "copy-button", size: "sm", variant: "ghost", label: copied ? copiedLabel : label, onClick: async () => {
            try {
                await (copy ?? ((text) => navigator.clipboard.writeText(text)))(value);
                setCopied(true);
                onCopied?.();
            }
            catch {
                setCopied(false);
            }
        }, ...props, children: copied ? _jsx(Check, { "aria-hidden": true, className: "text-success" }) : _jsx(Copy, { "aria-hidden": true }) }));
}
export { CopyButton };
