# frontend/Dockerfile
FROM node:18

WORKDIR /app

# Copia apenas o package.json (se package-lock.json não existe, não há problema)
COPY package.json ./

# Instala as dependências do Node.js (isso vai criar o package-lock.json DENTRO do container)
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Comando para iniciar o servidor de desenvolvimento do Next.js
CMD ["npm", "run", "dev"]