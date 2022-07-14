import { json } from "express";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decodet = jwt.verify(token, "secret123");
      req.userId = decodet._id;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Doesn't have access" });
    }
  } else {
    return res.status(403).json({ message: "Does not have access" });
  }
};
