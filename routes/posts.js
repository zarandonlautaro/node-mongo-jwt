const router = require('express').Router();
const { verifyToken } = require('../libs/verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.json({
    post: {
      title: 'my first api',
      description: 'random data que solo puede ver un usuario logea2',
    },
  });
});

module.exports = router;
