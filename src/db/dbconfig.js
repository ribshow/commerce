import mongoose from "mongoose";
import dotenv from "dotenv";

// carregando o arquivo .env
dotenv.config();

const uri = process.env.MONGODB_URI;

async function main() {
  await mongoose.connect(uri || "");
  console.log("Conectado ao banco de dados");
}

main().catch((error) => console.log(`Erro ao conectar no database: ${error}`));

export default mongoose;
