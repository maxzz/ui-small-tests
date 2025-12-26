import { type HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { appSettings } from "@/store/0-local-storage";
import { HeaderToolbarForCards } from "./2-header-toolbar";

export function Section1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { leftTree } = useSnapshot(appSettings.appUi);
    return (
        <header className={classNames(sectionClasses, className)} {...rest}>
            <AnimatePresence initial={false}>
                {leftTree === "common-cards" &&
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, transition: { duration: 0 } }}
                        transition={{ duration: 0.2 }}
                        className="-mx-4 px-4 border-border border-b flex items-center justify-end"
                    >
                        <HeaderToolbarForCards className="py-1" />
                    </motion.div>
                }
            </AnimatePresence>
        </header>
    );
}

const sectionClasses = "px-4 text-gray-500 dark:text-slate-600 dark:bg-black";
