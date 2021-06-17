import { Injectable } from '@angular/core';
import { Producto, ProductoPedido } from '../interfaces/productos'
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  server = 'http://localhost:3000/';
  listaCarrito: Array<ProductoPedido> = [];

  constructor(private servicio: HttpClient) { }

  addProduct(product:Producto, cant:number){
    
    
    const productoPedido:ProductoPedido={
      producto:product,
      cantidad:cant,
      subTotal:(cant*product.precio)
    }
    
    let i=0;
    for(i=0; i<this.listaCarrito.length ;i++){
      if(this.listaCarrito[i].producto==productoPedido.producto){
        if((this.listaCarrito[i].cantidad+productoPedido.cantidad)<=productoPedido.producto.stock){
          this.listaCarrito[i].cantidad= this.listaCarrito[i].cantidad+ productoPedido.cantidad
          return
        }else{
          return
        }
      }
    }
    this.listaCarrito.push(productoPedido)
    this.saveInLocalStorage(this.listaCarrito)
   
    /* GUARDAR CARRITO EN LA BD*/
    // if (usuario === loggedIn){
    //  this.servicio.post(`${this.server}carrito`,this.listaCarrito).subscribe(
    //    (response) => console.log(response),
    //    (error) => console.log(error)
    //  );
    // }
  }

  saveInLocalStorage(listaCarritoLocal:Array<ProductoPedido>){
    localStorage.setItem('listaCarritoLocal',JSON.stringify(listaCarritoLocal))
  }

  loadLocalStorage(){
    this.listaCarrito = JSON.parse(localStorage.getItem('listaCarritoLocal') || "{}");
  }
}
