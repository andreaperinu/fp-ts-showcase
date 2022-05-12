FROM node:13.12.0-alpine
LABEL author="Andrea Perinu"
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
CMD ["yarn", "start"]
