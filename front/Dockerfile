# Utiliser une image Node.js comme image de base
FROM node:16 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du frontend
COPY . .

# Construire le frontend
RUN npm run build

# Utiliser une image Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers construits du répertoire de construction
COPY --from=build /app/dist /usr/share/nginx/html

# Copier le fichier de configuration Nginx personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
