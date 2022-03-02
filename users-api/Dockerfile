FROM node:lts-buster

WORKDIR /srv

COPY . .

RUN npm i -g typescript

RUN npm install

RUN npm run build

CMD ["node", "dist/index.js"]