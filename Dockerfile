# Utilise l'image Node.js Latest
FROM node:18-alpine

# Installe PNPM globalement
RUN npm install -g pnpm

# Crée un répertoire de travail
WORKDIR /app

# Copie le package.json et le pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installe les dépendances avec PNPM
RUN pnpm install

# Copie le reste des fichiers de l'application
COPY . .

# Exécute le script au démarrage
CMD ["pnpm", "start"]
