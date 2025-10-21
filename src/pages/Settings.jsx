import { useState } from "react";
import { UserRound, Mail, FileText, Camera, Check } from "lucide-react";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import logo from "@/assets/logo.svg";
import playstore from "@/assets/playstore.png";
import stockavatar1 from "@/assets/stockavatar1.jpg";
import stockavatar2 from "@/assets/stockavatar2.jpg";
import stockavatar3 from "@/assets/stockavatar3.jpg";
import stockavatar4 from "@/assets/stockavatar4.jpg";
import {RemoveConfirmModal, SaveConfirmModal} from "../components/ui/ConfirmModals.jsx";
import toast, { Toaster } from 'react-hot-toast';

export default function Settings() {
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(() => {
        const saved = localStorage.getItem("selectedAvatar");
        return saved || null;
    });
    const [preview, setPreview] = useState(() => {
        const saved = localStorage.getItem("preview");
        return saved || null;
    });
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    // Temporary avatar states for editing
    const [tempSelectedAvatar, setTempSelectedAvatar] = useState(null);
    const [tempPreview, setTempPreview] = useState(null);

    // Load form data from localStorage on mount
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem("profileFormData");
        return saved ? JSON.parse(saved) : {
            fullName: "Aldrin Villanueva",
            email: "aldrinvil@gmail.com",
            bio: "Student passionate about learning and productivity. Currently studying Computer Science and exploring new study techniques."
        };
    });

    const openPhotoModal = () => {
        setPhotoModalOpen(true);
    };

    const handleSavePhoto = () => {
        // Just close modal and show selection confirmation
        setPhotoModalOpen(false);

        toast.success('Avatar selected!', {
            icon: <Check className="w-5 h-5" />,
            duration: 2000,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    // Function to handle saving profile changes
    const handleSaveProfile = () => {
        console.log("Profile saved:", formData);

        // Save form data to localStorage
        localStorage.setItem("profileFormData", JSON.stringify(formData));

        // Save avatar data to localStorage
        localStorage.setItem("selectedAvatar", tempSelectedAvatar || "");
        localStorage.setItem("preview", tempPreview || "");

        // Update main state
        setSelectedAvatar(tempSelectedAvatar);
        setPreview(tempPreview);

        window.dispatchEvent(new Event("profileUpdated"));

        setEditProfileOpen(false);
        setIsSaveModalOpen(false);

        toast.success('Profile updated successfully!', {
            icon: <Check className="w-5 h-5" />,
            duration: 2000,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    const handleEditProfileOpen = () => {
        // Initialize temp states with current values
        setTempSelectedAvatar(selectedAvatar);
        setTempPreview(preview);
        setEditProfileOpen(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-80 md:pt-[500px] px-4 pb-8 overflow-auto">
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

            <div className="mx-auto max-w-4xl w-full">
                <div className="flex flex-col min-h-[70vh] w-full">
                    <label className="text-4xl sm:text-2xl font-semibold text-left mb-2">
                        Profile Information
                    </label>
                    <p className="text-sm sm:text-base text-left mb-6 sm:mb-8">
                        Manage your personal details and profile picture.
                    </p>

                    {/* Profile Section */}
                    <div className="flex items-start gap-x-3 sm:gap-x-4 mb-8">
                        <div className="relative">
                            <div className="w-16 h-16 sm:w-26 sm:h-26 flex items-center justify-center rounded-full bg-blue-100 flex-shrink-0 overflow-hidden">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : selectedAvatar ? (
                                    <img
                                        src={selectedAvatar}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserRound className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base sm:text-lg font-semibold mb-2">
                                {formData.fullName}
                            </span>
                            <button
                                onClick={handleEditProfileOpen}
                                className="bg-white border-2 border-blue-500 hover:bg-blue-600 hover:text-white text-blue-600 font-medium rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <UserRound className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-600">Full Name</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-4 text-left">
                        {formData.fullName}
                    </p>

                    {/* Email */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-600">Email</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-4 text-left">
                        {formData.email}
                    </p>

                    {/* Bio */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-600">Bio</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-8 text-left">
                        {formData.bio}
                    </p>

                    <hr className="h-px my-6 sm:my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                    {/* Theme Settings */}
                    <div className="flex flex-col mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-left mb-2">
                            Theme Settings
                        </h2>
                        <p className="text-sm sm:text-base text-left mb-4">
                            Adjust the application's visual theme.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6">
                        <DarkModeToggle initial={false} />
                    </div>

                    <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>

                {/* Footer */}
                <footer className="w-full mt-16">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-6 py-6">
                        <div className="flex gap-4">
                            <img src={logo} alt="Logo" className="w-10 h-10" />
                            <p className="text-sm text-gray-600 max-w-xs text-left">
                                Study Time: A Web-Based Study Planner for Managing Time and Tasks
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <a href="#">
                                <img src={playstore} alt="Play Store" className="h-10" />
                            </a>
                        </div>
                    </div>

                    <div className="border-t flex justify-between items-center px-6 py-4 text-xs text-gray-500">
                        <p>© 2024 BSCS 3-1B. All rights reserved.</p>
                        <p>Study Time™</p>
                    </div>
                </footer>
            </div>

            {editProfileOpen && (
                <EditProfileModal
                    onClose={() => setEditProfileOpen(false)}
                    openPhotoModal={openPhotoModal}
                    preview={tempPreview}
                    selectedAvatar={tempSelectedAvatar}
                    formData={formData}
                    setFormData={setFormData}
                    onSaveClick={() => setIsSaveModalOpen(true)}
                />
            )}

            {photoModalOpen && (
                <PhotoProfileModal
                    onClose={() => setPhotoModalOpen(false)}
                    setSelectedAvatar={setTempSelectedAvatar}
                    setPreview={setTempPreview}
                    selectedAvatar={tempSelectedAvatar}
                    preview={tempPreview}
                    onSave={handleSavePhoto}
                    returnToEditProfile={() => {
                        setPhotoModalOpen(false);
                        setTimeout(() => setEditProfileOpen(true), 100);
                    }}
                />
            )}

            {/* Save Confirmation Modal */}
            <SaveConfirmModal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                onConfirm={handleSaveProfile}
                subject="profile"
            />

            {/* Remove Confirmation Modal (if needed) */}
            <RemoveConfirmModal
                isOpen={isRemoveModalOpen}
                onClose={() => setIsRemoveModalOpen(false)}
                onConfirm={() => {
                    setIsRemoveModalOpen(false);
                }}
                subject="profile"
            />
        </div>
    );
}

function EditProfileModal({ onClose, openPhotoModal, preview, selectedAvatar, formData, setFormData, onSaveClick }) {
    const [localFormData, setLocalFormData] = useState({...formData});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData({
            ...localFormData,
            [name]: value
        });
    };

    const handleSave = () => {
        setFormData(localFormData);
        onSaveClick();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-60">
            <div className="bg-white rounded-lg w-[500px] shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                <div className="flex items-start mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : selectedAvatar ? (
                                <img
                                    src={selectedAvatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <UserRound className="w-10 h-10 text-blue-500" />
                            )}
                        </div>
                        <button
                            onClick={openPhotoModal}
                            className="absolute bottom-0 right-0 bg-blue-500 border border-white rounded-full p-1 cursor-pointer"
                        >
                            <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </button>
                    </div>
                    <div className="ml-4 flex flex-col text-left">
                        <span className="font-bold text-sm text-gray-500">Profile Photo</span>
                        <span className="text-sm text-gray-500">Click the camera icon to update</span>
                    </div>
                </div>
                <div className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={localFormData.fullName}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={localFormData.email}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={localFormData.bio}
                            onChange={handleChange}
                            rows="3"
                            className="w-full border rounded-md px-3 py-2 bg-gray-100"
                        ></textarea>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
}

function PhotoProfileModal({  setSelectedAvatar, setPreview, selectedAvatar, preview, onSave, returnToEditProfile }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setSelectedAvatar(null);
        }
    };

    const handleSaveAndReturn = () => {
        onSave();
        returnToEditProfile();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-70">
            <div className="bg-white rounded-lg w-[500px] shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Choose Profile Picture</h2>
                    <button onClick={returnToEditProfile} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="text-left mb-4">
                    <div className="flex justify-between mb-2">
                        <p className="font-semibold text-sm">Stock Avatars</p>
                        <p className="font-semibold text-sm">Default Avatar</p>
                    </div>

                    <div className="flex gap-3">
                        {[stockavatar1, stockavatar2, stockavatar3, stockavatar4].map(
                            (avatar, i) => (
                                <img
                                    key={i}
                                    src={avatar}
                                    alt={`Avatar ${i + 1}`}
                                    className={`w-20 h-20 rounded-full cursor-pointer border-2 ${
                                        selectedAvatar === avatar
                                            ? "border-blue-500"
                                            : "border-transparent"
                                    }`}
                                    onClick={() => {
                                        setSelectedAvatar(avatar);
                                        setPreview(null);
                                    }}
                                />
                            )
                        )}
                        <div
                            className={`w-18 h-18 rounded-full flex items-center justify-center bg-gray-100 cursor-pointer border-2 ${
                                !selectedAvatar && !preview ? "border-blue-500" : "border-transparent"
                            }`}
                            onClick={() => {
                                setSelectedAvatar(null);
                                setPreview(null);
                            }}
                        >
                            <UserRound className="w-10 h-10 text-blue-500" />
                        </div>
                    </div>
                </div>

                <div className="mb-4 text-left">
                    <p className="font-semibold text-sm mb-2">Upload Your Own</p>
                    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <span className="text-sm text-gray-500 mb-2">
                            Choose photo from your device.
                        </span>
                        <label className="bg-blue-500 text-white text-sm px-4 py-1 rounded-md cursor-pointer">
                            Browse Files
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                    </div>
                </div>

                <div className="text-left mb-4">
                    <p className="font-semibold text-sm mb-2">Preview</p>
                    <div className="flex justify-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : selectedAvatar ? (
                            <img
                                src={selectedAvatar}
                                alt="Selected Avatar"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                <UserRound className="text-gray-500 w-8 h-8" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={returnToEditProfile}
                        className="px-4 py-2 rounded-md border hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveAndReturn}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save Picture
                    </button>
                </div>
            </div>
        </div>
    );
}
