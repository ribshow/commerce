# commerce

Application test stock

# Como rodar a aplicação:

## Clonando o repositório:

```bash
git clone https://github.com/ribshow/commerce.git
```

## Rodando localmente no docker

- No terminal:

```bash
./run-dev.sh
```

## Para parar a aplicação no docker

- No terminal:

```bash
./stop.sh
```

## A imagem está disponível no docker hub, para baixá-la:

```bash
docker pull ribshow10/docker-commerce:v1_alpine
```

## Para rodar a imagem baixada do dockerhub:

```bash
docker run ribshow10/docker-commerce:v1_alpine
```

## OBS: A aplicação depende do banco de dados mongo, para uso de todas suas funcionalidades, se rodar através do docker run diretamente receberá uma mensagem de aviso de que não foi possível se conectar ao database. Por isso clone o repositório.
