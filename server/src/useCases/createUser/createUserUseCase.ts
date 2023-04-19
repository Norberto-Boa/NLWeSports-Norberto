import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';

interface IUserRequest{
  name: string,
  password: string,
  username: string,
  email: string
}

class CreateUserUseCase{

  async execute({name, username, password, email } : IUserRequest) {
    
    //Check if User already exists
    const usernameAlreadyExists = await client.user.findFirst({
      where: {
        username: username,
      }
    })

    const emailAlreadyExists = await client.user.findFirst({
      where: {
        email
      }
    });
    

    if (usernameAlreadyExists || emailAlreadyExists) {
      const error = Error("User already exists!")
      throw error;
    }

    // Cadastra o usuario
    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
        email,
        isUserOn: true
      }
    });

    return user;
  }
}

export { CreateUserUseCase };