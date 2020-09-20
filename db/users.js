const bycrypt = require('bcryptjs');
const { userSchema } = require('../schema/User');

const findEmail = async (email) => {
  const user = await userSchema.findOne({ email }, { _id: 0, email: 1 });
  if (!user) return false;
  return user;
};

const findPassword = async (email) => {
  const user = await userSchema.findOne({ email }, { _id: 0, password: 1 });
  if (!user) return false;
  const { password } = user;
  return (password);
};

const hassPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  return hashedPassword;
};

const generateUser = async (name, lastname, dni, age, email, password) => {
  const user = await userSchema.create({
    name,
    lastname,
    dni,
    age,
    email,
    password: await hassPassword(password),
  });
  return user;
};

const validPassword = async (password, email) => {
  const passwordCorrect = await findPassword(email);
  const validPass = await bycrypt.compare(password, passwordCorrect);
  return validPass;
};

const getUsers = async () => {
  const users = await userSchema.find();
  if (users) return users;
  return false;
};

module.exports.findEmail = findEmail;
module.exports.findPassword = findPassword;
module.exports.generateUser = generateUser;
module.exports.validPassword = validPassword;
module.exports.getUsers = getUsers;
