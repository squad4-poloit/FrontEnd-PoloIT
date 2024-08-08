# Usa una imagen base de Node para construir la aplicación
FROM node:18 AS build

# Define el directorio de trabajo
WORKDIR /app

# Copia el archivo de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el código fuente y construye la aplicación
COPY . .
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto en el que Nginx estará escuchando
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
