import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'; 
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ClienteService } from '../../cliente/cliente.service'; 
import { Cliente } from '../../cliente/cliente'; 
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [SidebarComponent, CardModule, TableModule, PanelModule, ToastModule, 
    ConfirmDialogModule, DialogModule, InputTextModule, FormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  clientes!: Cliente[];
  isDeleteInProgress: boolean = false;
  titulo: string = '';
  opc: string = '';
  op = 0;
  visible: boolean = false;
  cliente = new Cliente(0, '', '', '');

  constructor(
    private clienteService: ClienteService, 
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  deleteCliente(id: number) {
    this.isDeleteInProgress = true;
    this.clienteService.deleteCliente(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Cliente eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarClientes();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el cliente',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Cliente';
    this.opc = 'Editar';
    this.clienteService.getClientebyID(id).subscribe((data) => {
      this.cliente = data;
      this.op = 1;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Cliente';
    this.opc = 'Agregar';
    this.op = 0;
    this.visible = true;
    this.cliente = new Cliente();
  }

  addCliente(): void {
    if (!this.cliente.nombre || this.cliente.nombre.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre del cliente no puede estar vacío',
      });
      return;
    }

    this.clienteService.crearCliente(this.cliente).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Cliente registrado',
        });
        this.listarClientes();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el cliente',
        });
      },
    });
    this.visible = false;
  }
  
  updateCliente() {
    this.clienteService.updateCliente(this.cliente.id, this.cliente).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Cliente editado',
        });
        this.listarClientes();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar el cliente',
        });
      },
    });
    this.visible = false;
  }
}
