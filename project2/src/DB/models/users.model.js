import mongoose from "mongoose";
import { genderEnum, roleEnum } from "../../common/enum/user.enum.js";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    gender: {
      type: String,
      enum: Object.values(genderEnum),
      default: genderEnum.male,
    },
    role: {
      type: String,
      enum: Object.values(roleEnum),
      default: roleEnum.user,
      required: true,
    },
    confirmed: Boolean,
    changeCredential: Date,
  },
  {
    timeStamps: true,
    strictQuery: true,
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);
