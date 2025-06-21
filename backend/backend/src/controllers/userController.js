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

    

}