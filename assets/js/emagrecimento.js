document.addEventListener("DOMContentLoaded", function () {
  const secoes = ["destaques", "ofertas", "lancamentos"];
  const produtosPorSecao = 3;
  const carrinho = []; // Array para armazenar os produtos no carrinho

  function gerarProdutoAleatorio() {
    return {
      nome: "Produto " + Math.floor(Math.random() * 100),
      descricao: "Descrição do produto " + Math.floor(Math.random() * 100),
      precoOriginal: (Math.random() * (200 - 50) + 50).toFixed(2),
      precoPromocional: (Math.random() * (50 - 10) + 10).toFixed(2),
      imagem: "https://via.placeholder.com/150", // Imagem de exemplo
    };
  }

  // Referência ao script adicionarAoCarrinho.js
  const scriptAdicionarAoCarrinho = document.createElement("script");
  scriptAdicionarAoCarrinho.src = "./adicionarAoCarrinho.html";
  scriptAdicionarAoCarrinho.defer = true;
  document.head.appendChild(scriptAdicionarAoCarrinho);

  function atualizarInterfaceCarrinho() {
    const carrinhoContainer = document.getElementById("carrinho-container");
    const carrinhoQuantidade = document.getElementById("carrinho-quantidade");

    if (!carrinhoContainer || !carrinhoQuantidade) {
      console.error("Contêiner ou quantidade do carrinho não encontrado.");
      return;
    }

    // Limpa o conteúdo do contêiner antes de atualizar
    carrinhoQuantidade.textContent = "";

    if (carrinho.length === 0) {
      // Se o carrinho estiver vazio, exibe uma mensagem indicando isso
      carrinhoQuantidade.textContent = "0";
    } else {
      // Exibe a quantidade de itens no carrinho
      carrinhoQuantidade.textContent = carrinho.length.toString();
    }
  }

  // Chame a função para inicializar a interface do carrinho
  atualizarInterfaceCarrinho();

  function renderizarProdutosPorSecao(secao) {
    const containerId = "container-" + secao;
    const container = document.getElementById(containerId);

    // Verifica se o contêiner existe antes de prosseguir
    if (!container) {
      console.error(`Contêiner '${containerId}' não encontrado.`);
      return;
    }

    for (let i = 0; i < produtosPorSecao; i++) {
      const produto = gerarProdutoAleatorio();

      const produtoElement = document.createElement("div");
      produtoElement.classList.add("produto");

      produtoElement.innerHTML = `
        <div class="img-prod">
          <img src="${produto.imagem}" alt="${produto.nome}" />
        </div>
        <div class="cta-prod">
          <div class="dados-prod">
            <h2>${produto.nome}</h2>
          </div>
          <div class="descricao-prod">
            <p>${produto.descricao}</p>
          </div>
          <div class="preco-produto">
            <p class="desconto">De R$ ${produto.precoOriginal}</p>
            <p>Promoção: R$ ${produto.precoPromocional}</p>
          </div>
          <button class="comprar" onclick="adicionarAoCarrinho('${produto.nome}', ${produto.precoPromocional})">Comprar</button>
        </div>
      `;

      container.appendChild(produtoElement);
    }
  }

  // Renderizar produtos para cada seção
  secoes.forEach((secao) => {
    renderizarProdutosPorSecao(secao);
  });
});
