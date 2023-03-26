# Specify the base image
FROM node

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all app files into the container
COPY . .

# Build the React app
# RUN npm run build

# Expose port 3000 for the React app to run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
