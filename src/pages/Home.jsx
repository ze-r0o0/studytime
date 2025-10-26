import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import logo from "@/assets/logo.svg";
import playstore from "@/assets/playstore.png";
import { Link } from "react-router-dom";

/*
  Home.jsx
  - Landing page for the Study Time planner application.
  - Features: hero section with quote, CTA button, FAQ accordion, team members section, footer.
  - Responsive design with mobile-first approach.
*/

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground pt-150">
            <div className="mx-auto max-w-4xl">
                {/* Hero Section: inspirational quote + CTA button */}
                <div className="flex flex-col items-center justify-center min-h-[70vh] pt-100 px-4">
                    {/* Inspirational quote */}
                    <blockquote className="text-3xl md:text-4xl font-semibold italic text-center mb-4 text-black">
                        "The best way to predict the future is to create it."
                    </blockquote>
                    {/* Quote attribution */}
                    <div className="text-gray-500 mb-8">— Abraham Lincoln</div>

                    {/* CTA button: navigates to Study Planner page */}
                    <Link to={"/StudyPlanner"}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-8 py-2 transition-colors mb-16">
                            Start Planning
                        </button>
                    </Link>
                </div>

                {/* FAQ Section Header */}
                <div className="flex flex-col items-center justify-center mt-16 pt-16 w-full px-4">
                    <blockquote className="text-3xl md:text-4xl font-semibold italic text-center mb-4">
                        Frequently Asked Questions
                    </blockquote>
                </div>

                {/* Accordion Section: FAQ items (collapsible) */}
                <div className="flex flex-col items-center justify-center w-full px-4">
                    <Accordion
                        type="single" // only one item can be open at a time
                        collapsible // allows closing the currently open item
                        className="w-full max-w-2xl"
                    >
                        {/* FAQ Item 1: Why was this planner created? */}
                        <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                Why was this planner created?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* FAQ Item 2: Who is the planner for? */}
                        <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                Who is the planner for?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* FAQ Item 3: What makes this planner useful for students? */}
                        <AccordionItem value="item-3" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                What makes this planner useful for students?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Our flagship product combines cutting-edge technology with sleek
                                    design. Built with premium materials, it offers unparalleled
                                    performance and reliability.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Team Members Section: displays team members and adviser */}
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 w-full">
                    <h2 className="text-2xl font-bold mb-8">Team Members</h2>

                    {/* Grid layout: 2 columns for team members */}
                    <div className="grid grid-cols-2 gap-x-40 text-center md:text-left">
                        {/* Left column: team members */}
                        <div className="space-y-5">
                            <p>Map</p>
                            <p>Esc</p>
                        </div>
                        {/* Right column: team members */}
                        <div className="space-y-5 text-right md:text-left">
                            <p>Fer</p>
                            <p>Mil</p>
                        </div>
                    </div>

                    {/* Adviser section (centered below team members) */}
                    <div className="mt-12 text-center">
                        <p className="font-medium">Adviser</p>
                        <p>Amy</p>
                    </div>
                </div>

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
        </div>
    )
}