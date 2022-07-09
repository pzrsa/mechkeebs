FROM --platform=linux/amd64 node:16

# Create app directory
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

RUN yarn build

ENV NODE_ENV=production

CMD [ "node", "dist/index.js" ]
USER node