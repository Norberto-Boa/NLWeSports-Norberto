import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";

interface IRequest {
  username: string,
  password: string,
}

class authenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    //Check if User exists

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });

    if (!userAlreadyExists) {
      throw new Error("Credetianls are wrong");
    }

    if (!userAlreadyExists.isUserOn) {
      throw new Error("The user is not active yet!");
    }

    // Check password 
    const passwordMatch = await compare(password, userAlreadyExists.password);
    
    if (!passwordMatch) {
      throw new Error("Credetianls are wrong");
    }

    const name = userAlreadyExists.name
    
    //generate a token for the user
    const token = sign({ username, name }, "Mena", {
      subject: userAlreadyExists.id,
      expiresIn: 31556926
    })

    return { token };

  }
}

export { authenticateUserUseCase };