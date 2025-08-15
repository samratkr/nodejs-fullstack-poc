import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const register = async (req: Request, res: Response) => {

  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password, age });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user.id),
      user: { id: user.id, name: user.name, email: user.email, age:user.age },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user.id),
      user: { id: user.id, name: user.name, email: user.email, age: user.age },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const googleAuthCallback = (req: Request, res: Response) => {
  const user = req.user as any;
  const token = generateToken(user.id);

  res.json({
    message: "Google Sign-In successful",
    token,
    user: { id: user.id, name: user.name, email: user.email, age: user.age },
  });
};

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(req.user);
};
