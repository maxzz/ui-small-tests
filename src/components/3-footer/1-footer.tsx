import { type HTMLAttributes, useState } from "react";
import { useSnapshot } from "valtio";
import { Moon, Sun, Info, MoreHorizontal } from "lucide-react";
import { appSettings } from "@/store/0-local-storage";
import { classNames, envBuildVersion, envModifiedDate } from "@/utils";
import { IconSunnyvale } from "../ui/icons";
import { Button } from "../ui/shadcn/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "../ui/shadcn/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/shadcn/dialog";

export function Section3_Footer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { themeMode } = useSnapshot(appSettings.appUi);
    const [showAboutDialog, setShowAboutDialog] = useState(false);

    const toggleTheme = () => {
        appSettings.appUi.themeMode = themeMode === 'dark' ? 'light' : 'dark';
    };

    return (
        <div className={classNames("relative pb-1 h-9 text-xs dark:bg-black dark:text-slate-600 border-t flex items-center justify-center overflow-hidden", className)} {...rest}>

            <a className={urlClasses} href="https://github.com/maxzz" target="_blank" rel="noopener">
                Created by Max Zakharzhevskiy
            </a>

            <IconSunnyvale
                className="pt-1 size-8 hover:scale-150 transition-all duration-300"
                title={`${envModifiedDate()}\n   Sunnyvale Produce\n\tVersion ${envBuildVersion()}`}
            />

            <a className={urlClasses} href="https://github.com/maxzz/ui-small-tests" target="_blank" rel="noopener">
                Open source code on GitHub
            </a>

            <div className="absolute right-0 bottom-0 pr-2 pb-1">
                <Dialog open={showAboutDialog} onOpenChange={setShowAboutDialog}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={toggleTheme}>
                                {themeMode === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                                {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setShowAboutDialog(true)}>
                                <Info className="mr-2 h-4 w-4" />
                                About
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>About UI Small Tests</DialogTitle>
                            <DialogDescription>
                                Version: {envBuildVersion()}
                                <br />
                                Date: {envModifiedDate()}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="text-sm">
                            <p>Created by Max Zakharzhevskiy</p>
                            <p className="mt-2">
                                <a href="https://github.com/maxzz/ui-small-tests" target="_blank" rel="noopener" className="underline hover:text-primary">
                                    Source code on GitHub
                                </a>
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
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
