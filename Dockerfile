# pull the official base image
FROM node:alpine AS builder
# set working directory
WORKDIR /app
# add node executables to path
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies to container
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app source and resources into container from context
COPY . ./
# create production build
RUN npm run build

# package production build into final container
FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
RUN npm i serve
EXPOSE 5000
CMD ["npx", "serve", "-s", "build"]
