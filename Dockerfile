# Use the official Node.js image as the base
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express app is listening on
EXPOSE 3000

# Set environment variables
ENV MONGO_HOST mongodb
ENV MONGO_PORT 27017
# ENV MONGO_DBNAME your-database-name

ENV DB_HOST=mongodb+srv://admin:hM4kl4cL73WdWkFf@cluster0.faujta5.mongodb.net/contacts-collections
ENV DB_HOST_TEST=mongodb+srv://admin:hM4kl4cL73WdWkFf@cluster0.faujta5.mongodb.net/contacts-collections
ENV PORT 3000
ENV JWT_SECRET=mysecretphrase
ENV SENDGRID_API_KEY=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
ENV EMAIL_USER=72f5830d125fc2
ENV EMAIL_PASS=b0b415a9e52be9


# Start the application
CMD ["node", "server.js"]
