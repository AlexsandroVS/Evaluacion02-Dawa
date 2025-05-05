# Dockerfile dentro de /backend
FROM node:23-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Crear la carpeta manualmente dentro del contenedor
RUN mkdir -p uploads

EXPOSE 3000
CMD ["npm", "start"]
