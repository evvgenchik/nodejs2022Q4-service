FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
RUN yarn install
EXPOSE 4000
CMD ["npm", "run", "start:prisma"]
