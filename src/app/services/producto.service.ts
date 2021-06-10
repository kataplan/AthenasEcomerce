import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../interfaces/productos'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  server = 'http://localhost:3000/';
  listaProductos: Array<Productos> = [];

  constructor(private servicio: HttpClient) { }

  obtenerProductos() {
    this.listaProductos = [];
    return this.servicio.get(`${this.server}/productos`);
  }

}
