import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Section1_Header } from "../1-header";
import { Section3_Footer } from "../3-footer";
import { LeftList } from "../2-main/1-left-list";
import { LeftItemAtom } from "../../store/left-list/8-left-item-atom";
import { HeroTitleText } from "../2-main/2-pages/3-controls/1-hero-title-text/0-all";
import { Demo_Dashboard } from "../2-main/2-pages/2-dashboard";
import { CardsDemo } from "../2-main/2-pages/1-cards";
import { ScrollArea } from "../ui/shadcn/scroll-area";

export function App() {
    return (
        <div className="h-screen grid grid-rows-[auto_1fr_auto]">
            <Section1_Header className="1bg-gray-100" />

            <div className="grid grid-cols-[250px_1fr] gap-4 overflow-hidden">
                <LeftList />

                <div className="@container min-h-0 px-4 py-3 bg-gray-100 1scale-50 origin-top-left">
                    <RenderDemoComponent />
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
            return <div className="size-full">
                <Demo_Dashboard />
            </div>;
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
            return <div className="px-4 py-2 h-full text-xs text-green-950 bg-green-500/10 uppercase">Space for rent</div>;
    }
}

function CardsContainer() {
    return (
        <ScrollArea className="size-full bg-pink-100">
            <CardsDemo />
        </ScrollArea>
    );
}
