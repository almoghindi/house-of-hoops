const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.get("/:userId", usersController.getUser);

router.post("/forgetPassword", usersController.forgetPassword);

router.put("/:userId/:token", usersController.resetPassword);

router.post("/checkResetLink", usersController.checkResetLink);

module.exports = router;
