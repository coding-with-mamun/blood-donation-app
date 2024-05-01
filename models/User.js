import mongoose from "mongoose";

// create user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requred: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      requred: true,
    },
    bloodGroup: {
      type: String,
      trim: true,
      default: null,
    },
    dateOfBirth: {
      type: String,
      trim: true,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    profaction: {
      type: String,
      trim: true,
      default: null,
    },
    bio: {
      type: String,
      trim: true,
      default: null,
    },
    lastDonation: {
      type: String,
      trim: true,
      default: null,
    },
    photo: {
      type: String,
      trim: true,
      default: null,
    },
    gallery: {
      type: [String],
    },
    role: {
      type: String,
      default: "patient",
      enum: ["patient", "donor", "admin"],
    },
    accessToken: {
      type: String,
      trim: true,
      default: null,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export schema
export default mongoose.model("User", userSchema);
