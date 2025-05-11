export interface UserProfile {
    nickname: string;
    pronouns?: string;
    aboutMe?: string;
    profileImageUrl?: string;
};

export interface AppUser {
    id: string;
    name: string;
    email: string;
}