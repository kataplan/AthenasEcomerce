import { Component, OnInit } from '@angular/core';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Producto', 'Precio', 'Cantidad', 'Subtotal'];
  dataSource = this.servicioCarrito.listaCarrito;
  constructor( public servicioCarrito: CarritoService) { }

  ngOnInit(): void {
  }
  moneyFormating(num: number) {
    return Intl.NumberFormat('de-DE').format(num);
  }
  precioTotal(){
    let sum=0;
    this.dataSource.forEach(function(value) {
      sum = sum+ value.subTotal
    });
    return this.moneyFormating(sum);
  }
}
