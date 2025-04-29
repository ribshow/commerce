# criar rede
docker network create commerce || echo "Rede já existe"

# subir mongoDB
docker run -d \
    --name mongo_db \
    --network commerce \
    -p 27017:27017 \
    -v mongo_data:/data/db \
    mongo:latest

# subir app com volume pro código e hot reload com nodemon
docker build -t docker-commerce:v1_alpine .

docker run -d \
    --name docker-commerce \
    --network commerce \
    -p 8000:5000 \
    -v $(pwd):/src \
    -e MONGODB_URI=mongodb://mongo_db:27017/commerce \
    docker-commerce:v1_alpine \
