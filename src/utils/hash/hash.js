import bcrypt from "bcrypt";

export const HashAsync = async (key, SALT_ROUNDS = process.env.SALT_ROUNDS) => {
  if (!key) throw new Error("key is required for hashing");
  return await bcrypt.hash(key, parseInt(SALT_ROUNDS));
};
