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
        <div className="min-h-screen w-full bg-background text-foreground pt-260">
            <div className="mx-auto max-w-4xl">
                {/* Hero Section: inspirational quote + CTA button */}
                <div className="flex flex-col items-center justify-center min-h-[70vh] pt-100 px-4">
                    {/* Inspirational quote */}
                    <blockquote className="text-3xl md:text-4xl font-semibold italic text-center mb-4 ">
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
                        {/* FAQ Item 1: What is Study Time? */}
                        <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                What is Study Time?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Study Time is a student-focused planner app designed to help you
                                    manage your academic schedule and tasks effectively.It combines a
                                    visual weekly calendar with a dynamic to-do list to keep you organized.

                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* FAQ Item 2: Is Study Time free to use? */}
                        <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                Is Study Time free to use?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Yes,Study Time is a free application created to assist
                                    students in managing their time and tasks.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {/* FAQ Item 3: Who created Study Time? */}
                        <AccordionItem value="item-3" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                Who created Study Time?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    This app was developed by Jan Emmerson Mapanao,
                                    Mark Fermin Escanilla, Alex Ferrer, and
                                    Elaiza Praise Milana.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        {/* FAQ Item 4: How do I start using the app? */}
                        <AccordionItem value="item-4" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                How do I start using the app?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Simply open the app and click the"Start Planning"
                                    button on homepage to begin
                                    setting up your schedule.

                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        {/* FAQ Item 5: Can I customize my profile? */}
                        <AccordionItem value="item-5" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                Can I customize my profile?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Yes!In the Settings/Profile section, you can set your name,
                                    email, a short bio, and even choose a stock avatar or
                                    upload your own profile picture.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        {/* FAQ Item 6: How does the weekly calendar work? */}
                        <AccordionItem value="item-6" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                How does the weekly calendar work?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    The Study Planner provides a Monday-to-Sunday weekly view.
                                    You can drag and drop color-coded subjects into different
                                    time blocks to build your ideal schedule.

                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        {/* FAQ Item 7: HCan I edit my schedule after creating it? */}
                        <AccordionItem value="item-7" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                Can I edit my schedule after creating it?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Absolutely!The schedule is fully editable. You can move, add,
                                    or remove subjects from time blocks at any time.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        {/* FAQ Item 8:  What can I do with the Task List? */}
                        <AccordionItem value="item-8" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                What can I do with the Task List?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    You can:
                                    Create new to-do items (e.g., "Review Science")
                                    ,Set an optional due date for each task
                                    ,Mark tasks as completed when you're done
                                    and Filter your view to see tasks for "Today" or "All" tasks.

                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        {/* FAQ Item 9: How do I mark a task as done? */}
                        <AccordionItem value="item-9" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                How do I mark a task as done?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Each task item has a checkbox.Simply click
                                    the checkbox to mark the task as completed.

                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        {/* FAQ Item 10:Does the app have a Dark Mode? */}
                        <AccordionItem value="item-10" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                Does the app have a Dark Mode?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    Yes!You can toggle Dark Mode on or off in the Settings/Profile
                                    section to reduce eye strain in low-light conditions.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        {/* FAQ Item 11:What tool was used to design the app? */}
                        <AccordionItem value="item-10" className="border-b border-gray-200 dark:border-gray-700">
                            <AccordionTrigger className="py-4 text-base md:text-lg font-medium">
                                What tool was used to design the app?
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    The initial,mid-fidelity, and high-fidelity prototypes
                                    for Study Time were created using Visily.
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
                            <p>Mapanao, Jan Emmerson</p>
                            <p>Escanilla, Mark Fermin</p>
                        </div>
                        {/* Right column: team members */}
                        <div className="space-y-5 text-right md:text-left">
                            <p>Ferrer, Alex</p>
                            <p>Milana, Elaiza Praise</p>
                        </div>
                    </div>

                    {/* Adviser section (centered below team members) */}
                    <div className="mt-12 text-center">
                        <p className="font-medium">Adviser</p>
                        <p>Amy Natividad Paneda-Balcita</p>
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