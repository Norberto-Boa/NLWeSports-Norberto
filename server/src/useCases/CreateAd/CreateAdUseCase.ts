import { client } from "../../prisma/client"
import { convertHourToMinutes } from "../../utils/convert-hour-string-to-minute"


interface IAdRequest {
  gameId: string,
  name: string,
  yearsPlaying: number,
  discord: string
  weekDays: [],
  hourStart: string,
  hourEnd: string,
  useVoiceChannel: boolean,
}

class CreateAdUseCase {
  async execute({
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel
  }: IAdRequest) {
    const ad = await client.ad.create({
      data: {
        gameId: gameId,
        name: name,
        yearsPlaying: yearsPlaying,
        discord: discord,
        weekDays: weekDays.join(','),
        hourStart: convertHourToMinutes(hourStart),
        hourEnd: convertHourToMinutes(hourEnd),
        useVoiceChannel: useVoiceChannel,
      }
    })

    return ad;
  }
}

export { CreateAdUseCase };
