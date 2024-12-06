# Projeto Gympass-Solid

### Aplicação backend de um software para simular GymPass!

## Tecnologias utilizadas 


- [Vitest](https://vitest.dev/) (Para testes unitários e E2E)
- [Fastify](https://fastify.dev/) (Framework para back-end)
- [ESLint](https://eslint.org/) (Controle de qualidade do codigo)
- [Zod](https://zod.dev/) (Validação de Schema)
- [Knex](https://knexjs.org/) (Query Builder de banco de dados)
- [SQLite](https://www.sqlite.org/index.html) (Banco de dados)

## Models

- User
  - Nome
  - Email
  - Role
  - Password

- Check-in
  - User_id
  - Gym_id
  -created_at
  -validate_at

- Gym
  - Title
  - Description
  - Phone
  - Latitude
  - Longitude

## Requisitos da aplicação (Rotas)

### / users
- [x] Deve ser possível *criar* um usuário
- [x] Deve ser possível autenticar um usuário
- [x] Deve ser possível obter o perfil de um usuário logado
  
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] Quantidade total de refeições fora da dieta
- [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

### / check-ins
- [x] Deve ser possível obter o número de check-ins realizado pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após  criado;
- [x] O check-in só pode ser validado por administradores;


### / gyms
- [x] Deve ser possível cadastrar uma academia;
- [x] Deve ser possível o usuário buscar academias próximas(até 10km);
- [x] - [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco  PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas  com 20 itens por pagina;
- [x] O usuário deve ser identificado por um JWT(JSON Web Token);
