import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Plus, Search, Trash2, Clock, Check, X, AlertTriangle } from "lucide-react";
import { format, parseISO, isToday, isThisWeek, addDays, isBefore } from "date-fns";
import { RemoveConfirmModal, SaveConfirmModal } from "../components/ui/ConfirmModals.jsx";
import toast, { Toaster } from 'react-hot-toast';

// Subject options for dropdown
const subjectOptions = [
    "Computer Science",
    "Literature",
    "Biology",
    "Human Computer Interaction",
    "Study Planning",
    "Productivity",
    "Math",
    "Physics",
    "Chemistry",
    "History"
];

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const [activeTab, setActiveTab] = useState("1"); // Default to "ALL" tab

    // Modal states
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [taskToRemove, setTaskToRemove] = useState(null);

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Function to add a new task
    const addTask = () => {
        // Validate task title
        if (newTask.trim() === "") {
            toast.error('Please enter a task title', {
                icon: <AlertTriangle className="w-5 h-5" />,
                duration: 3000,
            });
            return;
        }

        // Validate subject selection (optional validation)
        if (selectedSubject.trim() === "") {
            toast.error('Please select a subject', {
                icon: <AlertTriangle className="w-5 h-5" />,
                duration: 3000,
            });
            return;
        }

        const newTaskItem = {
            id: Date.now().toString(),
            title: newTask,
            subject: selectedSubject,
            dueDate: dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTasks([...tasks, newTaskItem]);

        // Show success toast
        toast.success(`Task added: ${newTask}`, {
            icon: <Check className="w-5 h-5" />,
            duration: 2000,
        });

        // Clear input field after adding
        setNewTask("");
    };

    // Function to prompt before deleting a task
    const promptDeleteTask = (task) => {
        setTaskToRemove(task);
        setRemoveModalOpen(true);
    };

    // Function to actually delete the task
    const confirmDeleteTask = () => {
        if (!taskToRemove) return;

        // Store the task title before removing the task
        const removedTaskTitle = taskToRemove.title;

        // Remove the task
        setTasks(tasks.filter(task => task.id !== taskToRemove.id));

        // Close modal and clear taskToRemove
        setRemoveModalOpen(false);

        // Show removal notification with toast
        toast.success(`Task removed: ${removedTaskTitle}`, {
            icon: <Trash2 className="w-5 h-5" />,
            duration: 2000,
            style: {
                borderLeft: '4px solid #ef4444', // Red color for removal
            },
        });

        // Clear the taskToRemove state
        setTaskToRemove(null);
    };

    // Function to toggle task completion
    const toggleTaskComplete = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const newCompletedState = !task.completed;

                // Show toast based on the new completed state
                if (newCompletedState) {
                    toast.success(`Task completed: ${task.title}`, {
                        icon: <Check className="w-5 h-5" />,
                        duration: 2000,
                    });
                }

                return { ...task, completed: newCompletedState };
            }
            return task;
        }));
    };

    // Filter tasks based on search term and filter subject
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = filterSubject === "" || task.subject === filterSubject;
        return matchesSearch && matchesSubject;
    });

    // Group tasks by date categories
    const allTasks = filteredTasks;
    const noDateTasks = filteredTasks.filter(task => !task.dueDate);
    const todayTasks = filteredTasks.filter(task => task.dueDate && isToday(parseISO(task.dueDate)));
    const thisWeekTasks = filteredTasks.filter(task => {
        const taskDate = task.dueDate ? parseISO(task.dueDate) : null;
        return taskDate && isThisWeek(taskDate) && !isToday(taskDate);
    });
    const nextWeekTasks = filteredTasks.filter(task => {
        const taskDate = task.dueDate ? parseISO(task.dueDate) : null;
        if (!taskDate) return false;
        const nextWeekStart = addDays(new Date(), 7);
        const nextWeekEnd = addDays(new Date(), 14);
        return taskDate >= nextWeekStart && taskDate <= nextWeekEnd;
    });
    const laterTasks = filteredTasks.filter(task => {
        const taskDate = task.dueDate ? parseISO(task.dueDate) : null;
        if (!taskDate) return false;
        const twoWeeksLater = addDays(new Date(), 14);
        return taskDate > twoWeeksLater;
    });

    // Format date for display
    const formatTaskDate = (dateString) => {
        if (!dateString) return "";
        const date = parseISO(dateString);
        return format(date, "MMM dd, yyyy h:mm a");
    };

    // Calculate due status
    const getDueStatus = (dateString) => {
        if (!dateString) return null;
        const date = parseISO(dateString);
        const now = new Date();

        if (isBefore(date, now)) {
            return { text: "Overdue", className: "text-red-500" };
        }

        const daysUntil = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

        if (daysUntil <= 1) {
            return { text: `Due in ${daysUntil} day`, className: "text-orange-500" };
        } else if (daysUntil <= 3) {
            return { text: `Due in ${daysUntil} days`, className: "text-yellow-500" };
        }

        return { text: `Due in ${daysUntil} days`, className: "text-gray-500" };
    };

    // Render task items for a given list
    const renderTaskItems = (taskList) => {
        return taskList.map(task => (
            <div key={task.id} className="border-b py-3 px-1 flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskComplete(task.id)}
                    className="w-5 h-5 rounded border-gray-300"
                />

                <div className="flex-1">
                    <div className={`font-medium text-left ${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                    </div>
                    <div className="flex flex-wrap gap-x-4 text-xs text-gray-500 mt-1">
                        {task.subject && (
                            <span className="flex items-center gap-1">
                                <span>📚</span> {task.subject}
                            </span>
                        )}
                        {task.dueDate && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {formatTaskDate(task.dueDate)}
                            </span>
                        )}
                        {task.dueDate && (
                            <span className={getDueStatus(task.dueDate).className}>
                                {getDueStatus(task.dueDate).text}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => promptDeleteTask(task)}
                    className="text-gray-400 hover:text-red-500 p-1"
                    aria-label="Delete task"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        ));
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 px-4">
            {/* Toast container */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    className: '',
                    style: {
                        padding: '16px',
                        borderRadius: '8px',
                        background: '#fff',
                        color: '#333',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                }}
            />

            <h2 className="text-2xl font-semibold mb-2 text-left">Task List</h2>
            <p className="text-sm text-gray-500 mb-4 text-left">Add Task</p>

            <div className="border rounded-lg p-4 shadow-sm bg-background">
                <div className="flex flex-row items-center justify-between gap-3">
                    {/* Subject dropdown */}
                    <div className="flex flex-col min-w-[120px]">
                        <label className="text-sm font-medium mb-1 text-left">Subject</label>
                        <select
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="">Select subject</option>
                            {subjectOptions.map(subject => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>
                    {/* Date & Time */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="outline-none text-sm"
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-3 pt-3">
                    {/* Task input */}
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addTask();
                        }}
                        className="flex-1 border border-gray-200 bg-gray-50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    {/* Add Task button */}
                    <button
                        onClick={addTask}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md px-4 py-2 transition"
                    >
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent outline-none text-sm text-gray-700 w-full"
                    />
                </div>
                <div className="flex flex-col min-w-[120px]">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                    >
                        <option value="">All Subjects</option>
                        {subjectOptions.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>
                </div>
                <label className="text-sm font-medium mb-1 text-left ml-auto">
                    {filteredTasks.length} TASKS
                </label>
            </div>

            {/* Accordion Section */}
            <div className="w-full mt-8">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full -space-y-px"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <AccordionItem
                        value="1"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 font-black">
                            ALL ({allTasks.length})
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                            {allTasks.length > 0 ? (
                                <div className="space-y-1">
                                    {renderTaskItems(allTasks)}
                                </div>
                            ) : (
                                <div className="text-gray-500 py-2 text-center">No tasks found</div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="2"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 font-black">
                            NO DUE DATE ({noDateTasks.length})
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                            {noDateTasks.length > 0 ? (
                                <div className="space-y-1">
                                    {renderTaskItems(noDateTasks)}
                                </div>
                            ) : (
                                <div className="text-gray-500 py-2 text-center">No tasks without due date</div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="3"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 font-black">
                            TODAY ({todayTasks.length})
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                            {todayTasks.length > 0 ? (
                                <div className="space-y-1">
                                    {renderTaskItems(todayTasks)}
                                </div>
                            ) : (
                                <div className="text-gray-500 py-2 text-center">No tasks due today</div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="4"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 font-black">
                            THIS WEEK ({thisWeekTasks.length})
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                            {thisWeekTasks.length > 0 ? (
                                <div className="space-y-1">
                                    {renderTaskItems(thisWeekTasks)}
                                </div>
                            ) : (
                                <div className="text-gray-500 py-2 text-center">No tasks due this week</div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="5"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 font-black">
                            NEXT WEEK ({nextWeekTasks.length})
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                            {nextWeekTasks.length > 0 ? (
                                <div className="space-y-1">
                                    {renderTaskItems(nextWeekTasks)}
                                </div>
                            ) : (
                                <div className="text-gray-500 py-2 text-center">No tasks due next week</div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                        value="6"
                        className="relative border bg-background px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0 font-black">
                            LATER ({laterTasks.length})
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                            {laterTasks.length > 0 ? (
                                <div className="space-y-1">
                                    {renderTaskItems(laterTasks)}
                                </div>
                            ) : (
                                <div className="text-gray-500 py-2 text-center">No tasks due later</div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Remove Confirmation Modal using your imported component */}
            <RemoveConfirmModal
                isOpen={removeModalOpen}
                onClose={() => setRemoveModalOpen(false)}
                onConfirm={confirmDeleteTask}
                subject="task"
            />
        </div>
    );
}