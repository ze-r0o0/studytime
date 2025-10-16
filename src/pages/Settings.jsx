import {UserRound, Mail, FileText} from "lucide-react";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import logo from "@/assets/logo.svg";
import playstore from "@/assets/playstore.png";

export default function Settings() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-120 px-4">
            <div className="mx-auto max-w-4xl">
                <div className="flex flex-col min-h-[70vh] w-full">
                    <label className="text-4xl sm:text-2xl font-semibold text-left mb-2">
                        Profile Information
                    </label>
                    <p className="text-sm sm:text-base text-left mb-6 sm:mb-8">
                        Manage your personal details and profile picture.
                    </p>

                    {/* Profile Section */}
                    <div className="flex items-start gap-x-3 sm:gap-x-4 mb-8">
                        <div className="w-16 h-16 sm:w-26 sm:h-26 flex items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                            <UserRound className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500"/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base sm:text-lg font-semibold mb-2">Alex Johnson</span>
                            <button className="bg-white border-2 border-blue-500 hover:bg-blue-600 text-blue-600 font-medium rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <UserRound className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"/>
                        </div>
                        <span className="text-sm sm:text-base text-gray-600">Full Name</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-4 text-left">Alex Johnson</p>

                    {/* Email */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"/>
                        </div>
                        <span className="text-sm sm:text-base text-gray-600">Email</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-4 text-left">alexjohnson@gmail.com</p>

                    {/* Bio */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"/>
                        </div>
                        <span className="text-sm sm:text-base text-gray-600">Bio</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-8 text-left">
                        Student passionate about learning and productivity. Currently studying Computer Science and exploring new study techniques.
                    </p>

                    <hr className="h-px my-6 sm:my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                    {/* Theme Settings */}
                    <div className="flex flex-col mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-left mb-2">
                            Theme Settings
                        </h2>
                        <p className="text-sm sm:text-base text-left mb-4">
                            Adjust the application's visual theme.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6">
                        <DarkModeToggle initial={false} />
                    </div>

                    <hr className="h-px my-6  bg-gray-200 border-0 dark:bg-gray-700"/>
                </div>
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
            </div>
        </div>
    );
}
