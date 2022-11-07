import { Request, Response } from "express";
import { client } from "../../prisma/client";
import { convertMinuteToHours } from '../../utils/convert-minutes-to-hours';


class GetSingleGameController {
  async handle(req: Request, res: Response) {
    const gameId = req.params.id;

    const ads = await client.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId: gameId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json(ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinuteToHours(ad.hourStart),
        hourEnd: convertMinuteToHours(ad.hourEnd)
      }
    }));
  }
}

export { GetSingleGameController };