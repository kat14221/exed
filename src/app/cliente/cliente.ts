export class Cliente {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    dni:string;

    constructor(id: number = 0, nombre: string = '', apellido1: string = '', apellido2: string = '',dni:string='') {
        this.id = id;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.dni=dni;
    }
}
