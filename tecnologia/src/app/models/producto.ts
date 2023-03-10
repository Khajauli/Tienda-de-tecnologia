export class Producto{
    constructor(
        public _id:string,
        public nombre:string,
        public categoria:string,
        public precio:number,
        public cantidad:number,
        public descripcion:string,
        public imagen:string
    ){}
}