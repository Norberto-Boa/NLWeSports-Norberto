import { Request, Response } from "express";
import { client } from "../../prisma/client";


class GetGamesController {
  async handle(req: Request, res: Response) {
    const games = await client.game.findMany({
      include: {
        _count: {
          select: {
            ads: true
          }
        }
      }
    })

    return res.status(200).json(games);
  }
}

export { GetGamesController };