FROM node:16

RUN npm install -g @vue/cli@~v5.0.8

WORKDIR /vue

COPY package.json ./

RUN npm install

COPY ./ ./

EXPOSE 8080

ENTRYPOINT npm run serve
