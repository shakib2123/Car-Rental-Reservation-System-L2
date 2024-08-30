import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { isPasswordMatched } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";
import bcrypt from "bcryptjs";

const register = async (payload: TUser) => {
  const user = await User.findOne({
    email: payload.email,
  });

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is already exist !");
  }

  const result = await User.create(payload);
  const { password, ...userData } = result.toObject();
  return userData;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const passwordMatch = await isPasswordMatched(
    payload?.password,
    user?.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_secret_expires_in as string,
  });

  const { password, ...userData } = user.toObject();

  return {
    user: userData,
    accessToken,
  };
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // check if the  user is deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10m",
  });

  const resetUILink = `${config.reset_pass_ui_link}?id=${user._id}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
};

const resetPassword = async (payload: {
  email: string;
  id: string;
  newPassword: string;
  token: string;
}) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const decoded = jwt.verify(
    payload.token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  // hash password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  await User.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
    }
  );
};

export const AuthServices = { register, login, forgetPassword, resetPassword };
