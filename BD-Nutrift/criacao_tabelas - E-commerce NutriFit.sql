CREATE TABLE "Usuario" (
  "ID" int PRIMARY KEY,
  "Nome" string,
  "Email" string,
  "Senha" string,
  "Endereco" string,
  "DataRegistro" datetime,
  "Telefone" string,
  "DataNascimento" date
);

CREATE TABLE "Produto" (
  "ID" int PRIMARY KEY,
  "Nome" string,
  "Descricao" string,
  "Preco" decimal,
  "Imagem" string,
  "QuantidadeEstoque" int,
  "Peso" decimal,
  "Dimensoes" string
);

CREATE TABLE "Pedido" (
  "ID" int PRIMARY KEY,
  "DataPedido" datetime,
  "Status" string,
  "Total" decimal,
  "MetodoPagamento" string,
  "EnderecoEntrega" string,
  "Usuario_ID" int
);

CREATE TABLE "Categoria" (
  "ID" int PRIMARY KEY,
  "Nome" string,
  "Descricao" string
);

CREATE TABLE "Pedido_Produto" (
  "ID" int PRIMARY KEY,
  "Quantidade" int,
  "Pedido_ID" int,
  "Produto_ID" int
);

CREATE TABLE "Categoria_Produto" (
  "ID" int PRIMARY KEY,
  "Categoria_ID" int,
  "Produto_ID" int
);

ALTER TABLE "Pedido" ADD FOREIGN KEY ("Usuario_ID") REFERENCES "Usuario" ("ID");

ALTER TABLE "Pedido_Produto" ADD FOREIGN KEY ("Pedido_ID") REFERENCES "Pedido" ("ID");

ALTER TABLE "Pedido_Produto" ADD FOREIGN KEY ("Produto_ID") REFERENCES "Produto" ("ID");

ALTER TABLE "Categoria_Produto" ADD FOREIGN KEY ("Categoria_ID") REFERENCES "Categoria" ("ID");

ALTER TABLE "Categoria_Produto" ADD FOREIGN KEY ("Produto_ID") REFERENCES "Produto" ("ID");
