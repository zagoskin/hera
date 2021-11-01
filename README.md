# app-acafilter

## Como hacer un deploy 

```bash
git clone https://github.com/gonetil/app-acafilter.git /var/www/hera

cd /var/www/hera

npm install desde el root

cd client && npm install && npm run build && npm install -g serve 
```

Editar el archivo client/.env para indicar la dirección de la API.

Luego ejecutar:
```bash
npm run deploy
```

## Para dejarlo como un servicio del sistema

```bash
npm install -g pm2
cd /var/www/hera
pm2 start server/index.js
cd client
pm2 serve build 5000 --spa
pm2 save
pm2 startup
```
