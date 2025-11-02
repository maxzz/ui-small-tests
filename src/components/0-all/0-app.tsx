import { Section1_Header } from "../1-header";
import { Section3_Footer } from "../3-footer";
import { LeftList } from "../2-main/1-left-list";
import { RenderDemo } from "./1-render-demo";

export function App() {
    return (
        <div className="h-screen grid grid-rows-[auto_1fr_auto]">
            <Section1_Header className="1bg-gray-100" />

            <div className="grid grid-cols-[250px_1fr] gap-4 overflow-hidden">
                <LeftList />
                <RenderDemo />
            </div>

            <footer className="bg-gray-100">
                <Section3_Footer />
            </footer>
        </div>
    );
}
