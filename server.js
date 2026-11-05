/**
 * GTEC - Barretos | Servidor de Desenvolvimento Local (Zero Dependências)
 * Suporta arquivos estáticos (HTML, CSS, JS, Imagens, Fontes) e gravação do formulário em mensagens.txt
 * 
 * Como executar:
 *   node server.js
 * 
 * Acesse em:
 *   http://localhost:8000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;

// Determina o diretório base correto (se executado na raiz ou dentro de GTEC/)
let baseDir = __dirname;
if (fs.existsSync(path.join(baseDir, 'GTEC', 'index.html'))) {
    baseDir = path.join(baseDir, 'GTEC');
}

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Endpoint do formulário de contato (POST)
    if ((pathname === '/processar_formulario.py' || pathname === '/api/contato') && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const nome = params.get('nome') || 'Não informado';
            const email = params.get('email') || 'Não informado';
            const telefone = params.get('telefone') || 'Não informado';
            const servico = params.get('servico') || 'Geral';
            const mensagem = params.get('mensagem') || '';

            const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
            const logEntry = `============================================================\n` +
                             `Data/Hora : ${now}\n` +
                             `Nome      : ${nome}\n` +
                             `E-mail    : ${email}\n` +
                             `Telefone  : ${telefone}\n` +
                             `Serviço   : ${servico}\n` +
                             `Mensagem  :\n${mensagem}\n\n`;

            const txtPath = path.join(baseDir, 'mensagens.txt');
            try {
                fs.appendFileSync(txtPath, logEntry, 'utf8');
            } catch (err) {
                console.error('Erro ao gravar mensagem:', err);
            }

            // Se for requisição AJAX/fetch, responde JSON; se for form post convencional, renderiza confirmação
            const isJson = req.headers['accept'] && req.headers['accept'].includes('application/json');
            if (isJson) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
                res.end(JSON.stringify({ success: true, message: 'Mensagem recebida com sucesso!' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                res.end(`<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Mensagem Enviada! - GTEC Barretos</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #f1f5f9; padding: 20px;">
    <div style="max-width: 500px; width: 100%; background: #fff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); text-align: center; border-top: 5px solid #2090CE;">
        <div style="font-size: 3.5rem; color: #10b981; margin-bottom: 16px;">
            <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2 style="font-size: 1.8rem; color: #1e293b; margin-bottom: 12px;">Mensagem Recebida com Sucesso!</h2>
        <p style="color: #64748b; font-size: 1rem; line-height: 1.6; margin-bottom: 28px;">
            Obrigado pelo contato, <strong>${nome}</strong>! Nossa equipe responderá sua solicitação em breve.
        </p>
        <a href="index.html" class="btn meu-botao" style="display: inline-flex; width: auto; padding: 12px 28px; margin: 0 auto;">
            <i class="fa-solid fa-arrow-left"></i> Voltar ao Site
        </a>
    </div>
</body>
</html>`);
            }
        });
        return;
    }

    // Servir arquivos estáticos
    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }

    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(baseDir, safePath);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(`<h1>404 - Página não encontrada</h1><p><a href="/">Voltar ao início</a></p>`);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

const PORTS_TO_TRY = [3000, 8080, 5500, 8081, 5000, 8000, 0];
let currentPortIndex = 0;

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
        const failedPort = PORTS_TO_TRY[currentPortIndex];
        currentPortIndex++;
        if (currentPortIndex < PORTS_TO_TRY.length) {
            const nextPort = PORTS_TO_TRY[currentPortIndex];
            console.log(`⚠️  Porta ${failedPort} em uso ou restrita pelo Windows. Tentando porta ${nextPort === 0 ? 'dinâmica' : nextPort}...`);
            startServer(nextPort);
        } else {
            console.error('❌ Não foi possível encontrar uma porta livre.', err);
        }
    } else {
        console.error('❌ Erro no servidor:', err);
    }
});

server.on('listening', () => {
    const addr = server.address();
    const actualPort = typeof addr === 'string' ? addr : addr.port;
    console.log(`\n============================================================`);
    console.log(`  GTEC Barretos - Servidor Local Iniciado com Sucesso!`);
    console.log(`============================================================`);
    console.log(`  Acesse no seu navegador:`);
    console.log(`  👉 http://localhost:${actualPort}`);
    console.log(`  Diretório servido: ${baseDir}`);
    console.log(`  Pressione Ctrl + C para encerrar o servidor.`);
    console.log(`============================================================\n`);
});

function startServer(port) {
    server.listen(port);
}

// Inicia na porta definida no ambiente ou na primeira da lista (3000)
const initialPort = process.env.PORT ? parseInt(process.env.PORT, 10) : PORTS_TO_TRY[0];
startServer(initialPort);

