import { clearToken } from "../libs/clearToken.js";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //verify if email exists
    const userEmailFound = await User.findOne({ email });
    if (userEmailFound)
      return res.status(400).json(["The email already exists"]);

    // Encrypt password
    const passwordHash = await bcrypt.hash(password, 10); // 10 is the salt

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }); // Check if email exists

    if (!userFound)
      return res.status(400).json(["Email or Password Incorrect."]); // If not exists email or user

    // Compare password
    const isMatch = await bcrypt.compare(password, userFound.password); // Compare password

    if (!isMatch)
      return res.status(400).json(["Email or Password Incorrect. "]); // If password is incorrect

    const token = await createAccessToken({ id: userFound._id }); // Create token

    res.cookie("token", token); // Send token in cookie

    res.json({
      // Send user info
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    //clear token
    clearToken(res, "token");
    res.json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  console.log(token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }


    const userFound = await User.findById(user.id);

    if (!userFound) {
      return res.status(401).json({ message: "User not found" });
    }
    console.log(userFound);
    return res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
    });
  });
};
