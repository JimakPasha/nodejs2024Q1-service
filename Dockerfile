FROM node:20.11-alpine

EXPOSE 8080

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]