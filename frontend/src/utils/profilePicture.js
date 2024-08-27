// src/utils/userUtils.js
import store from '../store.js'; // Adjust the path to your Redux store

// Function to get the profile picture URL
export const getProfilePictureUrl = () => {
    const state = store.getState(); // Access the Redux store's state directly
    const userInfo = state.auth.userInfo; // Get the userInfo from the auth slice

    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get the backend URL from environment variables
    const profilePicture = userInfo?.user.profilePicture; // Get the profile picture path

    if (profilePicture) {
        return `${backendUrl}${profilePicture}`; // Construct and return the full URL
    }

    return null; // Return null if there's no profile picture
};
