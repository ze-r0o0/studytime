import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function StudyPlanner() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const times = Array.from({ length: 12 }, (_, i) => `${i + 7}:00`);

    return (
        <div className="max-w-7xl mx-auto pt-[350px] mt-8">
            <h2 className="text-3xl font-semibold text-left">Your Weekly Schedule</h2>
            <div className="flex items-center justify-between w-full border-b pb-3">

                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button className="border rounded-md p-1 hover:bg-gray-100">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="border rounded-md p-1 hover:bg-gray-100">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <span className="text-gray-700 text-sm font-medium">
              Aug 24 - Aug 30
            </span>
                    </div>
                </div>

                {/* Right Section */}
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm">
                    Edit
                </Button>
            </div>

            {/* Weekly Schedule Grid */}
            <div className="bg-background mt-6 rounded-lg shadow-md p-6">
                <div className="overflow-x-auto bg-white rounded-lg">
                    {/* Header Row */}
                    <div className="grid grid-cols-8 text-sm">
                        <div className="border-b border-r"></div>
                        {days.map((d, index) => (
                            <div key={d} className={`text-center font-semibold border-b py-3 text-blue-500 ${index < days.length - 1 ? 'border-r' : ''}`}>
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Time Rows */}
                    {times.map((t, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-8 border-b last:border-b-0 h-16">
                            <div className="flex items-start justify-start pl-2 pt-1 text-gray-600 text-xs border-r">
                                {t}
                            </div>
                            {days.map((d, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`relative hover:bg-gray-50 cursor-pointer ${colIndex < days.length - 1 ? 'border-r' : ''}`}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}