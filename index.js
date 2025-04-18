const http = require('http');
const url = require('url');
const querystring = require('querystring');
const https = require('https');

const CHAT_ID_GROUP = "-4632010105"; // Ваш chat_id группы
const TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // Ваш токен бота

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';

        // Получаем данные из запроса
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const message = JSON.parse(body).message;

            if (message && message.chat && message.message_id) {
                const chatId = message.chat.id;
                const text = message.text || "";
                const messageId = message.message_id;

                // Проверяем, является ли текст командой
                if (text.startsWith("/")) {
                    sendMessage(chatId, "ℹ️ Сообщения-команды не пересылаются.", res);
                    return;
                }

                // Пересылаем сообщение в группу
                forwardMessage(chatId, messageId, CHAT_ID_GROUP, res);
            } else {
                res.writeHead(200);
                res.end();
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

const forwardMessage = (fromChatId, messageId, targetChatId, res) => {
    const payload = JSON.stringify({
        chat_id: targetChatId,
        from_chat_id: fromChatId,
        message_id: messageId
    });

    const options = {
        hostname: 'api.telegram.org',
        path: `/bot${TOKEN}/forwardMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    const req = https.request(options, response => {
        if (response.statusCode === 200) {
            sendMessage(fromChatId, "✅ Ваше сообщение переслано!", res);
        } else {
            sendMessage(fromChatId, "❌ Не удалось переслать сообщение.", res);
        }
    });

    req.on('error', error => {
        console.error('Ошибка:', error);
        sendMessage(fromChatId, "❌ Произошла ошибка.", res);
    });

    req.write(payload);
    req.end();
};

const sendMessage = (chatId, text, res) => {
    const payload = JSON.stringify({
        chat_id: chatId,
        text: text
    });

    const options = {
        hostname: 'api.telegram.org',
        path: `/bot${TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    const req = https.request(options, response => {
        res.writeHead(200);
        res.end();
    });

    req.on('error', error => {
        console.error('Ошибка:', error);
    });

    req.write(payload);
    req.end();
};

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
