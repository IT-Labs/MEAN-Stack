# Stage 1 - Build Node and Angular
# NODE APP
FROM node:carbon as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# ANGULAR APP
FROM node:12.7-alpine as builder-angular

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY  ./src/server/public/angular/client-app/package*.json ./

# Install any needed packages
RUN npm i

# Bundle app source
COPY ./src/server/public/angular/client-app/ ./

# Build ]
RUN npm run build

# -------------------------------------------
# Stage 2 build for creating smaller image
FROM node:carbon-alpine
WORKDIR /usr/src/app

# copy NODE APP
COPY --from=builder /usr/src/app .

# copy ANGULAR APP
COPY --from=builder-angular /usr/src/app/dist/client-app ./src/server/public/angular/client-app/dist/client-app

EXPOSE 3001

CMD [ "npm", "start" ]