-- Selecionar todos os usuários:
SELECT * FROM Usuario;

-- Selecionar todos os produtos:
SELECT * FROM Produto;

-- Selecionar todos os pedidos:
SELECT * FROM Pedido;

-- Selecionar todas as categorias:
SELECT * FROM Categoria;

-- Selecionar todas as pepedido_produto:
SELECT * FROM pedido_produto;

-- Selecionar todas as catpedido_produto:
SELECT * FROM categoria_produto;

-- Obter os detalhes de um pedido específico:
SELECT *
FROM Pedido
WHERE ID = 1;

-- Listar todos os usuários que fizeram pedidos:
SELECT DISTINCT Usuario.*
FROM Usuario
INNER JOIN Pedido ON Usuario.ID = Pedido.Usuario_ID;

-- Selecionar todos os usuários e a quantidade de pedidos associados a cada um:
-- Esta consulta retorna uma lista de usuários com a quantidade de pedidos associados a cada um.
SELECT 
  Usuario.ID as Usuario_ID,
  Usuario.Nome as Nome_Usuario,
  COUNT(Pedido.ID) as Quantidade_Pedidos
FROM Usuario
LEFT JOIN Pedido ON Usuario.ID = Pedido.Usuario_ID
GROUP BY Usuario.ID, Usuario.Nome;

-- Selecionar todos os Produtos e a Quantidade em Estoque:
-- Esta consulta retorna informações sobre todos os produtos, incluindo o nome e a quantidade em estoque.
SELECT 
  Produto.ID as Produto_ID,
  Produto.Nome as Nome_Produto,
  Produto.QuantidadeEstoque as Quantidade_Estoque
FROM Produto;

-- Selecionar todos os Pedidos e os produtos associados a cada um:
-- Esta consulta retorna detalhes de todos os pedidos, incluindo os produtos associados e a quantidade de cada produto no pedido.
SELECT 
  Pedido.ID as Pedido_ID,
  Produto.Nome as Nome_Produto,
  Pedido_Produto.Quantidade
FROM Pedido
JOIN Pedido_Produto ON Pedido.ID = Pedido_Produto.Pedido_ID
JOIN Produto ON Pedido_Produto.Produto_ID = Produto.ID;

-- Esta consulta retorna detalhes de pedidos, incluindo informações sobre o usuário que fez o pedido,
-- os produtos associados e a quantidade de cada produto.
SELECT 
  Pedido.ID as Pedido_ID,          -- ID do Pedido
  Usuario.Nome as Nome_Usuario,    -- Nome do usuário que fez o pedido
  Produto.Nome as Nome_Produto,    -- Nome do produto associado ao pedido
  Pedido_Produto.Quantidade,       -- Quantidade do produto no pedido
  Pedido.Status                    -- Status do pedido
FROM Pedido
JOIN Usuario ON Pedido.Usuario_ID = Usuario.ID              -- Junta a tabela Pedido com a tabela Usuario usando a chave estrangeira Usuario_ID
JOIN Pedido_Produto ON Pedido.ID = Pedido_Produto.Pedido_ID  -- Junta a tabela Pedido com a tabela Pedido_Produto usando a chave primária e estrangeira
JOIN Produto ON Pedido_Produto.Produto_ID = Produto.ID      -- Junta a tabela Pedido_Produto com a tabela Produto usando a chave primária e estrangeira

