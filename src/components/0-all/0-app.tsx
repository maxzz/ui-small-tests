import { Demo_Dashboard } from "../2-main/1-pages/1-dashboard";

export function App() {
    return (
        <div className="min-h-screen p-4 flex items-center justify-center">
            <div className="grid grid-rows-2 gap-4 w-full max-w-4xl">
                <div className="h-12 bg-green-500">123</div>

                <iframe 
                    src="/demo.html" 
                    className="w-full h-[600px] border rounded-lg shadow-lg"
                    title="Demo Dashboard"
                />

            </div>
        </div>
    );
}
