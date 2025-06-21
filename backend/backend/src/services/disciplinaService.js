export class DisciplinaService{
    #disciplinaRepository;
    #userService;
 
    constructor(disciplinaRepository, userService) {
        this.#userService = userService;
        this.#disciplinaRepository = disciplinaRepository;
    }

    async createDisciplina ({userId, nome, descricao}){
      const user = await this.#userService.findUserById(userId);

      if (!user) {
        return null; 
      }

      
      const disciplinaExistente = await this.findDisciplinaByName(nome, userId);
      if (disciplinaExistente) {
        return null; 
      }

    
      return  await this.#disciplinaRepository.createDisciplina({ nome, descricao, userId });

    }


  
    async deleteDisciplinaById(id){
        return await this.#disciplinaRepository.deleteDisciplinaById(id);
    }

    async findDisciplinaByName(nome, userId) {
        return await this.#disciplinaRepository.findDisciplinaByName(nome, userId);
    }

    async findDisciplinaById(id){
        return await this.#disciplinaRepository.findDisciplinaById(id);
    }
    
}