FROM node:18

COPY index.js .

COPY package.json .

RUN npm install

CMD node index.js
