import mongoose, { Document, Schema } from "mongoose";

export interface IClaimType extends Document {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const ClaimTypeSchema: Schema<IClaimType> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean },
});

export default mongoose.model<IClaimType>("ClaimType", ClaimTypeSchema);
