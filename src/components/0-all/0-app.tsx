import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Section1_Header } from "../1-header";
import { Section3_Footer } from "../3-footer";
import { LeftList } from "../2-main/ui-main";
import { LeftItemAtom } from "../2-main/ui-main/8-left-item-atom";
import { HeroTitleText } from "../2-main/1-pages/1-controls/1-hero-title-text/0-all";
import { Demo_Dashboard } from "../2-main/1-pages/1-dashboard";

export function App() {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Section1_Header className="bg-gray-100" />

            <div className="p-4 w-full max-w-7xl grid grid-cols-[minmax(30%,1fr)_4fr] gap-4">
                <LeftList />

                <div className="px-4 py-3 bg-gray-100">
                    <RenderDemoComponent />
                </div>
            </div>

            <footer className="px-4 py-3 bg-gray-100">
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
        default:
            return <div className="bg-green-500">123</div>;
    }
}
