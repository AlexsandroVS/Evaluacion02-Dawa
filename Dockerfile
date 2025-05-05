# Etapa 1: construir el frontend con Vite
FROM node:23-slim AS frontend
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Etapa 2: backend + frontend compilado
FROM node:23-slim

WORKDIR /app

# Copiar backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

# Copiar frontend compilado desde etapa 1
COPY --from=frontend /app/frontend/dist ./public

# Crear carpeta para uploads si no existe
RUN mkdir -p uploads

EXPOSE 3000
CMD ["node", "server.js"]
