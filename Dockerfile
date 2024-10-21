# Usa una imagen base de Node para construir la aplicación
FROM node:20.16 AS builder

# Define el directorio de trabajo
WORKDIR /app

# Copia el archivo de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el código fuente y construye la aplicación
COPY . .
RUN npm run build

FROM nginx:1.25.4-alpine3.18

COPY ./nignx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /var/www/html/

CMD ["nginx","-g","daemon off;"]
