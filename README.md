# API de Imagens com Integração ao Google Gemini

Este repositório contém o código de uma API que desenvolvi durante a **IMERSÃO BACKEND** promovida pela Alura em parceria com o Google.  Durante essa imersão, criei uma API que armazena imagens em um banco de dados MongoDB e as consome através de um frontend. Além disso, integrei a API com o **Google Gemini**, que gera descrições automáticas para as imagens enviadas. 

## O que aprendi

- **Desenvolvimento de API**: Desenvolvi a lógica do backend utilizando **Node.js** e **Express**.
- **Banco de Dados MongoDB**: Armazenei as imagens e os dados associados a elas no **MongoDB**, com persistência de dados e integração com o backend.
- **Google Gemini**: Aprendi a integrar com o **Google Gemini API** para gerar descrições automáticas das imagens.
- **Docker**: Usei o **Docker** para orquestrar os contêineres de banco de dados, backend e frontend, e garanti que a aplicação fosse facilmente replicada.
- **Ambiente de Desenvolvimento**: Utilizei **Docker Compose** para facilitar a configuração e execução do ambiente de desenvolvimento local.
- **Frontend e Backend**: O projeto inclui tanto o frontend quanto o backend, sendo que a comunicação entre eles é realizada por meio da API.

## Funcionalidades

- **Armazenamento de Imagens**: A API permite o envio de imagens, que são armazenadas no banco de dados MongoDB.
- **Geração de Descrições**: A integração com o **Google Gemini** gera automaticamente descrições para as imagens enviadas.
- **Frontend e Backend**: A API se comunica com o frontend via HTTP, e também é possível interagir diretamente com a API via comandos no terminal.
- **Persistência de Dados**: O MongoDB armazena informações como título, descrição e imagem dos posts.
