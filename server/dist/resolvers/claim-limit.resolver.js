"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const populatedFields = ["claimType", "user", "approver"];
exports.default = {
    Query: {
        // Get all claimLimits
        getClaimLimitByUser: async (_, __, ctx) => {
            const { user } = ctx;
            return await models_1.ClaimLimit.find({ user: user._id }).populate(populatedFields);
        },
        // Get ClaimLimit by ID
        getClaimLimit: async (_, { _id }) => {
            return await models_1.ClaimLimit.findById({ _id }).populate(populatedFields);
        },
    },
    Mutation: {
        // Create a claimLimit
        createClaimLimit: async (_, args, ctx) => {
            if (!ctx?.user)
                throw new Error("Unauthorised");
            const { data } = args;
            try {
                return (await models_1.ClaimLimit.create({ ...data, isActive: true })).populate(populatedFields);
            }
            catch (e) {
                throw new Error(e);
            }
        },
        // Update an existing claimLimit at given claimLimit ID
        updateClaimLimit: async (_, args, ctx) => {
            if (!ctx?.user)
                throw new Error("Unauthorised");
            const { _id, data } = args;
            try {
                return await models_1.ClaimLimit.findByIdAndUpdate({ _id }, { ...data }, { new: true }).populate(populatedFields);
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
