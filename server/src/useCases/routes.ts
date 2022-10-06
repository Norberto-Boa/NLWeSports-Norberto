import { Router } from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./authenticateUser/authenticateUserController";
import { CreateUserController } from "./createUser/createUserController";

const router = Router();

const createUser = new CreateUserController()
const AuthenticateUser = new AuthenticateUserController()

router.post('/register', createUser.handle);

router.post('/auth', AuthenticateUser.handle);

router.get('/courses',ensureAuthenticated, (req, res) => {
  return res.json([
    {id: 1, name: "Bitches"},
    {id: 1, name: "Bitches"},
    {id: 1, name: "Bitches"},
    {id: 1, name: "Bitches"},
  ])
})

export { router };