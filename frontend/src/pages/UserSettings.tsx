import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { apiBase } from "../apiBase";
import { UserProfile } from "../types/user"
import { useNavigationBlocker } from "../hooks/useNavigationBlocker";
import { toast } from "sonner";

export default function AccountSettings() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [profile, setProfile] = useState<UserProfile>({
        nickname: user?.name || "",
        pronouns: "",
        aboutMe: "",
        profileImageUrl: "",
    });

    const [isDirty, setIsDirty] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch(`${apiBase}/api/profile`, {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchProfile();
    }, []);

    useNavigationBlocker(isDirty);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
            e.preventDefault();
            e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    const handleChange = (field: keyof UserProfile, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const [imageFile, setImageFile] = useState<File | null>(null);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            toast("Only JPG, PNG, or WEBP images are allowed.");
            return;
        
        }

        if (file.size > 2 * 1024 * 1024) {
            toast("Image must be smaller than 2MB.")
            return;
        }

        const base64 = await fileToBase64(file);

        setImageFile(file);
        setProfile(prev => ({
            ...prev,
            profileImageUrl: base64
        }));
        setIsDirty(true);
    };

    const isValidBase64Image = (str: string) => {
        return /^data:image\/(png|jpeg|webp);base64,/.test(str);
    };

    const handleSave = async () => {
        if(profile.profileImageUrl && !isValidBase64Image(profile.profileImageUrl)) {
            toast.error("Invalid image format. Please upload a valid PNG, JPG, or WEBP image.");
            return;
        }

        setIsSaving(true);
        try{
            const res = await fetch(`${apiBase}/api/profile`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });

            if(!res.ok) throw new Error("Failed to save profile");
            setIsDirty(false);
            toast.success("Profile saved successfully!");
        } catch(err) {
            console.error(err);
            toast.error("Something went wrong while saving.");
        } finally {
            setIsSaving(false);
        }
    };

    const isValidNickname = (name: string) => {
        const nicknameRegex = /^[a-zA-Z0-9 _-]{1,30}$/;
        return nicknameRegex.test(name);
    };

    const sanitizeAboutMe = (text: string) => {
        return text.replace(/[<>]/g, "");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-12 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">User Settings</h1>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:space-x-6 space-y-4 sm:space-y-0 mb-6">
                    {/* Profile Image */}
                    <div>
                        <img
                            src={
                                profile.profileImageUrl?.trim()
                                    ? profile.profileImageUrl
                                    : "/assets/default-avatar.png"
                            }
                            alt="Profile preview"
                            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full mt-2 bg-gray-700 object-cover"
                        />
                    </div>

                    {/* Nickname + Profile Image URL */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block mb-1">Nickname</label>
                            {!isValidNickname(profile.nickname) && (
                                <p className="text-sm text-red-500 mt-1">
                                    Nickname can only include letters, numbers, spaces, dashes, and underscores.
                                </p>
                            )}
                            <input 
                                type="text"
                                value={profile.nickname}
                                maxLength={30}
                                onChange={e => handleChange("nickname", e.target.value)}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                            />
                            <p className="text-sm text-gray-400 text-right mt-1">
                                {profile.nickname.length} / 30
                            </p>
                        </div>
                        <div>
                            <label className="block mb-1">Profile Picture URL</label>
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleImageUpload}
                                className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                                            file:rounded file:border-0 file:text-sm file:font-semibold
                                            file:bg-orange-600 file:text-white hover:file:bg-orange-700 file:cursor-pointer"
                            />
                            <p className="text-sm text-gray-400 mt-1">
                                Recommended size: 96x96 or any square image
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Pronouns</label>
                    <select
                        value={profile.pronouns || ""}
                        onChange={e => handleChange("pronouns", e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                    >
                        <option value="">Select...</option>
                        <option value="he/him">he/him</option>
                        <option value="she/her">she/her</option>
                        <option value="they/them">they/them</option>
                        <option value="prefer not to say">prefer not to say</option>
                    </select>
                </div>
                <div>
                    <label>About Me</label>
                    <textarea
                        maxLength={300}
                        value={profile.aboutMe || ""}
                        onChange={e => handleChange("aboutMe", sanitizeAboutMe(e.target.value))}
                        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                        rows={4}
                    />
                    <p className="text-sm text-gray-400 text-right mt-1">
                        {profile.aboutMe?.length || 0} / 300
                    </p>
                </div>
                <div className="flex space-x-4 mt-6">
                    <button
                        onClick={handleSave}
                        disabled={!isDirty || isSaving || !isValidNickname(profile.nickname)}
                        className={`px-4 py-2 rounded ${
                            isDirty
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-600 cursor-not-allowed"
                        } transition`}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                        onClick={() => navigate("/meltview")}
                        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    )
};
