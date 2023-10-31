# Use an official Node.js runtime as the parent image
FROM node:21.1.0

# Set a working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

RUN npm install express mongoose body-parser ejs

# Copy the rest of your Node.js application code into the container
COPY . .

# Expose the port your Node.js app will listen on
EXPOSE 3000

# Set an environment variable to specify the MongoDB connection string
#ENV MONGODB_URI=mongodb://mongodb-hostname:27017/mydb

# Command to run your Node.js application
CMD ["node", "server.js"]
