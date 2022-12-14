import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./authenticateUser/authenticateUserController";
import { CreateUserController } from "./createUser/createUserController";
import cors from 'cors';
import { GetGamesController } from "./getAllGames/getAllGamesController";
import { GetSingleGameController } from "./getSingleGame/getSingleGameController";
import { CreateAdController } from "./CreateAd/CreateAdController";
import { getDiscordController } from "./getDiscord/getDiscordController";
import { GetSingleGameDataController } from "./getSingleData/getSingleGameDataController";

const corsOptions = {
  origin: 'http://localhost:3000',
}

const router = Router();

const createUser = new CreateUserController();
const AuthenticateUser = new AuthenticateUserController();
const getGames = new GetGamesController();
const getSingleGame = new GetSingleGameController();
const createAd = new CreateAdController();
const getDiscord = new getDiscordController();
const getSingleGameData = new GetSingleGameDataController();

router.post('/register', createUser.handle);

router.post('/auth', cors(corsOptions), AuthenticateUser.handle);

router.get('/games', getGames.handle);

router.get('/games/:id/ads', getSingleGame.handle);

router.post('/games/:id/ads', ensureAuthenticated, createAd.handle);

router.get('/ads/:id/discord', ensureAuthenticated, getDiscord.handle);

router.get('/game/:id', ensureAuthenticated, getSingleGameData.handle)

export { router };