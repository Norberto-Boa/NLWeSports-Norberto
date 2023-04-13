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
exports.CreateAdController = void 0;
const CreateAdUseCase_1 = require("./CreateAdUseCase");
class CreateAdController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameId = req.params.id;
            const { name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel } = req.body;
            const createAdUseCase = new CreateAdUseCase_1.CreateAdUseCase();
            const ad = yield createAdUseCase.execute({
                gameId,
                name,
                yearsPlaying,
                discord,
                hourStart,
                weekDays,
                hourEnd,
                useVoiceChannel
            });
            return res.status(200).json(ad);
        });
    }
}
exports.CreateAdController = CreateAdController;
