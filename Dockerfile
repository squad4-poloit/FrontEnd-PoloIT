FROM node:20.16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.25.4-alpine3.18
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /var/www/html/
EXPOSE 3232
CMD ["nginx","-g","daemon off;"]
