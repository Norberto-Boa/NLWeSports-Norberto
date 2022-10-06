import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";

interface IRequest {
  username: string,
  password: string
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

    // Check password 
    const passwordMatch = await compare(password, userAlreadyExists.password);
    
    if (!passwordMatch) {
      throw new Error("Credetianls are wrong");
    }

    //generate a token for the user
    const token = sign({ username }, "Mena", {
      subject: userAlreadyExists.id,
      expiresIn: "120s"
    })

    return { token };

  }
}

export { authenticateUserUseCase };