
# Projeto Integrador E-commerce Nutrifit

## Desenvolvimento

**🛠️ Modelagem do `DER`(Diagrama Entidade eRelacionamento)**

- Modelar o `DER` com pelo menos `4 entidades`.

- Estabelecer relacionamentosentre as `entidades`.

- Adicionar `atributos` às `entidades`.

**🎲 Criação das Tabelas na `3FN` em um Banco de Dados**

- Utilizar um sistema de gerenciamento de banco de dados (ex: `MySQL, PostgreSQL`).
  
- Criar `tabelas` correspondentes às `entidades` identificadas no `DER`.

- Normalizar as tabelas até a terceira forma normal (`3FN`).

📊 **Realização de Consultas Simples**

- Realizar `consultas básicas`, se possível, juntando tabelas.

## Organização

🌐 **GitHub**

- Criar um `repositório` no `GitHub` para o projeto.

- Organizar o código em estrutura de pastas lógicas.

📊 **Uso de Recursos de Apresentação**

- Criar slides apresentando o projeto.

- Incluir informações sobre a empresa,funcionalidades, DER e exemplos de `consultas SQL`.

- Preparar `demonstrações práticas` do uso do aplicativo, se possível.

💻 **Uso do SQL**

- Demonstrar o uso efetivo do SQL no projeto.

- Incluir exemplos de `consultas complexas`, atualizações e `inserções de dados`.

## Informações da Loja

🏠 **Home**

- Introdução sobre a empresa.

- Produtos em destaque.

- Categorias de produtos.

- Call-to-action (CTA) para explorar os produtos.

🏋️ **Funil 1 - Perda de Peso**

- Landing page com informações sobre o suplemento para perda de peso.

- Dicas de treinos específicos.

- Links para blogs relacionados.

💪 **Funil 2 - Ganho de Massa**

- Landing page com informações sobre o suplemento para ganho de massa muscular.

- Dicas de treinos específicos.

- Links para blogs relacionados.

📞 **Contato**

- Página de contato com formulário para envio de mensagens.

- Links para redes sociais.

📝 **Cadastro de Usuário**

- Página para cadastro de usuários.

- Campos para informações como nome, e-mail, senha, etc.

🛒 **Carrinho de Compras**

- Página para armazenar informações dos produtos selecionados.

- Adição e remoção de produtos.

- Informações de pagamento.

## 🚀 Passo a Passo para o Desenvolvimento do Projeto Integrador E-commerce NutriFit

1. **🖌️ Modelagem do DER (Diagrama Entidade e Relacionamento)**

- Identificar as entidades principais, por exemplo: `Usuário, Produto, Pedido, Categoria.`

- Adicionar atributos às entidades, por exemplo, a `entidade Usuário` pode ter atributos como `Nome, E-mail, Senha, etc.`

2. **🛠️ Criação das Tabelas na 3FN em um Banco de Dados**

- Utilizar um sistema de gerenciamento de banco de dados (ex: `MySQL, PostgreSQL`).

- Criar as `tabelas` correspondentes às `entidades` identificadas no `DER`.

- Normalizar as tabelas até a `terceira forma normal` (3FN) para evitar `redundâncias` e garantir `integridade`.

3. 📊 **Consultas Simples no Banco de Dados**

- Realizar `consultas básicas`, como `selecionar` todos os produtos de uma determinada `categoria`.

- Explorar operações SQL como SELECT, WHERE, JOIN para buscar informações.
  
4. 🌐 **Organização no Github**

- Criar um `repositório` no GitHub para o projeto.

- Organizar o `código` em estrutura de pastas lógicas (ex: modelos, views, controllers).

- Utilizar commits significativos para documentar alterações.

5. 📊 **Recursos de Apresentação**

- Criar documentos apresentando o projeto.

- Incluir `informações sobre a empresa`, funcionalidades, `DER`, e `exemplos de consultas SQL`.

- Preparar `demonstrações práticas` do uso do aplicativo, se possível.

6. 💻 **Uso do SQL**

- Demonstrar o uso efetivo do `SQL` no projeto.

- Incluir exemplos de consultas complexas, atualizações e inserções de dados.

7. 🧪 **Testes e Ajustes**

- Realizar testes nas funcionalidades do site.

- Corrigir bugs e ajustar o código conforme necessário.

- Hospedar o banco de dados em um servidor, se necessário.

- Publicar o site, utilizando serviços como Netlify, Vercel,GitHub pages ou AWS.

