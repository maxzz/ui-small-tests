import { Demo_Dashboard } from "../2-main/1-pages/1-dashboard";

export function App() {
    return (
        <div className="min-h-screen grid place-items-center">
            <header>1</header>
            <div className="p-4 w-full max-w-7xl grid grid-rows-2 gap-4">
                <div className="bg-green-500">123</div>

                <Demo_Dashboard />
            </div>
            <footer>3</footer>
        </div>
    );
}
