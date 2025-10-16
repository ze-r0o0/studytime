import logo from "@/assets/logo.svg";
import playstore from "@/assets/playstore.png";

export default function DarkModeToggle() {
    resizeTo(
        <footer className="w-full mt-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-6 py-6">

                {/* Left side */}
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

                {/* Right side */}
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

            {/* Bottom row */}
            <div className="border-t flex justify-between items-center px-6 py-4 text-xs text-gray-500">
                <p>© 2024 BSCS 3-1B. All rights reserved.</p>
                <p>Study Time™ </p>
            </div>
        </footer>
    )

}