import { client } from "../../prisma/client";

interface IAdRequest{
  adId: string
}


class getDiscordUseCase {
  async execute({adId}: IAdRequest) {
    const discord = await client.ad.findUniqueOrThrow({
      where: {
        id: adId
      },
      select: {
        discord: true
      }
    });

    return discord
  }
}

export { getDiscordUseCase };