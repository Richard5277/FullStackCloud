FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --no-update-notifier

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]