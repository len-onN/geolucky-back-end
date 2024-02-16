# Geolucky back-end

Para rodar a aplicação é necessário ter um servidor MySQL rodando em sua máquina (por padrão o sequelize usa a porta 3306 para acessar o servidor MySQL, caso o seu esteja rodando em outra porta, é necessário configurar o sequelize para consultar nesta porta, isto pode ser feito adicionando a chave port, com o valor da porta do seu servidor MySQL, no objeto config, em ./src/config/config.js). Uma vez que se tenha um servidor MySQL rodando, clona-se o repositório e instala-se as dependências através do comando ```npm install```  (executado, na raiz do projeto, através do bash). Uma vez instaladas as dependências, cria-se o banco e o popula-se com as seeds (pelo bash, ainda no raiz do projeto), através do comando: ```npm run dbdo```. Por fim, uma vez que o banco esteja criado, e devidamente populado ou, quase isso, como veremos adiante, já se pode rodar o servidor, com o comando ```npm run dev``` - ainda na raiz do projeto. Assim, já se  pode interagir com o banco através de um cliente HTTP (ThunderClient, Postman, Insomnia, Advanced REST Cliente, para citar algumas das opções que permitem gerar as requisições HTTP).
#### Atenção:
Por enquanto não há seeds para as tabelas Raffle e RafflePoints.
Para criar os seeders, é preciso atentar às regras de serviço da aplicação, onde o ponto vencedor é obrigatóriamente, um ponto escolhido por um dado usuário, e que tal ponto seja, dentre todos os pontos concorrentes, o mais próximo ao ponto sorteado. Esta escolha, junto a de outros usuários que concorram a cada sorteio, tem em comum a característica de fazerem parte de uma faixa de valores de datas que pertençam ao conjunto de datas formado pela semana anterior à data de sorteio.
Para gerar os dados em Raffle e RafflePoints, e explorar a aplicação como um todo, tendo acesso ao plot dos mapas de sorteios realizados, no front, leia o tópico abaixo "Simulando um sorteio".

### Simulando um sorteio:
 Na pasta services, em drawing.service.js, na linha 99, basta ajustar as informações de hora e dia da semana com os valores que você deseje (o sorteio ocorrerá na data setada nesta linha). O primeiro item da string de argumento é para segundos, o segundo para minutos e o terceiro para hora (0-24). O quarto campo se refere ao dia do mês (1-31), o quinto se refere ao mês (1-12) e o sexto se refere ao dia da semana (0-7). Os asteriscos significam que pode ser a qualquer dia do mês e a qualquer mês (ou, se usado em outro campo, torna-se válido qualquer valor do campo).
#### Atenção:
A realização do sorteio depende da existência de pontos criados (escolhidos pelos usuários) entre a data atual e uma semana atrás. Por enquanto, caso não tenham pontos, a aplicação gera um erro.

### Rotas:
- POST "/login": ```http://localhost:3001/login``` Descrição: consulta na tabela users se o usuário recebido via req.body existe, e se a senha fornecida é coincidente com a senha salva no banco. Também cria o token (jwt) de autenticação, e por fim, retorna o id do usuário (userId), e o token de autenticação criado.
- POST "/point/check": ```http://localhost:3001/point/check``` Descrição: rota que confere se um dado usuário (userId recebido após o login, recebeido em req.body), já escolheu seu ponto para concorrer ao sorteio atual.
- POST "/user": ```http://localhost:3001/user``` Descrição: rota para o cadastro de um novo usuário no banco - criar validações.
- GET "/user": ```http://localhost:3001/user``` Descrição: rota para consulta de todos os usuários cadastrados
- GET "/point":```http://localhost:3001/point``` Descrição: rota para consulta de todos os pontos já escolhidos pelos usuários até o momento da consulta (tratar erros);
- POST "/point": ```http://localhost:3001/point``` Descrição: rota para o cadastro de um novo ponto - criar validações.
- PATCH "/confirm": ```http://localhost:3001/confirm``` Descrição: rota para confirmar o cadastro do usuário (link enviado por email).
- PATCH "/sendconfirmation": ```http://localhost:3001/sendconfirmation``` Descrição: caso o usuário não tenha confirmado o cadastro dentro do prazo do primeiro token criado, ao fazer o login novamente, esta rota cria um novo token e salva no lugar do antigo.
- GET "/token/:userId": ```http://localhost:3001/token/:userId``` Descrição: checa se o token de um dado usuário ainda está válido.
- GET "/raffle": ```http://localhost:3001/raffle``` Descrição: retorna os dados de todos os sorteios realizados.
