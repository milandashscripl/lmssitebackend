import { isValidInstituteCode, isStrongPassword } from "../utils/validators.js";
import Institute from "../models/Institute.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createInstitute = async (req, res) => {
  try {
    const { name, instituteCode, password } = req.body;

    // 1️⃣ Basic checks
    if (!name || !instituteCode || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Institute code format check
    if (!isValidInstituteCode(instituteCode)) {
      return res.status(400).json({
        message: "Institute code must be 4-10 lowercase letters or numbers"
      });
    }

    // 3️⃣ Password strength
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must have uppercase, lowercase, number & special character"
      });
    }

    // 4️⃣ Unique institute code
    const exists = await Institute.findOne({ instituteCode });
    if (exists) {
      return res.status(400).json({ message: "Institute code already exists" });
    }

    // 5️⃣ Create institute
    const hashedPassword = await bcrypt.hash(password, 10);

    const institute = await Institute.create({
      name,
      instituteCode,
      password: hashedPassword,
      createdBy: req.user.id,
    });

    // 6️⃣ Auto create institute admin
    await User.create({
      fullName: `${name} Admin`,
      email: `${instituteCode}@admin.com`,
      mobile: "9999999999",
      password: hashedPassword,
      role: "institute_admin",
      instituteId: institute._id,
    });

    res.json({
      success: true,
      message: "Institute created successfully",
      institute,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
