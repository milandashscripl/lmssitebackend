import express from "express";
import { register, login } from "../controller/authController.js";
import upload from "../middleware/Upload.js"; // ✅ default import

const router = express.Router();

router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);

export default router;
