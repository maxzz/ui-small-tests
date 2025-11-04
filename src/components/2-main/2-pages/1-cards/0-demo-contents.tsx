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
import { type HoverStackEntry, printHoverStack, buildnewHoverStack } from "../8-mouse-tracker/7-process-hover-stack";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

export function DemoContents() {
    return (<>
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

    </>);
}