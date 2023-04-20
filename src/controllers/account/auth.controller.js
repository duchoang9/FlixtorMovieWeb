const models = require('../../models/index');
const User = models.user;
const watchList = models.watch_list;
const Sequelize = models.sequelize;
const authConfig = require('../../config/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    // Save User to Database
    try {
      const user = await User.create({
        user_name: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 'client',
        ban:0,
        create_at: Sequelize.literal('NOW()'),
      });

      const watch_list = await watchList.create({
        user_id: user.id
      });

      res.json({ message: "User registered successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          user_name: req.body.username,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }
  
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).json({
          message: "Invalid Password!"
        });
      }
  
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });
  
      let authority = user.role;
  
      req.session.token = token;
  
      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: authority,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).json({
        message: "You've been signed out!"
      });
    } catch (err) {
      this.next(err);
    }
};