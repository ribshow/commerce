import Product from "../Models/Product.js";

export default class ProductController {
  // método para criar produto
  static async create(req, res) {
    const { name, description, price } = req.body;

    const image = req.file;

    if (!name)
      return res.status(422).json({ message: "O campo name é requerido!" });

    if (!description)
      return res
        .status(422)
        .json({ message: "O campo description é requerido!" });

    if (!price)
      return res.status(422).json({ message: "O campo price é requerido" });

    if (!image)
      return res.status(422).json({ message: "O campo image é requerido" });

    try {
      const product = {
        name,
        description,
        price,
        image: image.filename,
      };

      const productCreated = await Product.create(product);
      if (!productCreated)
        return res.status(400).json({ message: "Falha ao cadastrar produto!" });

      return res
        .status(201)
        .json({ message: "Produto cadastrado com sucesso!", productCreated });
    } catch (error) {
      console.log("Erro ao cadastrar produto", error);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  // método para buscar todos os produtos
  static async getAll(req, res) {
    try {
      const products = await Product.find();
      if (!products)
        return res.status(404).json({ message: "Nenhum produto encontrado!" });

      return res.status(200).json(products);
    } catch (error) {
      console.log("Erro ao buscar produtos", error);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}
