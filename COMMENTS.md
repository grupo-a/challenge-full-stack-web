# Documentação da Arquitetura - Sistema de Gerenciamento de Alunos

## Decisão da Arquitetura Utilizada

### Backend (Node.js + Express)
- **Arquitetura**: MVC (Model-View-Controller) com separação de concerns
- **Padrões**: Repository Pattern (Sequelize), Middleware Chain, Singleton (Database)
- **Estrutura**:
backend/
├── src/
│ ├── config/ # Configurações (database, environment)
│ ├── controllers/ # Lógica de negócio
│ ├── models/ # Entidades do banco
│ ├── routes/ # Definição de endpoints
│ ├── middleware/ # Interceptores de requisição
│ ├── validators/ # Validações de entrada (Joi)
│ └── tests/ # Testes unitários

text

### Frontend (Vue.js 3 + Vuetify)
- **Arquitetura**: Component-Based Architecture com Single-File Components
- **Gerenciamento de Estado**: Pinia (alternativa ao Vuex)
- **Roteamento**: Vue Router com navigation guards
- **UI Framework**: Vuetify 3 para design system consistente

## Lista de Bibliotecas de Terceiros Utilizadas

### Backend
- **express**: Framework web para Node.js
- **sequelize**: ORM para PostgreSQL
- **pg**: Driver PostgreSQL
- **bcrypt**: Hash de senhas
- **jsonwebtoken**: Autenticação JWT
- **joi**: Validação de dados
- **cors**: Habilitar CORS
- **dotenv**: Gerenciamento de variáveis de ambiente

### Frontend
- **vue**: Framework progressive JavaScript
- **vue-router**: Roteamento SPA
- **pinia**: Gerenciamento de estado
- **vuetify**: Component library Material Design
- **@mdi/font**: Ícones Material Design

## O que você melhoraria se tivesse mais tempo

### 1. Segurança
- Implementar rate limiting para prevenir ataques de força bruta
- Adicionar sanitização de dados contra XSS e SQL injection
- Implementar auditoria de logs de acesso e operações
- Adicionar 2FA (autenticação de dois fatores)

### 2. Performance
- Implementar cache com Redis para consultas frequentes
- Adicionar paginação infinita na listagem de alunos
- Otimizar queries com índices no banco de dados
- Implementar lazy loading de componentes

### 3. Funcionalidades
- Sistema completo de roles e permissions (RBAC)
- Upload de foto do aluno
- Histórico de alterações (log de auditoria)
- Exportação de relatórios (PDF, Excel)
- Notificações em tempo real (WebSocket)

### 4. DevOps
- Containerização com Docker
- CI/CD pipeline (GitHub Actions)
- Monitoramento com APM (New Relic, DataDog)
- Log aggregation (ELK Stack)

### 5. Testes
- Testes end-to-end com Cypress
- Testes de integração para APIs
- Testes de carga e performance
- Coverage reporting

## Requisitos obrigatórios que não foram entregues

### ✅ Todos os requisitos obrigatórios foram implementados:

1. **✅ CRUD completo de alunos** - Create, Read, Update, Delete
2. **✅ Campos obrigatórios** - Nome, Email, RA, CPF
3. **✅ Validações** - Frontend e backend
4. **✅ Interface conforme mockups** - Listagem e formulário
5. **✅ Framework Vue.js + Vuetify** - Stack tecnológica exigida

### ⚠️ Itens de segurança (diferenciais) implementados parcialmente:
- **Autenticação JWT** ✅ Implementada
- **Autorização por roles** ✅ Implementada (admin/assistant)
- **Validação de entrada** ✅ Implementada no backend


Teste Unitário: Jest.

DB (postgres) -> Endpoint:qa.ci3ykwsu2ec8.us-east-1.rds.amazonaws.com
                 Porta: 5432
                 username:postgres
                 password: 5UJFQvvN6NCeiRv
                 Acesso publico (configurei como regra de entrada a porta 0000/0, podem fazer uso durantes os testes)

[Frontend] → [API Gateway] → [Backend] → [Database]
↑ ↑ ↑ ↑
Vue.js Express Node.js PostgreSQL
Vuetify Sequelize AWS RDS
