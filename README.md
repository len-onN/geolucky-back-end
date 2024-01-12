# geolucky-back-end

### Ajustar Users - Model, Migration
### Ajustar Código:
#### UserService: 
<ul>
    <li>getUserById:
        <p>
            Esta service tem duas funções, capturar um dado usuário para um dado id, e checar se o token do usuário sem confirmação de e-mail está válido. Ela pode ser mantida com a função de retornar o usuário, mas é aconselhável criar uma nova rota para checar se o token é válido. É preciso, também, checar o front-end, para ajustar as chamadas à api, e ao tratamendo dos dados se necessário.
        </p>
    </li>
    <li>
        newUser:
        <p>
            Para criar um novo usuário, é necessário também criar um token, e enviar um e-mail de confirmação. Para criar um novo usuário, é necessário, antes de tudo, conferir se o usuário já existe, caso não, cria-se o token, então preparam-se as opções de e-mail, cria-se o novo usuário no banco (com o token gerado) e envia-se o email com as opções criadas e com o link para confirmação de cadastro (uma rota com o token como param).
            É necessário transferir a criação do token e do e-mail para a service de token.
        </p>
    </li>
    <li>
        confirmUser:
        <p>
            Esta service tem a função de atualizar o campo isConfirmed, que registra o estado da verificação via e-mail. Esta service deve ser transportada para service de tokens.
        </p>
    </li>
    <li>
        sendConfirmation:
        <p>
            Esta service é referente a rota que é acessada pelo botão de reenviar e-mail de confirmação.
            Ela cria um novo token, atualiza o token para o dado usuário no db e envia o e-mail com o link de confirmação (um endereço com token como param).
            Esta service deve ser transportada para service de tokens.
        </p>
    </li>
</ul>