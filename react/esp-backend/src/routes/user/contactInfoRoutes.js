import express from "express";
const router = express.Router();

import { createContact, getContactByUser, updateContactByUser } from "../../controllers/userController/contactInfoController.js";
import { protect, authorizeRoles } from "../../middleware/authMiddleware.js";

router.post("/createContact", protect, authorizeRoles('user', 'manager'), createContact);
router.get("/getContact", protect, authorizeRoles('user', 'manager'), getContactByUser);
router.put("/updateContact", protect, authorizeRoles('user', 'manager'), updateContactByUser);

export default router;
