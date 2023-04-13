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
exports.CreateUserUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("../../prisma/client");
class CreateUserUseCase {
    execute({ name, username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if User already exists
            const userAlreadyExists = yield client_1.client.user.findFirst({
                where: {
                    username: username,
                }
            });
            if (userAlreadyExists) {
                const error = Error("User already exists!");
                throw error;
            }
            // Cadastra o usuario
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield client_1.client.user.create({
                data: {
                    name,
                    username,
                    password: passwordHash,
                }
            });
            return user;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
