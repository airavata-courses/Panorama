FROM node:14.16.0-buster
EXPOSE 50052
WORKDIR /session-service
COPY . . 
RUN npm install
RUN npm run compile
CMD ["node", "out/index.js"]