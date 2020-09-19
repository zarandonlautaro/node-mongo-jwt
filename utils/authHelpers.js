const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  const { _id, name, email } = user;
  const token = jwt.sign({ _id, name, email }, process.env.TOKEN_SECRET);
  return token;
};

const checkToken = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(401).send('Access Denied (You need to send the token in headers)');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
  return res.status(500).send('Hacking auth ?');
};

module.exports.generateToken = generateToken;
module.exports.checkToken = checkToken;
