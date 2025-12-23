import { type HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { appSettings } from "@/store/0-local-storage";
import { SidebarTrigger } from "../ui/shadcn/sidebar";
import { HeaderToolbarForCards } from "./2-header-toolbar";
import { PanelLeftIcon } from "lucide-react";

export function Section1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { leftTree } = useSnapshot(appSettings.appUi);
    return (
        <header className={classNames(sectionClasses, className)} {...rest}>
            <div className="relative flex items-center">
                <SidebarTrigger />
                <PanelLeftIcon className="absolute left-0.5 fill-sky-50 stroke-1 pointer-events-none" />

                <div className="text-[.5rem] hover:scale-150 transition-transform origin-left">
                    ... the time is gone, the song is over, thought I'd something more to say.
                </div>
            </div>

            <AnimatePresence initial={false}>
                {leftTree === "cards" &&
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100, transition: { duration: 0 } }}
                        transition={{ duration: 0.2 }}
                    >
                        <HeaderToolbarForCards />
                    </motion.div>
                }
            </AnimatePresence>
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
