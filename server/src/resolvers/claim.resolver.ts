import { Claim } from "../models";
import { IClaim } from "../models/claim.model";

const populatedFields = ["claimType", "createdBy", "approvedBy", "status"];

export default {
  Query: {
    // Get all claims
    getClaims: async (): Promise<IClaim[]> => {
      return await Claim.find().populate(populatedFields);
    },
    // Get Claim by ID
    getClaim: async (_, { _id }): Promise<IClaim> => {
      return await Claim.findById({ _id }).populate(populatedFields);
    },
  },

  Mutation: {
    // Create a claim
    createClaim: async (_, args, ctx): Promise<IClaim> => {
      const { user } = ctx;
      if (!user) throw new Error("Unauthorised");
      const { data } = args;
      const now = new Date();

      try {
        return (
          await Claim.create({
            ...data,
            createdBy: user._id,
            createdAt: now,
          })
        ).populate(populatedFields);
      } catch (e) {
        throw new Error(e);
      }
    },

    // Update an existing claim at given claim ID
    updateClaim: async (_, args, ctx): Promise<IClaim> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { _id, data } = args;

      try {
        return await Claim.findByIdAndUpdate(
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
