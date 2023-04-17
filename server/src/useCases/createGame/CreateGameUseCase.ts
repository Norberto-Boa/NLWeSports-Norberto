import { client } from "../../prisma/client";

interface ICreateGameRequest{
  title: string;
  bannerUrl: string;
}

class CreateGameUseCase{
  async execute({ title, bannerUrl }: ICreateGameRequest) {
    const game = await client.game.create({
      data: {
        title,
        bannerUrl
      }
    })

    return game;
  }
}

export { CreateGameUseCase };