GrupoA Educação - Full Stack Web Developer
===================

[![N|Solid](https://www.grupoa.com.br/hs-fs/hubfs/logo-grupoa.png?width=300&name=logo-grupoa.png)](https://www.grupoa.com.br) 

O objetivo deste desafio é avaliar as competências técnicas dos candidatos a desenvolvedor Full Stack Web na Maior Plataforma de Educação do Brasil, **Grupo A Educação**. 

Será solicitado o desenvolvimento de uma Aplicação que realize a Matrícula do Aluno na Turma de Programação Web da instituição EdTech. Regras e requisitos técnicos estão detalhadas neste documento.

# Especificações Técnicas
- **Front End:** [Vuetifyjs](https://vuetifyjs.com/en/)  como framework de UI
- **API:** Express e NodeJS
- **Banco de Dados:** Postgress ou MySQL
- **Idioma de escrita do código:** Inglês


# Requisitos
## Contextualização
Considere que uma Instituição de Ensino Superior precisa de uma solução para cadastrar e gerenciar matrículas de usuários em turmas online. Para que o usuário possa ter acesso às suas aulas, ele precisa estar matriculado em uma turma vigente. 

O desafio consiste em criar uma aplicação para atender este cenário específico. Você deverá criar uma aplicação para o cadastro de usuários conforme os critérios de aceitação.

## Mockups de interface
Abaixo alguns mockoups de interface como um guia para a criação do front-end. Fique à vontade para usar sua criatividade e melhorias na criação do front-end.

* Listagem de Alunos
![Listagem de Alunos](/mockups/studants_list.png)

* Criar/Editar Aluno
![Listagem de Alunos](/mockups/studants_save.png)

## Histórias de Usuário
### Cadastro de usuário
- **Sendo** um usuário administrativo da Instituição
- **Quero** cadastrar um aluno
- **Para** que eu possa realizar a matrícula deste aluno
#### Critérios de aceite:
- **Dado** que estou na tela de cadastro
- **E** preenchi os dados obrigatórios válidos
- **Quando** clico em salvar 
- **Então** armazeno os dados na tabela alunos

## Estrutura de dados
### Criação de Usuário:
- Campos obrigatórios:
  - Nome
  - Registro Acadêmico (RA)
  - Documento (CPF)
  - Status: Ativo ou Inativo

# Desejável
- Testes unitários
- Documentação da arquitetura de solução
- Utilização de Recursos em Cloud, podendo ser AWS ou GCLOUD

# Critérios de avaliação
- Qualidade de escrita do código
- Organização do projeto
- Qualidade da API
- Lógica da solução implementada
- Qualidade da camada de persistência
- Utilização do Git (quantidade e descrição dos commits, Git Flow, ...)

# Instruções de entrega
1. Crie um fork do repositório no seu GitHub
2. Faça o push do código desenvolvido no seu Github
3. Inclua um arquivo chamado COMMENTS.md explicando
- Decisão da arquitetura utilizada
- Lista de bibliotecas de terceiros utilizadas
- O que você melhoraria se tivesse mais tempo
- Quais requisitos obrigatórios que não foram entregues
4. Informe ao recrutador quando concluir o desafio junto com o link do repositório
