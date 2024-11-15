const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const db = require('./config/db');

const app = express();
const token = '7651957046:AAG7R1CgbVX1xR-iTfdUPXRdtZxlHx8GL88'; // Замените на ваш токен
const bot = new TelegramBot(token, { polling: true });

app.use(bodyParser.json());

// Обработка команды /start
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const { first_name, last_name, username } = msg.from;

    // Проверка, существует ли пользователь
    const sqlCheck = 'SELECT * FROM users WHERE user_id = ?';
    db.query(sqlCheck, [msg.from.id], (err, results) => {
        if (err) {
            bot.sendMessage(chatId, 'Ошибка при проверке пользователя.');
            return;
        }

        if (results.length === 0) {
            // Добавление нового пользователя
            const sqlInsert = 'INSERT INTO users (user_id, username, first_name, last_name, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
            db.query(sqlInsert, [msg.from.id, username, first_name, last_name, 'user'], (err) => {
                if (err) {
                    bot.sendMessage(chatId, 'Ошибка при регистрации пользователя.');
                } else {
                    bot.sendMessage(chatId, 'Вы успешно зарегистрированы!');
                }
            });
        } else {
            bot.sendMessage(chatId, 'Вы уже зарегистрированы!');
        }
    });
});

// Обработка команды /catalog
bot.onText(/\/catalog/, async (msg) => {
    const chatId = msg.chat.id;

    const sql = 'SELECT * FROM menus'; // Обновите запрос в зависимости от вашей схемы
    db.query(sql, (err, results) => {
        if (err) {
            bot.sendMessage(chatId, 'Ошибка при загрузке каталога.');
            return;
        }

        if (results.length === 0) {
            bot.sendMessage(chatId, 'Каталог пуст.');
            return;
        }

        let response = 'Каталог товаров:\n';
        results.forEach((product) => {
            response += `${product.item_name} - ${product.price}₽\n`;
        });

        bot.sendMessage(chatId, response);
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





// const TelegramBot = require('node-telegram-bot-api');
// const express = require('express');
// const cors = require('cors');

// const token = '7651957046:AAG7R1CgbVX1xR-iTfdUPXRdtZxlHx8GL88';
// const webAppUrl = 'https://effortless-blancmange-d0fc57.netlify.app';

// const bot = new TelegramBot(token, {polling: true});
// const app = express();


// app.use(express.json());
// app.use(cors());

// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;

//     if(text === '/start') {
//         await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
//             reply_markup: {
//                 keyboard: [
//                     [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
//                 ]
//             }
//         })

//         await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
//             reply_markup: {
//                 inline_keyboard: [
//                     [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
//                 ]
//             }
//         })
//     }

//     if(msg?.web_app_data?.data) {
//         try {
//             const data = JSON.parse(msg?.web_app_data?.data)
//             console.log(data)
//             await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
//             await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
//             await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

//             setTimeout(async () => {
//                 await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
//             }, 3000)
//         } catch (e) {
//             console.log(e);
//         }
//     }
// });

// app.post('/web-data', async (req, res) => {
//     const {queryId, products = [], totalPrice} = req.body;
//     try {
//         await bot.answerWebAppQuery(queryId, {
//             type: 'article',
//             id: queryId,
//             title: 'Успешная покупка',
//             input_message_content: {
//                 message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
//             }
//         })
//         return res.status(200).json({});
//     } catch (e) {
//         return res.status(500).json({})
//     }
// })

// const PORT = 8000;

// app.listen(PORT, () => console.log('server started on PORT ' + PORT))