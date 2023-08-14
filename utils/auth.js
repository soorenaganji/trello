const { hash, compare } = require("bcryptjs");

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}
async function verifyPassword(password, hashedPassword) {
  const isValid = compare(password, hashedPassword);
  return isValid;
}
export { hashPassword, verifyPassword };
