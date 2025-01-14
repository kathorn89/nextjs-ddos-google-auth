# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json ./

# Install dependencies
RUN npm install
# RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application in development mode
CMD ["npm", "run", "dev"]
