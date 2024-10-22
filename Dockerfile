FROM node:20.16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN npm run build

FROM node:20.16
COPY --from=builder /app/dist ./
EXPOSE 3232
ENTRYPOINT ["npm","run","dev"]
