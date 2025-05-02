echo " Parando e removendo containers..."
docker rm -f docker-commerce mongo_db 2>/dev/null

echo "Removendo imagem da aplicação..."
docker rmi docker-commerce:v1_alpine 2>/dev/null

echo "Removendo rede docker..."
docker network rm commerce 2>/dev/null

echo "Removendo o volume do mongoDB..."
docker volume rm mongo_data 2>/dev/null

echo "Tudo limpo!"  