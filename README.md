Este sistema consiste em uma aplicação web para o cadastro de pessoas e o controle de uma conta bancária. 
As tecnologias utilizadas foram:

Linguagens:

JavaScript
React
Node


Bibliotecas:

zod (validações)
React table

Cadastro de pessoa

- Regex para a primeira letra do nome e do sobrenome ser maiúscula, o CPF não pode se repetir e deve conter apenas números.

![register persons](https://github.com/RodrigoFantibon/AccountMoviment-WEB/assets/88854115/03440842-1b1d-4d7d-99dd-13427e7105bb)


Cadastro de Conta 

- Campos de pessoa lista todas as pessoas que foram cadastradas na tela de cadastro de pessoas e sua CPF junto.
- Filtro para validar se o numero da conta já esta cadastrado no banco.
- Opção de editar ou excluir o número da conta cadastrado para a pessoa.
- Se já houver movimentação nesta conta, não é possível excluir o número da conta atribuído à pessoa.

![create number acconts from persons](https://github.com/RodrigoFantibon/AccountMoviment-WEB/assets/88854115/9c4b919b-1849-43a3-a73a-708d79474628)


Cadastro de movimentação

- Ao selecionar uma pessoa cadastrada no campo de pessoa, deve aparecer o número da conta vinculada a ela, juntamente com o seu saldo atual.
- A pessoa não pode sacar um valor maior do que o saldo atual de sua conta.
- Ao clicar em salvar, tanto o depósito como o saque serão registrados no histórico de movimentação da conta.
- O saldo em vermelho no histórico representa saques, e o verde representa depósitos.
  
![moviment acconts](https://github.com/RodrigoFantibon/AccountMoviment-WEB/assets/88854115/20772325-cc81-4991-9942-8c3f61655ef6)
