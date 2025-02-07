import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/userModel.mjs"; // Adjust path if needed

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3030/api/users/auth/google/callback",
            scope: ["profile", "email"], // Ensure email is included
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("Google Profile:", profile); // Debugging Step

                if (!profile) {
                    console.error("Google authentication failed: Profile is undefined");
                    return done(new Error("Google authentication failed"), null);
                }

                if (!profile.emails || profile.emails.length === 0) {
                    console.error("No email found in Google profile");
                    return done(new Error("No email found in Google profile"), null);
                }

                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = new User({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        password: "GoogleAuth" // Dummy password since login is via Google
                    });
                    await user.save();
                }

                return done(null, user);
            
            } catch (error) {
                console.error("Google Authentication Error:", error);
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
