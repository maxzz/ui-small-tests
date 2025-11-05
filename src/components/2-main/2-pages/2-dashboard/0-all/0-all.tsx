import { AppSidebar } from "@/components/2-main/2-pages/2-dashboard/1-1-left-app-sidebar";
import { SiteHeader } from "@/components/2-main/2-pages/2-dashboard/2-1-right-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/shadcn/sidebar";

import { classNames } from "@/utils";
import { DashboardContents } from "../../2-demo-contents/2-dashboard/0-dashboard-contents";

export function Demo_Dashboard({ className, ...rest }: React.ComponentProps<"iframe">) {
    return (
        <iframe
            src="index-dashboard.html"
            className={classNames("size-full border rounded-lg shadow-lg", className)}
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
                    <DashboardContents />
                </div>

            </SidebarInset>

        </SidebarProvider>
    );
}
