import { Request, Response } from "express";
import { CreateUserUseCase} from "./createUserUseCase";

class CreateUserController{
  async handle(req: Request, res: Response) {
    const { name, password, username } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      username,
      name,
      password
    });

    return res.json(user);
  }
}

export { CreateUserController };