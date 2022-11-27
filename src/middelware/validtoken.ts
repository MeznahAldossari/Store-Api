import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";

dotenv.config();
const { TOKENSECRET } = process.env;

export const validate_token = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const header = request.headers.authorization;
    if (header) {
      const token_value = header.split(" ")[1];
      const check_decode = jwt.verify(token_value, TOKENSECRET as string);
      if (check_decode) {
        next();
      } else {
        response.status(401).send("invalid decoded");
      }
    } else {
      response.status(401).send("There is no token that recived");
    }
  } catch (error) {
    response.status(401).send("error in validate token method");
  }
};
