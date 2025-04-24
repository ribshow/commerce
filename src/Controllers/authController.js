import Argon2 from "argon2";
import User from "../Models/User.js";
import { createUserToken } from "../../helpers/create-token.js";
import { getUserByToken } from "../../helpers/get-user-by-token.js";
import { getToken } from "../../helpers/get-token.js";

export default class AuthController {
  // Método para fazer registro
  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;
    if (!name)
      return res.status(422).json({ message: "O campo name é requerido!" });
    if (!email)
      return res.status(422).json({ message: "O campo email é requerido!" });
    if (!phone)
      return res.status(422).json({ message: "O campo phone é requerido!" });
    if (!password)
      return res.status(422).json({ message: "O campo password é requerido!" });
    if (!confirmPassword)
      return res
        .status(422)
        .json({ message: "O campo confirmPassword é requerido!" });

    try {
      if (password !== confirmPassword)
        return res.status(422).json({ message: "As senhas não conferem!" });

      const userExists = await User.findOne({ email: email });
      if (userExists)
        return res.status(404).json({ message: "Email não disponível" });

      const passwordHashing = await Argon2.hash(password, 10);

      const user = {
        name,
        email,
        phone,
        password: passwordHashing,
      };

      const createUser = await User.create(user);
      if (!createUser)
        return res.status(400).json({ message: "Erro ao inserir usuário" });

      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso!", createUser });
    } catch (error) {
      console.log("Erro ao registrar usuário", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Método para fazer login
  static async login(req, res) {
    const { email, password } = req.body;
    if (!email)
      return res.status(422).json({ message: "O campo email é requerido!" });
    if (!password)
      return res.status(422).json({ message: "O campo password é requerido" });

    try {
      const user = await User.findOne({ email: email });
      if (!user)
        return res.status(404).json({ message: "Usuário não cadastrado!" });
      const comparePassword = await Argon2.verify(user.password, password);
      if (!comparePassword)
        return res
          .status(400)
          .json({ message: "Credenciais inválidas, tente novamente!" });

      await createUserToken(user, req, res);
    } catch (error) {
      console.log("Erro ao efetuar login", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Método para retornar o usuário logado
  static async profile(req, res) {
    try {
      const token = await getToken(req);
      if (!token)
        return res
          .status(401)
          .json({ message: "Acesso negado, efetue login!" });
      const user = await getUserByToken(token, res);

      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado!" });

      return res.status(200).json(user);
    } catch (error) {
      console.log("Erro ao retornar perfil do usuário", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
