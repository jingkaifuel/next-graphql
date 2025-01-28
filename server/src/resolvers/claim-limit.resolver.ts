import { ClaimLimit } from "../models";
import { IClaimLimit } from "../models/claim-limit.model";

const populatedFields = ["claimType", "user", "approver"];

export default {
  Query: {
    // Get all claimLimits
    getClaimLimitByUser: async (_, __, ctx): Promise<IClaimLimit[]> => {
      const { user } = ctx;
      return await ClaimLimit.find({ user: user._id }).populate(
        populatedFields
      );
    },
    // Get ClaimLimit by ID
    getClaimLimit: async (_, { _id }): Promise<IClaimLimit> => {
      return await ClaimLimit.findById({ _id }).populate(populatedFields);
    },
  },

  Mutation: {
    // Create a claimLimit
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

    // Update an existing claimLimit at given claimLimit ID
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
