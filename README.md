
  

<p  align="center"  width="100%">

  

<img  width="128px"  src="images/favicon.ico"  alt="Zeztra">

  

</p>


## Desafio FullStack Zeztra

Para rodar a aplicação é preciso executar os seguintes passos:

1. Rodar o banco de dados localmente na raiz do projeto:
 - Obs: Necessário ter o docker e docker-compose instalado na máquina.

```console
    docker-compose up -d
```

2. Rodar o backend:

```console
    cd backend
    cp .env.dev .env
    npm run install
    npm run build
    npm run start
```

3. Rodar o portal:

```console
    cd frontend
    cp .env.dev .env
    npm run install
    npm run build
    npm run start
```

4. Para realizar a visualização do banco de dados via dashboard você pode acessar o link abaixo depois que o docker estiver rodando:

```console
    http://localhost:8081
```