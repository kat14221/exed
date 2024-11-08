import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Factura } from './factura';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = "http://localhost:8080/api/facturas";


  constructor(private http: HttpClient) {}

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[] >(this.apiUrl)
    ;
  }
  

  getFacturaById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  updateFactura(id: number, factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/${id}`, factura);
  }

  deleteFactura(id: number): Observable<Factura> {
    return this.http.delete<Factura>(`${this.apiUrl}/${id}`);
  }

  crearFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.apiUrl, factura);
  }
  

}
