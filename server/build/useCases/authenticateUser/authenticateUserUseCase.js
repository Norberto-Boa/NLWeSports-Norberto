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
exports.authenticateUserUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("../../prisma/client");
class authenticateUserUseCase {
    execute({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if User exists
            const userAlreadyExists = yield client_1.client.user.findFirst({
                where: {
                    username
                }
            });
            if (!userAlreadyExists) {
                throw new Error("Credetianls are wrong");
            }
            // Check password 
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, userAlreadyExists.password);
            if (!passwordMatch) {
                throw new Error("Credetianls are wrong");
            }
            const name = userAlreadyExists.name;
            //generate a token for the user
            const token = (0, jsonwebtoken_1.sign)({ username, name }, "Mena", {
                subject: userAlreadyExists.id,
                expiresIn: 31556926
            });
            return { token };
        });
    }
}
exports.authenticateUserUseCase = authenticateUserUseCase;
