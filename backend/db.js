import mysql from "mysql2/promise";

/*
  Este arquivo é responsável pela conexão com o banco de dados MySQL.

  Atenção:
  - O front-end nunca deve se conectar diretamente ao banco.
  - A conexão com o banco deve ser feita pelo back-end.
  - Os dados abaixo precisam estar de acordo com a configuração do MySQL local.
*/

export const db = await mysql.createPool({
  /*
    LACUNA 1:
    Informe o endereço do servidor do banco de dados.

    Orientações:
    - Em ambiente local, geralmente usamos o servidor local da máquina.
    - O valor deve ser uma string.
  */
  host: "127.0.0.1",

  /*
    LACUNA 2:
    Informe o usuário do MySQL.

    Orientações:
    - Em muitos ambientes locais, o usuário padrão costuma ser o administrador do MySQL.
    - O valor deve ser uma string.
  */
  user: "root",

  /*
    LACUNA 3:
    Informe a senha do usuário do MySQL.

    Orientações:
    - Essa senha é a mesma configurada na instalação do MySQL.
    - O valor deve ser uma string.
    - Caso não exista senha no ambiente local, analise com o professor como preencher.
  */
  password: "admin",

  /*
    LACUNA 4:
    Informe o nome do banco de dados que será utilizado no projeto.

    Orientações:
    - O nome deve ser o mesmo banco criado no script SQL.
    - O valor deve ser uma string.
  */
  database: "sistema_usuarios",
  /**
   * Verificar a porta de conexão com o banco de dados.
   * 
   * Orientações:
   * - Verificar a conexão que esstá no MySQL Workbench e porta que está nessa
   * conexão.
   */
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});