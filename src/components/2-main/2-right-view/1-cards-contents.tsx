import { CardsForms, CardsTeamMembers, CardsCookieSettings, GithubCard, DatePickerWithRange, CardsCreateAccount, CardsChat, CardsReportIssue, CardsCalendar, CardsPayments, CardsShare, CardsStats, CardsActivityGoal, CardsExerciseMinutes } from "../3-pages/1-demo-contents/1-cards";

export function CardsContents() {
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
