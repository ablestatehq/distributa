const bcrypt = require("bcrypt");
/**
 * @function encryptPassword
 * @param {String} pass
 * @param {String} saltRounds
 * @returns
 */
module.exports = async (pass, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};
