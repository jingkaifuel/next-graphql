import mongoose, { Document, Schema } from "mongoose";
import { IClaimType } from "./claim-type.model";
import { IUser } from "./user.model";

export interface IClaimLimit extends Document {
  _id: string;
  year: string;
  claimType: IClaimType;
  user: IUser;
  maxAmount: number;
  balance: number;
  approver: [IUser];
  isActive: boolean;
}

const ClaimLimitSchema: Schema<IClaimLimit> = new mongoose.Schema({
  year: { type: String, required: true },
  claimType: { type: Schema.Types.ObjectId, ref: "ClaimType", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  maxAmount: { type: Number, required: true },
  approver: { type: [Schema.Types.ObjectId], ref: "User" },
  isActive: { type: Boolean },
});

export default mongoose.model<IClaimLimit>("ClaimLimit", ClaimLimitSchema);
