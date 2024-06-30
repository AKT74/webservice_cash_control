import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verification = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const secretKey = process.env.JWT_TOKEN;
  console.log("Secret Key:", secretKey);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    // Jika token valid, simpan informasi pengguna ke dalam request
    req.userId = decoded.id;
    req.userRoles = decoded.roles;
    next();
  });
};
