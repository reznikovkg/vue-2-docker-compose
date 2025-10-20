import express from "express";
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";
import cors from "cors";
import { isValid, parse } from "@telegram-apps/init-data-node";

const BOT_TOKEN = '7214812115:AAG3SKiB1G4CZP1AkXrJkZyOWqlMd9_JXUY';
const bot = new TelegramBot(BOT_TOKEN, {
  polling: true,
});
const app = express();
const TELEGRAM_CHANNEL_ID = -1002329123996;


import UserRepository from "./repositories/UserRepository.js";
import connection from "./database/DbConnection.js";

app.use(bodyParser.json());
app.use(cors());

app.get("/get-leaders/:userId", async (req, response) => {
  const userRepository = new UserRepository(connection);
  const userId = req.params.userId;
  const users = await userRepository.getLeadersWithUser(userId);
  return response.send(JSON.stringify(users));
});

app.post("/check-if-user-authenticated", async (req, response) => {
  const { initData } = req.body;
  if (!isValid(initData, BOT_TOKEN)) {
    return response.send({ isUserAuthenticated: false });
  }
  const parsedUserInfo = parse(initData);
  const userId = parsedUserInfo.user.id;
  const username = parsedUserInfo.user.username;
  const userRepository = new UserRepository(connection);
  const existingUser = await userRepository.getUserById(userId);
  if (existingUser == undefined) userRepository.addUser(userId, username);
  return response.status(200).send({ isUserAuthenticated: true });
});

app.get("/check-subscription/:userId", async (req, res) => {
  try {
    const user = await bot.getChatMember(TELEGRAM_CHANNEL_ID, req.params.userId);

    if (user.status == "left" || user.status == "kicked") {
      return res.status(400).send({ isUserSubscribed: false });
    }
  } catch (error) {
    console.log("Error when checking user subscription " + error.message);
    return res.status(400).send({ isUserSubscribed: false });
  }

  return res.status(200).send({ isUserSubscribed: true });
});

app.patch("/updateUserScore", async (req, response) => {
  const { userId } = req.body;
  const userRepository = new UserRepository(connection);
  const existingUser = await userRepository.getUserById(userId);
  if (existingUser == undefined) {
    console.log("Cannot update user score of non existed user");
    return response.status(400).send();
  }

  await userRepository.updateUserScore(userId);
  return response.status(200).send();
});

app.listen(9992, "0.0.0.0", () => {});
