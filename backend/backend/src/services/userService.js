import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export class UserService {
    #emailService;
    #userRepository;

    constructor(userRepository, emailService){
        this.#userRepository = userRepository;
        this.#emailService = emailService;
    }



    async verifyUserPassword(user, senha) {
        try {
            if (!user || !senha || !user.senha) {
                return false;
            }

            return await bycrypt.compare(senha, user.senha);
        } catch (error) {
            console.error('Falha na autenticação');
            return false;
        }
    }




    async findUserById(id){
        
        return await this.#userRepository.findUserById(id);
    }

    async findUserByEmail(email){
       return await this.#userRepository.findUserByEmail(email);
    }

    async createUser({email, nome, senha}){
        const hashSenha = await bycrypt.hash(senha, 8);
          const user = await  this.#userRepository.createUser({
                email, 
                nome, 
                senha:hashSenha
             });

            const token = await this.generateAuthToken(user);
        
            try {
                await this.#emailService.sendEmail(
                    user.email,
                    "Bem vindo ao Hypatia flow",
                    `"Olá ${user.nome}, seja bem vindo ao Hypatia flow, seu token de acesso é: ${token}"`
                );
            } catch (error) {
                console.log('Erro ao enviar email:', error);
            }

            return {
                user: user.nome, 
                token: token,
            };

         
    }


    async generateAuthToken(user) {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
    
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "1d",
        });

        return token;


    }


    
}