import jwt from "jsonwebtoken";

async function authInstructor(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (decoded.role != "instructor") {
      return res.status(401).json({
        message: "You Have Not Access To This Page.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function authStudent(req, res, next) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).josn({
      message: "Internal Server Error",
    });
  }
}
export { authInstructor, authStudent};
