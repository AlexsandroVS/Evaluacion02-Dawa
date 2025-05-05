FROM node:23-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY uploads ./uploads

EXPOSE 3000

CMD ["npm", "start"]
