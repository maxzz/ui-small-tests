import { type MouseEvent, useCallback, useRef } from "react";
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

type HoverStackEntry = {
    dataSlot: string;
    classes: string[];
};

export function CardsDemo() {
    const { zoom } = useSnapshot(appSettings.appUi);
    const hoverStackRef = useRef<HoverStackEntry[]>([]);

    const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const elementsAtPoint = document.elementsFromPoint(event.clientX, event.clientY);
        const zOrderedElements: HoverStackEntry[] = [];
        let reachedRoot = false;

        for (const element of elementsAtPoint) {
            if (!(element instanceof HTMLElement)) {
                continue;
            }

            const slotValue = element.getAttribute("data-slot");
            if (slotValue !== null) {
                zOrderedElements.push(describeElement(element, slotValue));
            }

            if (element === event.currentTarget) {
                reachedRoot = true;
                break;
            }
        }

        if (!reachedRoot) {
            return;
        }

        if (!areStacksEqual(hoverStackRef.current, zOrderedElements)) {
            hoverStackRef.current = zOrderedElements;
            console.log("hoverStack", JSON.stringify(zOrderedElements, null, 2));
        }
    }, []);

    return (
        <div
            className={classNames("@3xl:grids-col-2 grid p-2 **:data-[slot=card]:shadow-none md:p-4 @3xl:gap-4 @5xl:grid-cols-10 @7xl:grid-cols-11", zoom === 0.5 ? "scale-50 origin-top-left" : "scale-100")}
            onMouseMove={handleMouseMove}
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
    );
}

function describeElement(element: HTMLElement, slotValue: string): HoverStackEntry {
    const classes = Array.from(element.classList);
    return {
        dataSlot: slotValue,
        classes,
    };
}

function areStacksEqual(prev: HoverStackEntry[], next: HoverStackEntry[]): boolean {
    if (prev.length !== next.length) {
        return false;
    }

    for (let index = 0; index < prev.length; index += 1) {
        const prevEntry = prev[index];
        const nextEntry = next[index];

        if (prevEntry.dataSlot !== nextEntry.dataSlot) {
            return false;
        }

        if (prevEntry.classes.length !== nextEntry.classes.length) {
            return false;
        }

        for (let classIndex = 0; classIndex < prevEntry.classes.length; classIndex += 1) {
            if (prevEntry.classes[classIndex] !== nextEntry.classes[classIndex]) {
                return false;
            }
        }

        if (prevEntry.classes.length === 0 && nextEntry.classes.length === 0) {
            continue;
        }

        if (prevEntry.classes.length === 0 || nextEntry.classes.length === 0) {
            return false;
        }
    }

    return true;
}
