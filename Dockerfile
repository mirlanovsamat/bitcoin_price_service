FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --production
COPY . .
ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3000
