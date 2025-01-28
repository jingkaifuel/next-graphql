import jwt from "jsonwebtoken";

import { User } from "../models";
import { IUser } from "../models/user.model";

export default {
  Query: {
    // Get current logged in user details
    getCurrentUser: async (_, __, ctx): Promise<IUser[]> => {
      return await ctx?.user;
    },
  },

  Mutation: {
    // Login with username and password
    login: async (_, args, ctx) => {
      const { username, password } = args;
      const { res } = ctx;
      const user = await User.findOne({
        username,
        password,
      });
      if (!user) throw new Error("Invalid username or password");

      // Sign the access token to keep user authorised
      const token = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // To refresh the access token if it expires, if Refresh Token is expired,
      // user will need to login again
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      // Assigning refresh token in http-only cookie
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return { token, user };
    },
    // Refresh access token with given refresh token
    refresh: async (_, args) => {
      const { token } = args;

      // Verifying refresh token
      const decoded = await jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err) => {
          if (err) {
            // Wrong Refesh Token
            throw new Error("Unauthorized");
          }
        }
      );

      const user = await User.findById(decoded["userId"]);

      // Correct token we send a new access token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );

      return { token: accessToken, user };
    },
    // Create new user
    createUser: async (_, args, ctx) => {
      // Only admin can create user
      if (ctx?.user?.position.toLowerCase() != "admin") {
        throw new Error("Unauthorised");
      }

      const { user: userCreate } = args;
      try {
        // Create User and return the result
        return await User.create({ ...userCreate, isActive: true });
      } catch (e) {
        // Throw error if unsuccess
        throw new Error(e);
      }
    },
    // Update existing user details
    updateUser: async (_, args, ctx) => {
      const { _id, user: userUpdate } = args;

      // Only admin OR thet user can update the details
      if (
        ctx?.user._id != _id &&
        ctx?.user?.position.toLowerCase() != "admin"
      ) {
        throw new Error("Unauthorised");
      }

      try {
        // Update the User and return the result
        return await User.findByIdAndUpdate(
          _id,
          { ...userUpdate },
          { new: true }
        );
      } catch (e) {
        // Throw error if unsuccess
        throw new Error(e);
      }
    },
  },
};
