const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('jwt');
  if (!token) return res.status(401).send('Access Denied (You need to send the JWT in headers)');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
  return res.status(400).send('Hacking auth ?');
};

module.exports.verifyToken = verifyToken;
