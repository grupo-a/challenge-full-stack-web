GrupoA Educação - Full Stack Web Developer
===================

[![N|Solid](https://www.grupoa.com.br/hs-fs/hubfs/logo-grupoa.png?width=300&name=logo-grupoa.png)](https://www.grupoa.com.br) 

O objetivo deste desafio é avaliar as competências técnicas dos candidatos a desenvolvedor Full Stack Web na Maior Plataforma de Educação do Brail, **Grupo A Educação**. 

Será solicitado o desenvolvimento de uma Aplicação que realize a Matricula do Aluno na Turma de Programação Web da instituição EdTech. Regras e requisitos técnicos estão detalhadas neste documento.

# Especificações Técnicas
- **Front End:** [Vuetifyjs](https://vuetifyjs.com/en/)  como framework de UI
- **API:** Express e NodeJS
- **Banco de Dados:** Postgress ou MySQL
- **Idioma de escrita do código:** Inglês


# Requisitos
## Contextualização
Considere que uma Instituição de Ensino Superior precisa de uma solução para cadastrar e gerenciar matrículas de usuários em turmas online. Para que o usuário possa ter acesso às suas aulas, ele precisa estar matriculado em uma turma vigente. 

O desafio consiste em criar uma aplicação para atender este cenário específico. Você deverá criar ao menos dois usuário, criar ao menos uma turma, e realizar ao menos uma matrícula em cada papel conforme os critérios de aceitação. Não é necessário implementar o cadastro de papéis, os mesmos estão representados nos requisitos obrigatórios. Você poderá complementar funcionalidades ou dados que façam sentido para os cenários se desejar.

## Mockups de interface
Abaixo alguns mockoups de interface como um guia para a criação do front-end. Fique à vontade para usar sua criatividade e melhorias na criação do front-end.

* Listagem de Alunos
![Listagem de Alunos](/mockups/studants_list.png)

* Criar/Editar Aluno
![Listagem de Alunos](/mockups/studants_save.png)

* Listagem de Turmas
![Listagem de Alunos](/mockups/class_list.png)

* Criar/Editar Turma
![Listagem de Alunos](/mockups/class_save.png)

* Listagem de Matrículas
![Listagem de Alunos](/mockups/enrollments_list.png)

* Criar/Editar Matrícula
![Listagem de Alunos](/mockups/enrollments_save.png)

## Histórias de Usuário
### Cadastro de usuário
- **Sendo** um usuário administrativo da Instituição
- **Quero** cadastrar um usuário
- **Para** que eu possa armazenas seus dados em minha base 
#### Critérios de aceite:
- **Dado** que estou na tela de cadastro
- **E** preenchi os dados obrigatórios válidos
- **Quando** clico em salvar 
- **Então** armazeno os dados na tabela usuários

### Cadastro de turma
- **Sendo** um usuário administrativo da Instituição
- **Quero** cadastrar uma turma
- **Para** que possa matricular usuários a essa turma
#### Critérios de aceite: 
- **Dado** que estou na tela de cadastro
- **E** preenchi os dados obrigatórios válidos
- **Quando** clico em salvar 
- **Então** armazeno os dados na tabela turma

### Cenário: matrícula de usuário
- **Sendo** um usuário administrativo da Instituição
- **Quero** matricular um usuário na turma 
- **Para** que o usuário tenha acesso aos recursos da turma 
#### Critérios de aceite:
#####
- **Dado** que estou na tela de matrícula 
- **E** visualizo todas turmas listadas
- **Quando** seleciono uma turma
- **Então** abre a tela de seleção dos usuários
#####
- **Dado** que visualizo a lista de seleção dos usuários ativos
- **Quando** seleciono um usuário
- **Então** solicita a seleção de um papel na turma
- **E** exibe a seleção de status, com o status "Ativo" em default 
- **E** persiste os dados na tela
- **E** permite selecionar outro usuário
#####
- **Dado** que selecionei os usuários e seus papéis
- **Quando** clico em "Matricular"
- **Então** valida se há vagas para os alunos
- **E** matricula os usuários validados
- **E** exibe status da ação

## Estrutura de dados
### Criação de Usuário:
- Campos obrigatórios:
- Nome
- ID do Documento 
- Registro Acadêmico 
- Status: Ativo ou Inativo

### Criação de Turma:
- Campos obrigatórios:
- Nome 
- Código da Turma 
- Limite de alunos 
- Status: Ativo, Inativo 
- Data inicial
- Data final

### Matrícula do Usuário na Turma:
- Campos obrigatórios:
- ID Matrícula do Aluno
- Status matrícula: Ativa, Inativa, Suspensa 
- Código da Turma
- Papel do usuário: Professor ou Aluno

# Desejável
- Testes unitários
- Integração contínua
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
