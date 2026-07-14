import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import sendMail from "../utils/sendregister.mails.js";
import crypto from "crypto";

const createUser = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long."
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = crypto.randomBytes(32).toString("hex");

        const verificationLink = `http://localhost:4000/api/v1/auth/verify/${token}`;

        const user = await User.create({
            full_name,
            email,
            password: hashedPassword,
            verification_token: token
        });

        // Try to send email, but don't fail user creation if it doesn't work
        try {
            await sendMail({
                name: full_name,
                email,
                verificationLink
            });

            return res.status(201).json({
                message: "User created successfully. Verification email sent.",
                data: user
            });

        } catch (mailError) {
            console.error("Email sending failed:", mailError);

            return res.status(201).json({
                message: "User created successfully, but verification email could not be sent.",
                data: user
            });
        }

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export { createUser };