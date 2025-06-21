import { prisma } from "../database/prisma.js";

export class DisciplinaRepository {
    


   async createDisciplina({userId, nome, descricao}) {
      return await prisma.disciplina.create({
            data: {
                nome,
                descricao,
                idUsuarioCriador: userId
            }
      })
    }


    async  findDisciplinaByName(nome, userId) {
        return  await prisma.disciplina.findFirst({
            where: {
                nome,
                idUsuarioCriador: userId
            }
        })
    }

   async findDisciplinaById(id) {
        return  await prisma.disciplina.findUnique({
            where: {
                id,

            }
        })
    }

    async deleteDisciplinaById(id){
        return await prisma.disciplina.delete({
            where: {
                id
            }
        })
    }
}