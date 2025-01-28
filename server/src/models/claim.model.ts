import mongoose, { Document, Schema } from "mongoose";
import { IClaimType } from "./claim-type.model";
import { IUser } from "./user.model";
import { IClaimStatus } from "./claim-status.model";

export interface IClaim extends Document {
  _id: string;
  claimType: IClaimType;
  description: string;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  remark: string;
  approvedBy: IUser;
  status: IClaimStatus;
}

const ClaimSchema: Schema<IClaim> = new mongoose.Schema({
  claimType: { type: Schema.Types.ObjectId, ref: "ClaimType", required: true },
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  amount: { type: Number, required: true },
  remark: { type: String },
  approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: Schema.Types.ObjectId, ref: "ClaimStatus" },
});

export default mongoose.model<IClaim>("Claim", ClaimSchema);
