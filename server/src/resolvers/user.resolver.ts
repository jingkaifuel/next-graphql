import jwt from "jsonwebtoken";

import { User } from "../models";
import { IUser } from "../models/user.model";

export default {
  Query: {
    // Get current logged in user details
    currentUser: async (_, __, ctx): Promise<IUser> => {
      return await ctx?.user;
    },
    users: async (): Promise<IUser[]> => {
      return await User.find();
    },
    userById: async (_, args): Promise<IUser> => {
      const { _id } = args;
      return await User.findById(_id);
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
      if (!user) throw new Error();
      const { _id, email, name, position } = user;
      const formattedUser = { _id, email, name, position };

      // Sign the access token to keep user authorised
      const token = jwt.sign(
        { ...formattedUser },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // // To refresh the access token if it expires, if Refresh Token is expired,
      // // user will need to login again
      // const refreshToken = jwt.sign(
      //   { userId: user._id },
      //   process.env.REFRESH_TOKEN_SECRET,
      //   { expiresIn: "1d" }
      // );
      // // Assigning refresh token in http-only cookie
      // res.cookie("refresh_token", refreshToken, {
      //   httpOnly: true,
      //   sameSite: "None",
      //   secure: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      // });

      return { token };
    },
    // Reset user password from email
    resetPassword: async (_, args) => {
      const { email, password } = args;
      try {
        return await User.findOneAndUpdate({ email }, { password });
      } catch (e) {
        throw new Error(e);
      }
    },

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
