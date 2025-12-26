import express from "express";
const router = express.Router();

import {
    createUserInfo,
    getAllUserInfo,
    getUserInfoById,
    updateUserInfo,
    deleteUserInfo
    , createProfile, getProfileByUser, updateProfileByUser
} from "../../controllers/userController/userInfoController.js";


import { protect, authorizeRoles } from "../../middleware/authMiddleware.js";

router.post("/createUserInfo", protect, authorizeRoles('user', 'manager'), createUserInfo);
router.get("/getAllUserInfo", protect, authorizeRoles('user', 'manager'), getAllUserInfo);
router.get("/getUserInfoById/:id", protect, authorizeRoles('user', 'manager'), getUserInfoById);
router.put("/updateUserInfo/:id", protect, authorizeRoles('user', 'manager'), updateUserInfo);
router.delete("/deleteUserInfo/:id", protect, authorizeRoles('user', 'manager'), deleteUserInfo);

// Profile endpoints tied to the currently authenticated user
router.post("/createProfile", protect, authorizeRoles('user', 'manager'), createProfile);
router.get("/getProfile", protect, authorizeRoles('user', 'manager'), getProfileByUser);
router.put("/updateProfile", protect, authorizeRoles('user', 'manager'), updateProfileByUser);

export default router;