# ***How to manage the application?***

## You need to install
##### only if you don't have them installed in your machine yet

#### Docker
```
curl https://get.docker.com/ | sh


sudo usermod -aG docker $USER
(logout then login back again)
```

#### docker-compose
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose


sudo chmod +x /usr/local/bin/docker-compose
```

## To start
```sh
sh start.sh
```

## To stop
```sh
sh stop.sh
```

#
# Decisão da arquitetura utilizada

- **Docker | docker-compose**
    * disposição dos serviços em *containers*
- **PostgreSQL**
    * banco de dados
- **Node.js**
    * back-end da aplicação
- **Vuetify**
    * *framework* de UI

# Lista de bibliotecas de terceiros utilizadas

## Back-End
- **cors**
- **nodemon**
- **dotenv**
- **express**
- **pg | pg-hstore**
- **sequelize-cli | sequelize**

## Front-End
- **uuid**
- **axios**
- **eslint**
- **brazilian-values**
- **vue | vue-router | vuex**
- **node-sass | sass | sass-loader**

# O que você melhoraria se tivesse mais tempo

- Criação de tela de Login
- Perfis de usuário e permissionamento
- *Server-side pagination* da listagem de alunos
- Implementação de PWA
- Levantamento de requisito para o formato da numeração do Registro Acadêmico

# Quais requisitos obrigatórios que não foram entregues

Nenhum
