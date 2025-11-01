import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { HeaderToolbar } from "./2-header-toolbar";

export function Section1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <header className={classNames(sectionClasses, className)} {...rest}>
            <div className="pb-1 text-[.65rem]">
                ... the time is gone, the song is over, thought I'd something more to say.
            </div>

            <HeaderToolbar />
        </header>
    );
}

const sectionClasses = "\
px-4 h-9 \
text-gray-500 dark:text-slate-600 \
dark:bg-black border-border \
border-b \
flex items-center justify-between \
";
