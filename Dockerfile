FROM node:18

COPY index.js .

COPY package.json .

COPY .env .

RUN npm install

CMD node index.js
