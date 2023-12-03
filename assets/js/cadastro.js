// ---------- FUNÇÕES GERAIS ---------- //

// Função para mostrar popup de campo obrigatório
function mostrarPopup(input, label) {
  // Adiciona a classe 'required-popup' ao rótulo quando o campo ganha foco
  input.addEventListener("focus", () => {
    label.classList.add("required-popup");
  });

  // Remove a classe 'required-popup' do rótulo quando o campo perde foco
  input.addEventListener("blur", () => {
    label.classList.remove("required-popup");
  });
}

// Função para estilizar o input quando correto
function estilizarInputCorreto(input, helper) {
  // Limpa a mensagem de ajuda, oculta e adiciona a classe 'correct' ao input
  helper.innerText = "";
  helper.classList.remove("visible");
  input.classList.remove("error");
  input.classList.add("correct");
}

// Função para estilizar o input quando incorreto
function estilizarInputIncorreto(input, helper, mensagem) {
  // Exibe a mensagem de erro, adiciona a classe 'visible' e 'error' ao input
  helper.innerText = mensagem;
  helper.classList.add("visible");
  input.classList.add("error");
  input.classList.remove("correct");
}

// ---------- VALIDAÇÃO GENÉRICA ---------- //

// Função de validação genérica
function validarCampo(
  valor,
  regex,
  inputElement,
  helperElement,
  mensagemErroMinLength,
  mensagemErroRegex
) {
  if (!regex.test(valor)) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(inputElement, helperElement, mensagemErroRegex);
    return false;
  } else if (valor.length < 3) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(inputElement, helperElement, mensagemErroMinLength);
    return false;
  } else {
    // Validação bem-sucedida: marca como correto
    estilizarInputCorreto(inputElement, helperElement);
    return true;
  }
}

// ---------- VALIDAÇÃO DINÂMICA ---------- //

// Objeto para armazenar o estado de validação de cada input
const inputsCorretos = {};

// Função para adicionar validação dinâmica a um input
function adicionarValidacaoDinamica(input, label, helper, validacao) {
  // Adiciona funcionalidade de mostrar o popup e valida ao perder o foco
  mostrarPopup(input, label);
  input.addEventListener("blur", () => {
    validacao(input.value, helper);
  });
}

// Função de validação para o campo de nome de usuário
function validarUsername(valor, helper) {
  // Expressão regular que permite apenas letras e números
  const regexUsername = /^[A-Za-z0-9]+$/;

  if (!regexUsername.test(valor)) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      usernameInput,
      usernameHelper,
      "Seu nome deve conter apenas letras e números!"
    );
    inputsCorretos.username = false;
  } else if (valor.length < 3) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      usernameInput,
      usernameHelper,
      "Seu nome precisa ter 3 ou mais caracteres!"
    );
    inputsCorretos.username = false;
  } else {
    // Validação bem-sucedida: marca como correto
    estilizarInputCorreto(usernameInput, usernameHelper);
    inputsCorretos.username = true;
  }
}

// Uso da função de validação genérica para validar o campo de nome
function validarNome(valor, helper) {
  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/;
  const mensagemErroMinLength = "Seu nome precisa ter 3 ou mais caracteres!";
  const mensagemErroRegex = "Seu nome deve conter apenas letras e espaços!";

  return validarCampo(
    valor,
    regexNome,
    nomeInput,
    helper,
    mensagemErroMinLength,
    mensagemErroRegex
  );
}

// Uso da função de validação genérica para validar o campo de sobrenome
function validarSobrenome(valor, helper) {
  const regexSobrenome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/;
  const mensagemErroMinLength =
    "Seu sobrenome precisa ter 4 ou mais caracteres!";
  const mensagemErroRegex =
    "Seu sobrenome deve conter apenas letras e espaços!";

  return validarCampo(
    valor,
    regexSobrenome,
    sobrenomeInput,
    helper,
    mensagemErroMinLength,
    mensagemErroRegex
  );
}

// Uso da função de validação genérica para validar o campo de e-mail
function validarEmail(valor, helper) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mensagemErroMinLength = "O e-mail precisa ter 3 ou mais caracteres!";
  const mensagemErroRegex = "Insira um endereço de e-mail válido!";

  return validarCampo(
    valor,
    regexEmail,
    emailInput,
    helper,
    mensagemErroMinLength,
    mensagemErroRegex
  );
}

// Uso da função de validação genérica para validar o campo de senha
function validarSenha(valor, helper) {
  const mensagemErroMinLength = "A senha deve ter pelo menos 6 caracteres";
  const mensagemErroRegex = ""; // Como a senha não possui restrições de formato específicas, deixamos a mensagem de erro vazia

  return validarCampo(
    valor,
    /^/,
    senhaInput,
    helper,
    mensagemErroMinLength,
    mensagemErroRegex
  );
}

// Uso da função de validação genérica para validar o campo de confirmação de senha
function validarConfirmaSenha(valor, helper) {
  const senhaOriginal = senhaInput.value.trim();
  const mensagemErroMinLength = "A senha inserida não pode estar vazia";
  const mensagemErroRegex = "As senhas não coincidem";

  // Chamada à função validarCampo com mensagens específicas para a confirmação de senha
  return (
    validarCampo(
      valor,
      /^/,
      confirmaSenhaInput,
      helper,
      mensagemErroMinLength,
      mensagemErroRegex
    ) && valor.trim() === senhaOriginal
  );
}

// Obtenha os elementos do DOM relacionados aos campos
const usernameInput = document.querySelector('input[name="username"]');
const usernameLabel = document.querySelector('label[for="username"]');
const usernameHelper = document.getElementById("username-helper");

// Adiciona validação dinâmica ao campo de nome de usuário
adicionarValidacaoDinamica(
  usernameInput,
  usernameLabel,
  usernameHelper,
  validarUsername
);

// ... Repetir o mesmo padrão para os outros campos ...

// Event listener para o botão de submit
const btnSubmit = document.querySelector('button[type="submit"]');
btnSubmit.addEventListener("click", (e) => {
  // Verifica se todos os campos foram preenchidos corretamente
  for (const key in inputsCorretos) {
    if (!inputsCorretos[key]) {
      e.preventDefault();
      alert("Os campos obrigatórios precisam ser preenchidos corretamente");
      return;
    }
  }

  // Se todos os campos estiverem corretos, exibe mensagem de sucesso
  alert("Formulário enviado com sucesso");

  // Após o cadastro ser concluído, redireciona para login.html
  window.location.href = "./login.html";
});
