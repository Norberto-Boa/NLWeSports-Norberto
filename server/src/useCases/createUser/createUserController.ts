import { Request, Response } from "express";
import { CreateUserUseCase} from "./createUserUseCase";
import { z } from "zod";

class CreateUserController{
  async handle(req: Request, res: Response) {
    const createUserBody = z.object({
      name: z.string(),
      username: z.string(),
      password: z.string()
        .min(8, { message: "Must be at least 8 characters" })
        .max(20, { message: "Must be at most 20 characters" }),
      email: z.string()
        .email({ message:"Invalid email address"})
    })

    //Unstructure the data
    const { name, username, password, email } = createUserBody.parse(req.body);

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      username,
      name,
      password, 
      email
    });

    return res.json(user);
  }
}

export { CreateUserController };