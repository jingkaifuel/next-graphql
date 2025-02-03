import { ClaimLimit } from "../models";
import { IClaimLimit } from "../models/claim-limit.model";

const populatedFields = ["claimType", "user", "approver"];

export default {
  Query: {
    claimLimits: async (): Promise<IClaimLimit[]> => {
      return await ClaimLimit.find({ isActive: true }).populate(
        populatedFields
      );
    },
    claimLimitById: async (_, args): Promise<IClaimLimit[]> => {
      const { id } = args;
      return await ClaimLimit.find({ id, isActive: true }).populate(
        populatedFields
      );
    },
    claimLimitsByUser: async (_, __, ctx): Promise<IClaimLimit[]> => {
      const { user } = ctx;
      return await ClaimLimit.find({
        user: user._id,
        isActive: true,
      }).populate(populatedFields);
    },
  },

  Mutation: {
    createClaimLimit: async (_, args, ctx): Promise<IClaimLimit> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { data } = args;

      try {
        return (await ClaimLimit.create({ ...data, isActive: true })).populate(
          populatedFields
        );
      } catch (e) {
        throw new Error(e);
      }
    },
    updateClaimLimit: async (_, args, ctx): Promise<IClaimLimit> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { _id, data } = args;

      try {
        return await ClaimLimit.findByIdAndUpdate(
          { _id },
          { ...data },
          { new: true }
        ).populate(populatedFields);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
