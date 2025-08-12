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
   
        console.log(sessaoData)

        if (!sessaoData.idDisciplina) {
            throw new Error('idDisciplina é obrigatório');
        }

        if (!sessaoData.dataHoraInicio || isNaN(new Date(sessaoData.dataHoraInicio).getTime())) {
            throw new Error('dataHoraInicio inválida ou ausente');
        }

        if (!sessaoData.dataHoraFim || isNaN(new Date(sessaoData.dataHoraFim).getTime())) {
            throw new Error('dataHoraFim inválida ou ausente');
        }

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
        console.log('SessaoService.findSessoesByUsuario chamado com idUsuario:', idUsuario);
        const user = await this.#userService.findUserById(idUsuario);
        if (!user) {
            console.log('Usuário não encontrado no banco:', idUsuario);
            return [];
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

        if (sessaoData.idDisciplina) {
            const disciplina = await this.#disciplinaService.findDisciplinaById(sessaoData.idDisciplina);
            if (!disciplina) {
                throw new Error('Disciplina não encontrada');
            }
        } else if (sessaoData.nomeDisciplina && sessao.idUsuario) {
            const disciplina = await this.#disciplinaService.findDisciplinaByName(sessaoData.nomeDisciplina, sessao.idUsuario);
            if (!disciplina) {
                throw new Error('Disciplina não encontrada pelo nome');
            }
            sessaoData.idDisciplina = disciplina.id;
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