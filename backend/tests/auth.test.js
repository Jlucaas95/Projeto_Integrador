const assert = require('node:assert/strict');
const { after, before, beforeEach, test } = require('node:test');
const bcrypt = require('bcryptjs');

// Substitui a conexão real antes de carregar a aplicação. Assim, os testes não
// dependem de um servidor MySQL e podem controlar a resposta de cada consulta.
const connectionPath = require.resolve('../db/connection');
const db = {};
require.cache[connectionPath] = {
  id: connectionPath,
  filename: connectionPath,
  loaded: true,
  exports: db,
};
const app = require('../server');

let server;
let baseUrl;

before(() => {
  // A porta 0 deixa o sistema operacional escolher uma porta livre para o teste.
  server = app.listen(0);
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
});

beforeEach(() => {
  // Evita que um teste reutilize por engano o mock configurado pelo teste anterior.
  db.query = () => {
    throw new Error('O mock de db.query não foi configurado');
  };
});

async function post(path, body) {
  // Centraliza a montagem das requisições JSON usadas nos cenários abaixo.
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

test('POST /api/register cadastra um usuário válido', async () => {
  let query;
  db.query = (sql, params, callback) => {
    if (sql.startsWith('SELECT')) {
      callback(null, []);
      return;
    }

    query = { sql, params };
    callback(null);
  };

  const response = await post('/api/register', {
    nome: 'Maria',
    email: 'maria@example.com',
    senha: 'segredo',
  });

  assert.equal(response.status, 201);
  assert.equal(await response.text(), 'Usuário cadastrado com sucesso!');
  assert.equal(
    query.sql,
    'INSERT INTO Usuario (Nome, Email, Senha) VALUES (?, ?, ?)'
  );
  assert.equal(query.params[0], 'Maria');
  assert.equal(query.params[1], 'maria@example.com');
  assert.notEqual(query.params[2], 'segredo');
});

test('POST /api/register rejeita um e-mail já cadastrado', async () => {
  let insertExecutado = false;
  db.query = (sql, _params, callback) => {
    if (sql.startsWith('SELECT')) {
      callback(null, [{ ID: 1 }]);
      return;
    }

    insertExecutado = true;
    callback(null);
  };

  const response = await post('/api/register', {
    nome: 'Maria',
    email: 'maria@example.com',
    senha: 'segredo',
  });

  assert.equal(response.status, 409);
  assert.equal(await response.text(), 'Este e-mail já está cadastrado.');
  assert.equal(insertExecutado, false);
});

test('POST /api/login autentica credenciais corretas', async () => {
  const senhaCriptografada = bcrypt.hashSync('segredo', 8);
  db.query = (_sql, _params, callback) =>
    callback(null, [{ Senha: senhaCriptografada }]);

  const response = await post('/api/login', {
    email: 'maria@example.com',
    senha: 'segredo',
  });

  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'Login realizado com sucesso!');
});

test('POST /api/login rejeita um usuário inexistente', async () => {
  db.query = (_sql, _params, callback) => callback(null, []);

  const response = await post('/api/login', {
    email: 'ninguem@example.com',
    senha: 'segredo',
  });

  assert.equal(response.status, 401);
  assert.equal(await response.text(), 'Usuário não encontrado.');
});

test('POST /api/login rejeita uma senha incorreta', async () => {
  const senhaCriptografada = bcrypt.hashSync('segredo', 8);
  db.query = (_sql, _params, callback) =>
    callback(null, [{ Senha: senhaCriptografada }]);

  const response = await post('/api/login', {
    email: 'maria@example.com',
    senha: 'incorreta',
  });

  assert.equal(response.status, 403);
  assert.equal(await response.text(), 'Senha incorreta.');
});
