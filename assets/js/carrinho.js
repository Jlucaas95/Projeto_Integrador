// Variáveis globais para armazenar dados do carrinho
let carrinho = [];
let totalCompra = 0;

// Função para remover um produto do carrinho
function removerProduto(botaoRemover) {
  const produto = botaoRemover.closest(".produto");
  const preco = parseFloat(produto.getAttribute("data-preco"));
  const quantidade = parseInt(produto.querySelector("#quantidade").value);

  carrinho = carrinho.filter((item) => item !== produto);
  totalCompra -= preco * quantidade;

  produto.remove();
  atualizarTotal();
}

// Função para finalizar a compra (exemplo simples)
function finalizarCompra() {
  alert(`Compra realizada! Total: R$ ${totalCompra.toFixed(2)}`);
  // Implemente a lógica de finalização de compra conforme necessário
}

// Função para atualizar o total da compra
function atualizarTotal() {
  const totalElemento = document.getElementById("total");
  totalElemento.textContent = totalCompra.toFixed(2);
}
