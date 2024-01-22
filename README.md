# Geolucky back-end

### Para rodar a aplicação é necessário ter um servidor MySQL rodando (por padrão o sequelize usa a porta 3306 para acessar o servidor MySQL). Uma vez que se tenha um serve MySQL rodando, clona-se o repositório, instala-se as dependências através do comando ```npm install``` executado na raiz do projeto pelo bash, uma vez instaladas as dependências, basta executar ```npm run dev```

## Rotas:
- ### POST "/login": ```http://localhost:3001/login``` Descrição: consulta no tabela users se o usuario recebido via req.body existe, e se a senha fornecida é coincidente com a senha salva no banco. Também cria o token (jwt) de autenciação, e por fim, retorna o id do usuário, e o token de autenticação criado.
- ### POST "/user": ```http://localhost:3001/user``` Descrição: rota para o cadastro de um novo usuário no banco - criar validações.
- ### GET "/user": ```http://localhost:3001/user``` Descrição: rota para consulta de todos os usuários cadastrados
- ### GET "/point":```http://localhost:3001/point``` Descrição: rota para consulta de todos os pontos já escolhidos pelos usuários até o momento da consulta (tratar erros);
- ### POST "/point": ```http://localhost:3001/point``` Descrição: rota para o cadastro de um novo ponto - criar validações.
- ### POST "/point/check": ```http://localhost:3001/point/check``` Descrição: rota que confere se um dado usuário (userId) já escolheu seu ponto para concorrer ao sorteio atual.
- ### PATCH "/confirm": ```http://localhost:3001/confirm``` Descrição: rota para confirmar o cadastro do usuário (link enviado por email).
- ### PATCH "/sendconfirmation": ```http://localhost:3001/sendconfirmation``` Descrição: caso o usuário não tenha confirmado o cadastro dentro do prazo do primeiro token criado, ao fazer o login novamente, esta rota cria um novo token e salva no lugar do antigo.
- ### GET "/token/:userId": ```http://localhost:3001/token/:userId``` Descrição: checa se o token de um dado usuário ainda está válido.
- ### GET "/raffle": ```http://localhost:3001/raffle``` Descrição: retorna os dados de todos os sorteios realizados.
