FROM node:lts-buster

WORKDIR /srv

COPY . .

RUN npm i -g typescript node-ts

RUN npm install

RUN npm run build

CMD ["node", "dist/index.js"]