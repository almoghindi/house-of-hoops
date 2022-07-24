const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const sendgrid = require("@sendgrid/mail");
const Token = require("../models/token");
const crypto = require("crypto");
const Joi = require("joi");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sendgrid.setApiKey(SENDGRID_API_KEY);

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    cart: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const getUser = async (req, res, next) => {
  let existingUser;

  try {
    existingUser = await User.findById(req.params.userId, "-password");
    res.json({
      user: existingUser.toObject({
        getters: true,
      }),
    });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
}

const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    existingUser = await User.findOne({ email: email });
    if (existingUser) {
      let token = await Token.findOne({ userId: existingUser._id });
      if (!token) {
        let token = new Token({
          userId: existingUser._id,
          token: crypto.randomBytes(32).toString("hex"),
        });
        try {
          await token.save();
        } catch (err) {
          const error = new HttpError(
            "Signing up failed, please try again later.",
            500
          );
          return next(error);
        }
      }
      const link = `http://localhost:3000/resetPassword/${existingUser._id}`;
      const mailOptions = {
        from: "almoghinde@gmail.com",
        to: existingUser.email,
        subject: "Reset password",
        text: "Your reset password link is : " + link,
      };
      sendgrid
        .send(mailOptions)
        .then((resp) => {
          console.log("Email sent\n", resp);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      res.json({
        error: "Email doesnt exist, please enter valid email !",
      });
    }
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
};

const checkResetLink = async (req, res, next) => { 
  const { userId } = req.body;
  try {
    let token = await Token.findOne({ userId: userId });
    if (!token) {
      res.json({ isValid: false });
    }
    else {
      res.json({ isValid: true, token: token.token});
    }
  }
  catch {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    res.json({ isValid: false });
    return next(error);
  }
  
}


const resetPassword = async (req, res, next) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    const password = await bcrypt.hash(req.body.password, 12);
    user.password = password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};
exports.resetPassword = resetPassword;
exports.checkResetLink = checkResetLink;
exports.forgetPassword = forgetPassword;
exports.getUser = getUser;
exports.signup = signup;
exports.login = login;
