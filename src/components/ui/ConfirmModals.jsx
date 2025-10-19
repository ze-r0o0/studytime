import { XIcon } from "lucide-react"; // For the X close icon

// First modal - Remove Confirmation
export function RemoveConfirmModal({ isOpen, onClose, onConfirm, subject = "subject" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-70">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-medium text-gray-800">Confirm Action</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="Close"
                        >
                            <XIcon size={20} />
                        </button>
                    </div>

                    <p className="text-gray-600 mb-4 text-left">
                        Please confirm your choices regarding the {subject}.
                    </p>

                    <p className="text-gray-700 mb-2 text-left">
                        Do you want to remove the {subject}?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-left">
                        <button
                            onClick={onConfirm}
                            className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition-colors"
                        >
                            Yes, Remove
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-3 bg-white text-gray-700 font-medium border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                            No, Keep
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Second modal - Save Confirmation
export function SaveConfirmModal({ isOpen, onClose, onConfirm, subject = "subject" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-70">
            <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-lg">
                <div className="p-6">
                    <div className="flex justify-between items-center ">
                        <h2 className="text-xl font-medium text-gray-800">Confirm Action</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="Close"
                        >
                            <XIcon size={20} />
                        </button>
                    </div>

                    <p className="text-gray-600 mb-4 text-left">
                        Please confirm your choices regarding the {subject}.
                    </p>

                    <p className="text-gray-700 mb-2 text-left">
                        Do you want to save the {subject}?
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-left">
                        <button
                            onClick={onConfirm}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-2xl hover:bg-blue-600 transition-colors"
                        >
                            Yes, Save
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-3 bg-white text-gray-700 font-medium border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                            No, Discard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}