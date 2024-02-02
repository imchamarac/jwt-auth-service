FROM node:18-alpine AS node

# Builder stage

FROM node AS builder

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json docs views ./   

# Install all dependencies
RUN npm install              

# Copy the rest of the code
COPY . .                

# Invoke the build script to transpile typescript code to js and move into the dist folder
RUN npm run build       


# Build stage
FROM node AS build

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

# Install PM2
RUN npm install -g pm2

# Copy package.json, package-lock.json and process.yml
COPY package*.json process.yml ./

# Switch to user node
USER node

# Install dev libraries as user node
RUN npm install --omit=dev


# Copy js files and change ownership to user node
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/views ./dist/views
COPY --chown=node:node --from=builder /app/src/docs ./dist/src/docs

# Open desired port
EXPOSE 8080:8080

# Use PM2 to run the application as stated in config file
ENTRYPOINT ["pm2-runtime", "./process.yml"]  