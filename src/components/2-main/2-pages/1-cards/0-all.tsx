import { type MouseEvent, useCallback, useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/0-local-storage";
import { CardsActivityGoal } from "./2-2-activity-goal";
import { CardsCalendar } from "./2-1-calendar";
import { CardsChat } from "./3-6-chat";
import { CardsCookieSettings } from "./3-3-cookie-settings";
import { CardsCreateAccount } from "./3-5-create-account";
import { CardsExerciseMinutes } from "./2-3-exercise-minutes";
import { CardsForms } from "./3-1-forms";
import { CardsPayments } from "./4-1-payments";
import { CardsReportIssue } from "./3-8-report-issue";
import { CardsShare } from "./5-0-share";
import { CardsStats } from "./1-1,2-stats";
import { CardsTeamMembers } from "./3-2-team-members";
import { DatePickerWithRange } from "./3-7-date-picker-with-range";
import { GithubCard } from "./3-4-github-card";
import { type HoverStackEntry, printHoverStack, processHoverStack } from "./processHoverStack";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

export function CardsDemo() {
    const { zoom } = useSnapshot(appSettings.appUi);
    const hoverStackRef = useRef<HoverStackEntry[]>([]);
    const [hoverStack, setHoverStack] = useState<HoverStackEntry[]>([]);
    const [mousePos, setMousePos] = useState<{ x: number; y: number; } | null>(null);

    const handleMouseMove = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            const zOrderedElements = processHoverStack(event.clientX, event.clientY, event.currentTarget, hoverStackRef);
            setMousePos({ x: event.clientX, y: event.clientY });
            if (zOrderedElements?.length) {
                setHoverStack(zOrderedElements);
                printHoverStack(zOrderedElements);
            } else if (hoverStackRef.current.length === 0) {
                setHoverStack([]);
            }
        }, []
    );

    const handleMouseLeave = useCallback(() => {
        hoverStackRef.current = [];
        setHoverStack([]);
        setMousePos(null);
    }, []);

    const tooltipContent = useMemo(() => {
        if (hoverStack.length === 0) {
            return "";
        }

        return formatHoverStackTooltip(hoverStack);
    }, [hoverStack]);

    return (
        <Tooltip open={hoverStack.length > 0 && !!mousePos}>
            <TooltipTrigger asChild>
                <div
                    className={classNames("@3xl:grids-col-2 grid p-2 **:data-[slot=card]:shadow-none md:p-4 @3xl:gap-4 @5xl:grid-cols-10 @7xl:grid-cols-11", zoom === 0.5 ? "scale-50 origin-top-left" : "scale-100")}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >

                    <div className="grid gap-4 @5xl:col-span-4 @7xl:col-span-6">
                        {/* <div className="grid gap-4 @xl:grid-cols-2 @5xl:grid-cols-1 @7xl:grid-cols-2">
                            <CardsStats />
                        </div> */}

                        {/* <div className="grid gap-1 @2xl:grid-cols-[auto_1fr] @3xl:hidden">
                            <CardsCalendar />
                            <div className="@2xl:pt-0 @2xl:pl-3 @7xl:pl-4">
                                <CardsActivityGoal />
                            </div>
                            <div className="pt-3 @2xl:col-span-2 @7xl:pt-4">
                                <CardsExerciseMinutes />
                            </div>
                        </div> */}

                        <div className="grid gap-4 @3xl:grid-cols-2 @5xl:grid-cols-1 @7xl:grid-cols-2">
                            <div className="flex flex-col gap-4">
                                <CardsForms />
                                <CardsTeamMembers />
                                <CardsCookieSettings />
                                <div className="hidden flex-col gap-4 @7xl:flex">
                                    <GithubCard />
                                    <DatePickerWithRange />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 pb-4">
                                <CardsCreateAccount />
                                <CardsChat />
                                <GithubCard />
                                <DatePickerWithRange />

                                <div className="hidden @7xl:block">
                                    <CardsReportIssue />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 @5xl:col-span-6 @7xl:col-span-5">
                        <div className="hidden gap-1 @2xl:grid-cols-[auto_1fr] @3xl:grid">
                            <CardsCalendar />
                            {/* <div className="pt-3 @2xl:pt-0 @2xl:pl-3 @7xl:pl-4">
                                <CardsActivityGoal />
                            </div>
                            <div className="pt-3 @2xl:col-span-2 @7xl:pt-3">
                                <CardsExerciseMinutes />
                            </div> */}
                        </div>
                        <div className="hidden @3xl:block">
                            <CardsPayments />
                        </div>
                        <CardsShare />
                        <div className="@7xl:hidden">
                            <CardsReportIssue />
                        </div>
                    </div>

                </div>
            </TooltipTrigger>
            <TooltipContent side="right" align="start" className="max-h-dvh whitespace-pre text-left p-0">
                <ScrollArea className="max-h-[80dvh] max-w-[320px] p-2">
                    {tooltipContent}
                </ScrollArea>
            </TooltipContent>
        </Tooltip>
    );
}

function formatHoverStackTooltip(stack: HoverStackEntry[]): string {
    return stack
        .map(
            (entry, index) => {
                const classes = entry.classes.length > 0
                    ? `\n\t${entry.classes.join("\n\t")}`
                    : "\n\t(no classes)";
                return `${index + 1}. [${entry.dataSlot}]${classes}`;
            }
        )
        .join("\n");
}
