import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { apiBase } from "../apiBase";
import { UserProfile } from "../types/user"

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

    const handleChange = (field: keyof UserProfile, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        setImageFile(file);
        setProfile(prev => ({
            ...prev,
            profileImageUrl: URL.createObjectURL(file),
        }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        try{
            const res = await fetch(`${apiBase}/api/profile`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });

            if(!res.ok) throw new Error("Failed to save profile");
            setIsDirty(false);
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-12 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">User Settings</h1>

            <div className="space-y-4">
                <div className="flex items-start space-x-6 mb-6">
                    {/* Profile Image */}
                    <div>
                        <img
                            src={
                                profile.profileImageUrl?.trim()
                                    ? profile.profileImageUrl
                                    : "/assets/default-avatar.png"
                            }
                            alt="Profile preview"
                            className="w-36 h-36 rounded-full mt-2 bg-gray-700 object-cover"
                        />
                    </div>

                    {/* Nickname + Profile Image URL */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block mb-1">Nickname</label>
                            <input 
                                type="text"
                                value={profile.nickname}
                                onChange={e => handleChange("nickname", e.target.value)}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Profile Picture URL</label>
                            <input
                                type="file"
                                accept="image/*"
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
                        value={profile.aboutMe || ""}
                        onChange={e => handleChange("aboutMe", e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                        rows={4}
                    />
                </div>
                <div className="flex space-x-4 mt-6">
                    <button
                        onClick={handleSave}
                        disabled={!isDirty}
                        className={`px-4 py-2 rounded ${
                            isDirty
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-600 cursor-not-allowed"
                        } transition`}
                    >
                        Save
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
