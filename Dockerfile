FROM node:10.19.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g json-server@0.14.0

COPY . .

RUN json-server --watch /usr/src/app/src/assets/json-files/acme-explorer.json --routes /usr/src/app/src/assets/json-files/routes.json -m /usr/src/app/src/assets/json-files/version.js

EXPOSE 4200

CMD ["ng", "serve"]