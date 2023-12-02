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
function validarNome(valor, helper) {
  // Expressão regular que permite apenas letras e espaços
  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/;

  if (!regexNome.test(valor)) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      nomeInput,
      nomeHelper,
      "Seu nome deve conter apenas letras e espaços!"
    );
    inputsCorretos.nome = false;
  } else if (valor.length < 3) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      nomeInput,
      nomeHelper,
      "Seu nome precisa ter 3 ou mais caracteres!"
    );
    inputsCorretos.nome = false;
  } else {
    // Validação bem-sucedida: marca como correto
    estilizarInputCorreto(nomeInput, nomeHelper);
    inputsCorretos.nome = true;
  }
}

// Função de validação para o campo de sobrenome de usuário
function validarSobrenome(valor, helper) {
  // Expressão regular que permite apenas letras e espaços
  const regexSobrenome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/;

  if (!regexSobrenome.test(valor)) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      sobrenomeInput,
      sobrenomeHelper,
      "Seu sobrenome deve conter apenas letras e espaços!"
    );
    inputsCorretos.sobrenome = false;
  } else if (valor.length < 4) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      sobrenomeInput,
      sobrenomeHelper,
      "Seu sobrenome precisa ter 4 ou mais caracteres!"
    );
    inputsCorretos.sobrenome = false;
  } else {
    // Validação bem-sucedida: marca como correto
    estilizarInputCorreto(sobrenomeInput, sobrenomeHelper);
    inputsCorretos.sobrenome = true;
  }
}

// Função de validação para o campo de e-mail
function validarEmail(valor, helper) {
  // Expressão regular para validar o formato do e-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regexEmail.test(valor)) {
    // Validação bem-sucedida: marca como correto
    estilizarInputCorreto(emailInput, emailHelper);
    inputsCorretos.email = true;
  } else {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      emailInput,
      emailHelper,
      "Insira um endereço de email válido"
    );
    inputsCorretos.email = false;
  }
}

// Função de validação para o campo de senha
function validarSenha(valor, helper) {
  if (valor.length < 6) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      senhaInput,
      senhaHelper,
      "A senha deve ter pelo menos 6 caracteres"
    );
    inputsCorretos.senha = false;
  } else {
    // Validação bem-sucedida: marca como correto
    estilizarInputCorreto(senhaInput, senhaHelper);
    inputsCorretos.senha = true;
  }
}

// Função de validação para o campo de confirmação de senha
function validarConfirmaSenha(valor, helper) {
  // Remove espaços em branco antes e depois da senha original
  const senhaOriginal = senhaInput.value.trim();

  if (valor.trim() === "") {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      confirmaSenhaInput,
      confirmaSenhaHelper,
      "A senha inserida não pode estar vazia"
    );
    inputsCorretos.confirmaSenha = false;
  } else if (valor.trim() !== senhaOriginal) {
    // Validação falhou: exibe mensagem de erro e marca como incorreto
    estilizarInputIncorreto(
      confirmaSenhaInput,
      confirmaSenhaHelper,
      "As senhas não coincidem"
    );
    inputsCorretos.confirmaSenha = false;
  } else {
    // Validação bem-sucedida: marca como correto
    estilizarInputCorreto(confirmaSenhaInput, confirmaSenhaHelper);
    inputsCorretos.confirmaSenha = true;
  }
}

// Obtenha os elementos do DOM relacionados aos campos
const nomeInput = document.querySelector('input[name="nome"]');
const nomeLabel = document.querySelector('label[for="nome"]');
const nomeHelper = document.getElementById("nome-helper");
adicionarValidacaoDinamica(nomeInput, nomeLabel, nomeHelper, validarNome);

const sobrenomeInput = document.querySelector('input[name="sobrenome"]');
const sobrenomeLabel = document.querySelector('label[for="sobrenome"]');
const sobrenomeHelper = document.getElementById("sobrenome-helper");
adicionarValidacaoDinamica(
  sobrenomeInput,
  sobrenomeLabel,
  sobrenomeHelper,
  validarSobrenome
);

const emailInput = document.querySelector('input[name="email"]');
const emailLabel = document.querySelector('label[for="email"]');
const emailHelper = document.getElementById("email-helper");
adicionarValidacaoDinamica(emailInput, emailLabel, emailHelper, validarEmail);

const senhaInput = document.querySelector('input[name="senha"]');
const senhaLabel = document.querySelector('label[for="senha"]');
const senhaHelper = document.getElementById("senha-helper");
adicionarValidacaoDinamica(senhaInput, senhaLabel, senhaHelper, validarSenha);

const confirmaSenhaInput = document.querySelector(
  'input[name="confirmar-senha"]'
);
const confirmaSenhaLabel = document.querySelector(
  'label[for="confirmar-senha"]'
);
const confirmaSenhaHelper = document.getElementById("confirma-senha-helper");
adicionarValidacaoDinamica(
  confirmaSenhaInput,
  confirmaSenhaLabel,
  confirmaSenhaHelper,
  validarConfirmaSenha
);

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
});
