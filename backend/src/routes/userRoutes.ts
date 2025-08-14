import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMyInfo
} from "../controllers/userController";
import {
  register,
  login,
  googleAuthCallback,
  getMe
} from "../controllers/authController";
import { protect } from "../middlewares/authMiddleWare";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * Auth Routes
 */
router.post("/auth/signup", register);
router.post("/auth/login", login);

// Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { session: false, failureRedirect: "/login" }),
//   googleAuthCallback
// );

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user as any;
    const token = generateToken(user?.user?._id.toString());

    // Send token to popup's opener window
    res.send(`
      <script>
        window.opener.postMessage(
          { token: "${token}", user: { id: "${user.id}", name: "${user.name}", email: "${user.email}" } },
          "http://localhost:5173"
        );
        window.close();
      </script>
    `);
  }
);

/**
 * CRUD Routes (Protected with JWT)
 */
router.post("/", protect, createUser);
router.get("/", protect, getUsers);
router.get("/me", protect, getMe);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router; 
