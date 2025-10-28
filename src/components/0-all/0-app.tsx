import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Section1_Header } from "../1-header";
import { Section3_Footer } from "../3-footer";
import { LeftList } from "../2-main/ui-main";
import { LeftItemAtom } from "../2-main/ui-main/8-left-item-atom";
import { HeroTitleText } from "../2-main/1-pages/1-controls/1-hero-title-text/0-all";
import { Demo_Dashboard } from "../2-main/1-pages/1-dashboard";
import { ca } from "date-fns/locale";
import CardsDemo from "../2-main/1-pages/cards";
import { ScrollArea } from "../ui/shadcn/scroll-area";

export function App() {
    return (
        <div className="h-screen grid grid-rows-[auto_1fr_auto]">
            <Section1_Header className="bg-gray-100" />

            <div className="1max-w-7xl grid grid-cols-[minmax(30%,1fr)_4fr] gap-4 overflow-hidden">
                <LeftList />

                <div className="min-h-0 px-4 py-3 bg-gray-100">
                    <ScrollArea className="size-full">
                        <RenderDemoComponent />
                    </ScrollArea>
                </div>
            </div>

            <footer className="bg-gray-100">
                <Section3_Footer />
            </footer>
        </div>
    );
}

function RenderDemoComponent() {
    const leftItem = useAtomValue(LeftItemAtom);
    const Dashboard = useMemo(
        () => {
            return <Demo_Dashboard />;
        }, []
    );
    switch (leftItem) {
        case "Hero Title":
            return <HeroTitleText />;
        case "Dashboard":
            return <>{Dashboard}</>;
        case "Cards":
            return <CardsContainer />;
        default:
            return <div className="h-full bg-green-500/10">Space for rent</div>;
    }
}

function CardsContainer() {
    return (
        <div className="flex flex-col min-h-0 size-full">
            <CardsDemo />
        </div>
    );
}
