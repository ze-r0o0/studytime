import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { UserRound, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";

const navigationLinks = [
    { path: "/Home", label: "Home" },
    { path: "/StudyPlanner", label: "Study Planner" },
    { path: "/TaskList", label: "Task List" },
    { path: "/Settings", label: "Settings" },
];

export default function Component() {
    const [, setScrolled] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [userName, setUserName] = useState("User");
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Load profile picture and name from localStorage
    useEffect(() => {
        const loadProfileData = () => {
            const preview = localStorage.getItem("preview");
            const selectedAvatar = localStorage.getItem("selectedAvatar");
            const profileData = localStorage.getItem("profileFormData");

            setProfilePicture(preview || selectedAvatar || null);

            if (profileData) {
                const parsedData = JSON.parse(profileData);
                // Get first name only (split by space and take first part)
                const firstName = parsedData.fullName?.split(' ')[0] || "User";
                setUserName(firstName);
            }
        };

        loadProfileData();

        // Listen for storage changes (when profile is updated in Settings)
        window.addEventListener("storage", loadProfileData);

        // Custom event for same-tab updates
        window.addEventListener("profileUpdated", loadProfileData);

        return () => {
            window.removeEventListener("storage", loadProfileData);
            window.removeEventListener("profileUpdated", loadProfileData);
        };
    }, []);

    // Helper function to check if link is active
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b dark:border-gray-700 px-2 sm:px-4 md:px-6 lg:px-8 transition-colors duration-300 bg-white dark:bg-gray-900">
            <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4">
                {/* Left side */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-7 sm:size-8 sm:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <Menu className="size-4 text-gray-900 dark:text-gray-100" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-36 p-1 sm:hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <nav className="flex flex-col gap-1">
                                {navigationLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.path}
                                        className={`block py-2 px-3 w-full text-sm rounded-md transition-colors ${
                                            isActiveLink(link.path)
                                                ? "bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-white font-semibold"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </PopoverContent>
                    </Popover>
                    {/* Main nav */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                        <Link to="/" className="text-primary hover:text-primary/90">
                            <img src={logo} alt="Logo" className="h-6 sm:h-7 md:h-8 w-auto" />
                        </Link>

                        {/* Navigation menu - Desktop */}
                        <nav className="max-sm:hidden">
                            <ul className="flex items-center gap-1 sm:gap-2 md:gap-3">
                                {navigationLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.path}
                                            className={`py-1 sm:py-1.5 px-2 sm:px-3 text-sm sm:text-base font-medium inline-block rounded-md transition-colors ${
                                                isActiveLink(link.path)
                                                    ? "bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-white font-semibold"
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
                {/* Right side - User greeting and avatar */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Greeting text - hidden on very small screens */}
                    <span className="hidden sm:block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                        Hello, <span className="text-gray-900 dark:text-white font-semibold">{userName}</span>
                    </span>
                    {/* Profile avatar */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 overflow-hidden flex-shrink-0">
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <UserRound className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 dark:text-blue-400" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}