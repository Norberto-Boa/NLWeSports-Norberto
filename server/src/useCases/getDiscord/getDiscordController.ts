import { Request, Response } from "express";
import { getDiscordUseCase } from "./getDiscordUseCase";

class getDiscordController{
  async handle(req: Request, res: Response) {
    const adId = req.params.id

    const GetDiscordUseCase = new getDiscordUseCase()

    const discord = await GetDiscordUseCase.execute({
      adId
    })

    return res.json({
      discord: discord.discord
    })
  }
}

export { getDiscordController };  