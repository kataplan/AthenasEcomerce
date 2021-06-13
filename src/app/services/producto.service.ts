import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/productos'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  server = 'http://localhost:3000/';
  listaProductos: Array<Producto> = [];
  catBusqueda = '';
  productoVisto: Producto = this.listaProductos[0];
  valorRating:number=0;

  constructor(private servicio: HttpClient) { }

  obtenerProductos(str:string) {
    this.listaProductos = [];
    return this.servicio.get(`${this.server}${str}`).subscribe((dato:any)=>{
      this.listaProductos=dato
    });
  }

}
