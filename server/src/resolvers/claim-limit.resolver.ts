import { Claim, ClaimLimit } from "../models";
import { IClaimLimit } from "../models/claim-limit.model";

const populatedFields = ["claimType", "user", "approver"];

const getUsedAmount = async (claimType: string) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  const claims = await Claim.find({
    claimType: claimType,
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  return claims.reduce((acc, claim) => (acc += claim.amount), 0);
};

export default {
  Query: {
    claimLimits: async (): Promise<IClaimLimit[]> => {
      const list = await ClaimLimit.find({ isActive: true }).populate(
        populatedFields
      );
      const result: IClaimLimit[] = await Promise.all(
        list.map(async (x) => {
          x.balance = x.maxAmount - (await getUsedAmount(x.claimType._id));
          return x as IClaimLimit;
        })
      );

      return result;
    },
    claimLimitById: async (_, args): Promise<IClaimLimit> => {
      const { id } = args;
      const item = await ClaimLimit.findOne({ id, isActive: true }).populate(
        populatedFields
      );

      const usedAmount = await getUsedAmount(item.claimType._id);
      item.balance = item.maxAmount - usedAmount;

      return item;
    },
    claimLimitsByUser: async (_, __, ctx): Promise<IClaimLimit[]> => {
      const { user } = ctx;
      const list = await ClaimLimit.find({
        user: user._id,
        isActive: true,
      }).populate(populatedFields);

      const result: IClaimLimit[] = await Promise.all(
        list.map(async (x) => {
          x.balance = x.maxAmount - (await getUsedAmount(x.claimType._id));
          return x as IClaimLimit;
        })
      );
      return result;
    },
    claimLimitsByType: async (_, args): Promise<IClaimLimit[]> => {
      const { type } = args;
      console.log(type);
      const list = await ClaimLimit.find({
        claimType: type,
        isActive: true,
      }).populate(populatedFields);

      const result: IClaimLimit[] = await Promise.all(
        list.map(async (x) => {
          x.balance = x.maxAmount - (await getUsedAmount(x.claimType._id));
          return x as IClaimLimit;
        })
      );
      return result;
    },
  },

  Mutation: {
    createClaimLimit: async (_, args, ctx): Promise<IClaimLimit> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { data } = args;

      try {
        const item = await (
          await ClaimLimit.create({ ...data, isActive: true })
        ).populate(populatedFields);
        item.balance = data.maxAmount;
        return item;
      } catch (e) {
        throw new Error(e);
      }
    },
    updateClaimLimit: async (_, args, ctx): Promise<IClaimLimit> => {
      if (!ctx?.user) throw new Error("Unauthorised");
      const { _id, data } = args;

      try {
        const item = await ClaimLimit.findByIdAndUpdate(
          { _id },
          { ...data },
          { new: true }
        ).populate(populatedFields);
        const usedAmount = await getUsedAmount(item.claimType._id);
        item.balance = item.maxAmount - usedAmount;

        return item;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
