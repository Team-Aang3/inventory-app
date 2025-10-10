FROM node:20.15.1

WORKDIR /inventory-app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Rebuild sqlite3 for the container's architecture
RUN npm rebuild sqlite3

EXPOSE 3000

CMD ["npm", "start"]