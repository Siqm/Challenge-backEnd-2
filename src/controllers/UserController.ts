import { Request, Response } from "express";
import { User } from "../models/UserModel";

export class UserController {

    static async create(req: Request, res: Response) {

        const { name, email, password } = req.body;

        const user = await User.execute({name, email, password})

        return res.json(user)
    }
}

