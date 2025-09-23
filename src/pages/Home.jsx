import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import logo from "@/assets/logo.svg";
import playstore from "@/assets/playstore.png";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <blockquote className="text-3xl md:text-4xl font-semibold italic text-center max-w-2xl mb-4">
                    "The best way to predict the future is to create it."
                </blockquote>
                <div className="text-gray-500 mb-8">— Abraham Lincoln</div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-8 py-2 transition-colors mb-16">
                    Start Planning
                </button>
            </div>

            <div className="flex flex-col items-center justify-center mt-16 pt-16">
                <blockquote className="text-3xl md:text-4xl font-semibold italic text-center max-w-2xl mb-4">
                    Frequently Asked Questions
                </blockquote>
            </div>

            {/*Accordion Section*/}

            <div className="flex flex-col items-center justify-center w-full px-4 md:px-0">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-2xl"
                    defaultValue="item-1"
                >
                    <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="py-4 text-base md:text-lg font-medium">Why was this planner created?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                Our flagship product combines cutting-edge technology with sleek
                                design. Built with premium materials, it offers unparalleled
                                performance and reliability.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    {/* Other accordion items with the same class additions */}
                    <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="py-4 text-base md:text-lg font-medium">Who is the planner for?</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                Our flagship product combines cutting-edge technology with sleek
                                design. Built with premium materials, it offers unparalleled
                                performance and reliability.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="py-4 text-base md:text-lg font-medium">What makes this planner useful for students?</AccordionTrigger>
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <h2 className="text-2xl font-bold mb-8">Team Members</h2>
                <div className="grid grid-cols-2 gap-x-40 text-center md:text-left">
                    <div className="space-y-5">
                        <p>Mapanao, Jan Emmerson</p>
                        <p>Escanilla, Mark Fermin</p>
                    </div>

                    <div className="space-y-5 text-right md:text-left">
                        <p>Ferrer, Alex</p>
                        <p>Milana, Elaiza Praise Milana</p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="font-medium">Adviser</p>
                    <p>Amy Balcita</p>
                </div>
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
    )
}
