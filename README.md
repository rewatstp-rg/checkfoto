## NODE.JS
- Node 16.x || 18.x

## USING YARN (Recommend)
- yarn install
- yarn admin 
- npm/yarn install vite

## USING NPM
- npm i OR npm i --legacy-peer-deps
- npm run dev

## HOW TO START
 1. run scirpt in terminal => yarn web
 2. follow to http://localhost:3900/
 3. if you change path API you can change it at .env.admin-dev => VITE_HOST_API

## How to build
 1. change package version in package.json is new version > old version  For example "version": "1.0.3" (Old) change to "version": "1.0.4" (New)
 2. run scirpt in terminal 
    - yarn build:checkrace-sit for DEV web
    - yarn build:checkrace-prod for PROD web

## แก้ไข Url Env sit ( yarn build:admin-sit )
 - เข้าไปที่ไฟล์ .env.admin-sit เปลี่ยน VITE_HOST_API='...'

## eslint
eslint off 
/* eslint import/newline-after-import: "off" */

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name photo.solutioninsight.tech;
    root /var/www/photo-checkrace/dist;
    index index.html;

    client_max_body_size 20M;

    ssl_certificate     /certificate/checkrace-2024/sol.pem;
    ssl_certificate_key /certificate/checkrace-2024/sol.key;

    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout 5m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    charset utf-8;
  
  	gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;
    gzip_types
      application/atom+xml
      application/geo+json
      application/javascript
      application/x-javascript
      application/json
      application/ld+json
      application/manifest+json
      application/rdf+xml
      application/rss+xml
      application/xhtml+xml
      application/xml
      font/eot
      font/otf
      font/ttf
      image/svg+xml
      text/css
      text/javascript
      text/plain
      text/xml;
  
  	# -----------------------------
    # Service Worker (never cache)
    # -----------------------------
  
    location = /manifest.webmanifest {
         expires 30d;
         add_header Cache-Control "public";
    }
  
    location = /registerSW.js {
     	try_files $uri =404;
        add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    }

    location = /service-worker.js {
     	try_files $uri =404;
        add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    	add_header Service-Worker-Allowed "/" always;
    }

    # --------------------------------------------------
    # SPA entry (index.html) ห้าม cache
    # --------------------------------------------------
    location ~* \.html$ {
        add_header Cache-Control "no-cache, must-revalidate, max-age=0" always;
        try_files $uri =404;
    }

    # --------------------------------------------------
    # SPA fallback
    # --------------------------------------------------
    location / {
        add_header Cache-Control "no-cache, must-revalidate, max-age=0" always;
        try_files $uri $uri/ /index.html;
    }

    # --------------------------------------------------
    # Vite assets (JS / CSS / chunk) cache ได้ยาว
    # --------------------------------------------------
  
  	location ~* \.(ttf|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
  
    location /assets/ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable" always;
        access_log off;
    }

    # --------------------------------------------------
    # API proxy (ไม่ cache)
    # --------------------------------------------------
    location /api/ {
        proxy_pass http://photoApi:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        add_header Cache-Control "no-store" always;
    }

    # --------------------------------------------------
    # Shared images (public)
    # --------------------------------------------------
    location /shared-image/ {
        alias /home/checkrace/shared/;
        add_header Access-Control-Allow-Origin "*";
        expires 7d;
        add_header Cache-Control "public" always;
    }

    location /shared-app-image/ {
        alias /home/checkraceApplication/shared/;
        expires 7d;
        add_header Cache-Control "public" always;
    }

    # --------------------------------------------------
    # External proxy
    # --------------------------------------------------
    location /sendSms {
        proxy_pass https://bulk.truecorp.co.th;
    }
}

