export class CustomError extends Error {
    constructor(
        public readonly message:string,
        public readonly statusCode:number
    ){
        super(message);
    }
    static badRequest(message: string){
        return new CustomError(message, 400)
    }
    static unAuthorized(message:string) {
        return new CustomError(message,403)
    }
    static notFoud(message:string) {
        return new CustomError(message,404)
    }
    static internalServer (message:string) {
        return new CustomError(message,500)
    }
}