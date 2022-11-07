import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors";

export function ensureAuthentication (req: Request, res: Response, next: NextFunction) {
    
    const authToken = req.headers.authorization;

    if(!authToken) {
        throw new UnauthorizedError("Unauthorized")
    }

    verify(authToken, process.env.PRIVATE_KEY)

    return next()
}