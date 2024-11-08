import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cliente } from './cliente';
@Injectable({
    providedIn: 'root'
  })
export class ClienteService{
    private ApiURl="http://localhost:8080/api/clientes";
    constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.ApiURl);
  }
  getClientebyID(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.ApiURl}/${id}`);
  }
  updateCliente(id: number, Cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.ApiURl}/${id}`, Cliente);
  }
  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.ApiURl}/${id}`);
  }
  crearCliente(Cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.ApiURl,Cliente );
  }

  
}