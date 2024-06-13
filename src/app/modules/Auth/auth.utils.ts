import bcrypt from "bcryptjs";

export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatched = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatched;
};
