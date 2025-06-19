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

// --- CRIAÇÃO DE TABELAS ---

// Tabela de Usuários (já deve existir, mas garantimos)
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`)
.then(() => console.log('Tabela de usuários verificada/criada com sucesso!'))
.catch(err => console.error('Erro ao criar tabela de usuários:', err.stack));

// Nova Tabela de Consoles
pool.query(`
  CREATE TABLE IF NOT EXISTS consoles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL -- ex: 'nes', 'snes', 'gba'
  );

  INSERT INTO consoles (name, slug) VALUES
  ('Nintendinho', 'nes') ON CONFLICT (name) DO NOTHING,
  ('Super Nintendo', 'snes') ON CONFLICT (name) DO NOTHING,
  ('Game Boy', 'gb') ON CONFLICT (name) DO NOTHING,
  ('Game Boy Color', 'gbc') ON CONFLICT (name) DO NOTHING,
  ('Game Boy Advance', 'gba') ON CONFLICT (name) DO NOTHING,
  ('Mega Drive', 'megadrive') ON CONFLICT (name) DO NOTHING,
  ('Master System', 'mastersystem') ON CONFLICT (name) DO NOTHING;
`)
.then(() => console.log('Tabela de consoles verificada/criada e preenchida com sucesso!'))
.catch(err => console.error('Erro ao criar/preencher tabela de consoles:', err.stack));

// Nova Tabela de Jogos
pool.query(`
  CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    console_id INTEGER REFERENCES consoles(id) ON DELETE CASCADE,
    rom_path TEXT NOT NULL UNIQUE, -- Caminho interno para a ROM no servidor
    cover_image_url TEXT,          -- URL da capa do jogo
    release_year INTEGER,
    genre TEXT
  );

  -- Adicionando alguns jogos de exemplo (apenas metadata por enquanto)
  INSERT INTO games (title, console_id, rom_path, cover_image_url, release_year, genre) VALUES
  ('Super Mario Bros.', (SELECT id FROM consoles WHERE slug = 'nes'), '/roms/nes/super_mario_bros.nes', 'https://example.com/smb.jpg', 1985, 'Plataforma') ON CONFLICT (rom_path) DO NOTHING,
  ('The Legend of Zelda', (SELECT id FROM consoles WHERE slug = 'nes'), '/roms/nes/zelda.nes', 'https://example.com/zelda.jpg', 1986, 'Aventura') ON CONFLICT (rom_path) DO NOTHING,
  ('Super Mario World', (SELECT id FROM consoles WHERE slug = 'snes'), '/roms/snes/super_mario_world.snes', 'https://example.com/smw.jpg', 1990, 'Plataforma') ON CONFLICT (rom_path) DO NOTHING,
  ('The Legend of Zelda: A Link to the Past', (SELECT id FROM consoles WHERE slug = 'snes'), '/roms/snes/zelda_ltp.snes', 'https://example.com/zeldaltp.jpg', 1991, 'Aventura') ON CONFLICT (rom_path) DO NOTHING,
  ('Pokemon Red', (SELECT id FROM consoles WHERE slug = 'gb'), '/roms/gb/pokemon_red.gb', 'https://example.com/pokemonred.jpg', 1996, 'RPG') ON CONFLICT (rom_path) DO NOTHING,
  ('Pokemon Crystal', (SELECT id FROM consoles WHERE slug = 'gbc'), '/roms/gbc/pokemon_crystal.gbc', 'https://example.com/pokemoncrystal.jpg', 2000, 'RPG') ON CONFLICT (rom_path) DO NOTHING,
  ('Metroid Fusion', (SELECT id FROM consoles WHERE slug = 'gba'), '/roms/gba/metroid_fusion.gba', 'https://example.com/metroidfusion.jpg', 2002, 'Ação') ON CONFLICT (rom_path) DO NOTHING,
  ('Sonic The Hedgehog', (SELECT id FROM consoles WHERE slug = 'megadrive'), '/roms/md/sonic.gen', 'https://example.com/sonic.jpg', 1991, 'Plataforma') ON CONFLICT (rom_path) DO NOTHING,
  ('Alex Kidd in Miracle World', (SELECT id FROM consoles WHERE slug = 'mastersystem'), '/roms/ms/alexkidd.sms', 'https://example.com/alexkidd.jpg', 1986, 'Plataforma') ON CONFLICT (rom_path) DO NOTHING;
`)
.then(() => console.log('Tabela de jogos verificada/criada e preenchida com sucesso!'))
.catch(err => console.error('Erro ao criar/preencher tabela de jogos:', err.stack));

// Tabela de Jogos Favoritos (User Many-to-Many Game)
pool.query(`
  CREATE TABLE IF NOT EXISTS favorite_games (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, game_id)
  )
`)
.then(() => console.log('Tabela de jogos favoritos verificada/criada com sucesso!'))
.catch(err => console.error('Erro ao criar tabela de favoritos:', err.stack));

// Tabela de Jogos Recentes (User Many-to-Many Game + Timestamp)
pool.query(`
  CREATE TABLE IF NOT EXISTS recently_played_games (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    played_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
`)
.then(() => console.log('Tabela de jogos recentes verificada/criada com sucesso!'))
.catch(err => console.error('Erro ao criar tabela de jogos recentes:', err.stack));


// --- ROTAS (ENDPOINTS) DA API ---

// Rota de registro de usuário (já existe, mantida)
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashed]);
    console.log(`Usuário ${username} registrado com sucesso.`);
    res.sendStatus(201);
  } catch (e) {
    if (e.code === '23505') {
      console.error(`Tentativa de registro de usuário duplicado: ${username}`);
      res.status(409).json({ error: "Nome de usuário já existe. Escolha outro." });
    } else {
      console.error('Erro ao registrar usuário:', e.stack);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
});

// Rota de login de usuário (já existe, mantida)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log(`Tentativa de login falha para o usuário: ${username}`);
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "2h" });
    console.log(`Usuário ${username} logado com sucesso.`);
    res.json({ token });
  } catch (e) {
    console.error('Erro ao fazer login:', e.stack);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Nova Rota: Listar todos os Consoles
app.get("/api/consoles", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, slug FROM consoles ORDER BY name");
    res.json(result.rows);
  } catch (e) {
    console.error('Erro ao listar consoles:', e.stack);
    res.status(500).json({ error: "Erro interno do servidor ao buscar consoles." });
  }
});

// Nova Rota: Listar Jogos por Console
app.get("/api/games", async (req, res) => {
  const { consoleId, consoleSlug } = req.query; // Pode buscar por ID ou Slug
  try {
    let queryText = `
      SELECT
        g.id, g.title, g.rom_path, g.cover_image_url, g.release_year, g.genre,
        c.name AS console_name, c.slug AS console_slug
      FROM games g
      JOIN consoles c ON g.console_id = c.id
    `;
    const queryParams = [];

    if (consoleId) {
      queryText += " WHERE g.console_id = $1";
      queryParams.push(consoleId);
    } else if (consoleSlug) {
      queryText += " WHERE c.slug = $1";
      queryParams.push(consoleSlug);
    }
    queryText += " ORDER BY g.title";

    const result = await pool.query(queryText, queryParams);
    res.json(result.rows);
  } catch (e) {
    console.error('Erro ao listar jogos:', e.stack);
    res.status(500).json({ error: "Erro interno do servidor ao buscar jogos." });
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