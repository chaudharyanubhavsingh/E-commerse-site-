// services/userService.js
const User = require('./usermodel');

module.exports.createUserDBService = async (userDetails) => {
  try {
    const user = await User.create(userDetails);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
