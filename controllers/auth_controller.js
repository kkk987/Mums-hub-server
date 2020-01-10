const passport = require("passport");
const User = require("../models/user");
const authenticate = passport.authenticate("local");



const register = function (req, res) {
    validatePassword(req.body.password);
    req.body.role = validateUserRole(req.body.role);
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        dueDate: req.body.dueDate,
        role: req.body.role
    }), req.body.password, function (err) {
        console.log(`err: ${err}`)
        if (err) {
            res.status(500);
            res.json({
                error: err
            });
        } else {
            // Log in the newly registered user
            passport.authenticate('local')(req, res, function () {
                loginUser(req, res);
            });
        }
    });
};

function loginUser(req, res) {
    // passport.authenticate returns a function that we will call with req, res, and a callback function to execute on success    

    authenticate(req, res, function () {
        console.log('authenticated', req.user.username);
        console.log('session object:', req.session);
        console.log('req.user:', req.user);
        res.status(200);
        res.json(req.user);
    });
}

const logout = function(req, res) {
	req.logout();
	console.log("logged out user");
	console.log("session object:", req.session);
	console.log("req.user:", req.user);
	res.sendStatus(200);
}


// Local helper functions
const validatePassword = function (password) {
    if (!password || (password.length < 6)) {
        res.status(500);
    }
}

const validateUserRole = function (role) {
    if (!role) {
        return "user"
    }
    return role
}

const checkAuthenticated = function (req, res) {
    if (req.isAuthenticated()) {
        res.sendStatus(200)
    }else {
        res.sendStatus(403)
    }
} 

module.exports = { 
                    register,
                    login: loginUser,
                    logout,
                    checkAuthenticated
                 };
