import express from "express";
import { createInstitute } from "../controller/superAdminController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-institute",
  protect,
  allowRoles("super_admin"),
  createInstitute
);

export default router;