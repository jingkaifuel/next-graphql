import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  position: string;
  isActive: boolean;
}

export const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  position: { type: String },
  isActive: { type: Boolean, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
