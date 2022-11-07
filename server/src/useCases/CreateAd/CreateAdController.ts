import { Request, Response } from "express";
import { CreateAdUseCase } from "./CreateAdUseCase";

interface IAdBody{
  name: string,
  yearsPlaying: number,
  discord: string
  weekDays: [],
  hourStart: string,
  hourEnd: string,
  useVoiceChannel: boolean,
}

class CreateAdController{
  async handle(req: Request, res: Response) {
    const gameId = req.params.id;
    const { name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel }: IAdBody = req.body;

    const createAdUseCase = new CreateAdUseCase();

    const ad = await createAdUseCase.execute({
      gameId,
      name,
      yearsPlaying,
      discord,
      hourStart,
      weekDays,
      hourEnd,
      useVoiceChannel
    });

    return res.status(200).json(ad);

  }
}

export { CreateAdController };