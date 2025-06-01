const { SaveUserProfile } = require('../utils/mongo_utils');
const { GetUserProfile } = require('../utils/mongo_utils');
const { UpdateUserProfile } = require('../utils/mongo_utils');


async function createUserProfile(UserProfile){
    try {
        await SaveUserProfile(UserProfile);
        console.log(UserProfile);
        console.log(`User profile for ${UserProfile.username} and SubId ${UserProfile.subId} created successfully.`);
        data = await GetUserProfile(UserProfile.subId, UserProfile.username);
        return data;
    } catch (error) {
        console.error('Error during creating user profile:', error.message);
        throw error;
    }
};

async function UpdateUserProfile_by_id({ subId, updateFields }) {
    try {
        const updatedProfile = await UpdateUserProfile(subId, updateFields);
        if (!updatedProfile) {
            throw new Error('Profile not found');
        }
        return updatedProfile;
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        throw error;
    }
}


async function GetUserProfile_by_id(subId) {
    try {
        const profile = await GetUserProfile(subId);
        if (!profile) {
            throw new Error('Profile not found');
        }
        return profile;
    } catch (error) {
        console.error('Error retrieving user profile:', error.message);
        throw error;
    }
}

module.exports = {
    createUserProfile,
    GetUserProfile : GetUserProfile_by_id,
    UpdateUserProfile : UpdateUserProfile_by_id
};