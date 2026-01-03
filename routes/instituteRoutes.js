import express from "express";
import { createUser } from "../controller/instituteController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-user",
  protect,
  allowRoles("institute_admin"),
  createUser
);


export default router;
