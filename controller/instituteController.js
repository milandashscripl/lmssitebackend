import { isValidMobile, isStrongPassword } from "../utils/validators.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { fullName, email, mobile, password, role } = req.body;

    // 1️⃣ Required fields
    if (!fullName || !email || !mobile || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Role check
    if (!["teacher", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // 3️⃣ Mobile validation
    if (!isValidMobile(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    // 4️⃣ Password strength
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must have uppercase, lowercase, number & special character"
      });
    }

    // 5️⃣ Email uniqueness
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 6️⃣ Create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      role,
      instituteId: req.user.instituteId,
    });

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  