# Use Node.js with Corepack pre-installed
FROM node:22-alpine

# Enable Corepack
RUN corepack enable

# Set the working directory
WORKDIR /usr/src/app

# Copy project files, including .yarn/cache see what's in the .dockerignore file for more details
COPY . .

# Install dependencies using Yarn without modifications and build the TypeScript code
RUN yarn install --immutable --immutable-cache --check-cache && yarn build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["yarn", "start"]
