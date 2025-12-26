import UserInfo from "../../models/UserInfo.js";

// CREATE
const createUserInfo = async (req, res) => {
    try {
        const data = await UserInfo.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET ALL
const getAllUserInfo = async (req, res) => {
    try {
        const data = await UserInfo.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ONE
const getUserInfoById = async (req, res) => {
    try {
        const data = await UserInfo.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: "Not found" });
    }
};

// CREATE/GET/UPDATE profile for current logged-in user
const createProfile = async (req, res) => {
    try {
        const existing = await UserInfo.findOne({ userId: req.user.id });
        if (existing) return res.status(400).json({ error: "Profile already exists. Use update." });

        const payload = { ...req.body, userId: req.user.id };
        const data = await UserInfo.create(payload);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getProfileByUser = async (req, res) => {
    try {
        const data = await UserInfo.findOne({ userId: req.user.id });
        if (!data) return res.status(404).json({ error: "Profile not found" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfileByUser = async (req, res) => {
    try {
        const updated = await UserInfo.findOneAndUpdate(
            { userId: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ error: "Profile not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// UPDATE
const updateUserInfo = async (req, res) => {
    try {
        const updated = await UserInfo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE
const deleteUserInfo = async (req, res) => {
    try {
        await UserInfo.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export { createUserInfo, getAllUserInfo, getUserInfoById, updateUserInfo, deleteUserInfo, createProfile, getProfileByUser, updateProfileByUser };
