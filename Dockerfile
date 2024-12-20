# Use a Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application using webpack
RUN npm run build

# Expose the port your app listens on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]