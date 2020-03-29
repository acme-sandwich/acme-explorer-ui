FROM node:10.19.0

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install -g @angular/cli@6.2.4

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host=0.0.0.0", "--disable-host-check"]
