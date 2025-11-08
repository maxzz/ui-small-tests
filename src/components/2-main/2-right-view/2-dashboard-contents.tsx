import { SectionCards, ChartAreaInteractive, DataTable } from "../3-pages/1-demo-contents/2-dashboard";
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
