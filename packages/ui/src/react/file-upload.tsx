'use client';

import * as React from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';

type FileUploadProps = {
  files?: File[];
  defaultFiles?: File[];
  onFilesChange?: (files: File[]) => void;
  /** Called with human-readable rejections (type or size). */
  onReject?: (messages: string[]) => void;
  accept?: string;
  multiple?: boolean;
  /** Maximum size per file, in bytes. */
  maxSize?: number;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  removeLabel?: (file: File) => string;
  className?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
};

const formatSize = (bytes: number) =>
  bytes < 1024
    ? bytes + ' B'
    : bytes < 1048576
      ? (bytes / 1024).toFixed(1) + ' KB'
      : (bytes / 1048576).toFixed(1) + ' MB';

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true;
  return accept.split(',').some((rule) => {
    const r = rule.trim().toLowerCase();
    if (r.startsWith('.')) return file.name.toLowerCase().endsWith(r);
    if (r.endsWith('/*')) return file.type.startsWith(r.slice(0, -1));
    return file.type === r;
  });
}

/** Drop zone backed by a native file input: keyboard (Enter/Space), click and drag-and-drop. */
function FileUpload({
  files,
  defaultFiles = [],
  onFilesChange,
  onReject,
  accept,
  multiple = false,
  maxSize,
  disabled,
  id,
  label = 'Arraste arquivos ou clique para selecionar',
  hint,
  removeLabel = (file) => 'Remover ' + file.name,
  className,
  ...aria
}: FileUploadProps) {
  const generated = React.useId();
  const inputId = id ?? generated;
  const [inner, setInner] = React.useState<File[]>(defaultFiles);
  const [dragging, setDragging] = React.useState(false);
  const current = files ?? inner;
  const set = (next: File[]) => {
    if (files === undefined) setInner(next);
    onFilesChange?.(next);
  };
  const add = (list: FileList | null) => {
    if (!list) return;
    const rejected: string[] = [];
    const accepted = Array.from(list).filter((file) => {
      if (!matchesAccept(file, accept)) rejected.push(file.name + ': tipo não permitido');
      else if (maxSize && file.size > maxSize)
        rejected.push(file.name + ': maior que ' + formatSize(maxSize));
      else return true;
      return false;
    });
    if (rejected.length) onReject?.(rejected);
    if (accepted.length) set(multiple ? [...current, ...accepted] : accepted.slice(0, 1));
  };
  return (
    <div data-slot="file-upload" className={cn('grid gap-2', className)}>
      <label
        htmlFor={inputId}
        data-dragging={dragging || undefined}
        data-disabled={disabled || undefined}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!disabled) add(event.dataTransfer.files);
        }}
        className={cn(
          'grid cursor-pointer justify-items-center gap-2 rounded-card border border-dashed border-input bg-surface px-4 py-6 text-center transition-colors hover:border-border-interactive hover:bg-surface-subtle has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring data-[dragging]:border-primary data-[dragging]:bg-primary-subtle data-[disabled]:cursor-not-allowed data-[disabled]:bg-surface-subtle data-[disabled]:text-fg-disabled',
          aria['aria-invalid'] && 'border-danger',
        )}
      >
        <span className="grid size-9 place-items-center rounded-control border bg-surface-subtle text-fg-secondary">
          <Upload aria-hidden className="size-4" />
        </span>
        <span className="text-sm font-medium text-fg">{label}</span>
        {hint && <span className="text-xs text-fg-tertiary">{hint}</span>}
        <input
          id={inputId}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(event) => {
            add(event.target.files);
            event.target.value = '';
          }}
          {...aria}
        />
      </label>
      {current.length > 0 && (
        <ul className="grid gap-1.5" aria-label="Arquivos selecionados">
          {current.map((file, index) => (
            <li
              key={file.name + index}
              className="flex items-center gap-3 rounded-control border bg-surface px-3 py-2 text-sm"
            >
              <FileText aria-hidden className="size-4 shrink-0 text-fg-tertiary" />
              <span className="min-w-0 flex-1 truncate text-fg">{file.name}</span>
              <span className="font-mono text-xs text-fg-tertiary">{formatSize(file.size)}</span>
              <button
                type="button"
                aria-label={removeLabel(file)}
                disabled={disabled}
                onClick={() => set(current.filter((_, i) => i !== index))}
                className={cn(
                  'grid size-6 cursor-pointer place-items-center rounded-xs text-fg-tertiary hover:bg-surface-subtle hover:text-fg',
                  focusRing,
                )}
              >
                <X aria-hidden className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { FileUpload, type FileUploadProps };
