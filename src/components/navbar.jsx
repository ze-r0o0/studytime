import { useState, useEffect } from "react";
import logo from "@/assets/logo.svg";
import { User, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
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

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b px-2 sm:px-4 md:px-6 lg:px-8 transition-colors duration-300 bg-white dark:bg-background">
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
                                <Menu className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-36 p-1 sm:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem key={index} className="w-full">
                                            <Link
                                                to={link.path}
                                                className="block py-1.5 w-full text-sm hover:text-primary"
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Main nav */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                        <Link to="/" className="text-primary hover:text-primary/90">
                            <img src={logo} alt="Logo" className="h-6 sm:h-7 md:h-8 w-auto" />
                        </Link>

                        {/* Navigation menu */}
                        <NavigationMenu className="max-sm:hidden">
                            <NavigationMenuList className="gap-1 sm:gap-2 md:gap-3">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        <Link
                                            to={link.path}
                                            className="py-1 sm:py-1.5 px-2 sm:px-3 text-sm sm:text-base font-medium inline-block text-muted-foreground hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                {/* Right side */}
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                </div>

            </div>
        </header>
    )
}