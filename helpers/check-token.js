import jwt from "jsonwebtoken";
import { getToken } from "./get-token.js";
import dotenv from "dotenv";

dotenv.config();

export const checkToken = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Acesso negado, não autorizado!" });

  const token = getToken(req);

  if (!token)
    return res.status(401).json({ message: "Acesso negado, não autorizado!" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    console.log("Erro ao verificar token", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
