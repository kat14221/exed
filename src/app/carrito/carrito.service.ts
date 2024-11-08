import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from './carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = "http://localhost:8080/api/carritos";

  constructor(private http: HttpClient) { }

  getCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.apiUrl);
  }

  getCarritoById(id: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}/${id}`);
  }

  updateCarrito(id: number, carrito: Carrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.apiUrl}/${id}`, carrito);
  }

  deleteCarrito(id: number): Observable<Carrito> {
    return this.http.delete<Carrito>(`${this.apiUrl}/${id}`);
  }

  crearCarrito(carrito: Carrito): Observable<Carrito> {
    return this.http.post<Carrito>(this.apiUrl, carrito);
  }
}