- Garantir que o aplicativo esteja acessível online.

## 🛠️ Modelo DER (Diagrama Entidade - Relacionamento)

### Entidades Principais

**Usuário:**

- Atributos:
  - ID (identificador único)
  - Nome
  - E-mail
  - Senha
  - Endereço, etc.

**Produto:**

- Atributos:
  - ID
  - Nome
  - Descrição
  - Preço
  - Imagem, etc.

**Pedido:**

- Atributos:
  - ID
  - Data do Pedido
  - Status
  - Total, etc.

**Categoria:**

- Atributos:
  - ID
  - Nome
  - Descrição, etc.

## Relacionamentos Entre Entidades

**Relacionamento entre `Usuário` e `Pedido`**

- Um `Usuário` pode fazer `vários Pedidos`.

- Um `Pedido` pertence a um `único Usuário`.

- **Tipo de Relacionamento:** 1 para Muitos (`1:N`).

**Relacionamento entre `Produto` e `Pedido`**

- Um `Produto` pode estar em `vários Pedidos`.

- Um `Pedido` pode ter `vários Produtos`.

- **Tipo de Relacionamento:** Muitos para Muitos (`M:N`).

- Pode ser necessário uma tabela associativa (`Pedido_Produto`) para lidar com a relação `muitos para muitos`.

**Relacionamento entre `Produto` e `Categoria`**

- Um `Produto` pode pertencer a `uma Categoria`.

- Uma `Categoria` pode ter `vários Produtos`.

**Tipo de Relacionamento:** Muitos para Um (`M:1`).

## Adição de Atributos às Entidades

**Atributos Adicionais para a `Entidade Usuário`**

- Data de Registro

- Telefone

- Data de Nascimento, etc.

**Atributos Adicionais para a `Entidade Produto`**

- Quantidade em Estoque

- Peso

- Dimensões, etc.

**Atributos Adicionais para a `Entidade Pedido`**

- Método de Pagamento

- Endereço de Entrega, etc.

**Atributos Adicionais para a `Entidade Categoria`**

- Nenhum atributo adicional mencionado. Pode incluir descrição, data de criação, etc., se necessário.

## Schema DER

``````d
// Use DBML to define your database structure
// Docs: <https://dbml.dbdiagram.io/docs>

Table Usuario {
  ID int [pk]
  Nome string
  Email string
  Senha string
  Endereco string
  DataRegistro datetime
  Telefone string
  DataNascimento date
}

Table Produto {
  ID int [pk]
  Nome string
  Descricao string
  Preco decimal
  Imagem string
  QuantidadeEstoque int
  Peso decimal
  Dimensoes string
}

Table Pedido {
  ID int [pk]
  DataPedido datetime
  Status string
  Total decimal
  MetodoPagamento string
  EnderecoEntrega string
  Usuario_ID int
}

Ref: Pedido.Usuario_ID > Usuario.ID

Table Categoria {
  ID int [pk]
  Nome string
  Descricao string
}

Table Pedido_Produto {
  ID int [pk]
  Quantidade int
  Pedido_ID int
  Produto_ID int
}

Ref: Pedido_Produto.Pedido_ID > Pedido.ID
Ref: Pedido_Produto.Produto_ID > Produto.ID

Table Categoria_Produto {
  ID int [pk]
  Categoria_ID int
  Produto_ID int
}

Ref: Categoria_Produto.Categoria_ID > Categoria.ID
Ref: Categoria_Produto.Produto_ID > Produto.ID
``````

**imagem do DER**
![Alt text](https://lh7-us.googleusercontent.com/GFawpQgTuoVlcbLqo6GiSIVQEu94t7oykx8_1XKXJArU0H-3vfWyd_gsTc4r2vPujQTqbfx0h_o4OR-lyGn_oLHhHLhvvYVB28mIokuudgqGn5wWIFglPQtpL9YO6NuyEQlp1L0VYGcuj3_PLcK_K14)

## Criação das Tabelas no Banco de Dados (Exemplo para PostgreSQL)

[Adicione conteúdo breve explicativo sobre a criação das tabelas]

## Inserção de Dados nas Tabelas (Exemplo para PostgreSQL)

[Adicione conteúdo breve explicativo sobre a inserção de dados nas tabelas]

## Realizar Consultas Básicas no Banco de Dados (Exemplos)

[Adicione conteúdo breve explicativo sobre as consultas básicas no banco de dados]
