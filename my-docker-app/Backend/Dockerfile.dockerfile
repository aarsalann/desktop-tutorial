# Use a lightweight Node.js environment
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy your server.js file into the container
COPY server.js .

# Expose port 9000 so the frontend can talk to it
EXPOSE 9000

# The command to start your backend
CMD [ "node", "server.js" ]