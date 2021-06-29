import { Injectable} from '@angular/core';
import { Pedido,PedidoAdmin } from '../interfaces/pedido';
import { CarritoService} from './carrito.service';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from '../services/producto.service'
import { FormControl,FormGroup, Validators } from '@angular/forms';
//pero si lo tengo hecho, falta pasar bien el array noma, es una tabla
@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  server = 'http://localhost:3000/';
  hasCommented= false;
  listaPedidos: Array<PedidoAdmin> = [];
  constructor(public servicioCarrito : CarritoService, private servicio: HttpClient, public servicioProductos:ProductoService) {}

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

  eliminarProductoPedido(idProductoPedido:number){
    const objProductoPedido={
      id:idProductoPedido
    }
    this.servicio.post(`${this.server}eliminarProductoPedido`,objProductoPedido).subscribe((response:any)=>{
      console.log(response);
      
    })
  }
  
  verificarComentario(token:string,idProd:number,comentario:string,valoracion:number){
    const tokenObj={
      tokenValue:token,
      idProducto:idProd
    }

    this.servicio.post(`${this.server}verificarComentario`,tokenObj).subscribe((response:any)=>{
      
      if(response.hasComment == 'true'){
        this.hasCommented = true
        console.log()
      }else{
        this.hasCommented = false
      }

      if(this.hasCommented){
        alert ('Usted ya ha comentado anteriormente')
      }else{
        this.servicioProductos.saveComment(comentario,valoracion, idProd)
      }
    })
    console.log(this.hasCommented);
  }
}
