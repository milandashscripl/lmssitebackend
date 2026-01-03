// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ---------------- REGISTER ----------------
export const register = async (req, res) => {
  try {
    const { fullName, email, mobile, password, confirmPassword } = req.body;

    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      profilePic: req.file?.path || "",
      role: "student",
    });

    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({ success: true, user: safeUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      instituteId: user.instituteId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const { password: _, ...safeUser } = user._doc;

  res.json({ success: true, token, user: safeUser });
};
