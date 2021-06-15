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
    }
    console.log(productoPedido);
    this.listaCarrito.push(productoPedido)
  }
}
