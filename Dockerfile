FROM node:20.0

WORKDIR /app/
COPY package.json .

RUN npm cache clean --force
RUN npm install -g cross-env
RUN npm i

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "serve"]