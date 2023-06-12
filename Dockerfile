# Stage: Build
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG build_script
RUN npm run $build_script


# Stage: Run
FROM node:18-slim
COPY --from=build /usr/src/app/dist .
CMD ["node", "dist/server/main.js"]
