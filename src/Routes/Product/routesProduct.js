import { Router } from "express";
import ProductController from "../../Controllers/productsController.js";
import { checkToken } from "../../../helpers/check-token.js";
import imageUpload from "../../../helpers/image-upload.js";
const routesProduct = Router();

routesProduct.post(
  "/store",
  checkToken,
  imageUpload.single("image"),
  ProductController.create
);
routesProduct.get("/all", checkToken, ProductController.getAll);

export default routesProduct;
