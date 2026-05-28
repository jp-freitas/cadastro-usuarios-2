/*
  Este arquivo será responsável por criar a API do sistema.

  A API será responsável por:
  - Receber os dados enviados pelo front-end
  - Validar as informações básicas
  - Gerar o hash da senha
  - Salvar o usuário no banco de dados
*/

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { db } from "./db.js";

/*
  LACUNA 1:
  Crie uma aplicação Express.

  Orientações:
  - Use a função express()
  - Armazene o resultado em uma constante chamada app
*/
const app = express();

/*
  Os middlewares abaixo permitem:
  - Receber requisições de outros endereços
  - Interpretar JSON enviado pelo front-end
*/

app.use(cors());

/*
  LACUNA 2:
  Configure o Express para aceitar dados em formato JSON.

  Orientações:
  - Use app.use()
  - Use o middleware próprio do Express para JSON
*/
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    /*
      LACUNA 3:
      Extraia name, email e password do corpo da requisição.

      Orientações:
      - Os dados vêm dentro de req.body
      - Use desestruturação de objeto
    */
    const { name, email, password } = req.body;

    /*
      LACUNA 4:
      Verifique se algum campo obrigatório não foi preenchido.

      Orientações:
      - Verifique name, email e password
      - Use operador lógico OU
      - Caso algum campo esteja ausente, retorne status 400
    */
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Nome, e-mail e senha são obrigatórios."
      });
    }

    /*
      LACUNA 5:
      Verifique se a senha possui menos de 8 caracteres.

      Orientações:
      - Use a propriedade length da senha
      - Caso a senha tenha menos de 8 caracteres, retorne status 400
    */
    if (password.lenght < 8) {
      return res.status(400).json({
        message: "A senha deve ter pelo menos 8 caracteres."
      });
    }

    /*
      LACUNA 6:
      Busque no banco se já existe um usuário com o mesmo e-mail.

      Orientações:
      - Use db.execute()
      - Faça um SELECT buscando o id na tabela users
      - Use WHERE email = ?
      - O valor do e-mail deve ser passado como parâmetro
      - Armazene o resultado em uma constante chamada existingUser
    */
    const existingUser = db.prepare(
      "SELECT id_users FROM users WHERE email = ?"
      ).get(email);
    /*
      LACUNA 7:
      Verifique se já existe usuário cadastrado com esse e-mail.

      Orientações:
      - existingUser será uma lista
      - Se a lista possuir algum item, significa que o e-mail já existe
      - Nesse caso, retorne status 409
    */
    if (existingUser) {
      return res.status(409).json({
        message: "Este e-mail já está cadastrado."
      });
    }

    /*
      LACUNA 8:
      Defina a quantidade de rounds do bcrypt.

      Orientações:
      - Esse número influencia o custo de processamento do hash
      - Use um valor numérico adequado para ambiente de estudo
      - Armazene na constante saltRounds
    */
    const saltRounds = 12;

    /*
      LACUNA 9:
      Gere o hash da senha usando bcrypt.

      Orientações:
      - Use await
      - Use bcrypt.hash()
      - Passe a senha original e a quantidade de rounds
      - Armazene o resultado em uma constante chamada passwordHash
    */
    const passwordHash = await bcrypt.hash(password, saltRounds);

    /*
      LACUNA 10:
      Insira o novo usuário no banco de dados.

      Orientações:
      - Use db.execute()
      - Faça um INSERT INTO na tabela users
      - Os campos são name, email e password_hash
      - Use parâmetros para evitar concatenar valores diretamente no SQL
    */
    db.prepare(
      "INSERT INTO users (name, email, password_hash) VALUE (?, ?, ?)"
    ).run(name, email, passwordHash);

    return res.status(201).json({
      message: "Usuário criado com sucesso."
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno no servidor."
    });
  }
});

/*
  LACUNA 11:
  Inicialize o servidor.

  Orientações:
  - Use app.listen()
  - A porta deve ser 3000
  - Exiba uma mensagem no console informando que o servidor está rodando
*/
app.listen(3000, () => {}
console.log(servidor rodando em http://localhost:3000);
);