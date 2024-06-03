import { Schema, model, Document } from "mongoose";

interface User extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  _doc: User;
}

const UserSchema = new Schema<User>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<User>("User", UserSchema);
