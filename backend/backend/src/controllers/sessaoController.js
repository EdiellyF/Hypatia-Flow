export class SessaoController {
    #sessaoService;

    constructor(sessaoService) {
        this.#sessaoService = sessaoService;
    }

    async criarSessao(req, res) {
        try {
            const idUsuario = req.user.id;
            const { idDisciplina, dataHoraInicio, dataHoraFim, observacoes, ciclosPomodoro } = req.body;
            
            const sessaoData = {
                idUsuario,
                idDisciplina,
                dataHoraInicio: new Date(dataHoraInicio),
                dataHoraFim: new Date(dataHoraFim),
                observacoes
            };

            const sessao = await this.#sessaoService.createSessao(sessaoData);
            res.status(201).json(sessao);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarSessoes(req, res) {
        try {
            const sessoes = await this.#sessaoService.listarSessoes();
            res.status(200).json(sessoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarSessaoPorId(req, res) {
        try {
            const { id } = req.params;
            const sessao = await this.#sessaoService.findSessaoById(id);
            
            if (!sessao) {
                return res.status(404).json({ error: 'Sessão não encontrada' });
            }
            
            res.status(200).json(sessao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async atualizarSessao(req, res) {
        try {
            const { id } = req.params;
            const sessaoData = req.body;
            
            const sessao = await this.#sessaoService.updateSessao(id, sessaoData);
            res.status(200).json(sessao);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletarSessao(req, res) {
        try {
            const { id } = req.params;
            await this.#sessaoService.deleteSessao(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async buscarSessoesPorUsuario(req, res) {
        try {
            const { idUsuario } = req.params;
            const sessoes = await this.#sessaoService.findSessoesByUsuario(idUsuario);
            res.status(200).json(sessoes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async buscarSessoesPorDisciplina(req, res) {
        try {
            const { idDisciplina } = req.params;
            const sessoes = await this.#sessaoService.findSessoesByDisciplina(idDisciplina);
            res.status(200).json(sessoes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}