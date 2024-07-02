import { Schema, model } from "mongoose";

interface userSchema {
  fullName: string;
  email: string;
  passwordHash: string;
}

const UserSchema = new Schema<userSchema>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<userSchema>("User", UserSchema);
