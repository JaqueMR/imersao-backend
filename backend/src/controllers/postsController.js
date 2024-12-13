// Importa as funções para manipulação dos posts no banco de dados
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";

// Importa o módulo fs para manipulação de arquivos
import fs from "fs";

// Importa a função para gerar descrições de imagens usando o serviço Gemini
import gerarDescricaoComGemini from "../services/geminiService.js"

// Função para listar todos os posts
export async function listarPosts(req, res) {
    // Chama a função para buscar os posts
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
}
// Função para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const novoPost = req.body;
    try {
        // Chama a função para inserir o novo post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Envia uma resposta HTTP com status 200 (OK) e os dados do post criado
        res.status(200).json(postCriado);  
    } catch(erro) {
        // Loga o erro no console e retorna uma resposta de erro com status 500 (Internal Server Error)
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}
// Função para fazer upload de uma imagem e criar um post com ela
export async function uploadImagem(req, res) {
    // Define um objeto representando o novo post com informações iniciais
    const novoPost = {
        descricao: "", // A descrição será preenchida posteriormente
        imgUrl: req.file.originalname, // Nome original do arquivo enviado
        alt: ""// Alt-text vazio inicialmente
    };
    
    try {
        // Cria o novo post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Atualiza o nome do arquivo enviado para incluir o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)

        // Envia uma resposta HTTP com os dados do post criado
        res.status(200).json(postCriado);  
    } catch(erro) {
        // Loga o erro no console e retorna uma resposta de erro com status 500 (Internal Server Error)
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}
// Função para atualizar um post existente com uma nova descrição e informações adicionais
export async function atualizarNovoPost(req, res) {
    // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição
    const id = req.params.id;

    // Define a URL pública da imagem baseada no ID
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        // Lê o conteúdo da imagem do sistema de arquivos
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);

        // Gera uma descrição para a imagem utilizando o serviço Gemini
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        // Define o objeto representando o post atualizado
        const post = {
            imgUrl: urlImagem, // URL pública da imagem
            descricao: descricao, // Descrição gerada automaticamente
            alt: req.body.alt // Texto alternativo fornecido na requisição
        };

        // Atualiza o post no banco de dados
        const postCriado = await atualizarPost(id, post);

        // Envia uma resposta HTTP com os dados do post atualizado
        res.status(200).json(postCriado);  
    } catch(erro) {
        // Loga o erro no console e retorna uma resposta de erro com status 500 (Internal Server Error)
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}