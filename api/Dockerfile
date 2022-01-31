# Version
FROM node:14

# Create Main File Directory
WORKDIR /index

# Copy and Install Index Dependecies
# Dari File pakage.json
COPY package.json /index

# Jalankan / Run NPM Install Setelah COPY Dependencies
RUN npm install

# COPY Semua To Index Again
COPY . /index

# Expose Port
EXPOSE 8500

# Run Command
CMD ["npm", "start"]