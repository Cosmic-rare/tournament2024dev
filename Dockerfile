FROM node:18.16.1-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]