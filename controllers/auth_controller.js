const passport = require("passport");
const User = require("../models/user");

const validatePassword = function (password) {
    if (!password || (password.length < 6)) {
        res.status(500);
    }else {
        console.log(`Password validated`);
    }
    
}
const register = function (req, res) {
    validatePassword(req.body.password);
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        duedate: req.body.duedate
    }), req.body.password, function (err) {
        if (err) {
            res.status(500);
            res.json({
                error: err
            });
        } else {
            // Log in the newly registered user
            passport.authenticate('local')(req, res, function () {
                console.log('authenticated', req.user.username);
                console.log('session object:', req.session);
                console.log('req.user:', req.user);
                res.status(200);
                res.json(req.user);
            });
        }
    });
};

module.exports = { register };
