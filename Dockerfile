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

COPY . .

ENV JWT_SECRET=$JWT_SECRET

COPY --from=development /app/dist ./dist
COPY --from=development /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=development /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=development /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run","start:prod"]