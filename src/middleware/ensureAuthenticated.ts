import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      message: "Token Missing"
    });
  }

  const [, token] = authToken.split(" ");
  
  try {
    verify(token, "Mena");
    
    return next();

  } catch (error) {
    return res.status(401).json({
      message: "Token invalid"
    });
  }




}