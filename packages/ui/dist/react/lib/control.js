/**
 * Shared field surface for Input, Textarea, Select, Combobox and similar controls.
 * Default border meets 3:1 (WCAG 1.4.11); focus adds a 1px ring on top of the border.
 */
export const fieldClasses = 'w-full min-w-0 rounded-control border border-input bg-surface text-sm text-fg shadow-none transition-[color,border-color,box-shadow] outline-none ' +
    'placeholder:text-fg-tertiary hover:border-border-interactive ' +
    'focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring ' +
    'aria-invalid:border-danger aria-invalid:focus-visible:ring-danger ' +
    'disabled:cursor-not-allowed disabled:border-border-strong disabled:bg-surface-subtle disabled:text-fg-disabled disabled:placeholder:text-fg-disabled ' +
    'read-only:bg-surface-subtle read-only:hover:border-input';
/** Focus treatment for buttons, triggers and other non-text interactive elements. */
export const focusRing = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';
