// Importa a biblioteca Google Generative AI para interagir com os modelos de linguagem da Google
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa o cliente da API usando a chave de autenticação armazenada nas variáveis de ambiente
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo específico de geração de conteúdo "gemini-1.5-flash" para gerar as descrições
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função assíncrona para gerar uma descrição de uma imagem utilizando o modelo Gemini
export default async function gerarDescricaoComGemini(imageBuffer) {
  
  // Define o prompt que será enviado para a IA
  const prompt =
    "Gere uma descrição em português do brasil curta e objetiva para a seguinte imagem e me retone só a descrição";

  try {
    // Prepara a imagem em formato base64 para ser enviada ao modelo
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte o buffer da imagem para base64
        mimeType: "image/png", // Define o tipo MIME da imagem (PNG)
      },
    };
    // Envia o prompt e a imagem para o modelo de IA para geração de conteúdo
    const res = await model.generateContent([prompt, image]);

    // Retorna a resposta gerada pela IA ou uma mensagem padrão caso não haja resposta
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    
    // Loga o erro no console caso ocorra algum problema ao chamar a API
    console.error("Erro ao obter alt-text:", erro.message, erro);

    // Lança um erro personalizado para ser tratado pelo chamador da função
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}