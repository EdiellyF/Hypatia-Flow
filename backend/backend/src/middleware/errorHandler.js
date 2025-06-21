

export class errorHandler {
    #res;
    #status;
    #message;

    constructor(res, status, message){
       this.#message = message;
       this.#status = status;
       this.#res = res;
    }

    send() {
        return this.#res.status(this.#status).json({
                success: false,
                message: this.#message
        })
    }
}