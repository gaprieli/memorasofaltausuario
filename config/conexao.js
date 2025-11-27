import mongoose from "mongoose";

// Adicione o nome do banco após o domínio
const url = "mongodb+srv://alunalinda:aluno@cluster0.3lole.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const conexao = await mongoose.connect(url);
console.log("Conectado ao MongoDB!");

export default conexao;