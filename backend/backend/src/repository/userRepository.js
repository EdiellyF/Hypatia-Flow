import { prisma } from "../database/prisma.js";

export class UserRepository{
    async createUser({email, nome, senha}){
       return await prisma.user.create({data: {email, nome, senha}})
    }

    async findUserByEmail(email){
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }


    async findUserById(id){
        console.log(    'xxxx' +id)
        return await prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    

    

}