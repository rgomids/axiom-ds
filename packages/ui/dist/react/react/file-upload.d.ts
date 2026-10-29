import * as React from 'react';
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
/** Drop zone backed by a native file input: keyboard (Enter/Space), click and drag-and-drop. */
declare function FileUpload({ files, defaultFiles, onFilesChange, onReject, accept, multiple, maxSize, disabled, id, label, hint, removeLabel, className, ...aria }: FileUploadProps): React.JSX.Element;
export { FileUpload, type FileUploadProps };
