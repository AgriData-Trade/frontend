FROM node:16

ENV PORT 3000

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn install

# Copying source files
COPY . /app

# Building app
RUN yarn run build
EXPOSE 3000

# Running the app
CMD ["yarn" "run" "start"]