import userModel from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function registeruser(req, res) {
  try {
    const { username, name, password, role = "student", email } = req.body;
    const isUserExits = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExits) {
      return res.status(409).json({
        message: "User Exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      name,
      email,
      password: hashedPassword,
      role,
    });
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token);
    return res.status(201).json({
      message: "Registration SuccessFull",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(401).json({
      message: "User Not Found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("token", token);
  return res.status(200).json({
    message: "Login Success",
    user,
    token,
  });
}
export { registeruser, loginUser };
