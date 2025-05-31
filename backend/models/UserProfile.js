import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    pronouns: String,
    aboutMe: String,
    profileImageUrl: String
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
export default UserProfile;