import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import {
    format,
    parse,
    startOfWeek,
    getDay,
    addWeeks,
    subWeeks,
    addDays,
} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { X, Search } from 'lucide-react';
import { ChromePicker } from 'react-color';
import { RemoveConfirmModal, SaveConfirmModal } from "@/components/ui/ConfirmModals.jsx";
import { useDarkMode } from "@/lib/DarkModeContext";
import toast, { Toaster } from 'react-hot-toast';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './WeeklySchedule.css';

/*
  WeeklySchedule.jsx
  - Calendar + edit modal component with dark mode support.
  - Integrates with DarkModeContext to sync theme across the app.
  - Save/Delete confirmations are kept but actions are intentionally disabled.
  - Toast notifications indicate that save/remove actions are disabled.
  - Color picker always visible in the Edit modal.
  - Save and Remove buttons are side-by-side at the bottom of the modal.
  - Edit modal stays open after confirmation to allow multiple actions.
*/

// date-fns localizer
const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });
const DragAndDropCalendar = withDragAndDrop(Calendar);

// Time picker modal component for selecting start/end time
function TimePickerModal({ isOpen, onClose, onSet, title }) {
    const [hour, setHour] = useState(9);
    const [minute, setMinute] = useState(0);
    const [period, setPeriod] = useState('AM');

    if (!isOpen) return null;

    // Convert 12-hour format to 24-hour format and call onSet callback
    const handleSet = () => {
        let hour24 = hour;
        if (period === 'PM' && hour !== 12) hour24 += 12;
        if (period === 'AM' && hour === 12) hour24 = 0;
        onSet(hour24, minute);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[70]">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-64">
                <h3 className="text-lg font-semibold mb-4 text-left text-gray-900 dark:text-gray-100">{title}</h3>
                <div className="flex gap-2 mb-4 justify-center items-center">
                    {/* Hour input (1-12) */}
                    <input
                        type="number"
                        min="1"
                        max="12"
                        value={hour}
                        onChange={(e) => setHour(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-16 text-center text-2xl border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-gray-900 dark:text-gray-100"
                    />
                    <span className="text-2xl text-gray-900 dark:text-gray-100">:</span>
                    {/* Minute input (0-59) */}
                    <input
                        type="number"
                        min="0"
                        max="59"
                        value={String(minute).padStart(2, '0')}
                        onChange={(e) => setMinute(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-16 text-center text-2xl border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-gray-900 dark:text-gray-100"
                    />
                    {/* AM/PM selector */}
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="text-xl border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-gray-900 dark:text-gray-100"
                    >
                        <option>AM</option>
                        <option>PM</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSet} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Set
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function WeeklySchedule() {
    // Access dark mode context
    const { enabled: darkModeEnabled } = useDarkMode();

    // calendar / modal state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [pendingEventData, setPendingEventData] = useState(null);

    // static subjects list (UI reference only)
    const [subjects] = useState([
        { id: 1, name: 'Human Computer Interaction I', label: 'CSPC 109', color: '#FFEB3B' },
        { id: 2, name: 'Intelligent Systems', label: 'CSPE 102', color: '#2196F3' },
        { id: 3, name: 'Architecture and Organization', label: 'CSPC 106', color: '#4CAF50' },
        { id: 4, name: 'IAS', label: 'CSPC 107', color: '#F44336' },
        { id: 5, name: 'Automata Theory', label: 'CSPC 105', color: '#E91E63' },
        { id: 6, name: 'Advance Study', label: 'Study Ahead', color: '#00BCD4' },
    ]);

    // helper: start of week for placing demo events
    const getWeekStart = () => startOfWeek(currentDate, { weekStartsOn: 1 });

    // demo initial events (kept local to this component)
    const [events, setEvents] = useState([
        { id: 1, title: 'IAS', subject: 'CSPC 107', start: addDays(getWeekStart(), 1).setHours(8,0,0,0), end: addDays(getWeekStart(),1).setHours(9,0,0,0), color:'#FFB6C1' },
        { id: 2, title: 'Intelligent Systems', subject: 'CSPE 102', start: addDays(getWeekStart(),0).setHours(10,0,0,0), end: addDays(getWeekStart(),0).setHours(11,0,0,0), color:'#ADD8E6' },
        { id: 3, title: 'Automata Theory', subject: 'CSPC 105', start: addDays(getWeekStart(),0).setHours(11,0,0,0), end: addDays(getWeekStart(),0).setHours(12,0,0,0), color:'#DDA0DD' },
        { id: 4, title: 'Human Computer Interaction', subject: 'CSPC 109', start: addDays(getWeekStart(),2).setHours(9,0,0,0), end: addDays(getWeekStart(),2).setHours(10,0,0,0), color:'#FFFFE0' },
        { id: 5, title: 'Architecture and Organization', subject: 'CSPC 106', start: addDays(getWeekStart(),2).setHours(15,0,0,0), end: addDays(getWeekStart(),2).setHours(16,0,0,0), color:'#90EE90' },
    ].map(ev => ({ ...ev, start: new Date(ev.start), end: new Date(ev.end) })));

    // select event -> open edit modal
    const handleSelectEvent = useCallback((event) => {
        setSelectedEvent(event);
        setEditModalOpen(true);
    }, []);

    // move event (drag & drop within calendar) -> updates local events array
    const moveEvent = useCallback(({ event, start, end }) => {
        setEvents(prev => {
            const existing = prev.find(ev => ev.id === event.id);
            const filtered = prev.filter(ev => ev.id !== event.id);
            return [...filtered, { ...existing, start, end }];
        });
        toast.success('Event moved successfully');
    }, []);

    // resize event -> updates local events array
    const resizeEvent = useCallback(({ event, start, end }) => {
        setEvents(prev => {
            const existing = prev.find(ev => ev.id === event.id);
            const filtered = prev.filter(ev => ev.id !== event.id);
            return [...filtered, { ...existing, start, end }];
        });
    }, []);

    // event style -> uses event.color
    const eventStyleGetter = (event) => ({
        style: {
            backgroundColor: event.color,
            borderRadius: '8px',
            opacity: 0.9,
            color: '#333',
            border: 'none',
            padding: '6px 10px',
            fontSize: '13px',
            fontWeight: '500',
        },
    });

    // small event renderer (title + subject)
    const EventComponent = ({ event }) => (
        <div>
            <strong style={{ display: 'block' }}>{event.title}</strong>
            <div style={{ fontSize: '11px', marginTop: '2px', opacity: 0.8 }}>{event.subject}</div>
        </div>
    );

    const onNavigate = useCallback((newDate) => setCurrentDate(newDate), []);
    const getWeekRange = () => {
        const start = startOfWeek(currentDate, { weekStartsOn: 1 });
        const end = addDays(start, 6);
        return `${format(start, 'MMM d')}-${format(end, 'd')}`;
    };

    // handle Save from Edit modal: open confirmation modal (persistence intentionally disabled)
    const handleSaveEvent = (formData) => {
        const updatedEvent = { ...selectedEvent, title: formData.name, subject: formData.label, color: formData.color };
        setPendingEventData(updatedEvent);
        setSaveModalOpen(true);
    };

    // confirmSave: acknowledge save action but don't persist (show toast, keep edit modal open)
    const confirmSave = () => {
        setSaveModalOpen(false);
        setPendingEventData(null);
        // Edit modal stays open - do NOT close it
        toast('Save action acknowledged (disabled)', {
            icon: '💾',
            duration: 2500,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    // handle Remove from Edit modal: open confirmation modal (deletion intentionally disabled)
    const handleRemoveEvent = () => {
        setRemoveModalOpen(true);
        // Edit modal stays open - do NOT close it
    };

    // confirmRemove: acknowledge remove action but don't delete (show toast, keep edit modal open)
    const confirmRemove = () => {
        setRemoveModalOpen(false);
        // Edit modal stays open - do NOT close it
        toast('Remove action acknowledged (disabled)', {
            icon: '🗑️',
            duration: 2500,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    // calendar formats
    const formats = { timeGutterFormat: (date) => format(date, 'h:00'), eventTimeRangeFormat: () => null, dayFormat: (date) => format(date, 'EEEE') };
    const TimeGutterHeader = () => <div style={{ padding: '12px 0' }} />;

    // EDIT modal component (kept inline for convenience) - with proper dark mode support
    function EditModal({ isOpen, onClose, subject, subjects, onSave, onRemove }) {
        const [formData, setFormData] = useState({
            name: subject?.title || '',
            label: subject?.subject || '',
            startTime: subject?.start ? format(subject.start, 'HH:mm') : '09:00',
            endTime: subject?.end ? format(subject.end, 'HH:mm') : '10:00',
            day: subject?.start ? format(subject.start, 'EEE') : 'Mon',
            color: subject?.color || '#0F9BFF',
            weekly: false,
        });
        const [searchTerm, setSearchTerm] = useState('');
        const [showStartTimePicker, setShowStartTimePicker] = useState(false);
        const [showEndTimePicker, setShowEndTimePicker] = useState(false);

        if (!isOpen) return null;

        const filteredSubjects = subjects.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.label.toLowerCase().includes(searchTerm.toLowerCase()));

        return (
            <>
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-left">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Edit</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select from the list then edit details below. Drag to place on the calendar or set time manually.</p>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Left side - Form */}
                            <div className="space-y-4">
                                <div className="text-left">
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                <div className="text-left">
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Label</label>
                                    <input
                                        type="text"
                                        value={formData.label}
                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                        className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                <div className="text-left">
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Start Time</label>
                                    <input
                                        type="text"
                                        value={formData.startTime}
                                        readOnly
                                        onClick={() => setShowStartTimePicker(true)}
                                        className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                <div className="text-left">
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">End Time</label>
                                    <input
                                        type="text"
                                        value={formData.endTime}
                                        readOnly
                                        onClick={() => setShowEndTimePicker(true)}
                                        className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                <div className="text-left">
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Day</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={formData.day}
                                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                                            className="flex-1 border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                        >
                                            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <input type="checkbox" checked={formData.weekly} onChange={(e) => setFormData({ ...formData, weekly: e.target.checked })} />
                                            <span className="text-sm">Weekly</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="text-left">
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Subject Color</label>
                                    <div className="flex flex-col gap-3">
                                        <ChromePicker color={formData.color} onChange={(c) => setFormData({ ...formData, color: c.hex })} disableAlpha />
                                        <input
                                            type="text"
                                            value={formData.color}
                                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                            className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 uppercase text-gray-900 dark:text-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Subjects List */}
                            <div className="border dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                <h3 className="font-semibold mb-3 text-left text-gray-900 dark:text-gray-100">Subjects List</h3>
                                <div className="relative mb-3">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                                    />
                                </div>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {filteredSubjects.map(subj => (
                                        <div
                                            key={subj.id}
                                            onClick={() => setFormData({ ...formData, name: subj.name, label: subj.label, color: subj.color })}
                                            className="flex items-center justify-between p-3 border dark:border-gray-600 rounded-lg cursor-pointer bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subj.color }} />
                                                <span className="font-medium text-left text-gray-900 dark:text-gray-100">{subj.name}</span>
                                            </div>
                                            <span className="text-sm text-gray-500 dark:text-gray-300">{subj.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons: Remove and Save side-by-side at the bottom */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={onRemove}
                                className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                            >
                                Remove Subject
                            </button>
                            <button
                                onClick={() => onSave(formData)}
                                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Save Subject
                            </button>
                        </div>

                        {/* Time picker modals */}
                        {showStartTimePicker && <TimePickerModal isOpen={showStartTimePicker} onClose={() => setShowStartTimePicker(false)} onSet={(h,m) => setFormData({ ...formData, startTime: `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}` })} title="Set time start" />}
                        {showEndTimePicker && <TimePickerModal isOpen={showEndTimePicker} onClose={() => setShowEndTimePicker(false)} onSet={(h,m) => setFormData({ ...formData, endTime: `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}` })} title="Set time end" />}
                    </div>
                </div>
            </>
        );
    }

    // render calendar and modals (note: no page-level title here)
    return (
        <div>
            <Toaster position="bottom-right" />

            <div className="schedule-controls">
                <div className="week-navigation">
                    <button onClick={() => onNavigate(subWeeks(currentDate, 1))} className="nav-button">‹</button>
                    <span className="week-range">{getWeekRange()}</span>
                    <button onClick={() => onNavigate(addWeeks(currentDate, 1))} className="nav-button">›</button>
                </div>
                <button className="edit-button" onClick={() => setEditModalOpen(true)}>Edit</button>
            </div>

            <div className="weekly-schedule-container">
                <DragAndDropCalendar
                    localizer={localizer}
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    onEventDrop={moveEvent}
                    onEventResize={resizeEvent}
                    resizable
                    defaultView="week"
                    views={['week']}
                    step={60}
                    timeslots={1}
                    showMultiDayTimes
                    defaultDate={currentDate}
                    date={currentDate}
                    onNavigate={onNavigate}
                    eventPropGetter={eventStyleGetter}
                    components={{ event: EventComponent, timeGutterHeader: TimeGutterHeader }}
                    formats={formats}
                    min={new Date(2025,0,20,7,0)}
                    max={new Date(2025,0,20,19,0)}
                    style={{ height: 700 }}
                    toolbar={false}
                />
            </div>

            <EditModal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); setSelectedEvent(null); }} subject={selectedEvent} subjects={subjects} onSave={handleSaveEvent} onRemove={handleRemoveEvent} />

            {/* Save Confirmation Modal - shows toast, keeps edit modal open */}
            <SaveConfirmModal
                isOpen={saveModalOpen}
                onClose={() => {
                    setSaveModalOpen(false);
                    setPendingEventData(null);
                }}
                onConfirm={confirmSave}
                subject="subject"
            />

            {/* Remove Confirmation Modal - shows toast, keeps edit modal open */}
            <RemoveConfirmModal
                isOpen={removeModalOpen}
                onClose={() => setRemoveModalOpen(false)}
                onConfirm={confirmRemove}
                subject="subject"
            />
        </div>
    );
}