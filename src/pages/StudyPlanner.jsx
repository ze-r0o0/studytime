import WeeklySchedule from "@/components/WeeklySchedule.jsx";
import logo from "@/assets/logo.svg";
import playstore from "@/assets/playstore.png";

export default function StudyPlanner() {
    return (
        <div className="max-w-7xl mx-auto pt-80 px-4 bg-background text-foreground">
            {/* Page-level title  */}
            <h1 className="text-3xl font-bold mb-6 text-left">Your Weekly Schedule</h1>
            {/* Calendar component  */}
            <WeeklySchedule />
            
            {/* Footer: logo, description, app store link, copyright */}
            <footer className="w-full mt-16">
                {/* Footer top section: logo + description + app store link */}
                <div className="flex flex-col md:flex-row items-start justify-between px-6 py-6">
                    {/* Logo and description */}
                    <div className="flex gap-4">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-10 h-10"
                        />
                        <p className="text-sm text-gray-600 max-w-xs text-left">
                            Study Time: A Web-Based Study Planner for Managing Time and Tasks
                        </p>
                    </div>
                    {/* App store download link */}
                    <div className="mt-4 md:mt-0">
                        <a href="#">
                            <img
                                src={playstore}
                                alt="Download on the App Store"
                                className="h-10"
                            />
                        </a>
                    </div>
                </div>

                {/* Footer bottom section: copyright and trademark */}
                <div className="border-t flex justify-between items-center px-6 py-4 text-xs text-gray-500">
                    <p>© 2024 BSCS 3-1B. All rights reserved.</p>
                    <p>Study Time™</p>
                </div>
            </footer>
        </div>

    );
}