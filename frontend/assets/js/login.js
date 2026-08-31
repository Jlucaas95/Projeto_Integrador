document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("loginForm");
  const inputEmail = document.getElementById("email");
  const inputSenha = document.getElementById("senha");
  const botaoEntrar = formLogin?.querySelector('button[type="submit"]');

  if (!formLogin || !inputEmail || !inputSenha || !botaoEntrar) {
    console.error("Elementos do formulário de login não encontrados.");
    return;
  }

  function ocultarErro(elemento) {
    elemento.classList.remove("error");
    elemento.parentElement.querySelector(".required-popup")?.remove();
  }

  function mostrarErro(elemento, mensagem) {
    ocultarErro(elemento);
    elemento.classList.add("error");
    const aviso = document.createElement("div");
    aviso.className = "required-popup";
    aviso.textContent = mensagem;
    elemento.parentElement.appendChild(aviso);
  }

  function validarCampos() {
    const email = inputEmail.value.trim();
    const senha = inputSenha.value;
    let valido = true;

    ocultarErro(inputEmail);
    ocultarErro(inputSenha);

    if (!email) {
      mostrarErro(inputEmail, "* Campo obrigatório");
      valido = false;
    } else if (!inputEmail.validity.valid) {
      mostrarErro(inputEmail, "* Informe um e-mail válido");
      valido = false;
    }

    if (!senha) {
      mostrarErro(inputSenha, "* Campo obrigatório");
      valido = false;
    }

    return valido;
  }

  [inputEmail, inputSenha].forEach((campo) => {
    campo.addEventListener("focus", () => {
      campo.style.border = "2px solid #2e97a7";
      ocultarErro(campo);
    });
    campo.addEventListener("blur", () => {
      campo.style.border = "2px solid rgba(255, 255, 255, 0.2)";
    });
  });

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validarCampos()) return;

    botaoEntrar.disabled = true;
    botaoEntrar.textContent = "Entrando...";

    try {
      const resposta = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputEmail.value.trim(),
          senha: inputSenha.value,
        }),
      });
      const mensagem = await resposta.text();

      if (!resposta.ok) {
        alert(mensagem || "Não foi possível realizar o login.");
        return;
      }

      alert(mensagem);
      window.location.href = "index2.html";
    } catch (erro) {
      console.error("Erro ao acessar a API de login:", erro);
      alert("Não foi possível conectar ao servidor. Tente novamente.");
    } finally {
      botaoEntrar.disabled = false;
      botaoEntrar.textContent = "Entrar";
    }
  });
});
