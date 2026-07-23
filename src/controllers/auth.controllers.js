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
    const refreshToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const accessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      },
    );
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("accessToken", accessToken, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });
    return res.status(201).json({
      message: "Registration SuccessFull",
      user,
      accessToken,
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

  const accessToken = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1m",
    },
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1m",
    },
  );
  user.refreshToken = refreshToken;
  await user.save();
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
  });
  return res.status(200).json({
    message: "Login Success",
    user,
    accessToken,
  });
}

async function logout(req, res) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Logout Successfull",
  });
} 
export { registeruser, loginUser, logout };
