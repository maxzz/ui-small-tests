import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Quick version

type classNamesArg = string | undefined | false | null | 0;

export function classNames(...inputs: classNamesArg[]): string {
    return inputs.filter(Boolean).join(' ');
}
