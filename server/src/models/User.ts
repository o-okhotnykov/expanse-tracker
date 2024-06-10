import { Schema, model, Document } from "mongoose";
import { userSchema } from "@expanse-tracker/shared";

const UserSchema = new Schema<userSchema>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<userSchema>("User", UserSchema);
