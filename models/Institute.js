import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    instituteCode: {
      type: String,
      unique: true,
      required: true, // institute login ID
    },

    password: {
      type: String,
      required: true, // cannot be changed
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // super admin
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Institute", instituteSchema);