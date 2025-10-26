import WeeklySchedule from "@/components/ui/WeeklySchedule";

export default function StudyPlanner() {
    return (
        <div className="max-w-7xl mx-auto pt-80 px-4">
            {/* Page-level title  */}
            <h1 className="text-3xl font-bold mb-6 text-left">Your Weekly Schedule</h1>

            {/* Calendar component  */}
            <WeeklySchedule />
        </div>
    );
}