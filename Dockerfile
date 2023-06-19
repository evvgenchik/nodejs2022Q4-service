FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
RUN npm install --legacy-peer-deps && npm cache clean --force
RUN npx prisma generate
EXPOSE 4000
CMD ["npm", "run", "prisma"]
