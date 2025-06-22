import { prisma } from '../database/prisma.js';

export class SessaoRepository {
    
    async createSessao(sessaoData) {
        try {
            const sessao = await prisma.sessaoEstudo.create({
                data: {
                    dataHoraInicio: sessaoData.dataHoraInicio,
                    dataHoraFim: sessaoData.dataHoraFim,
                    observacoes: sessaoData.observacoes,
                    ciclosPomodoro: sessaoData.ciclosPomodoro,
                    idUsuario: sessaoData.idUsuario,
                    idDisciplina: sessaoData.idDisciplina
                },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    disciplina: {
                        select: {
                            id: true,
                            nome: true,
                            descricao: true
                        }
                    }
                }
            });
            
            return sessao;
        } catch (error) {
            throw new Error(`Erro ao criar sessão: ${error.message}`);
        }
    }

    async findSessaoById(id) {
        try {
            const sessao = await prisma.sessaoEstudo.findUnique({
                where: { id },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    disciplina: {
                        select: {
                            id: true,
                            nome: true,
                            descricao: true
                        }
                    },
                    assuntos: {
                        include: {
                            assunto: true
                        }
                    }
                }
            });
            
            return sessao;
        } catch (error) {
            throw new Error(`Erro ao buscar sessão: ${error.message}`);
        }
    }



    async findSessoesByDisciplina(idDisciplina) {
        try {
            const sessoes = await prisma.sessaoEstudo.findMany({
                where: { idDisciplina },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    assuntos: {
                        include: {
                            assunto: true
                        }
                    }
                },
                orderBy: {
                    dataHoraInicio: 'desc'
                }
            });
            
            return sessoes;
        } catch (error) {
            throw new Error(`Erro ao buscar sessões da disciplina: ${error.message}`);
        }
    }


    async findSessoesByUsuario(userId) {
        try {
        
           return  await prisma.sessaoEstudo.findMany({
                where: { 
                    idUsuario: userId 
                },
                include: {
                    usuario: {
                        select: {
                            id: true
                        }
                    },
                    disciplina: {
                        select: {
                            id: true
                        }
                    },
                    assuntos: {
                        include: {
                            assunto: true
                        }
                    }
                },
                orderBy: {
                    dataHoraInicio: 'desc'
                }
            });
           
        } catch (error) {
            throw new Error(`Erro ao listar sessões por usuário: ${error.message}`);
        }
    }

    async updateSessao(id, sessaoData) {
        try {
            const sessao = await prisma.sessaoEstudo.update({
                where: { id },
                data: {
                    dataHoraInicio: sessaoData.dataHoraInicio ? new Date(sessaoData.dataHoraInicio) : undefined,
                    dataHoraFim: sessaoData.dataHoraFim ? new Date(sessaoData.dataHoraFim) : undefined,
                    observacoes: sessaoData.observacoes,
                    ciclosPomodoro: sessaoData.ciclosPomodoro,
                    idDisciplina: sessaoData.idDisciplina
                },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    disciplina: {
                        select: {
                            id: true,
                            nome: true,
                            descricao: true
                        }
                    }
                }
            });
            
            return sessao;
        } catch (error) {
            throw new Error(`Erro ao atualizar sessão: ${error.message}`);
        }
    }

    async deleteSessao(id) {
        try {
    
            await prisma.sessaoAssunto.deleteMany({
                where: { idSessaoEstudo: id }
            });
            

            await prisma.sessaoEstudo.delete({
                where: { id }
            });
            
            return true;
        } catch (error) {
            throw new Error(`Erro ao deletar sessão: ${error.message}`);
        }
    }

    async adicionarAssuntoASessao(idSessao, idAssunto) {
        try {
            const sessaoAssunto = await prisma.sessaoAssunto.create({
                data: {
                    idSessaoEstudo: idSessao,
                    idAssunto: idAssunto
                }
            });
            
            return sessaoAssunto;
        } catch (error) {
            throw new Error(`Erro ao adicionar assunto à sessão: ${error.message}`);
        }
    }

    async removerAssuntoDaSessao(idSessao, idAssunto) {
        try {
            await prisma.sessaoAssunto.delete({
                where: {
                    idSessaoEstudo_idAssunto: {
                        idSessaoEstudo: idSessao,
                        idAssunto: idAssunto
                    }
                }
            });
            
            return true;
        } catch (error) {
            throw new Error(`Erro ao remover assunto da sessão: ${error.message}`);
        }
    }
} 