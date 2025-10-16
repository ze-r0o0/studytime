import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Calendar, Plus } from "lucide-react";
import { Search } from "lucide-react";


export default function TaskList() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-8 px-4">
            <h2 className="text-2xl font-semibold mb-2 text-left">Task List</h2>
            <p className="text-sm text-gray-500 mb-4 text-left">Add Task</p>

            <div className="border rounded-lg p-4 shadow-sm bg-background min-h-35">
                <div className="flex flex-row items-center justify-between gap-3">
                    {/* Subject dropdown */}
                    <div className="flex flex-col min-w-[120px]">
                        <label className="text-sm font-medium mb-1 text-left">Subject</label>
                        <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option>Dropdown</option>
                        </select>
                    </div>
                    {/* Date & Time */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <input
                            type="datetime-local"
                            defaultValue="2025-09-09T22:00"
                            className="outline-none text-sm"
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-3 pt-3">
                    {/* Task input */}
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="flex-1 border border-gray-200 bg-gray-50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    {/* Add Task button */}
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md px-4 py-2 transition">
                        <Plus className="w-4 h-4" />
                        Add Task
                    </button>
                </div>
            </div>

            <div className="flex flex-row mt-6 gap-4">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 w-full max-w-sm">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none text-sm text-gray-700 w-full"
                    />
                </div>
                <div className="flex flex-col min-w-[120px]">
                    <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Subject</option>
                    </select>
                </div>
                <label className="text-sm font-medium mb-1 text-left ml-auto">10 TASKS</label>
            </div>

            {/* Accordion Section */}
            <div className="w-full mt-8">
                <Accordion type="single" collapsible className="w-full -space-y-px" defaultValue="1">
                    <AccordionItem
                        value="1"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                            ALL (10)
                        </AccordionTrigger>
                        <AccordionContent className="pb-2 text-muted-foreground">
                            Our flagship product combines cutting-edge technology with sleek
                            design. Built with premium materials, it offers reliability and
                            performance.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="2"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                            NO DUE DATE (0)
                        </AccordionTrigger>
                        <AccordionContent className="pb-2 text-muted-foreground">
                            It's made for students and professionals who want structure and
                            productivity.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="3"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                            TODAY (10)
                        </AccordionTrigger>
                        <AccordionContent className="pb-2 text-muted-foreground">
                            It helps students manage time, set goals, and stay organized
                            easily.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            
        </div>
    );
}
