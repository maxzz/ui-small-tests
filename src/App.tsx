export function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Tailwind CSS v4 🎨
                </h1>
                <p className="text-gray-600 mb-4">
                    Successfully configured with Vite using the official{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-indigo-600">
                        @tailwindcss/vite
                    </code>{' '}
                    plugin.
                </p>
                <div className="flex gap-2">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition">
                        Primary
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition">
                        Secondary
                    </button>
                </div>
            </div>
        </div>
    );
}
