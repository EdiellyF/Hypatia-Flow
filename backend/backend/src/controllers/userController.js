import { errorHandler } from "../middleware/errorHandler.js"; 


export class UserController{
    #userService;

    constructor(userService){
        this.#userService = userService;
    }
    
   async createUser(req,res){
       const {email, senha, nome} = req.body;

       if(!email || !senha || !nome){
            return new errorHandler(res, 400, 'Bad Request: Missing required fields.').send();
       } 

        const user = await this.#userService.findUserByEmail(email);

        if(user){
            return new errorHandler(res, 400, 'Bad Request: User already exists.').send();
        }

        const usuario = await this.#userService.createUser({email, senha, nome});

        if(usuario){
            return res.status(201).json(usuario);
        }

        return new errorHandler(res, 500, 'Internal Server Error: Unable to create user.').send();
    }


    async loginUser(req, res) {
        try {
            const {email, senha} = req.body;

            if(!email || !senha){
                return new errorHandler(res, 400, 'Credenciais inválidas').send();
            }

            const user = await this.#userService.findUserByEmail(email);

            if(!user){
                return new errorHandler(res, 401, 'Credenciais inválidas').send();
            }

            const isValidPassword = await this.#userService.verifyUserPassword(user, senha);

            if (!isValidPassword) {
                return new errorHandler(res, 401, 'Credenciais inválidas').send();
            }

            const token = await this.#userService.generateAuthToken(user);
            return res.status(200).json({
                token,
                user: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('Erro no login:', error);
            return new errorHandler(res, 500, 'Erro interno no servidor').send();
        }
    }
    

}