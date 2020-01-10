const express = require("express");
const router = express.Router();
const { register, login, logout, checkAuthenticated} = require("../controllers/auth_controller");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", checkAuthenticated);

module.exports = router;
