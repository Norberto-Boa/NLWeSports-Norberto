import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


interface IUserRequest{
  name: string,
  password: string,
  username: string,
  email: string
}

class CreateUserUseCase{

  async execute({name, username, password, email } : IUserRequest) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    })
    
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
        email
      }
    });

    const token = jwt.sign({
      data: user
    }, "Mena", { expiresIn: '30m' });

    const mailConfigurations = {
      from: "anytechsols@gmail.com",
      to: user.email,
      subject: "Email Verification from NLWeSports",
      text: `Hi! You tried to register on our platform. To finish your registration,
            Access the following link: http://localhost:4444/verify/${token}
            Thanks for registering!`,
    };

    transporter.sendMail(mailConfigurations, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
      console.log("Email sent successfully");
      console.log(info);
    });
    
    return user;
  }
}

export { CreateUserUseCase };