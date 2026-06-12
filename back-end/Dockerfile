FROM node:18-alpine
RUN apk add --no-cache tzdata
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install cors

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
