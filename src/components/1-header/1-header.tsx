import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";

export function Section1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <header className={classNames("px-4 pb-1 text-[.65rem] text-gray-500 dark:bg-black dark:text-slate-600 border-border border-b", className)} {...rest}>
            ... the time is gone, the song is over, thought I'd something more to say.
        </header>
    );
}

const urlClasses = "\
origin-center \
underline-offset-2 \
hover:underline \
hover:text-primary-500 \
scale-y-50 \
hover:scale-y-125 \
transition-colors \
duration-1000 \
cursor-pointer";
