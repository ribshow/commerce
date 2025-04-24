import { Router } from "express";
import AuthController from "../../Controllers/authController.js";
import { checkToken } from "../../../helpers/check-token.js";

const routesAuth = Router();

routesAuth.post("/register", AuthController.register);
routesAuth.post("/login", AuthController.login);
routesAuth.get("/profile", checkToken, AuthController.profile);

export default routesAuth;
