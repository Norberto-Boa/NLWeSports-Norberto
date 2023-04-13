"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../middleware/ensureAuthenticated");
const authenticateUserController_1 = require("./authenticateUser/authenticateUserController");
const createUserController_1 = require("./createUser/createUserController");
const cors_1 = __importDefault(require("cors"));
const getAllGamesController_1 = require("./getAllGames/getAllGamesController");
const getSingleGameController_1 = require("./getSingleGame/getSingleGameController");
const CreateAdController_1 = require("./CreateAd/CreateAdController");
const getDiscordController_1 = require("./getDiscord/getDiscordController");
const getSingleGameDataController_1 = require("./getSingleData/getSingleGameDataController");
const corsOptions = {
    origin: 'http://localhost:3000',
};
const router = (0, express_1.Router)();
exports.router = router;
const createUser = new createUserController_1.CreateUserController();
const AuthenticateUser = new authenticateUserController_1.AuthenticateUserController();
const getGames = new getAllGamesController_1.GetGamesController();
const getSingleGame = new getSingleGameController_1.GetSingleGameController();
const createAd = new CreateAdController_1.CreateAdController();
const getDiscord = new getDiscordController_1.getDiscordController();
const getSingleGameData = new getSingleGameDataController_1.GetSingleGameDataController();
router.post('/register', createUser.handle);
router.post('/auth', (0, cors_1.default)(corsOptions), AuthenticateUser.handle);
router.get('/games', getGames.handle);
router.get('/games/:id/ads', getSingleGame.handle);
router.post('/games/:id/ads', ensureAuthenticated_1.ensureAuthenticated, createAd.handle);
router.get('/ads/:id/discord', ensureAuthenticated_1.ensureAuthenticated, getDiscord.handle);
router.get('/game/:id', ensureAuthenticated_1.ensureAuthenticated, getSingleGameData.handle);
