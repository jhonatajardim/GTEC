#!/usr/bin/env python
import cgi

# Cabeçalho para indicar que a saída é do tipo HTML
print("Content-Type: text/html\n")

# Recupere os dados do formulário
form = cgi.FieldStorage()

# Verifique se os campos necessários foram enviados
if "nome" in form and "email" in form and "mensagem" in form:
    nome = form["nome"].value
    email = form["email"].value
    mensagem = form["mensagem"].value

    # Abra o arquivo para escrita e armazene os dados
    with open("mensagens.txt", "a") as arquivo:
        arquivo.write(f"Nome: {nome}\n")
        arquivo.write(f"E-mail: {email}\n")
        arquivo.write(f"Mensagem: {mensagem}\n\n")

    print("Mensagem enviada com sucesso!")
else:
    print("Erro: Preencha todos os campos obrigatórios.")
