# Champions Gaming Backend

## Descrição
Este é o backend do projeto **Champions Gaming**, que facilita a organização e gestão de ligas de futebol amador.

## Banco de Dados
### Desenvolvimento e Testes
Durante o desenvolvimento, utilizamos **SQLite**, um banco de dados leve e simples de configurar, ideal para rodar localmente e realizar testes rápidos. Não há necessidade de configurar um servidor de banco de dados para rodar o projeto localmente. (arquivo database.sqlite com alguns dados inseridos está disponível para testes)

### Produção
Em produção, o backend será configurado para usar **PostgreSQL**, A configuração para PostgreSQL está preparada para ser integrada em serviços de hospedagem de bancos de dados como Heroku, AWS RDS, ou DigitalOcean.

## Tecnologias Utilizadas
- Node.js
- Express
- TypeScript
- Knex.js (SQL query builder)
- SQLite 
- Nodemailer (para envio de e-mails)
- JWT (JSON Web Token para autenticação)
- Bcrypt.js (para hash de senhas)

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/EvilazioNeto/championsgaming-node-api.git

2. Navegue até o diretório do projeto:
   ```bash
   cd championsgaming-node-api

3. Instale as dependências:
   ```bash
   npm install

4. Execute as migrações para criar as tabelas no banco de dados:
   ```bash
   npm run knex:migrate

5. Execute as seeds para o banco com dados iniciais:
   ```bash
   npm run knex:seed

6. Executando o Servidor
      ```bash
   npm start

## Frontend do Projeto
- [Champions Gaming React](https://github.com/EvilazioNeto/championsgaming-react)
