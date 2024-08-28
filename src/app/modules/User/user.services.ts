import { User } from "./user.model";

const getAllUserFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

const updateUserRoleIntoDB = async (userId: string, role: string) => {
  const result = await User.updateOne({ _id: userId }, { role }, { new: true });
  return result;
};
const deleteUserRoleIntoDB = async (userId: string) => {
  const result = await User.updateOne(
    { _id: userId },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const UserServices = {
  getAllUserFromDB,
  updateUserRoleIntoDB,
  deleteUserRoleIntoDB,
};
