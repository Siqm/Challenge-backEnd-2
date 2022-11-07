import { client } from "../prisma/client"
import { User } from "../models/UserModel"
import { BadRequestError } from "./api-errors"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


export class AuthenticateUser {
    static async execute (password, email) {

        const userAlreadyExists = await User.findByEmail(email)

        if(!userAlreadyExists) {
            throw new BadRequestError('Email or password incorrect!');
        }

        const passwordMatch = await compare(password, userAlreadyExists.password)

        if(!passwordMatch) {
            throw new BadRequestError('Email or password incorrect!')
        }
        
        const token = sign({}, process.env.PRIVATE_KEY, {
            subject: userAlreadyExists.id,
            expiresIn: "20s"
        })

        return { token };
    }
}