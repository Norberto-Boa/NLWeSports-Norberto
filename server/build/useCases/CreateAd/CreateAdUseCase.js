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
exports.CreateAdUseCase = void 0;
const client_1 = require("../../prisma/client");
const convert_hour_string_to_minute_1 = require("../../utils/convert-hour-string-to-minute");
class CreateAdUseCase {
    execute({ gameId, name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel }) {
        return __awaiter(this, void 0, void 0, function* () {
            const ad = yield client_1.client.ad.create({
                data: {
                    gameId: gameId,
                    name: name,
                    yearsPlaying: yearsPlaying,
                    discord: discord,
                    weekDays: weekDays.join(','),
                    hourStart: (0, convert_hour_string_to_minute_1.convertHourToMinutes)(hourStart),
                    hourEnd: (0, convert_hour_string_to_minute_1.convertHourToMinutes)(hourEnd),
                    useVoiceChannel: useVoiceChannel,
                }
            });
            return ad;
        });
    }
}
exports.CreateAdUseCase = CreateAdUseCase;
