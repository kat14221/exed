import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'; 
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CarritoService } from '../../carrito/carrito.service'; 
import { Carrito } from '../../carrito/carrito'; 
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [SidebarComponent, CardModule, TableModule, PanelModule, ToastModule, 
    ConfirmDialogModule, DialogModule, InputTextModule, FormsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carritos!: Carrito[];
  isDeleteInProgress: boolean = false;
  titulo: string = '';
  opc: string = '';
  op = 0;
  visible: boolean = false;
  carrito = new Carrito(0, '', '');

  constructor(
    private carritoService: CarritoService, 
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarCarritos();
  }

  listarCarritos() {
    this.carritoService.getCarritos().subscribe((data) => {
      this.carritos = data;
    });
  }

  deleteCarrito(id: number) {
    this.isDeleteInProgress = true;
    this.carritoService.deleteCarrito(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrito eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarCarritos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el carrito',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Carrito';
    this.opc = 'Editar';
    this.carritoService.getCarritoById(id).subscribe((data) => {
      this.carrito = data;
      this.op = 1;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Carrito';
    this.opc = 'Agregar';
    this.op = 0;
    this.visible = true;
    this.carrito = {
      id: 0,
      usuario: '',
      articulo: ''
    };
  }

  addCarrito(): void {
    if (!this.carrito.usuario || this.carrito.usuario.trim() === '' || !this.carrito.articulo || this.carrito.articulo.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Los campos de usuario y artículo no pueden estar vacíos',
      });
      return;
    }

    this.carritoService.crearCarrito(this.carrito).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Carrito registrado',
        });
        this.listarCarritos();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el carrito',
        });
      },
    });
    this.visible = false;
  }
  
  updateCarrito() {
    this.carritoService.updateCarrito(this.carrito.id, this.carrito).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Carrito editado',
        });
        this.listarCarritos();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar el carrito',
        });
      },
    });
    this.visible = false;
  }
}
