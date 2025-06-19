# 🎮 Pixel8bitSocial

Bem-vindo ao **Pixel8bitSocial**! Uma rede social temática para entusiastas de jogos retrô 2D, onde os usuários podem jogar emuladores diretamente no navegador, registrar suas conquistas, exibir seu progresso e interagir com uma comunidade apaixonada.

Este projeto visa recriar a nostalgia dos clássicos com um toque social e moderno.

---
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/docker--compose-000000?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge&logo=none&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)
---

## ✨ Funcionalidades (MVP - Mínimo Produto Viável)

* **Autenticação de Usuário:** Sistema de cadastro e login de usuários.
* **Perfis Básicos:** Cada usuário terá um perfil.
* **Emulação Web:** Jogue clássicos de consoles 2D (NES, SNES, Game Boy, GBA, Mega Drive, Master System) diretamente no navegador.
* **Gestão de ROMs:** O projeto será configurado para usar ROMs internas (pré-definidas no servidor) para garantir a conformidade legal e a experiência.

---
> [!CAUTION]
> Aviso Legal - Não disponibilizamos ROMs de jogos ou qualquer software protegido por direitos autorais.
A criação, distribuição e uso de cópias não autorizadas de jogos e softwares são ilegais e violam as leis de direitos autorais e de propriedade intelectual. Nosso objetivo é fornecer informações e discussões sobre emulação e retrogaming de forma ética e legal.
Incentivamos você a respeitar os direitos dos criadores e a adquirir jogos e softwares de fontes legítimas.
---

## 🚀 Como Rodar o Projeto (Docker Compose)

Este projeto utiliza **Docker** e **Docker Compose** para facilitar a configuração e execução de todas as partes da aplicação (frontend, backend e banco de dados).

### Pré-requisitos

* **Docker e Docker Compose** instalados (confira o tutorial de instalação no seu Debian).
* Um servidor Linux (como Debian 12) ou máquina local com **IP fixo** (ex: `192.168.89.130`) configurado na sua rede.

### Passos para Rodar

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/amaro-netto/Pixel8bitSocial.git](https://github.com/amaro-netto/Pixel8bitSocial.git)
    cd Pixel8bitSocial
    ```

2.  **Configurar Arquivos (apenas se for o primeiro setup ou houver erros):**
    Certifique-se de que seus arquivos `backend/Dockerfile`, `frontend/Dockerfile`, `backend/package.json`, `frontend/package.json` e `docker-compose.yml` estão com o conteúdo mais recente (conforme as instruções fornecidas no chat).

    Exemplo rápido para o `docker-compose.yml` na raiz do projeto:
    ```yaml
    # Use 'nano docker-compose.yml' e cole o conteúdo abaixo
    services:
      db:
        image: postgres:15
        environment:
          POSTGRES_USER: XXXXXXXXXX
          POSTGRES_PASSWORD: XXXXXXXXXXXXXXXXX
          POSTGRES_DB: pixel8bitsocial
        volumes:
          - pgdata:/var/lib/postgresql/data
        ports:
          - "5432:5432"

      backend:
        build:
          context: ./backend
          dockerfile: Dockerfile
        depends_on:
          - db
        environment:
          DB_HOST: db
          DB_PORT: 5432
          DB_USER: XXXXXXXXXXXXX
          DB_PASS: XXXXXXXXXXXXX
          DB_NAME: pixel8bitsocial
        ports:
          - "4000:4000"
        command: npm run dev

      frontend:
        build:
          context: ./frontend
          dockerfile: Dockerfile
        ports:
          - "3000:3000"
        command: npm run dev

    volumes:
      pgdata:
    ```
    E para o `frontend/pages/index.js` (para o login):
    ```javascript
    // Use 'nano frontend/pages/index.js' e cole o conteúdo abaixo
    import { useState } from 'react';
    import { useRouter } from 'next/router';

    export default function Home() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const router = useRouter();

      const handleLogin = async () => {
        const res = await fetch('[http://XXX.XXX.XXX.XXX:4000/login](http://XXX.XXX.XXX.XXX:4000/login)', { // Ajuste o IP se necessário
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push('/perfil'); // Redireciona para o perfil após login
        } else {
          alert('Login inválido');
        }
      };

      return (
        <div style={{ padding: 20 }}>
          <h1>Login - Pixel8bitSocial</h1>
          <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} /><br />
          <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
          <button onClick={handleLogin}>Entrar</button>
          <p>Não tem conta? <a href="/cadastro">Cadastre-se aqui</a>.</p>
        </div>
      );
    }
    ```
    *Lembre-se de ajustar o IP `XXX.XXX.XXX.XXX` no `frontend/pages/index.js` para o IP real do seu servidor, se for diferente.*

3.  **Construa e Inicie os Containers:**
    Certifique-se de estar no diretório raiz do projeto (`~/Pixel8bitSocial`).
    ```bash
    docker compose down --rmi all -v # Para limpar instalações anteriores
    docker compose build --no-cache # Constrói as imagens sem usar cache
    docker compose up -d # Inicia os containers em segundo plano
    ```

4.  **Verifique o Status:**
    ```bash
    docker compose ps
    ```
    Você deve ver todos os serviços (`db`, `backend`, `frontend`) com status `Up`.

5.  **Acesse a Aplicação:**
    Abra seu navegador e acesse:
    * **Frontend (Aplicação Web):** `http://XXX.XXX.XXX.XXX:3000`
    * **Backend (API de Teste):** `ttp://XXX.XXX.XXX.XXX:4000`

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** [Next.js](https://nextjs.org/) (React)
* **Backend:** [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **Contêineres:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
* **Autenticação:** [JWT](https://jwt.io/) (JSON Web Tokens) e [Bcrypt](https://www.npmjs.com/package/bcrypt) para senhas.
* **Emulação:** Bibliotecas JavaScript/WebAssembly (a serem integradas no frontend).

---

## 🛣️ Roadmap Futuro

* **Sistema de Conquistas:** Conquistas personalizadas por jogo.
* **Perfis Detalhados:** Histórico de jogos, conquistas, badges e estatísticas.
* **Feed Social:** Publicação de prints de tela e interações (curtir, comentar).
* **Multiplayer Online (experimental):** Possibilidade de jogar com amigos.
* **Melhorias na UI/UX:** Estilização com Tailwind CSS, navegação aprimorada.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---
