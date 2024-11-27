# specify the node base image with your desired version node:<version>
FROM node:20.12.0-alpine

WORKDIR /dist

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "start" ] 

