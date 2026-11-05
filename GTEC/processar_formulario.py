#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GTEC Barretos - Processamento de Formulário de Contato
Compatível com Python 3.8+ (incluindo 3.11, 3.12 e 3.13)
Salva as mensagens com data/hora em 'mensagens.txt' com codificação UTF-8
"""

import sys
import os
import urllib.parse
from datetime import datetime

# Definir codificação padrão para saída
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def obter_dados_requisicao():
    """Recupera os dados enviados via POST ou GET sem depender do módulo legado cgi."""
    dados = {}
    metodo = os.environ.get('REQUEST_METHOD', 'GET').upper()

    if metodo == 'POST':
        try:
            tamanho = int(os.environ.get('CONTENT_LENGTH', 0))
            if tamanho > 0:
                corpo = sys.stdin.read(tamanho)
                parsed = urllib.parse.parse_qs(corpo, keep_blank_values=True)
                for chave, valores in parsed.items():
                    dados[chave] = valores[0] if valores else ''
        except Exception:
            pass

    # Tenta também capturar de query string se houver
    query_string = os.environ.get('QUERY_STRING', '')
    if query_string:
        parsed_query = urllib.parse.parse_qs(query_string, keep_blank_values=True)
        for chave, valores in parsed_query.items():
            if chave not in dados:
                dados[chave] = valores[0] if valores else ''

    return dados

def main():
    print("Content-Type: text/html; charset=utf-8\n")

    dados = obter_dados_requisicao()
    nome = dados.get('nome', '').strip()
    email = dados.get('email', '').strip()
    telefone = dados.get('telefone', '').strip()
    servico = dados.get('servico', 'Geral').strip()
    mensagem = dados.get('mensagem', '').strip()

    sucesso = False
    if nome and email and mensagem:
        try:
            agora = datetime.now().strftime("%d/%m/%Y às %H:%M:%S")
            caminho_arquivo = os.path.join(os.path.dirname(__file__), "mensagens.txt")
            
            with open(caminho_arquivo, "a", encoding="utf-8") as arquivo:
                arquivo.write("=" * 60 + "\n")
                arquivo.write(f"Data/Hora : {agora}\n")
                arquivo.write(f"Nome      : {nome}\n")
                arquivo.write(f"E-mail    : {email}\n")
                arquivo.write(f"Telefone  : {telefone or 'Não informado'}\n")
                arquivo.write(f"Serviço   : {servico}\n")
                arquivo.write(f"Mensagem  :\n{mensagem}\n\n")
            sucesso = True
        except Exception as e:
            sucesso = False

    # Renderiza resposta elegante com a identidade visual da GTEC
    html_resposta = f"""<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{'Mensagem Enviada!' if sucesso else 'Atenção'} - GTEC Barretos</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #f1f5f9; padding: 20px;">
    <div style="max-width: 520px; width: 100%; background: #fff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); text-align: center; border-top: 5px solid {'#2090CE' if sucesso else '#ef4444'};">
        <div style="font-size: 3.5rem; color: {'#10b981' if sucesso else '#ef4444'}; margin-bottom: 16px;">
            <i class="fa-solid {'fa-circle-check' if sucesso else 'fa-circle-exclamation'}"></i>
        </div>
        <h2 style="font-size: 1.8rem; color: #1e293b; margin-bottom: 12px;">
            {'Mensagem Recebida com Sucesso!' if sucesso else 'Erro ao Enviar'}
        </h2>
        <p style="color: #64748b; font-size: 1rem; line-height: 1.6; margin-bottom: 28px;">
            {'Obrigado pelo contato! Nossa equipe técnica responderá sua solicitação em breve.' if sucesso else 'Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Mensagem).'}
        </p>
        <a href="index.html" class="btn meu-botao" style="display: inline-flex; width: auto; padding: 12px 28px; margin: 0 auto;">
            <i class="fa-solid fa-arrow-left"></i> Voltar ao Site
        </a>
    </div>
</body>
</html>"""

    print(html_resposta)

if __name__ == '__main__':
    main()
