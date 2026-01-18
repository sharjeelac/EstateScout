import User from '../models/user.model.js';
import Post from '../models/post.model.js';

// Get user profile by ID
export const getUserProfile = async(req, res)=>{
    try {
        const user = await User.findById(req.params.id).populate("posts");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Update user profile
export const updateUserProfile = async(req, res)=>{
    try {
        const { name, phone, profilePicture } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.profilePicture = profilePicture || user.profilePicture;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Delete user by ID
export const deleteUser = async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
}
