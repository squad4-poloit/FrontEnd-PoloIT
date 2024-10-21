FROM node:20.16 AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn run build

FROM nginx:1.25.4-alpine3.18
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /var/www/html/
EXPOSE 3232
ENTRYPOINT ["nginx","-g","daemon off;"]
