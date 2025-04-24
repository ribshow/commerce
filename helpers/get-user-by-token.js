import jwt from "jsonwebtoken";
import User from "../src/Models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const getUserByToken = async (token, res) => {
  if (!token)
    return res.status(401).json({ message: "Acesso negado, não autorizado!" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decode.id;

    const user = await User.findOne({ _id: userId });

    return user;
  } catch (error) {
    console.log("Erro ao buscar usuário pelo token", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
