# Utilise une image Node.js
FROM node:18-alpine

# Crée un répertoire de travail
WORKDIR /app

# Copie le package.json et le pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installe PNPM globalement
RUN npm install -g pnpm

# Installe les dépendances avec PNPM
RUN pnpm install

# Copie le reste des fichiers de l'application
COPY . ./

# Expose le port sur lequel l'API va écouter
EXPOSE 3000

# Commande pour démarrer l'API
CMD ["pnpm", "dev"]
