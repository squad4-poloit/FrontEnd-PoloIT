# Usa una imagen base de Node para construir la aplicación
FROM node:20.16 AS builder

# Define el directorio de trabajo
WORKDIR /home/node/app

# Copia el archivo de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el código fuente y construye la aplicación
COPY . .
RUN npm run build

FROM node:20.16

WORKDIR /home/app

# Copia los archivos construidos al directorio de Nginx
COPY --from=builder /home/node/app ./

CMD ["npm", "run", "start", "--", " --", "host"]
