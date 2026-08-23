FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g npm@12.0.2

COPY package*.json ./
RUN npm install --no-update-notifier

COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g npm@12.0.2

COPY package*.json ./
RUN npm install --omit=dev --no-update-notifier

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]