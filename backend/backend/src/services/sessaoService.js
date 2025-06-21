export class SessaoService {
    #sessaoRepository;
    #userService;
    #disciplinaService;

    constructor(sessaoRepository, userService, disciplinaService) {
        this.#sessaoRepository = sessaoRepository;
        this.#userService = userService;
        this.#disciplinaService = disciplinaService;
    }

    async createSessao(sessaoData) {
   
        const user = await this.#userService.findUserById(sessaoData.idUsuario);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }


        const disciplina = await this.#disciplinaService.findDisciplinaById(sessaoData.idDisciplina);
        if (!disciplina) {
            throw new Error('Disciplina não encontrada');
        }

     
        return await this.#sessaoRepository.createSessao(sessaoData);
    }

    async findSessoesByUsuario(idUsuario) {
        const user = await this.#userService.findUserById(idUsuario);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        
        return await this.#sessaoRepository.findSessoesByUsuario(idUsuario);
    }

    async findSessoesByDisciplina(idDisciplina) {
        const disciplina = await this.#disciplinaService.findDisciplinaById(idDisciplina);
        if (!disciplina) {
            throw new Error('Disciplina não encontrada');
        }
        
        return await this.#sessaoRepository.findSessoesByDisciplina(idDisciplina);
    }

    async findSessaoById(id) {
        return await this.#sessaoRepository.findSessaoById(id);
    }

    async updateSessao(id, sessaoData) {
        const sessao = await this.#sessaoRepository.findSessaoById(id);
        if (!sessao) {
            throw new Error('Sessão não encontrada');
        }

        return await this.#sessaoRepository.updateSessao(id, sessaoData);
    }

    async deleteSessao(id) {
        const sessao = await this.#sessaoRepository.findSessaoById(id);
        if (!sessao) {
            throw new Error('Sessão não encontrada');
        }

        return await this.#sessaoRepository.deleteSessao(id);
    }

    async listarSessoes() {
        return await this.#sessaoRepository.listarSessoes();
    }
}