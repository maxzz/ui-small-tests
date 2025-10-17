import { useAtomValue } from "jotai";
import { Demo_Dashboard } from "../2-main/1-pages/1-dashboard";
import { LeftList } from "../2-main/ui-main";
import { LeftItem } from "../2-main/ui-main/8-left-item-atom";
import { useMemo } from "react";
import { WelcomeHeroTitle } from "../2-main/1-pages/1-controls/1-text-effect/0-all";

export function App() {
    const leftItem = useAtomValue(LeftItem);
    console.log('leftItem', leftItem);

    const Dashboard = useMemo(
        () => {
            return <Demo_Dashboard />;
        }, []
    );

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
            <header className="px-4 py-3 bg-gray-100">
                1
            </header>

            <div className="place-self-center p-4 w-full max-w-7xl grid grid-cols-2 place-items-center gap-4">
                <LeftList />

                <div className="px-4 py-3 bg-gray-100">
                    {
                        leftItem === "public"
                            ? <WelcomeHeroTitle allowHandleFiles={true} />
                            : leftItem === "hero.png"
                                ? (<>{Dashboard}</>)
                                : <div className="bg-green-500">123</div>
                    }
                </div>
            </div>

            <footer className="px-4 py-3 bg-gray-100">
                3
            </footer>
        </div>
    );
}
