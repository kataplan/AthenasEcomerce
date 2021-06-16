import { Injectable } from '@angular/core';
import { Producto, ProductoPedido } from '../interfaces/productos'

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  listaCarrito: Array<ProductoPedido> = [];

  constructor() { }

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
  }
  
}
