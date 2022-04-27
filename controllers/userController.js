const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const validate = require("../config/validator");
const { generateToken } = require("../utils/generateToken");

//create a new user

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const valid = await validate({ username, email, password });

  if (valid) {
    const hashedPassword = await bcrypt.hash(valid.password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        id: user._id,
        token: generateToken(user._id),
      });
    }

    res.status(201).json({
      message: "User created successful",
      user,
    });
  } else {
    res.status(400).json({
      message: "invalid data",
    });
  }
};

//auth a user
async function authUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({
          username: user.username,
          email: user.email,
          id: user._id,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({
          message: "Invalid password",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid email",
      });
    }
  } catch {
    res.status(400).json({
      message: "User not found",
    });
  }
}
module.exports = { createUser, authUser };
