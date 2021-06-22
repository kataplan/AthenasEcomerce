import { Injectable } from '@angular/core';
import { Pedido,PedidoAdmin } from '../interfaces/pedido';
import { CarritoService} from './carrito.service';
import { HttpClient } from '@angular/common/http';
//pero si lo tengo hecho, falta pasar bien el array noma, es una tabla
@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  server = 'http://localhost:3000/';
  
  listaPedidos: Array<PedidoAdmin> = [];
  constructor(public servicioCarrito : CarritoService, private servicio: HttpClient) {}

  obtenerPedidos() {
    return this.servicio.get(`${this.server}obtenerPedidos`).subscribe((dato:any)=>{
      this.listaPedidos=dato;
      
      });
  }
  guardarPedidoCliente(pedido:Pedido) {
    this.servicio.post(`${this.server}guardarPedido`,pedido).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
