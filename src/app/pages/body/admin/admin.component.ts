import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'region', 'comuna','rut', 'direccion', 'fecha','idPedido', 'idProducto', 'cantidad' ];
  dataSource = this.servicioPedidos.listaPedidos;
  constructor(    public servicioPedidos: PedidosService) { }
  
  ngOnInit(): void {
    
    this.servicioPedidos.obtenerPedidos();
    console.log(this.servicioPedidos.listaPedidos);
    
  }

}
