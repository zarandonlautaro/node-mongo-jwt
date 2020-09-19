const router = require('express').Router();
const { checkToken } = require('../utils/authHelpers');

router.get('/', checkToken, (req, res) => {
  res.json({
    post: {
      title: 'my first api',
      description: 'random data que solo puede ver un usuario logea2',
    },
  });
});

module.exports = router;
