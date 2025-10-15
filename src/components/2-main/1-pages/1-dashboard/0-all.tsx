import { AppSidebar } from "@/components/2-main/1-pages/1-dashboard/11-left-app-sidebar";
import { ChartAreaInteractive } from "@/components/2-main/1-pages/1-dashboard/23-right-chart-area-interactive";
import { DataTable } from "@/components/2-main/1-pages/1-dashboard/24-right-data-table";
import { SectionCards } from "@/components/2-main/1-pages/1-dashboard/22-right-section-cards";
import { SiteHeader } from "@/components/2-main/1-pages/1-dashboard/21-right-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/shadcn/sidebar";

import data from "./8-data.json";

export function Demo_Dashboard() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />

            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive />
                            </div>
                            <DataTable data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>

        </SidebarProvider>
    );
}
