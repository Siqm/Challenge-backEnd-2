import { hash } from "bcryptjs";
import { AlreadyExistsError, BadRequestError } from "../helpers/api-errors";
import { client } from "../prisma/client";

interface IUserRequest {
    name: string;
    password: string;
    email: string;
}

class User {
    static async execute ({ name, email, password}: IUserRequest) {

        const userAlreadyExists = await this.findByEmail(email)

        if (userAlreadyExists) {
            throw new AlreadyExistsError('User already exists')
        }

        const passwordHash = await hash(password, 10);

        const user = await client.user.create({
            data: {
                name,
                email,
                password: passwordHash
            }
        })

        return user;
    }

    static async findByEmail(email: string) {

        const user = await client.user.findFirst({
            where: {
                email
            }
        })

        return user;
    }
}

export { User };