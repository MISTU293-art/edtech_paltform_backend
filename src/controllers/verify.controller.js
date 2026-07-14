import { User } from "../models/user.models.js";

const verifyController = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verification_token: token
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification token"
            });
        }

        user.isVerified = true;
        user.verification_token = undefined;

        await user.save();

        return res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        console.error("Verification Error:", error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export { verifyController };