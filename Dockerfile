FROM node:23.8.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--port", "3000", "--host", "0.0.0.0"]