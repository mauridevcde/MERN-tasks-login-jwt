import jwt from "jsonwebtoken";
import 'dotenv/config'

export function createAccessToken(payload) {
  // Create token
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "1d", // 24 hours
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
