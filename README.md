# geolucky-back-end

## Rotas:
- ### POST "/login": ```http://localhost:3001/login``` Descrição: consulta no tabela users se o usuario recebido no body existe, e se a senha fornecida é coincidente com a senha salva no banco. Também cria o token (jwt) de autenciação, e por fim, retorna o id do usuário, e o token de autenticação criado.
- ### POST "/user": ```http://localhost:3001/user``` Descrição: rota para o cadastro de um novo usuário no banco.
- ### GET "/user": ```http://localhost:3001/user``` Descrição: rota para consulta de todos os usuários cadastrados
- ### GET "/point":```http://localhost:3001/point``` Descrição: rota para consulta de todos os pontos já escolhidos pelos usuários até o momento da consulta (tratar erros);
- ### POST "/point": ```http://localhost:3001/user``` Descrição: rota para o cadastro de um novo ponto.
- ### POST "/point/check":
- ### POST "/confirm":
- ### POST "/sendconfirmation":
- ### GET "/token/:userId":
- ### GET "/raffle":

