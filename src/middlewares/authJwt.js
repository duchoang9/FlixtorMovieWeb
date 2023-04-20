const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const models = require('../models/index');
const User = models.user;

verifyToken = (req, res, next) => {
    let token = req.session.token;
  
    if (!token) {
      return res.status(403).json({
        message: "No token provided!",
      });
    }
  
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
  };

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if(user.role === 'admin') {
            return next();
        }

        return res.status(403).json({
            message: "Require Admin Role!",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to validate User role!",
        });
    }
};

isUser = async (req, res, next) => {
  try {
      const user = await User.findByPk(req.userId);
      if(user.role === 'client') {
          return next();
      }

      return res.status(403).json({
          message: "Require User Role!",
      });
  } catch (error) {
      return res.status(500).json({
          message: "Unable to validate User role!",
      });
  }
};

const authJwt = {
    isAdmin,
    isUser,
    verifyToken
};

module.exports = authJwt;