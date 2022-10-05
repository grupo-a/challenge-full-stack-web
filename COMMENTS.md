# Comentários

O projeto está subdividido em dois componentes. O frontend e o backend. 

## Iniciar projetos individualmente:

## Frontend 

[README.md](./frontend/README.md)

Foram utilizados como bibliotecas de terceiros o vue e vuetify conforme determinado pelo escopo, bem como o axios para requisições ao servidor. 

O projeto foi separado em camadas para manter uma arquitetura limpa, entretando, penso que ainda falta componentizar mais a aplicação, como feito com o Button, por exemplo, poderia ser feito com outros pontos como a análise de erros e inputs. 

Ainda, penso que poderia melhorar o esquema de autenticação ao sistema, faltou um processo melhor em relação ao token de acesso.

## Backend

[README.md](./backend/README.md)

Foram utilizados como bibliotecas de terceiros o nestjs, typeorm, jsonwebtoken, ulid, class-validator e class-transformer. Os dois ultimos são validadores, úteis para análise de payloads. A lib ulid foi só por estetica, para que os registros tivessem um padrão melhor. 

O projeto foi separado em camadas para manter uma arquitetura limpa, entretando, penso que ainda falta trabalhar melhor em relação à segurança, como a criptografia de senha e uma aplicação melhor do token, como análise de expiração do mesmo.

## Iniciar projeto:

### Por terminal

Utilizando o Makefile para subir o docker
```sh
make docker
```
Utilizando diretamente o docker compose
```sh
docker compose up --build -d
```

### Popular banco de dados

```sh
make seed
```

Caso não tenha o make

```sh
curl --request POST \
  --url http://localhost:3000/v1/employees \
  --header 'Content-Type: application/json' \
  --data '{ "name": "Yuri Rodrigues", "email": "yrcunha@gmail.com", "cpf": "49480347893", "password": "49480347890", "enrolment": "01GEJQYF6ENPCHV62QZ17XMFFF", "permissions": ["READ", "CREATE", "UPDATE", "DELETE" ] }'
```

### Acesso inicial ao sistema

```json
  { 
    "password": "49480347890", 
    "enrolment": "01GEJQYF6ENPCHV62QZ17XMFFF"
  }
```

