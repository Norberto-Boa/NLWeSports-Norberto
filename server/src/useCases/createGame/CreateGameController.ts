import { z } from "zod";
import { CreateGameUseCase } from "./CreateGameUseCase";
import { Request, Response } from "express";

class CreateGameController{
  async handle(req: Request, res: Response) {
    const twitchLink = "https://static-cdn.jtvnw.net/ttv-boxart/"

    const createGameBody = z.object({
      title: z.string(),
      bannerUrl: z.string().url({message: "The url is not an url"}).includes(twitchLink, {message: "This url is not allowed in our site!"})
    })

    // title and banner
    const { title, bannerUrl } = createGameBody.parse(req.body);

    const createNewGame = new CreateGameUseCase();

    const game = await createNewGame.execute({
      title,
      bannerUrl
    })

    return res.status(200).json(game);
  }
}

export { CreateGameController };