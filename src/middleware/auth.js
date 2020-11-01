const jwt = require('jsonwebtoken');
const User = require('../db/models/user.js');

// Middleware for customize server requests
const auth = async (req, res, next) => {
  try {
    const jwt_secret = process.env.JWT_SECRET;
    const authToken = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(authToken, jwt_secret);
    const user = await User.findOne({
      userId: decoded.userId,
      'tokens.token': authToken,
    });

    if (!user) {
      throw new Error();
    }

    req.token = authToken;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate first' });
  }
};

module.exports = auth;
