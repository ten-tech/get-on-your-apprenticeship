# Utiliser une image Node.js comme image de base
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'API
COPY . .

# Construire le projet TypeScript
RUN npm run build

# Exposer le port 4000
EXPOSE 4000

# Démarrer l'application
CMD ["npm", "start"]
