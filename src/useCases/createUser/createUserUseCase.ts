import { hash } from 'bcryptjs';

import { client } from '../../prisma/client';


interface IUserRequest{
  name: string,
  password: string,
  username: string
}

class CreateUserUseCase{

  async execute({name, username, password } : IUserRequest) {
    //Check if User already exists
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if (userAlreadyExists) {
      throw Error("User already exists!");
    }

    // Cadastra o usuario
    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        username,
        password : passwordHash,
      }
    })

    return user;
  }
}

export { CreateUserUseCase };