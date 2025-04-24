import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createUserToken = async (user, req, res) => {
  try {
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Logado com sucesso!",
      token: token,
      user_id: user._id,
    });
  } catch (error) {
    console.log("Erro ao gerar token", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
