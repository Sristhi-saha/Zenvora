import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.models.js';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 1. Register User
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: 'User Registered Successfully'
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 2. Login User
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(password, checkUser.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                userName: checkUser.username,
            },
            process.env.CLIENT_SECRET_KEY,
            { expiresIn: '120m' }
        );

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "User Logged In Successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.username,
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 3. Google OAuth Login / Register
export const googleAuth = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({
            success: false,
            message: "Google credential token is required.",
        });
    }

    try {
        // Verify Google's cryptographic token:
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId, picture } = payload;

        // Check if user already exists in MongoDB
        let user = await User.findOne({ email });

        if (!user) {
            // New user -> Create student account
            user = new User({
                username: name || email.split('@')[0],
                email,
                googleId,
                avatar: picture,
                role: 'user',
            });
            await user.save();
        } else if (!user.googleId) {
            // Existing user -> Link their Google ID
            user.googleId = googleId;
            if (!user.avatar) user.avatar = picture;
            await user.save();
        }

        // Issue our standard JWT cookie
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
                userName: user.username,
            },
            process.env.CLIENT_SECRET_KEY,
            { expiresIn: '120m' }
        );

        res.cookie('token', token, { httpOnly: true, secure: false }).status(200).json({
            success: true,
            message: "Logged in with Google successfully!",
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
                userName: user.username,
            },
        });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({
            success: false,
            message: "Google authentication failed",
        });
    }
};

// 4. Logout User
export const logout = async (req, res) => {
    try {
        res.clearCookie('token').json({
            success: true,
            message: 'Logged Out Successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Some Error Occured'
        });
    }
};

// 5. Auth Middleware
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Access'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        });
    }
};
