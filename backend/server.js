const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

const app = express();

const db = new sqlite3.Database('./data/progress.db', (err) => {
  if (err) {
    console.error('Ошибка подключения к БД:', err);
  } else {
    console.log('Подключение к БД успешно');
    db.run(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL,
        level INTEGER NOT NULL
      )
    `);
  }
});

app.use(bodyParser.json());
app.use(cors());

function isValidTelegramAuth(token, initData) {
  try {
    const parsedData = Object.fromEntries(new URLSearchParams(initData));
    if (!parsedData.hash) {
      return false;
    }

    const receivedHash = parsedData.hash;
    delete parsedData.hash;

    const dataCheckString = Object.keys(parsedData)
      .sort()
      .map((key) => `${key}=${parsedData[key]}`)
      .join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(token)
      .digest();

    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return calculatedHash === receivedHash;
  } catch (error) {
    console.error('Ошибка при разборе initData: ', error);
    return false;
  }
}

async function isUserSubscribed(userId, channelId, botToken) {
  try {
    const url = `https://api.telegram.org/bot${botToken}/getChatMember`;
    const response = await axios.get(url, {
      params: {
        chat_id: channelId,
        user_id: userId,
      },
    });

    const status = response.data.result.status;
    return ['member', 'administrator', 'creator'].includes(status);
  } catch (error) {
    console.error('Ошибка при проверке подписки: ', error);
    return false;
  }
}

app.get('/get-progress/:userId', (req, res) => {
  const { userId } = req.params;
  db.get('SELECT level FROM user_progress WHERE user_id = ?', [userId], (err, row) => {
    if (err) {
      console.error('Ошибка при получении прогресса:', err);
      res.status(500).send({ message: 'Ошибка сервера' });
    } else if (row) {
      res.status(200).send({ level: row.level });
    } else {
      res.status(404).send({ message: 'Прогресс не найден' });
    }
  });
});

app.post('/save-progress', (req, res) => {
  const { userData, level } = req.body;
  try {
    const parsedData = Object.fromEntries(new URLSearchParams(userData));
    const userId = JSON.parse(parsedData.user).id;

    const query = `
      INSERT INTO user_progress (user_id, level)
      VALUES (?, ?)
      ON CONFLICT(user_id) DO UPDATE SET level = excluded.level;
    `;

    db.run(query, [userId, level], function (err) {
      if (err) {
        console.error('Ошибка при сохранении прогресса:', err);
        res.status(500).send({ message: 'Ошибка сервера' });
      } else {
        res.status(200).send({ success: true });
      }
    });
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    res.status(400).send({ message: 'Некорректные данные' });
  }
});

app.post('/check-subscription', async (req, res) => {
  const { userData } = req.body;
  let subscribed = isValidTelegramAuth(TELEGRAM_BOT_TOKEN, userData);

  if (subscribed) {
    let parsedData = Object.fromEntries(new URLSearchParams(userData));
    let user_id = JSON.parse(parsedData.user).id;
    subscribed = await isUserSubscribed(user_id, CHANNEL_ID, TELEGRAM_BOT_TOKEN);
  }

  res.status(200).send({ subscribed });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер работает на порту: ${PORT}`));
