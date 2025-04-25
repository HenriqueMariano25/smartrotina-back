FROM node:22-alpine AS development

USER root

WORKDIR /app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production && apk add --no-cache openssl

RUN npm install dotenv

COPY . .

COPY --from=development /app/dist ./dist
COPY --from=development /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=development /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=development /app/prisma ./prisma

EXPOSE 3000

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]