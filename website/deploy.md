# Deploy

How to deploy Rig to a static web host.

## Prerequisites

- VPS with Nginx installed
- certbot for SSL
- A target web root such as `/var/www/YOUR_SITE`

## Steps

### 1. Build

```bash
cd ~/Developer/projects/github/rig
pnpm build
```

### 2. Upload dist to VPS

```bash
scp -r dist/ USER@HOST:/var/www/YOUR_SITE/
```

### 3. Nginx config

Create an Nginx server block for `YOUR_DOMAIN`, then:

```bash
ln -s /etc/nginx/sites-available/YOUR_DOMAIN.conf /etc/nginx/sites-enabled/
certbot --nginx -d YOUR_DOMAIN
nginx -t && systemctl reload nginx
```

### 4. Verify

Visit `https://YOUR_DOMAIN`.
