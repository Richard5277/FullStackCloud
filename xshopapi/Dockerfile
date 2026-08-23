FROM node:22-alpine

WORKDIR /app

RUN npm install -g npm@12.0.2

COPY package*.json ./
RUN npm install --no-update-notifier

COPY . .

EXPOSE 8080

CMD ["npm", "start"]