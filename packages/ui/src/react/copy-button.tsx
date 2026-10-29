'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { IconButton, type IconButtonProps } from './icon-button';

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
function CopyButton({
  value,
  label = 'Copiar',
  copiedLabel = 'Copiado',
  copy,
  onCopied,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <IconButton
      data-slot="copy-button"
      size="sm"
      variant="ghost"
      label={copied ? copiedLabel : label}
      onClick={async () => {
        try {
          await (copy ?? ((text) => navigator.clipboard.writeText(text)))(value);
          setCopied(true);
          onCopied?.();
        } catch {
          setCopied(false);
        }
      }}
      {...props}
    >
      {copied ? <Check aria-hidden className="text-success" /> : <Copy aria-hidden />}
    </IconButton>
  );
}

export { CopyButton, type CopyButtonProps };
