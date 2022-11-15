import { Request, Response } from "express";
import { AuthenticateUser } from "../helpers/AuthenticateUser";

export class AuthenticateUserController {
    static async refreshToken (request: Request, response: Response) {
        
        const { email, password } = request.body

        const token = await AuthenticateUser.execute(password, email)

        return response.json(token)
    }
}
