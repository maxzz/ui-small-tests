import { ChartAreaInteractive, DataTable, TotalRevenueCard, ActiveAccountsCard, GrowthRateCard, NewCustomersCard } from "../3-pages/1-demo-contents/2-dashboard";
import data from "../3-pages/1-demo-contents/2-dashboard/8-data.json";

export function DashboardContents() {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />

                <div className="px-4 lg:px-6">
                    <ChartAreaInteractive />
                </div>
                
                <DataTable data={data} />
            </div>
        </div>
    );
}

function SectionCards() {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <TotalRevenueCard />
            <NewCustomersCard />
            <ActiveAccountsCard />
            <GrowthRateCard />
        </div>
    );
}
