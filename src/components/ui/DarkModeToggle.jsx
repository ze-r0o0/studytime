// src/components/ui/DarkModeToggle.jsx
import { useDarkMode } from "../../lib/DarkModeContext.jsx";

export default function DarkModeToggle() {
    const { enabled, setEnabled } = useDarkMode();

    return (
        <div className="w-full border rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm">
            {/* Left: icon + texts */}
            <div className="flex items-start gap-3">
                <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M6.343 6.343 4.929 4.929M12 8a4 4 0 100 8 4 4 0 000-8z"
                    />
                </svg>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800 text-left">Dark Mode</span>
                    <span className="text-xs text-slate-500 mt-[2px]">
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
                    enabled ? "bg-indigo-600" : "bg-slate-200"
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
