# Use a lightweight Nginx web server
FROM nginx:alpine

# Copy your HTML file into the Nginx public folder
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80 (the default web port)
EXPOSE 80