import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcryptjs";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//pre save middleware / hook
userSchema.pre("save", async function (next) {
  const user = this;

  //hashing password and save in database
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

//remove password string after saving data
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
