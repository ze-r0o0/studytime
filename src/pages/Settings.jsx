import {UserRound,Mail, FileText} from "lucide-react";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Settings() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground pt-100">
            <div className="mx-auto max-w-3xl">
                <div className="flex flex-col min-h-[70vh] w-full">
                    <text className="text-2xl md:text-2xl font-semibold text-left max-w-2xl mb-2">
                        Profile Information
                    </text>
                    <text className="text-1xl md:text-2x text-left max-w-2xl mb-4 min-h-[10vh]">
                        Manage your personal details and profile picture.
                    </text>
                    <div className="flex items-start gap-x-4">
                        <div className="w-26 h-26 flex items-center justify-center rounded-full bg-blue-100">
                            <UserRound className="w-10 h-10 sm:w-15 sm:h-15 text-blue-500"/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">Alex Johnson</span>
                            <button
                                className="bg-white border-2 border-blue-500 hover:bg-blue-600 text-blue-600 font-medium rounded-2xl px-4 py-2 transition-colors mb-16 mt-2">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="w-10 h-10 flex items-center justify-center ">
                            <UserRound className="w-6 h-6 text-gray-400"/>
                        </div>
                        <span className="text-left justify-center items-center text-gray-600">Full Name</span>
                    </div>
                    <text className="indent-12 text-left ">Alex Johnson</text>
                    <div className="flex items-center gap-x-2">
                        <div className="w-10 h-10 flex items-center justify-center ">
                            <Mail className="w-6 h-6 text-gray-400"/>
                        </div>
                        <span className="text-left justify-center items-center text-gray-600">Email</span>
                    </div>
                    <text className="indent-12 text-left ">alexjohnson@gmail.com</text>
                    <div className="flex items-center gap-x-2">
                        <div className="w-10 h-10 flex items-center justify-center ">
                            <FileText className="w-6 h-6 text-gray-400"/>
                        </div>
                        <span className="text-left justify-center items-center text-gray-600">Bio</span>
                    </div>
                    <text className="text-left text-wrap">Student passionate about learning and productivity.
                        Currently studying Computer Science and
                        exploring new study techniques.
                    </text>
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="flex flex-col">
                        <text className="text-2xl md:text-xl font-semibold text-left max-w-2xl mb-2">
                            Theme Settings
                        </text>
                        <text className="text-l md:text-x text-left max-w-2xl mb-4 min-h-[10vh]">
                            Adjust the application's visual theme.
                        </text>
                    </div>
                    <div className="p-6">
                        <DarkModeToggle initial={false} />
                    </div>
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                </div>
            </div>
        </div>
    )

}
