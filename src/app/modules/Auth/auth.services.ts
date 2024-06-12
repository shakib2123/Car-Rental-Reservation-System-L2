import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const register = async (payload: TUser) => {
  const user = await User.findOne({
    email: payload.email,
  });

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is already exist !");
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({
    email: payload.email,
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_secret_expires_in as string,
  });

  return {
    user,
    accessToken,
  };
};

export const AuthServices = { register, login };
