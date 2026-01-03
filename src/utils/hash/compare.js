import bcrypt from "bcrypt";

export const CompareAsync = async ({ key, hashed }) => {
  if (!key || !hashed) throw new Error("data and hash arguments required");
  return await bcrypt.compare(key, hashed);
};