// Importa o módulo dotenv para carregar variáveis de ambiente\import 'dotenv/config';
import 'dotenv/config';

// Importa a função ObjectId do driver do MongoDB para manipular IDs únicos dos documentos
import { ObjectId } from "mongodb";

// Importa a função personalizada para conectar ao banco de dados
import conectarAoBanco from "../config/dbConfig.js"

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-backend");

    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");

    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}
// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
    // Seleciona o banco de dados "imersao-backend"
    const db = conexao.db("imersao-backend");

    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");

    // Insere o novo post na coleção e retorna o resultado
    return colecao.insertOne(novoPost);
}
// Função assíncrona para atualizar um post existente no banco de dados
export async function atualizarPost(id, novoPost) {
    // Seleciona o banco de dados "imersao-backend"
    const db = conexao.db("imersao-backend");

    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");

    // Converte o ID fornecido (em formato hexadecimal) para um objeto ObjectId
    const objID = ObjectId.createFromHexString(id);
    
    // Atualiza o documento correspondente ao ID com os novos dados fornecidos e retorna o resultado
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}