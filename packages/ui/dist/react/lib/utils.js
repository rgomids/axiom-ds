import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
// Teach tailwind-merge the Axiom scale names so custom sizes are not merged as colors.
const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: ['2xs', '13'],
            radius: ['control', 'card', 'dialog'],
        },
    },
});
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
