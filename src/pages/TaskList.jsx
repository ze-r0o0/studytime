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

/*
  TaskList.jsx
  - A task management component with localStorage persistence.
  - Features: add tasks with subject + due date, filter/search, categorize by date range (today, this week, next week, later).
  - Uses accordion UI for collapsible task groups.
  - Toast notifications for add/complete/remove actions.
*/

// Predefined subject options for the dropdown
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
    // State: tasks array loaded from localStorage on mount (or empty array if none)
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    // State: form inputs for adding a new task
    const [newTask, setNewTask] = useState(""); // task title
    const [selectedSubject, setSelectedSubject] = useState(""); // chosen subject
    const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm")); // default to current date/time

    // State: filtering and search
    const [searchTerm, setSearchTerm] = useState(""); // text search across title/subject
    const [filterSubject, setFilterSubject] = useState(""); // dropdown filter by subject
    const [activeTab, setActiveTab] = useState("1"); // currently open accordion item (1 = ALL)

    // State: modals
    const [removeModalOpen, setRemoveModalOpen] = useState(false); // confirm delete modal visibility
    const [taskToRemove, setTaskToRemove] = useState(null); // task pending removal

    // Effect: save tasks to localStorage whenever tasks array changes (persist on every update)
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Function: add a new task (validates title and subject, then appends to tasks array)
    const addTask = () => {
        // Validate task title
        if (newTask.trim() === "") {
            toast.error('Please enter a task title', {
                icon: <AlertTriangle className="w-5 h-5" />,
                duration: 3000,
            });
            return;
        }

        // Validate subject selection
        if (selectedSubject.trim() === "") {
            toast.error('Please select a subject', {
                icon: <AlertTriangle className="w-5 h-5" />,
                duration: 3000,
            });
            return;
        }

        // Create new task object with unique ID (timestamp)
        const newTaskItem = {
            id: Date.now().toString(),
            title: newTask,
            subject: selectedSubject,
            dueDate: dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // Add to tasks array
        setTasks([...tasks, newTaskItem]);

        // Show success toast
        toast.success(`Task added: ${newTask}`, {
            icon: <Check className="w-5 h-5" />,
            duration: 2000,
        });

        // Reset form (only clear title; subject/date remain for convenience)
        setNewTask("");
    };

    // Function: open the remove confirmation modal for a given task
    const promptDeleteTask = (task) => {
        setTaskToRemove(task);
        setRemoveModalOpen(true);
    };

    // Function: confirm and delete the task (called from modal)
    const confirmDeleteTask = () => {
        if (!taskToRemove) return;

        const removedTaskTitle = taskToRemove.title;
        // Remove from tasks array by filtering out the matching ID
        setTasks(tasks.filter(task => task.id !== taskToRemove.id));
        setRemoveModalOpen(false);

        // Show success toast with red accent
        toast.success(`Task removed: ${removedTaskTitle}`, {
            icon: <Trash2 className="w-5 h-5" />,
            duration: 2000,
            style: {
                borderLeft: '4px solid #ef4444',
            },
        });

        setTaskToRemove(null);
    };

    // Function: toggle completed status of a task (checkbox click)
    const toggleTaskComplete = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const newCompletedState = !task.completed;

                // Show toast only when marking complete (not when unchecking)
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

    // Derived: filtered tasks based on search term and subject filter
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = filterSubject === "" || task.subject === filterSubject;
        return matchesSearch && matchesSubject;
    });

    // Derived: categorized task lists (used in accordion sections)
    const allTasks = filteredTasks; // all tasks (no additional filter)
    const noDateTasks = filteredTasks.filter(task => !task.dueDate); // tasks without due date
    const todayTasks = filteredTasks.filter(task => task.dueDate && isToday(parseISO(task.dueDate))); // tasks due today
    const thisWeekTasks = filteredTasks.filter(task => {
        const taskDate = task.dueDate ? parseISO(task.dueDate) : null;
        return taskDate && isThisWeek(taskDate) && !isToday(taskDate); // this week (excluding today)
    });
    const nextWeekTasks = filteredTasks.filter(task => {
        const taskDate = task.dueDate ? parseISO(task.dueDate) : null;
        if (!taskDate) return false;
        const nextWeekStart = addDays(new Date(), 7);
        const nextWeekEnd = addDays(new Date(), 14);
        return taskDate >= nextWeekStart && taskDate <= nextWeekEnd; // 7-14 days from now
    });
    const laterTasks = filteredTasks.filter(task => {
        const taskDate = task.dueDate ? parseISO(task.dueDate) : null;
        if (!taskDate) return false;
        const twoWeeksLater = addDays(new Date(), 14);
        return taskDate > twoWeeksLater; // more than 14 days from now
    });

    // Helper: format date string for display (e.g., "Jan 15, 2025 3:30 PM")
    const formatTaskDate = (dateString) => {
        if (!dateString) return "";
        const date = parseISO(dateString);
        return format(date, "MMM dd, yyyy h:mm a");
    };

    // Helper: calculate due status (overdue, due in X days) and return text + color class
    const getDueStatus = (dateString) => {
        if (!dateString) return null;
        const date = parseISO(dateString);
        const now = new Date();

        // Overdue: date is in the past
        if (isBefore(date, now)) {
            return { text: "Overdue", className: "text-red-500" };
        }

        // Calculate days until due
        const daysUntil = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

        // Color code by urgency
        if (daysUntil <= 1) {
            return { text: `Due in ${daysUntil} day`, className: "text-orange-500" };
        } else if (daysUntil <= 3) {
            return { text: `Due in ${daysUntil} days`, className: "text-yellow-500" };
        }

        return { text: `Due in ${daysUntil} days`, className: "text-gray-500" };
    };

    // Helper: render task items for a given list (used in accordion content)
    const renderTaskItems = (taskList) => {
        return taskList.map(task => (
            <div key={task.id} className="border-b py-3 px-1 flex items-center gap-2">
                {/* Checkbox: toggle completed status */}
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskComplete(task.id)}
                    className="w-5 h-5 rounded border-gray-300"
                />

                {/* Task details */}
                <div className="flex-1">
                    <div className={`font-medium text-left ${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                    </div>
                    <div className="flex flex-wrap gap-x-4 text-xs text-gray-500 mt-1">
                        {/* Subject badge */}
                        {task.subject && (
                            <span className="flex items-center gap-1">
                                <span>📚</span> {task.subject}
                            </span>
                        )}
                        {/* Due date */}
                        {task.dueDate && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {formatTaskDate(task.dueDate)}
                            </span>
                        )}
                        {/* Due status (overdue, due in X days) */}
                        {task.dueDate && (
                            <span className={getDueStatus(task.dueDate).className}>
                                {getDueStatus(task.dueDate).text}
                            </span>
                        )}
                    </div>
                </div>

                {/* Delete button: opens confirmation modal */}
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
            {/* Toast notification container (bottom-right) */}
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

            {/* Page title and subtitle */}
            <h2 className="text-2xl font-semibold mb-2 text-left">Task List</h2>
            <p className="text-sm text-gray-500 mb-4 text-left">Add Task</p>

            {/* Add task form */}
            <div className="border rounded-lg p-4 shadow-sm bg-background">
                {/* Row 1: Subject dropdown and due date picker */}
                <div className="flex flex-row items-center justify-between gap-3">
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
                    {/* Due date/time input */}
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

                {/* Row 2: Task title input and Add button */}
                <div className="flex flex-row items-center gap-3 pt-3">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addTask(); // submit on Enter
                        }}
                        className="flex-1 border border-gray-200 bg-gray-50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <button
                        onClick={addTask}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md px-4 py-2 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add Task
                    </button>
                </div>
            </div>

            {/* Search and filter bar */}
            <div className="flex flex-row mt-6 gap-4">
                {/* Search input */}
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

                {/* Subject filter dropdown */}
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

                {/* Task count label */}
                <label className="text-sm font-medium mb-1 text-left ml-auto">
                    {filteredTasks.length} TASKS
                </label>
            </div>

            {/* Accordion: categorized task lists (ALL, NO DUE DATE, TODAY, THIS WEEK, NEXT WEEK, LATER) */}
            <div className="w-full mt-8">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full -space-y-px"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    {/* ALL TASKS */}
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

                    {/* NO DUE DATE */}
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

                    {/* TODAY */}
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

                    {/* THIS WEEK */}
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

                    {/* NEXT WEEK */}
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

                    {/* LATER */}
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

            {/* Remove confirmation modal (opens when user clicks delete button on a task) */}
            <RemoveConfirmModal
                isOpen={removeModalOpen}
                onClose={() => setRemoveModalOpen(false)}
                onConfirm={confirmDeleteTask}
                subject="task"
            />
        </div>
    );
}