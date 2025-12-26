import { type HTMLAttributes } from "react";
import { classNames, envBuildVersion, envModifiedDate } from "@/utils";
import { IconSunnyvale } from "../ui/icons";
import { FooterMenu } from "./2-footer-menu";
import { SidebarTrigger } from "../ui/shadcn/sidebar";
import { PanelLeftIcon } from "lucide-react";

export function Section3_Footer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("relative pb-1 h-9 text-xs bg-muted text-muted-foreground border-t flex items-center justify-center overflow-hidden", className)} {...rest}>

            <div className="absolute left-1 flex items-center">
                <SidebarTrigger />
                <PanelLeftIcon className="absolute size-5 left-1 fill-muted dark:stroke-muted-foreground stroke-1 pointer-events-none" />

                {/* <div className="text-[.5rem] hover:scale-150 transition-transform origin-left">
                    ... the time is gone, the song is over, thought I'd something more to say.
                </div> */}
            </div>


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
                <FooterMenu />
            </div>
        </div>
    );
}

const urlClasses = "\
origin-center \
underline-offset-3 \
hover:underline \
hover:text-primary-500 \
scale-y-50 \
hover:scale-y-125 \
transition-colors \
duration-1000 \
cursor-pointer";
