import { Request, Response } from "express";
import {  authenticateUserUseCase } from "./authenticateUserUseCase";


class AuthenticateUserController{
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const AuthenticateUserUseCase = new authenticateUserUseCase();

    const token = await AuthenticateUserUseCase.execute({
      username, 
      password
    })

    return res.json(token);
  }
}

export { AuthenticateUserController };