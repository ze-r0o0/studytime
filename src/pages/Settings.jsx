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

/*
  Settings.jsx
  - User profile settings page with edit capabilities.
  - Features: edit profile (name, email, bio), change profile picture (stock avatars or upload custom), theme toggle.
  - All changes persist to localStorage and trigger a "profileUpdated" event for other components.
  - Uses modals for edit profile, choose photo, and save confirmation.
  - Full dark mode support.
*/

export default function Settings() {
    // State: edit profile modal visibility
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    // State: photo selection modal visibility
    const [photoModalOpen, setPhotoModalOpen] = useState(false);

    // State: selected avatar (stock image URL or null) - loaded from localStorage on mount
    const [selectedAvatar, setSelectedAvatar] = useState(() => {
        const saved = localStorage.getItem("selectedAvatar");
        return saved || null;
    });

    // State: custom uploaded photo preview (base64 or blob URL) - loaded from localStorage on mount
    const [preview, setPreview] = useState(() => {
        const saved = localStorage.getItem("preview");
        return saved || null;
    });

    // State: confirmation modal states
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    // State: temporary avatar states used only while editing (not saved until user confirms)
    const [tempSelectedAvatar, setTempSelectedAvatar] = useState(null);
    const [tempPreview, setTempPreview] = useState(null);

    // State: form data (full name, email, bio) - loaded from localStorage on mount or defaults
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem("profileFormData");
        return saved ? JSON.parse(saved) : {
            fullName: "Aldrin Villanueva",
            email: "aldrinvil@gmail.com",
            bio: "Student passionate about learning and productivity. Currently studying Computer Science and exploring new study techniques."
        };
    });

    // Function: open photo selection modal (sets edit mode)
    const openPhotoModal = () => {
        setPhotoModalOpen(true);
    };

    // Function: handle photo save (close modal and show confirmation toast)
    const handleSavePhoto = () => {
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

    // Function: handle profile save (persist to localStorage, close modals, dispatch event, show toast)
    const handleSaveProfile = () => {
        console.log("Profile saved:", formData);

        // Persist form data to localStorage
        localStorage.setItem("profileFormData", JSON.stringify(formData));

        // Persist avatar data to localStorage (empty string if null)
        localStorage.setItem("selectedAvatar", tempSelectedAvatar || "");
        localStorage.setItem("preview", tempPreview || "");

        // Update main state with temp values (commit changes)
        setSelectedAvatar(tempSelectedAvatar);
        setPreview(tempPreview);

        // Dispatch custom event so other components (e.g., navbar) can update
        window.dispatchEvent(new Event("profileUpdated"));

        // Close modals
        setEditProfileOpen(false);
        setIsSaveModalOpen(false);

        // Show success toast
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

    // Function: open edit profile modal and initialize temp states with current values
    const handleEditProfileOpen = () => {
        setTempSelectedAvatar(selectedAvatar);
        setTempPreview(preview);
        setEditProfileOpen(true);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-80 md:pt-[500px] px-4 pb-8 overflow-auto">
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

            <div className="mx-auto max-w-4xl w-full">
                <div className="flex flex-col min-h-[70vh] w-full">
                    {/* Page title and subtitle */}
                    <label className="text-4xl sm:text-2xl font-semibold text-left mb-2 text-gray-900 dark:text-gray-100">
                        Profile Information
                    </label>
                    <p className="text-sm sm:text-base text-left mb-6 sm:mb-8 text-gray-600 dark:text-gray-400">
                        Manage your personal details and profile picture.
                    </p>

                    {/* Profile Section: avatar + name + edit button */}
                    <div className="flex items-start gap-x-3 sm:gap-x-4 mb-8">
                        <div className="relative">
                            {/* Profile avatar (displays preview, selectedAvatar, or default icon) */}
                            <div className="w-16 h-16 sm:w-26 sm:h-26 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 flex-shrink-0 overflow-hidden">
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
                                    <UserRound className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 dark:text-blue-400" />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            {/* Display user's full name */}
                            <span className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                {formData.fullName}
                            </span>
                            {/* Edit profile button: opens edit modal */}
                            <button
                                onClick={handleEditProfileOpen}
                                className="bg-white dark:bg-gray-800 border-2 border-blue-500 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Full Name field (read-only display) */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <UserRound className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Full Name</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-4 text-left text-gray-900 dark:text-gray-100">
                        {formData.fullName}
                    </p>

                    {/* Email field (read-only display) */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Email</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-4 text-left text-gray-900 dark:text-gray-100">
                        {formData.email}
                    </p>

                    {/* Bio field (read-only display) */}
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Bio</span>
                    </div>
                    <p className="pl-10 sm:pl-12 text-sm sm:text-base mb-8 text-left text-gray-900 dark:text-gray-100">
                        {formData.bio}
                    </p>

                    <hr className="h-px my-6 sm:my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                    {/* Theme Settings section */}
                    <div className="flex flex-col mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-left mb-2 text-gray-900 dark:text-gray-100">
                            Theme Settings
                        </h2>
                        <p className="text-sm sm:text-base text-left mb-4 text-gray-600 dark:text-gray-400">
                            Adjust the application's visual theme.
                        </p>
                    </div>

                    {/* Dark mode toggle component */}
                    <div className="p-4 sm:p-6">
                        <DarkModeToggle initial={false} />
                    </div>

                    <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>

                {/* Footer: logo, description, play store link, copyright */}
                <footer className="w-full mt-16">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-6 py-6">
                        <div className="flex gap-4">
                            <img src={logo} alt="Logo" className="w-10 h-10" />
                            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs text-left">
                                Study Time: A Web-Based Study Planner for Managing Time and Tasks
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <a href="#">
                                <img src={playstore} alt="Play Store" className="h-10" />
                            </a>
                        </div>
                    </div>

                    <div className="border-t dark:border-gray-700 flex justify-between items-center px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                        <p>© 2024 BSCS 3-1B. All rights reserved.</p>
                        <p>Study Time™</p>
                    </div>
                </footer>
            </div>

            {/* Edit Profile Modal: opened when user clicks "Edit Profile" */}
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

            {/* Photo Selection Modal: opened from edit profile to choose avatar */}
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

            {/* Save Confirmation Modal: opened when user clicks "Save changes" in edit profile */}
            <SaveConfirmModal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                onConfirm={handleSaveProfile}
                subject="profile"
            />

            {/* Remove Confirmation Modal: placeholder (not currently used but kept for future) */}
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

/*
  EditProfileModal component
  - Modal for editing profile details (name, email, bio) and changing avatar.
  - Displays current avatar with camera icon to open photo picker.
  - Changes are saved to local state until user confirms via "Save changes".
  - Dark mode support.
*/
function EditProfileModal({ onClose, openPhotoModal, preview, selectedAvatar, formData, setFormData, onSaveClick }) {
    // Local state: temporary form data (changes not committed until save)
    const [localFormData, setLocalFormData] = useState({...formData});

    // Handle input change: update local form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData({
            ...localFormData,
            [name]: value
        });
    };

    // Handle save: update parent form data and open confirmation modal
    const handleSave = () => {
        setFormData(localFormData);
        onSaveClick();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-60">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-[500px] shadow-lg p-6">
                {/* Modal header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        ✕
                    </button>
                </div>

                {/* Avatar section with camera icon */}
                <div className="flex items-start mb-6">
                    <div className="relative">
                        {/* Display current avatar (preview, selectedAvatar, or default) */}
                        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
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
                                <UserRound className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                            )}
                        </div>
                        {/* Camera icon button: opens photo selection modal */}
                        <button
                            onClick={openPhotoModal}
                            className="absolute bottom-0 right-0 bg-blue-500 border border-white dark:border-gray-800 rounded-full p-1 cursor-pointer"
                        >
                            <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </button>
                    </div>
                    {/* Avatar hint text */}
                    <div className="ml-4 flex flex-col text-left">
                        <span className="font-bold text-sm text-gray-500 dark:text-gray-400">Profile Photo</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Click the camera icon to update</span>
                    </div>
                </div>

                {/* Form fields: Full Name, Email, Bio */}
                <div className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={localFormData.fullName}
                            onChange={handleChange}
                            className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={localFormData.email}
                            onChange={handleChange}
                            className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={localFormData.bio}
                            onChange={handleChange}
                            rows="3"
                            className="w-full border dark:border-gray-600 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        ></textarea>
                    </div>
                </div>

                {/* Action buttons: Cancel and Save */}
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
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

/*
  PhotoProfileModal component
  - Modal for choosing a profile picture (stock avatars, default icon, or upload custom).
  - Shows preview of selected/uploaded image before saving.
  - Returns to edit profile modal after saving.
  - Dark mode support.
*/
function PhotoProfileModal({ setSelectedAvatar, setPreview, selectedAvatar, preview, onSave, returnToEditProfile }) {
    // Handle file upload: read file and set preview URL
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setSelectedAvatar(null); // clear stock avatar when custom image is uploaded
        }
    };

    // Handle save and return: save avatar selection and return to edit profile
    const handleSaveAndReturn = () => {
        onSave();
        returnToEditProfile();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-70">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-[500px] shadow-lg p-6">
                {/* Modal header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Choose Profile Picture</h2>
                    <button onClick={returnToEditProfile} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        ✕
                    </button>
                </div>

                {/* Stock avatars section */}
                <div className="text-left mb-4">
                    <div className="flex justify-between mb-2">
                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Stock Avatars</p>
                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Default Avatar</p>
                    </div>

                    {/* Stock avatar images + default icon */}
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
                                        setPreview(null); // clear custom preview
                                    }}
                                />
                            )
                        )}
                        {/* Default avatar (UserRound icon) */}
                        <div
                            className={`w-18 h-18 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 cursor-pointer border-2 ${
                                !selectedAvatar && !preview ? "border-blue-500" : "border-transparent"
                            }`}
                            onClick={() => {
                                setSelectedAvatar(null);
                                setPreview(null);
                            }}
                        >
                            <UserRound className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Upload custom image section */}
                <div className="mb-4 text-left">
                    <p className="font-semibold text-sm mb-2 text-gray-900 dark:text-gray-100">Upload Your Own</p>
                    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Choose photo from your device.
                        </span>
                        {/* Hidden file input triggered by label */}
                        <label className="bg-blue-500 text-white text-sm px-4 py-1 rounded-md cursor-pointer">
                            Browse Files
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                    </div>
                </div>

                {/* Preview section: shows selected avatar or uploaded image */}
                <div className="text-left mb-4">
                    <p className="font-semibold text-sm mb-2 text-gray-900 dark:text-gray-100">Preview</p>
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
                            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <UserRound className="text-gray-500 dark:text-gray-400 w-8 h-8" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Action buttons: Cancel and Save Picture */}
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={returnToEditProfile}
                        className="px-4 py-2 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
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