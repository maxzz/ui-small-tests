import { Demo_Dashboard } from "../2-main/1-pages/1-dashboard";

export function App() {
    return (
        <div className="min-h-screen p-4 1flex items-center justify-center">
            <div className="grid 1grid-rows-2 gap-4">
                <div className="bg-green-500">123</div>
                <div className="flex items-center justify-center gap-4">
                    <Demo_Dashboard />
                </div>
            </div>
        </div>
    );
}
