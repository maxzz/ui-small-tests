import { Section1_Header } from "../1-header";
import { Section3_Footer } from "../3-footer";
import { LeftList } from "../2-main/1-left-list";
import { RenderDemo } from "./../2-main/2-right-view";
import { SidebarProvider } from "../ui/shadcn/sidebar";

export function App() {
    return (
        <div className="h-screen grid grid-rows-[auto_1fr_auto] debug-screens">
            <SidebarProvider>
                <LeftList />

                <main className="size-full overflow-hidden 1min-h-0">
                    <div className="size-full grid grid-rows-[auto_1fr_auto]">
                        <Section1_Header className="1bg-gray-100" />

                        <RenderDemo />
                        
                        <footer className="bg-gray-100">
                            <Section3_Footer />
                        </footer>
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}
