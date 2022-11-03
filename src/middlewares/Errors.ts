import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (
    error: Error & Partial<ApiError> & Prisma.PrismaClientKnownRequestError, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message: 'Internal Server Error'
    return res.status(statusCode).json({ message, error })
}