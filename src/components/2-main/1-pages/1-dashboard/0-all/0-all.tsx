import { AppSidebar } from "@/components/2-main/1-pages/1-dashboard/1-1-left-app-sidebar";
import { ChartAreaInteractive } from "@/components/2-main/1-pages/1-dashboard/2-3-right-chart-area-interactive";
import { DataTable } from "@/components/2-main/1-pages/1-dashboard/2-4-right-data-table";
import { SectionCards } from "@/components/2-main/1-pages/1-dashboard/2-2-right-section-cards";
import { SiteHeader } from "@/components/2-main/1-pages/1-dashboard/2-1-right-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/shadcn/sidebar";

import data from "../8-data.json";
import { classNames } from "@/utils";

export function Demo_Dashboard({className, ...rest}: React.ComponentProps<"iframe">) {
    return (
        <iframe
            src="/index-dashboard.html"
            className={classNames("w-full h-[600px] border rounded-lg shadow-lg", className)}
            title="Demo Dashboard"
            {...rest}
        />
    );
}

export function Dashboard() {
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
