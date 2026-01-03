import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    mobile: { type: String, required: true },

    password: { type: String, required: true },

    profilePic: String,

    role: {
      type: String,
      enum: ["super_admin", "institute_admin", "teacher", "student"],
      default: "student",
      required: true,
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
