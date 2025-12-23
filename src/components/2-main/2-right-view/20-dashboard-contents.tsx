import { classNames } from "@/utils";
import { ChartAreaInteractive, DataTable, TotalRevenueCard, ActiveAccountsCard, GrowthRateCard, NewCustomersCard } from "../3-pages/1-demo-contents/2-dashboard";
import data from "../3-pages/1-demo-contents/2-dashboard/8-data.json";

export function DashboardContents({ className }: { className?: string }) {
    return (
        <div className={classNames("@container/main flex-1 flex flex-col gap-2", className)}>
            <div className="py-4 md:py-6 flex flex-col gap-4 md:gap-6">

                <div className={cardsClasses}>
                    <TotalRevenueCard />
                    <NewCustomersCard />
                    <ActiveAccountsCard />
                    <GrowthRateCard />
                </div>

                <div className="px-4 lg:px-6">
                    <ChartAreaInteractive />
                </div>

                <DataTable data={data} />
            </div>
        </div>
    );
}

const cardsClasses = "\
px-4 lg:px-6 \
\
dark:*:data-[slot=card]:bg-card \
*:data-[slot=card]:bg-linear-to-t \
*:data-[slot=card]:from-primary/5 \
*:data-[slot=card]:to-card \
*:data-[slot=card]:shadow-xs \
\
grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 gap-4";
