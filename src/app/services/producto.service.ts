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
  catBusqueda = '';
  
  constructor(private servicio: HttpClient) { }

  obtenerProductos(str:string) {
    this.listaProductos = [];
    return this.servicio.get(`${this.server}${str}`).subscribe((dato:any)=>{
      this.listaProductos.push(dato)
    });
  }

}
