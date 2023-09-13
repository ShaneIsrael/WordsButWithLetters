mkdir db-data

[ ! "$(docker ps -a | grep postgres-db)" ] && docker-compose up -d postgres && sleep 1

until [ "`docker inspect -f {{.State.Running}} postgres-db`"=="true" ]; do
    echo "waiting for database to stand up..."
    sleep 5;
done;

npm i
npm run local