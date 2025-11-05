import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { HeaderToolbar } from "./2-header-toolbar";
import { SidebarTrigger } from "../ui/shadcn/sidebar";

export function Section1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <header className={classNames(sectionClasses, className)} {...rest}>
            <div className="flex items-center">
                <SidebarTrigger />

                <div className="text-[.5rem] hover:scale-150 transition-transform origin-left">
                    ... the time is gone, the song is over, thought I'd something more to say.
                </div>
            </div>

            <HeaderToolbar />
        </header>
    );
}

const sectionClasses = "\
px-4 h-10 \
text-gray-500 dark:text-slate-600 \
dark:bg-black border-border \
border-b \
flex items-center justify-between \
";
