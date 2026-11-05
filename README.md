# 🛡️ GTEC Barretos - Segurança Eletrônica & Telecomunicações

> Website institucional moderno, responsivo e de alta performance desenvolvido para a **GTEC**, referência em soluções de segurança residencial, corporativa e telecomunicações em Barretos e região.

---

## 📋 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Identidade Visual & Paleta de Cores](#-identidade-visual--paleta-de-cores)
- [Principais Melhorias de UI/UX & Padronização](#-principais-melhorias-de-uiux--padronização)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Rodar em Localhost](#-como-rodar-em-localhost)
  - [Método 1: Servidor Integrado Node.js (Recomendado)](#método-1-servidor-integrado-nodejs-recomendado)
  - [Método 2: Extensão Live Server (VS Code)](#método-2-extensão-live-server-vs-code)
  - [Método 3: Servidor HTTP do Python](#método-3-servidor-http-do-python)
  - [Método 4: NPX Serve](#método-4-npx-serve)
- [Páginas e Módulos do Sistema](#-páginas-e-módulos-do-sistema)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Equipe de Desenvolvimento](#-equipe-de-desenvolvimento)

---

## 🏢 Sobre o Projeto

A **GTEC** atua na proteção patrimonial e conectividade, oferecendo produtos e serviços de engenharia de segurança:
- **Centrais PABX**: Telefonia corporativa inteligente, ramais híbridos e redução de custos.
- **Centrais de Alarme**: Monitoramento perimetral 24h, sensores com função pet e controle via aplicativo.
- **Equipamentos CFTV**: Câmeras em Full HD e 4K, visão noturna e gravação contínua com acesso remoto no celular.
- **Porteiros Eletrônicos & Interfonia**: Vídeo porteiros com imagem colorida e acionamento remoto de fechadura.
- **Motores de Portões**: Motores de abertura rápida (4 a 5s) com proteção anti-clonagem de controle.
- **Controle de Acesso**: Reconhecimento facial, leitores biométricos, tags RFID e fechaduras eletroímã.

---

## 🎨 Identidade Visual & Paleta de Cores

O projeto preserva integralmente a identidade de cor original da marca GTEC, agora organizada com **CSS Custom Properties** (Design Tokens):

| Amostra | Variável CSS | Código Hex | Uso Principal |
| :---: | :--- | :--- | :--- |
| ![#2090CE](https://via.placeholder.com/18/2090CE/2090CE.png) | `--color-primary` | `#2090CE` | Azul Institucional GTEC (botões, detalhes, bordas) |
| ![#156da0](https://via.placeholder.com/18/156da0/156da0.png) | `--color-primary-dark` | `#156da0` | Tom escuro para hover, cabeçalhos de destaque e contraste |
| ![#0c4363](https://via.placeholder.com/18/0c4363/0c4363.png) | `--color-primary-darker` | `#0c4363` | Fundo profundo do Hero Banner e gradientes |
| ![#e8f4fb](https://via.placeholder.com/18/e8f4fb/e8f4fb.png) | `--color-primary-light` | `#e8f4fb` | Fundo de badges, ícones e estados ativos |
| ![#ffffff](https://via.placeholder.com/18/ffffff/ffffff.png) | `--color-white` | `#ffffff` | Cartões, seções claras e contrastes limpos |
| ![#1e293b](https://via.placeholder.com/18/1e293b/1e293b.png) | `--color-text-primary` | `#1e293b` | Tipografia em grafite escuro (alta legibilidade) |
| ![#25d366](https://via.placeholder.com/18/25d366/25d366.png) | `--color-whatsapp` | `#25d366` | Botões de ação rápida para conversão via WhatsApp |

---

## 🚀 Principais Melhorias de UI/UX & Padronização

1. **Arquitetura e Padronização de Código**:
   - Código semântico HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`).
   - Folha de estilos unificada (`css/style.css`) modularizada com design tokens e variáveis reutilizáveis.
   - JavaScript padronizado (ES6+) em `script.js` sem dependências pesadas externas.

2. **Cabeçalho Fixo Inteligente (*Sticky Header*)**:
   - Efeito *glassmorphism* com `backdrop-filter: blur(12px)`.
   - Menu hambúrguer responsivo para dispositivos móveis com animações fluidas.
   - Indicador ativo da seção em visualização (*Scrollspy*).

3. **Carrossel do Hero Banner Interativo**:
   - Transição suave entre slides, controles de seta e indicadores de navegação (*dots*).
   - Suporte a gestos touch/swipe em smartphones e tablets.
   - Autoplay inteligente com pausa automática ao passar o mouse.
   - Proposta de valor clara com títulos chamativos e CTAs de conversão.

4. **Páginas de Produtos 100% Funcionais**:
   - As páginas secundárias (`produtos.html`, `alarme.html`, `cameras.html`, `porteiro.html`, `portao.html`, `controle.html`), antes vazias, agora são landing pages completas com especificações técnicas, diferenciais, imagens e botões de orçamento sob medida.

5. **Formulário de Contato Inteligente**:
   - Validação de campos em tempo real com ícones informativos.
   - Notificações de envio (*toast alert*) com visual elegante.
   - Suporte duplo: envio padrão para backend (`processar_formulario.py` / `server.js`) e opção de encaminhamento direto formatado para o WhatsApp da empresa.

6. **Experiência Mobile First**:
   - Layout responsivo adaptado para smartphones, tablets, notebooks e telas ultrawide.
   - Botão flutuante do WhatsApp com animação de pulso e botão "Voltar ao Topo" suave.

---

## 📁 Estrutura do Projeto

```text
GTEC/
├── GTEC/                           # Diretório principal da aplicação
│   ├── css/
│   │   ├── style.css               # Estilos padronizados, responsividade e variáveis
│   │   └── FontsFree-Net-...ttf    # Fonte institucional auxiliar
│   ├── img/                        # Imagens, fotos e logotipos dos produtos
│   │   ├── Logo.png                # Logotipo oficial da GTEC
│   │   ├── logo4.png               # Ícone oficial da aba do navegador (Favicon)
│   │   ├── carrossel 1.jpg         # Slide 1: Visão Geral e Segurança Inteligente
│   │   ├── carrossel 2.jpg         # Slide 2: Equipamentos CFTV Full HD & 4K
│   │   ├── carrossel 3.jpg         # Slide 3: Centrais Telefônicas PABX
│   │   ├── carrossel 4.jpg         # Slide 4: Porteiros Eletrônicos & Vídeo Porteiros
│   │   ├── carrossel 5.jpg         # Slide 5: Centrais de Alarme & Sensores
│   │   ├── carrossel 6.jpg         # Slide 6: Motores de Portões de Alta Velocidade
│   │   ├── carrossel 7.jpeg        # Slide 7: Controle de Acesso & Biometria
│   │   ├── pabx1.png               # Imagem Centrais PABX
│   │   ├── alarme1.png             # Imagem Centrais de Alarme
│   │   ├── cameras1.png            # Imagem Equipamentos CFTV
│   │   ├── portaria1.png           # Imagem Porteiros Eletrônicos
│   │   ├── portoes1.png            # Imagem Motores de Portões
│   │   └── controle-acesso.png     # Imagem Controle de Acesso
│   ├── index.html                  # Página principal (Home)
│   ├── produtos.html               # Página dedicada: Centrais PABX
│   ├── alarme.html                 # Página dedicada: Centrais de Alarme
│   ├── cameras.html                # Página dedicada: Equipamentos CFTV
│   ├── porteiro.html               # Página dedicada: Porteiros Eletrônicos
│   ├── portao.html                 # Página dedicada: Motores de Portões
│   ├── controle.html               # Página dedicada: Controle de Acesso
│   ├── script.js                   # Lógica JavaScript (carrossel, scroll, menu, formulário)
│   ├── processar_formulario.py     # Script Python para recepção de mensagens
│   ├── mensagens.txt               # Registro das mensagens recebidas pelo formulário
│   └── server.js                   # Servidor de desenvolvimento local nativo
├── index.html                      # Ponto de entrada raiz com redirecionamento
├── package.json                    # Metadados e scripts de inicialização
├── server.js                       # Servidor local da raiz
└── README.md                       # Documentação completa do projeto
```

---

## 💻 Como Rodar em Localhost

Você pode rodar o projeto localmente com qualquer uma das opções abaixo:

### Método 1: Servidor Integrado Node.js (Recomendado)
Como o Node.js já está instalado na máquina, criamos um servidor nativo com busca automática de portas livres (começando pela porta **3000** e alternando para **8080**, **5500**, etc., caso alguma porta esteja ocupada):

1. Abra o terminal na pasta do projeto:
   ```bash
   cd c:\Users\jhonata.jardim\Documents\GTEC
   ```
2. Execute o comando:
   ```bash
   node server.js
   ```
   *(ou alternativamente: `npm start`)*
3. Acesse o endereço exibido no terminal (por padrão: 👉 **`http://localhost:3000`**).

---

### Método 2: Extensão Live Server (VS Code)
Se estiver utilizando o Visual Studio Code:
1. Instale a extensão **Live Server** (de *Ritwick Dey*).
2. Abra a pasta do projeto no VS Code.
3. Clique com o botão direito sobre o arquivo `GTEC/index.html` e selecione **"Open with Live Server"**.
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500/GTEC/index.html`.

---

### Método 3: Servidor HTTP do Python
Se preferir utilizar o Python, utilize a porta **3000** ou **8080** (para evitar conflitos com a porta 8000 que pode estar em uso no Windows):
1. No terminal, acesse o diretório do site:
   ```bash
   cd c:\Users\jhonata.jardim\Documents\GTEC\GTEC
   ```
2. Inicie o servidor embutido do Python na porta 3000:
   ```bash
   python -m http.server 3000
   ```
3. Acesse no navegador:
   👉 **`http://localhost:3000`**

---

### Método 4: NPX Serve
Caso queira rodar via npx:
```bash
npx serve GTEC
```
O terminal exibirá a URL local (normalmente `http://localhost:3000`).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica, acessibilidade e SEO técnico.
- **CSS3 Moderno**: Custom Properties, Flexbox, CSS Grid, Glassmorphism, Micro-interações.
- **JavaScript (ES6+)**: Slider/Carrossel dinâmico, Scrollspy, Mobile Drawer, Validação assíncrona.
- **Python 3 & Node.js**: Backend de processamento e persistência de formulários.
- **FontAwesome 6**: Ícones vetoriais de alta fidelidade.
- **Google Fonts (Montserrat)**: Tipografia moderna e legível.

---

## 👥 Equipe de Desenvolvimento

Projeto concebido e desenvolvido com dedicação por:
- **Vinicius**
- **Jhonata**
- **Joyce**
- **Julia**
- **Mario**
- **Eduardo**

---
*GTEC Barretos &copy; 2026. Todos os direitos reservados.*

