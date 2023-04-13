"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSingleGameController = void 0;
const client_1 = require("../../prisma/client");
const convert_minutes_to_hours_1 = require("../../utils/convert-minutes-to-hours");
class GetSingleGameController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameId = req.params.id;
            const game = yield client_1.client.game.findFirst({
                where: {
                    id: gameId
                }
            });
            const ads = yield client_1.client.ad.findMany({
                select: {
                    id: true,
                    name: true,
                    weekDays: true,
                    useVoiceChannel: true,
                    yearsPlaying: true,
                    hourStart: true,
                    hourEnd: true,
                    discord: true
                },
                where: {
                    gameId: gameId
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return (res.status(200).json(ads.map(ad => {
                return Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(','), hourStart: (0, convert_minutes_to_hours_1.convertMinuteToHours)(ad.hourStart), hourEnd: (0, convert_minutes_to_hours_1.convertMinuteToHours)(ad.hourEnd) });
            })));
        });
    }
}
exports.GetSingleGameController = GetSingleGameController;
