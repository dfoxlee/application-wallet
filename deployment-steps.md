# Deployment Steps

Note: These steps are intended for a fresh Ubuntu installation. The installation is for the Express.js backend application only. Frontend hosting is going to be served statically using a CDN.

1. Install Node.js and npm using nvm

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

# Verify the Node.js version:
node -v # Should print "v24.13.0".

# Verify npm version:
npm -v # Should print "11.6.2".
```

2. Install and start Docker

```bash
sudo apt remove $(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc | cut -f1)

# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Install Git

```bash
sudo apt-get install git
```

4. Clone the repository and install dependencies

```bash
git clone https://github.com/dfoxlee/application-wallet.git

cd application-wallet/backend

npm install

cd ../
```

5. Create `production.env` file in the `backend/db` directory

```bash
cd backend/db

nano production.env

# Add the following content
# -MYSQL_DATABASE
# -MYSQL_ROOT_PASSWORD
# -MYSQL_USER
# -MYSQL_PASSWORD

cd ../../
```

6. Create database container

```bash
cd backend/db

docker compose up

cd ../../
```

7. Create backend `.env` file

```bash
cd backend

nano .env

# Add the following content
# -PORT
# -DB_HOST
# -DB_USER
# -DB_PASSWORD
# -DB_NAME
# -DB_PORT
# -JWT_SECRET
# -GOOGLE_USER
# -GOOGLE_APP_PASSWORD
# -SALT_ROUNDS

cd ../
```

8. Install process manager and start backend with PM2

```bash
npm i -g pm2

# Start your app with PM2 (instead of npm run start)
cd backend
pm2 start npm --name "application-wallet-api" -- run start

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup systemd
# Run the command it outputs to enable the startup script
```

9. Install firewalls

```bash
sudo apt install ufw

sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

sudo ufw deny 3306
```

10. Set up a reverse proxy with Nginx

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/application-wallet

# Add this configuration: 
# server {
#     listen 80;
#     server_name your_domain_or_IP;

#     location / {
#         proxy_pass http://localhost:PORT; # Replace PORT with your backend port
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_cache_bypass $http_upgrade;
#     }
# }

# Enable the site
sudo ln -s /etc/nginx/sites-available/application-wallet /etc/nginx/sites-enabled/

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

11. Set up SSLs

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate (after DNS is pointing to your droplet)
sudo certbot --nginx -d your-domain.com
```

12. Docker persistent volume (DigitalOcean specific)

```bash
# Create and attach a DigitalOcean Volume first (via DO dashboard)
# Then mount it
sudo mkdir -p /mnt/mysql-data
sudo chown -R 999:999 /mnt/mysql-data

# Update your docker-compose.yml to use the volume

```