import * as React from 'react';
/** Two-column settings block: title/description left, controls right; stacks on mobile. */
declare function SettingsSection({ title, description, footer, tone, className, children, }: {
    title: React.ReactNode;
    description?: React.ReactNode;
    footer?: React.ReactNode;
    tone?: 'default' | 'danger';
    className?: string;
    children: React.ReactNode;
}): React.JSX.Element;
/** Label + description on the left and a control (Switch) on the right. */
declare function SettingsRow({ label, description, control, htmlFor, }: {
    label: React.ReactNode;
    description?: React.ReactNode;
    control: React.ReactNode;
    htmlFor?: string;
}): React.JSX.Element;
export { SettingsSection, SettingsRow };
