import jwt from "jsonwebtoken";
import { User } from "./models";

export const getLoggedInUser = async ({ req, res }) => {
  const token = req.headers.authorization || "";
  if (!token) return null;

  try {
    const tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(tokenData._id);
    return user;
  } catch (error) {
    throw new Error("Unauthorised");
  }
};
