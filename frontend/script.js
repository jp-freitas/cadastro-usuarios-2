const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  /*
    LACUNA 1:
    Capture o valor digitado no campo de nome.

    Orientações:
    - Use document.getElementById()
    - O id do campo é "name"
    - Use .value para pegar o valor
    - Use .trim() para remover espaços extras
  */
  const name = document.getElementById("name").value.trim();
  console.log(name);
  console.log(!name);
  /*
    LACUNA 2:
    Capture o valor digitado no campo de e-mail.

    Orientações:
    - Use document.getElementById()
    - O id do campo é "email"
    - Use .value
    - Use .trim()
  */
  const email = document.getElementById("email").value.trim();
  console.log(email);
  console.log(!email);
  /*
    LACUNA 3:
    Capture o valor digitado no campo de senha.

    Orientações:
    - Use document.getElementById()
    - O id do campo é "password"
    - Use .value
    - Nesse caso, não é obrigatório usar .trim()
  */
  const password = document.getElementById("password").value;
  console.log(password);
  console.log(!password);

  message.textContent = "";
  message.className = "message";

  /*
    LACUNA 4:
    Crie uma condição para verificar se algum dos campos está vazio.

    Orientações:
    - Verifique name, email e password
    - Use o operador lógico OU
    - Caso algum campo esteja vazio, exiba uma mensagem de erro
    - Depois, interrompa a execução da função com return
  */
  if (!name || !email || !password) {
    showMessage("Preencha todos os campos.", "error");
    return;
  }

  /*
    LACUNA 5:
    Crie uma condição para verificar se a senha possui menos de 8 caracteres.

    Orientações:
    - Use a propriedade .length
    - Compare se a quantidade de caracteres é menor que 8
  */
  if (password.length < 8) {
    showMessage("A senha deve ter pelo menos 8 caracteres.", "error");
    return;
  }

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Criando usuário...";

  try {
    /*
      LACUNA 6:
      Envie uma requisição HTTP para a API do back-end.

      Orientações:
      - Use fetch()
      - A URL da API será http://localhost:3000/users
      - O método HTTP deve ser POST
      - O cabeçalho deve indicar que os dados serão enviados em JSON
      - O corpo da requisição deve enviar name, email e password
      - Use JSON.stringify()
    */
    const response = await fetch("https://refactored-lamp-97vvv4v45g9xhp4jv-3000.app.github.dev/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    /*
      LACUNA 7:
      Converta a resposta da API para JSON.

      Orientações:
      - Use await
      - Use o método .json() da resposta
    */
    const data = await response.json();

    /*
      LACUNA 8:
      Verifique se a resposta da API não foi bem-sucedida.

      Orientações:
      - Use a propriedade ok da resposta
      - Caso a resposta não esteja ok, exiba a mensagem retornada pela API
      - Depois, use return para parar a execução
    */
    if (!response.ok) {
      showMessage(data.message || "Erro ao criar usuário.", "error");
      return;
    }

    showMessage(data.message, "success");

    /*
      LACUNA 9:
      Limpe os campos do formulário após o cadastro ser realizado com sucesso.

      Orientações:
      - Use o método reset() do formulário
    */
    form.reset();

  } catch (error) {
    showMessage("Não foi possível conectar ao servidor.", "error");
  } finally {
    button.disabled = false;
    button.textContent = "Criar usuário";
  }
});

function showMessage(text, type) {
  message.textContent = text;
  message.classList.add(type);
}