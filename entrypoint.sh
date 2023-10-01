#/bin/bash

nginx -g 'daemon on;'

cd /app

node /app/src/server.js