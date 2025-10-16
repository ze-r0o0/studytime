export default function CalendarView() {
    const schedule = [
        { subject: "Automata Theory", code: "CSPC 105", day: "Monday", time: "11:00 AM", color: "border-pink-400 bg-pink-50" },
        { subject: "Architecture and Organization", code: "CSPC 106", day: "Monday", time: "1:00 PM", color: "border-green-400 bg-green-50" },
        { subject: "Architecture and Organization", code: "CSPC 106", day: "Tuesday", time: "4:00 PM", color: "border-green-400 bg-green-50" },
        { subject: "Human Computer Interaction", code: "CSPC 109", day: "Wednesday", time: "9:00 AM", color: "border-orange-400 bg-orange-50" },
        { subject: "Architecture and Organization", code: "CSPC 106", day: "Thursday", time: "9:00 AM", color: "border-green-400 bg-green-50" },
        { subject: "Automata Theory", code: "CSPC 105", day: "Thursday", time: "1:00 PM", color: "border-pink-400 bg-pink-50" },
        { subject: "Intelligent Systems", code: "CSPE 102", day: "Friday", time: "10:00 AM", color: "border-blue-400 bg-blue-50" },
        { subject: "IAS", code: "CSPC 107", day: "Friday", time: "3:00 PM", color: "border-red-400 bg-red-50" },
        { subject: "Advance Study", code: "Study Ahead", day: "Sunday", time: "9:00 AM", color: "border-cyan-400 bg-cyan-50" },
    ];

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const times = Array.from({ length: 12 }, (_, i) => `${i + 7}:00`);

    return (
        <div className="overflow-x-auto p-6 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-8 text-sm text-gray-700">
                <div></div>
                {days.map((d) => (
                    <div key={d} className="text-center font-semibold border-b pb-2">{d}</div>
                ))}
            </div>

            {times.map((t, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-8 border-b h-20">
                    <div className="flex items-center justify-end pr-2 text-gray-500 text-xs">{t}</div>
                    {days.map((d, colIndex) => {
                        const classHere = schedule.find((s) => s.day === d && s.time.startsWith(t.split(":")[0]));
                        return (
                            <div key={colIndex} className="border-l relative">
                                {classHere && (
                                    <div className={`absolute inset-1 rounded-md border ${classHere.color} p-2`}>
                                        <p className="text-xs font-semibold">{classHere.subject}</p>
                                        <p className="text-[10px] text-gray-600">{classHere.code}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
