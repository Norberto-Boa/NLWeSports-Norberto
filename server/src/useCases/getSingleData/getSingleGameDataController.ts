import { Request, Response } from "express";
import { client } from "../../prisma/client";

class GetSingleGameDataController {
  async handle(req: Request, res: Response) {
    const gameId = req.params.id;

    const game = await client.game.findFirst({
      where: {
        id: gameId
      }
    })
    return res.status(200).json(game)
  }
}

export { GetSingleGameDataController };