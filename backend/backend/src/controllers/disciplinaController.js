import { errorHandler } from "../middleware/errorHandler.js";

export class DisciplinaController{
    #disciplinaService;
    

    constructor(disciplinaService) {
       this.#disciplinaService = disciplinaService;
    }

   async createDisciplina(req,res) {
    try {
       const {nome, descricao } = req.body; 
        if (!nome){
            return new errorHandler(res, 400, "Nome é obrigatório").send();
        }

        
        const disciplinaExistente = await this.#disciplinaService.findDisciplinaByName(nome,  req.user.id);
        if (disciplinaExistente) {
            return new errorHandler(res, 400, "Disciplina já existe").send();
        }

        const disciplina = await this.#disciplinaService.createDisciplina({userId: req.user.id, nome, descricao: descricao || null});



        return res.status(201).json({message: "Disciplina criada com sucesso", disciplina});

       

    }catch(error){
        console.error('Erro ao criar disciplina:', error);
        return new errorHandler(res, 500, `Erro ao criar disciplina: ${error.message}`).send();
    }
     

   }


   async deleteDisciplinaById(req,res){
        try {
            const {id} = req.params;
            const disciplina = await this.#disciplinaService.findDisciplinaById(id);

            

            if (!disciplina) {
                return new errorHandler(res, 404, "Disciplina não encontrada").send();
            }

            if(disciplina.idUsuarioCriador != req.user.id){
                return new errorHandler(res, 403, "Acesso negado!!!").send();
            }


            const deleteDisciplina = await this.#disciplinaService.deleteDisciplinaById(id);


                if(deleteDisciplina) {
                    return res.status(204).json();
                }

                

            }

            catch(error){
               console.error('Erro ao deletar disciplina:', error);
               return new errorHandler(res, 500, `Erro ao deletar disciplina: ${error.message}`).send();
            }


    }


    async getDisciplinaById(req, res) {
        try {
            const { id } = req.params;
            const disciplina = await this.#disciplinaService.findDisciplinaById(id);

            if (!disciplina) {
                return new errorHandler(res, 404, "Disciplina não encontrada").send();
            }

            return res.status(200).json(disciplina);
        } catch (error) {
            console.error('Erro ao buscar disciplina por ID:', error);
            return new errorHandler(res, 500, `Erro ao buscar disciplina por ID: ${error.message}`).send();
        }
    }
    
    async getAllDisciplinas(req, res) {
        try {
            const disciplinas = await this.#disciplinaService.findAllDisciplinas(req.user.id);
            return res.status(200).json(disciplinas);
        } catch (error) {
            console.error('Erro ao buscar todas as disciplinas:', error);
            return new errorHandler(res, 500, `Erro ao buscar todas as disciplinas: ${error.message}`).send();
        }
    }

}