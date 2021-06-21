import { Injectable } from '@angular/core';
import { Producto, ProductoPedido } from '../interfaces/productos';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  server = 'http://localhost:3000/';
  listaCarrito: Array<ProductoPedido> = [];
  hiddenBadge = true;
  constructor(private servicio: HttpClient) {}

  addProduct(product: Producto, cant: number) {
    const productoPedido: ProductoPedido = {
      producto: product,
      cantidad: cant,
      subTotal: cant * product.precio,
    };

    let i = 0;
    for (i = 0; i < this.listaCarrito.length; i++) {
      if (
        this.listaCarrito[i].producto.idProducto ==
        productoPedido.producto.idProducto
      ) {
        if (
          this.listaCarrito[i].cantidad + productoPedido.cantidad <=
          productoPedido.producto.stock
        ) {
          this.listaCarrito[i].cantidad =
            this.listaCarrito[i].cantidad + productoPedido.cantidad;
          this.saveInLocalStorage(this.listaCarrito);
          return;
        } else {
          return;
        }
      }
    }
    this.listaCarrito.push(productoPedido);
    this.saveInLocalStorage(this.listaCarrito);
    this.hiddenBadge = false;
    /* GUARDAR CARRITO EN LA BD*/
    // if (usuario === loggedIn){
    //  this.servicio.post(`${this.server}carrito`,this.listaCarrito).subscribe(
    //    (response) => console.log(response),
    //    (error) => console.log(error)
    //  );
    // }
  }
  
  moneyFormating(num: number) {
    return Intl.NumberFormat('de-DE').format(num);
  }
  precioTotal() {
    let sum = 0;
    this.listaCarrito.forEach(function (value) {
      sum = sum + value.subTotal;
    });
    return this.moneyFormating(sum);
  }

  saveInLocalStorage(listaCarritoLocal: Array<ProductoPedido>) {
    localStorage.setItem(
      'listaCarritoLocal',
      JSON.stringify(listaCarritoLocal)
    );
  }

  loadLocalStorage() {
    this.listaCarrito = JSON.parse(
      localStorage.getItem('listaCarritoLocal') || '{}'
    );
  }
  vaciarCarrito() {
    this.listaCarrito = [];
    this.saveInLocalStorage(this.listaCarrito);
    this.hiddenBadge = true;
  }
}
