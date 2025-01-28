import mongoose, { Document, Schema } from "mongoose";

export interface IClaimStatus extends Document {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const ClaimStatusSchema: Schema<IClaimStatus> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean },
});

export default mongoose.model<IClaimStatus>("ClaimStatus", ClaimStatusSchema);
