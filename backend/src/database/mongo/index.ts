import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Banco conectado com sucesso!");
  } catch (error) {
    console.log("Erro ao se conectar com o banco...", error);
  }
}

export { mongoose as client, connectDB };
