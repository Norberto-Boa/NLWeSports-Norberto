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
exports.GetSingleGameDataController = void 0;
const client_1 = require("../../prisma/client");
class GetSingleGameDataController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameId = req.params.id;
            const game = yield client_1.client.game.findFirst({
                where: {
                    id: gameId
                }
            });
            return res.status(200).json(game);
        });
    }
}
exports.GetSingleGameDataController = GetSingleGameDataController;
