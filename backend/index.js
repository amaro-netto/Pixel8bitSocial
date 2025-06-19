// backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 4000;
const SECRET = "pixel8bit_secret"; // Lembre-se de usar uma chave secreta mais complexa e segura em produção!

app.use(cors());
app.use(bodyParser.json());

// Configuração do Pool de conexão com o PostgreSQL usando variáveis de ambiente do Docker Compose
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Testar conexão com o banco de dados
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  }
  console.log('Conectado ao PostgreSQL com sucesso!');
  release();
});

// Criar tabela 'users' se ela não existir
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`)
.then(() => console.log('Tabela de usuários verificada/criada com sucesso!'))
.catch(err => console.error('Erro ao criar tabela de usuários:', err.stack));

// Rota de registro de usuário
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    const hashed = await bcrypt.hash(password, 10); // Gera um hash da senha
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashed]);
    console.log(`Usuário ${username} registrado com sucesso.`);
    res.sendStatus(201); // Retorna status 201 Created
  } catch (e) {
    // Erro de violação de unicidade (usuário já existe)
    if (e.code === '23505') { // PostgreSQL unique violation error code
      console.error(`Tentativa de registro de usuário duplicado: ${username}`);
      res.status(409).json({ error: "Nome de usuário já existe. Escolha outro." }); // 409 Conflict
    } else {
      console.error('Erro ao registrar usuário:', e.stack);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
});

// Rota de login de usuário
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    // Verifica se o usuário existe e se a senha está correta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(`Tentativa de login falha para o usuário: ${username}`);
      return res.status(401).json({ error: "Credenciais inválidas." }); // 401 Unauthorized
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "2h" });
    console.log(`Usuário ${username} logado com sucesso.`);
    res.json({ token });
  } catch (e) {
    console.error('Erro ao fazer login:', e.stack);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Rota de teste simples da API
app.get("/", (req, res) => {
  res.send("API Pixel8bitSocial está ativa!");
});

// Inicia o servidor backend
app.listen(port, () => {
  console.log(`🚀 Servidor backend rodando na porta ${port}`);
});