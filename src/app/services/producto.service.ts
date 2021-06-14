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
  productoVisto:Producto = this.listaProductos[0];
  valorRating:number=0;

  constructor(private servicio: HttpClient) { }

  obtenerProductos(str:string) {
    this.listaProductos = [];
    return this.servicio.get(`${this.server}${str}`).subscribe((dato:any)=>{
      this.listaProductos=dato
    });
  }

  obtenerProductoPorID(str:string){
    return this.servicio.get(`${this.server}producto/${str}`).subscribe((dato:any)=>{
      this.productoVisto=dato[0]
      this.obtenerCategoriaPorID(dato[0].idCategoria)
      
      
    });
  }
  obtenerCategoriaPorID(str:string){
    return this.servicio.get(`${this.server}categoria/${str}`).subscribe((dato:any)=>{
      this.catBusqueda = dato[0].nombreCategoria.toLowerCase()
    });
  }
}
