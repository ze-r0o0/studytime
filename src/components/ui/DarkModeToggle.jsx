// src/components/ui/DarkModeToggle.jsx
import { useDarkMode } from "../../lib/DarkModeContext.jsx";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
    const { enabled, setEnabled } = useDarkMode();

    return (
        <div className="w-full border dark:border-gray-700 rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm bg-white dark:bg-gray-800">
            {/* Left: icon + texts */}
            <div className="flex items-start gap-3">
                {enabled ? (
                    <Moon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                ) : (
                    <Sun className="w-5 h-5 text-yellow-500" />
                )}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800 dark:text-gray-100 text-left">
                        {enabled ? "Dark Mode" : "Light Mode"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-gray-400 mt-[2px]">
                        {enabled ? "Dark theme is enabled" : "Light theme is enabled"}
                    </span>
                </div>
            </div>
            {/* Right: toggle switch */}
            <button
                role="switch"
                aria-checked={enabled}
                onClick={() => setEnabled((s) => !s)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    enabled ? "bg-blue-600" : "bg-slate-200"
                }`}
            >
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                        enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </button>
        </div>
    );
}