import express from "express";
import cors from "cors";
import routesAuth from "./Routes/Auth/routesAuth.js";
import routesProduct from "./Routes/Product/routesProduct.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/auth", routesAuth);
app.use("/products", routesProduct);

app.listen(5000, console.log("Aplicação rodando na porta 5000"));
