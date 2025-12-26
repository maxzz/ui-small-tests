import { useState } from "react";
import { useSnapshot } from "valtio";
import { envBuildVersion, envModifiedDate } from "@/utils";
import { appSettings } from "@/store/0-local-storage";
import { Button } from "../ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, } from "../ui/shadcn/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "../ui/shadcn/dialog";
import { Moon, Sun, Info, MoreHorizontal } from "lucide-react";

export function FooterMenu() {
    const { themeMode } = useSnapshot(appSettings.appUi);
    const [showAboutDialog, setShowAboutDialog] = useState(false);

    const toggleTheme = () => {
        appSettings.appUi.themeMode = themeMode === 'dark' ? 'light' : 'dark';
    };

    return (
        <Dialog open={showAboutDialog} onOpenChange={setShowAboutDialog}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-6">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={toggleTheme}>
                        {themeMode === 'dark' ? <Sun className="mr-2 size-4" /> : <Moon className="mr-2 size-4" />}
                        {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowAboutDialog(true)}>
                        <Info className="mr-2 size-4" />
                        About
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className="max-w-80! pt-4 **:data-[slot='dialog-close']:focus:ring-0">
                <DialogHeader>
                    <DialogTitle className="text-sm">
                        About UI Small Tests
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Version: {envBuildVersion()} <br />
                        Date: {envModifiedDate()}
                    </DialogDescription>
                </DialogHeader>

                <div className="text-xs flex flex-col">
                    <p>Created by Max Zakharzhevskiy and Gemeni 3 Pro.</p>
                    <p className="mt-2 text-[.5rem]">... the time is gone, the song is over, thought I'd something more to say.</p>
                    <a className="mt-4 underline underline-offset-2 text-foreground/50 hover:text-foreground" href="https://github.com/maxzz/ui-small-tests" target="_blank" rel="noopener">
                        Source code on GitHub
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    );
}
