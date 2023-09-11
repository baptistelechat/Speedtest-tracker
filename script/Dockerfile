# Utilise l'image Alpine
FROM ubuntu:latest

# Crée un répertoire de travail
WORKDIR /app

# Installe les dépendances système nécessaires et nettoie le cache
RUN apt-get update && apt-get install curl -y
RUN curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
RUN apt-get install speedtest -y

# Installe Node.js et npm
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm@latest

# Copie le package.json et le pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installe PNPM globalement
RUN npm install -g pnpm

# Installe les dépendances avec PNPM
RUN pnpm install

# Copie le reste des fichiers de l'application
COPY . ./

# Exécute le script au démarrage
CMD ["pnpm", "dev"]
# CMD ["speedtest", "--accept-license", "--accept-gdpr", "-f", "json"]
# CMD ["tail", "-f", "/dev/null"]