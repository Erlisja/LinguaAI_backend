import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

// @desc    Authenticate user with Google
// @route   GET /api/users/auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Callback for Google OAuth
// @route   GET /api/users/auth/google/callback
// Google OAuth Callback → Returns JWT Token
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }), // No session needed
    (req, res) => {
        console.log("Authenticated user:", req.user);
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
    
        // Generate JWT Token
        const token = jwt.sign(
            { id: req.user._id, email: req.user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // Token expires in 7 days
        );


        // Send token & user data to frontend
        res.json({
            message: "Google login successful",
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
            },
            token, // Send JWT token to frontend
        });

    
    }
);

export default router;