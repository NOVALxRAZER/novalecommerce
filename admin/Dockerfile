# Version
FROM node:14

# Create Main File Directory
WORKDIR /admin

# Copy and Install Index Dependecies
# Dari File pakage.json
COPY package.json /admin/

# Jalankan / Run NPM Install Setelah COPY Dependencies
RUN npm install

# COPY Semua To Index Again
COPY . /admin/

# Build For Client Side Production
# RUN npm run buid

# Expose Port
EXPOSE 4000

# Run Command
CMD ["npm", "start"]