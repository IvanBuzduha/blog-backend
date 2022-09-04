import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();
    const secret = process.env.secret;
    const token = jwt.sign({ _id: user._id }, secret, {
      expiresIn: "1d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messge: "Registration failed" });
  }
};
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValiidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValiidPass) {
      return res.status(403).json({ message: "Wrong password or email" });
    }
    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "1d",
    });
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messge: "Authorisation is failed" });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messge: "Doesn't have access" });
  }
};
