import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'; 
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { FacturaService } from '../../factura/factura.service'; 
import { Factura } from '../../factura/factura'; 
import { Cliente } from '../../cliente/cliente'; 
import { Carrito } from '../../carrito/carrito'; 
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CarritoService } from '../../carrito/carrito.service';
import { ClienteService } from '../../cliente/cliente.service';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    SidebarComponent,
    CardModule,
    TableModule,
    PanelModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    FormsModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  clientesOption: Cliente[] = [];
  carritosOption: Carrito[] = [];
  facturas: Factura[] = [];

  titulo: string = '';
  opc: string = '';
  op = 0;
  visible: boolean = false;
  factura: Factura = new Factura(0, new Cliente(), new Carrito());

  constructor(
    private facturaService: FacturaService,
    private messageService: MessageService,
    private carritoService: CarritoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.listarFacturas();
    this.cargarCarritos();
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientesOption = data;
      },
      error: (error) => {
        console.error('Error al cargar los clientes', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los clientes',
        });
      },
    });
  }

  cargarCarritos() {
    this.carritoService.getCarritos().subscribe({
      next: (data) => {
        this.carritosOption = data;
      },
      error: (error) => {
        console.error('Error al cargar los carritos', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los carritos',
        });
      },
    });
  }

  listarFacturas() {
    this.facturaService.getFacturas().subscribe((data) => {
      this.facturas = data;
    });
  }

  deleteFactura(id: number) {
    this.facturaService.deleteFactura(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Factura eliminada',
        });
        this.listarFacturas();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la factura',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Factura';
    this.opc = 'Editar';
    this.facturaService.getFacturaById(id).subscribe((data) => {
      this.factura = data;
      this.op = 1;
      this.visible = true; 
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Factura';
    this.opc = 'Agregar';
    this.op = 0;
    this.visible = true; 
    this.factura = {
      id: 0,
      clientes: {
        id: 0,
        nombre: '',
        apellido1: '',
        apellido2: '',
        dni: ''
      },
      carritos: {
        id: 0,
        usuario: '',
        articulo: ''
      }
    };
  }

  addFactura(): void {
    this.facturaService.crearFactura(this.factura).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Factura registrada',
        });
        this.listarFacturas();
        this.op = 0;
        this.visible = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la factura',
        });
      },
    });
  }

  editFactura() {
    const facturaToUpdate = {
      id: this.factura.id,
      carritos: {
        id: this.factura.carritos.id,
        articulo: this.factura.carritos.articulo,
        usuario: this.factura.carritos.usuario
      },
      clientes: {
        id: this.factura.clientes.id,
        nombre: this.factura.clientes.nombre,
        apellido1: this.factura.clientes.apellido1,
        apellido2: this.factura.clientes.apellido2,
        dni: this.factura.clientes.dni,
      }
    };

    this.facturaService.updateFactura(this.factura.id, facturaToUpdate).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Factura actualizada',
        });
        this.listarFacturas();
        this.op = 0;
        this.visible = false;
      },
      error: (error) => {
        console.error('Error al actualizar factura:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la factura',
        });
      },
    });
  }

  opcion(): void {
    if (this.op == 0) {
      this.addFactura();
      this.limpiar();
    } else if (this.op == 1) {
      this.editFactura();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.factura = new Factura(0, new Cliente(), new Carrito());
  }
}
