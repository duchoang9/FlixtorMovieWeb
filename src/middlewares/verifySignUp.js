const models = require('../models/index');
const User = models.user;
verifySignUp = async (req, res, next) => {
    try{
        // Username
        let user = await User.findOne({
            where: {
                user_name: req.body.username
            }
        });

        if (user) {
            return res.status(400).json({
                message: "Failed! Username is already in use!"
            });
        }

        // Email
        user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(400).json({
                message: "Failed! Email is already in use!"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Unable to validate Username!"
        });
        
    }
};

module.exports = verifySignUp;