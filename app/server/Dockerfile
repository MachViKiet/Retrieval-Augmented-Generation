FROM node:19

WORKDIR /app

RUN mkdir -p /opt/node_modules

COPY ./package.json /app

COPY ./package-lock.json /app

RUN npm cache clean --force

RUN npm cache verify

RUN npm install

RUN npm i esm --save

RUN npm i ts-node -D

COPY ./ /app

ENV PROTOCOL="https"

ENV APP_HOST="localhost"

ENV APP_PORT="8017"

ENV APP_PROTOCOL="https"

ENV NODE_ENV="production"

ENV JWT_SECRET="Machvikietdeptraihocgioianhvan"

ENV JWT_EXPIRATION_IN_MINUTES="4320"

ENV EMAIL_ADDRESS="mvkiet21@clc.fitus.edu.vn"

ENV EMAIL_PASSWORD="uboy zuwd vpjf cyjl"

ENV STORAGE="http://localhost:8017"

ENV CLIENT="http://localhost:8017"

EXPOSE 8017

COPY . .

CMD ["npm", "run", "dev"]
