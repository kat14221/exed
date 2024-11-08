import { Cliente } from "../cliente/cliente"; 
import { Carrito } from "../carrito/carrito"; 

export class Factura {
    id: number;
    clientes: Cliente = new Cliente(); // Inicialización
    carritos: Carrito = new Carrito(); // Inicialización

    constructor(id: number=0, cliente: Cliente, carrito: Carrito) {
        this.id = id;
        this.clientes = cliente;
        this.carritos = carrito;
    }
}
