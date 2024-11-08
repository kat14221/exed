export class Carrito {
    id: number;
    usuario: string;
    articulo: string;
   
    constructor(id: number = 0, usuario: string = '', articulo: string = '',) {
        this.id = id;
    this.usuario= usuario;
        this.articulo = articulo;
     
    }
}
