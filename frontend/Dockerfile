# frontend/Dockerfile
FROM node:18

WORKDIR /app

# Copia apenas o package.json e package-lock.json primeiro
# para aproveitar o cache do Docker se as dependências não mudarem
COPY package.json ./
COPY package-lock.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Comando para iniciar o servidor de desenvolvimento do Next.js
CMD ["npm", "run", "dev"]