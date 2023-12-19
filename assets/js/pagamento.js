document.addEventListener("DOMContentLoaded", function () {
  const botaoPagar = document.getElementById("botao-pagar");

  // Adiciona um ouvinte de evento ao botão "Pagar"
  if (botaoPagar) {
    botaoPagar.addEventListener("click", function () {
      // Simula uma chamada assíncrona para processar o pagamento
      simularProcessamentoDePagamento()
        .then(() => {
          alert("Pagamento bem-sucedido! Obrigado pela compra.");
          // Redireciona para a página inicial após o pagamento bem-sucedido (simulação)
          window.location.href = "index.html";
        })
        .catch((erro) => {
          console.error("Erro durante o processamento do pagamento:", erro);
          alert(
            "Ocorreu um erro durante o processamento do pagamento. Tente novamente."
          );
        });
    });
  }

  // Função para simular o processamento de pagamento (substitua por sua lógica real)
  function simularProcessamentoDePagamento() {
    return new Promise((resolve, reject) => {
      // Simula um tempo de processamento assíncrono (2 segundos)
      setTimeout(() => {
        // Simula uma taxa de sucesso de 90% e um erro de 10%
        const sucesso = Math.random() < 0.9;

        if (sucesso) {
          resolve();
        } else {
          reject(
            new Error("Erro no processamento do pagamento. Tente novamente.")
          );
        }
      }, 2000);
    });
  }
});
