import { ClaimType } from "../models";
import { IClaimType } from "../models/claim-type.model";

export default {
  Query: {
    // Get all claimTypes
    getClaimTypes: async (): Promise<IClaimType[]> => {
      return await ClaimType.find();
    },
    // Get ClaimType by ID
    getClaimType: async (_, { _id }): Promise<IClaimType> => {
      return await ClaimType.findById({ _id });
    },
  },

  Mutation: {
    // Create a claimType
    createClaimType: async (_, args, ctx): Promise<IClaimType> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { data } = args;

      try {
        return await ClaimType.create({ ...data, isActive: true });
      } catch (e) {
        throw new Error(e);
      }
    },

    // Update an existing claimType at given claimType ID
    updateClaimType: async (_, args, ctx): Promise<IClaimType> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { _id, data } = args;

      try {
        return await ClaimType.findByIdAndUpdate(
          { _id },
          { ...data },
          { new: true }
        );
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
