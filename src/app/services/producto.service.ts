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

 
  obtenerProductosPorNombreCategoria(str:string) {    
    this.listaProductos = [];
    return this.servicio.get(`${this.server}categoria/${str}`).subscribe((dato:any)=>{
      this.listaProductos=dato
    });
  }

  obtenerProductoPorNombre(str:string){
    console.log(str);
    return this.servicio.get(`${this.server}search/${str}`).subscribe((dato:any)=>{
      if(dato== []){
        this.listaProductos= [];
      }else{
        this.listaProductos=dato;
      }
      
    })
  }

  obtenerProductoPorID(str:string){
    
    return this.servicio.get(`${this.server}producto/${str}`).subscribe((dato:any)=>{
      this.productoVisto=dato[0]
      this.obtenerCategoriaPorID(dato[0].idCategoria),
      
      
    });
  }
  obtenerCategoriaPorID(str:string){
    console.log(str);
    return this.servicio.get(`${this.server}producto/categoria/${str}`).subscribe((dato:any)=>{
      this.catBusqueda = dato[0].nombreCategoria.toLowerCase()
    });
  }
}
