# Stage 1 - dev

FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# Stage 2 - prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
EXPOSE 80