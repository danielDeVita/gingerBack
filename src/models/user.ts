import mongoose from "mongoose";
import { UserInterface } from "../types";

const Schema = mongoose.Schema;

import { softDeletePlugin, SoftDeleteModel } from "soft-delete-plugin-mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

userSchema.plugin(softDeletePlugin);

export const User = mongoose.model<
  UserInterface,
  SoftDeleteModel<UserInterface>
>("User", userSchema);
