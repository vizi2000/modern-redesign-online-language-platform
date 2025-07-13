# Dockerfile for Next.js production build
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy all application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]