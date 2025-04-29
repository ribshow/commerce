FROM node:18-alpine
EXPOSE 8000
WORKDIR /src
COPY ./package.*json ./
RUN npm install
COPY . .
CMD ["npm", "start" ]
