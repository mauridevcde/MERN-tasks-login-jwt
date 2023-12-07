import jwt from "jsonwebtoken";
import "dotenv/config";

export const AuthRequired = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res
        .status(401)
        .json({ message: "No Token, authorization denied " });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Token is not valid" });
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
