# Deploy

How to deploy Rig to VPS at rig.srmdn.com.

## Prerequisites

- VPS with Nginx installed
- certbot for SSL
- srmdn-ops repo cloned on VPS

## Steps

### 1. Build

```bash
cd ~/Developer/projects/github/rig
pnpm build
```

### 2. Upload dist to VPS

```bash
scp -r dist/ user@vps:/var/www/rig_srmdn_c_usr/data/www/rig.srmdn.com/
```

### 3. Nginx config

Copy `website/rig.srmdn.com.conf` to `/etc/nginx/sites-available/` on the VPS, then:

```bash
ln -s /etc/nginx/sites-available/rig.srmdn.com.conf /etc/nginx/sites-enabled/
certbot --nginx -d rig.srmdn.com
nginx -t && systemctl reload nginx
```

### 4. Verify

Visit `https://rig.srmdn.com`.
