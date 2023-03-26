FROM node:18-alpine

WORKDIR /app

COPY package*.json /app
COPY yarn.lock /app

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]