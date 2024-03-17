FROM node:20.11-alpine

EXPOSE $PORT

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev:migrate"]