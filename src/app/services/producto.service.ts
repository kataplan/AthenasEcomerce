import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos'
import { Comentario} from '../interfaces/comentario'
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  server = 'http://localhost:3000/';
  listaProductos: Array<Producto> = [];
  catBusqueda = '';
  productoVisto:Producto = this.listaProductos[0];
  valorRating:number=0;
  listaComentarios: Array<Comentario> = [];
  constructor(private servicio: HttpClient) { }
  listaSinFiltrar:Array<Producto> = [];

 
  obtenerProductosPorNombreCategoria(str:string) {    
    this.listaProductos = [];
    return this.servicio.get(`${this.server}categoria/${str}`).subscribe((dato:any)=>{
      this.listaProductos=dato
      this.listaSinFiltrar=dato;
    });
  }

  obtenerProductoPorNombre(str:string){
    return this.servicio.get(`${this.server}search/${str}`).subscribe((dato:any)=>{
      if(dato== []){
        this.listaProductos= [];
      }else{
        this.listaProductos=dato;
        this.listaSinFiltrar=dato;
      }
      
    })
  }

  obtenerProductoPorID(str:string){
    
    return this.servicio.get(`${this.server}producto/${str}`).subscribe((dato:any)=>{
      this.productoVisto=dato[0]
      this.obtenerCategoriaPorID(dato[0].idCategoria)
      
      
    });
  }
  obtenerCategoriaPorID(str:string){
    return this.servicio.get(`${this.server}producto/categoria/${str}`).subscribe((dato:any)=>{
      this.catBusqueda = dato[0].nombreCategoria.toLowerCase()
    });
  }

  saveComment(str:string, num:number,id:number){
    const comentario = {
      token:sessionStorage.getItem('whoami'),
      comment:str,
      valoration:num,
      idProducto:id
    }
    
    this.servicio.post(`${this.server}saveComment`,comentario).subscribe(
      (response:any)=>{
        console.log(response);
        if(response.code==201){
          this.loadComments(id)
        }
      }
    )
    
  }

  loadComments(idProducto:number){
    const producto = {
      id:idProducto
    }

    this.listaComentarios = [];
    this.servicio.post(`${this.server}loadComments`,producto).subscribe(
      (response:any)=>{
        if(response.code != 204){
          this.listaComentarios = response
        }       
      }
    ) 
  }
}
