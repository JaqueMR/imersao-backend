import { MongoClient } from 'mongodb';

/**
 * Conecta-se ao banco de dados MongoDB utilizando a string de conexão fornecida.
 * 
 * @param {string} stringConexao A string de conexão para o banco de dados MongoDB.
 * @returns {MongoClient} Um objeto MongoClient para interagir com o banco de dados.
 */
export default async function conectarAoBanco(stringConexao) {
  // Variável para armazenar o cliente MongoDB
  let mongoClient;

  try {
    // Cria uma nova instância do cliente MongoDB com a string de conexão
    mongoClient = new MongoClient(stringConexao);
    console.log('Conectando ao cluster do banco de dados...');

    // Tenta estabelecer a conexão com o banco de dados
    await mongoClient.connect();
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente MongoDB para uso em outras partes do código
    return mongoClient;
  } catch (error) {
    // Caso ocorra algum erro durante a conexão, exibe uma mensagem de erro no console
    console.error('Falha na conexão com o banco!', error);

    // Encerra a execução do processo, indicando um erro crítico
    process.exit();
  }
}