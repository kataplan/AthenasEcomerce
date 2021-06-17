import { Component, OnInit } from '@angular/core';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import { CarritoService } from '../../../services/carrito.service';
import { Producto, ProductoPedido } from '../../../interfaces/productos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    'Producto',
    'Precio',
    'Cantidad',
    'Subtotal',
    'Eliminar',
  ];
  dataSource = this.servicioCarrito.listaCarrito;
  constructor(
    public servicioCarrito: CarritoService,
    private _snackBar: MatSnackBar,
    private router:Router,
  ) {}

  plus(pr: ProductoPedido) {
    let inputArray = document.getElementsByClassName('quantity-number')!;
    let input = inputArray[this.servicioCarrito.listaCarrito.indexOf(pr)];
    var num: number = parseInt(input.innerHTML);
    if (num < pr.producto.stock) {
      num++;
    }
    input.innerHTML = num + '';
    pr.cantidad = num;
    pr.subTotal = pr.cantidad * pr.producto.precio;
    this.precioTotal();
  }
  minus(pr: ProductoPedido) {
    let inputArray = document.getElementsByClassName('quantity-number')!;
    let input = inputArray[this.servicioCarrito.listaCarrito.indexOf(pr)];

    let num: number = parseInt(input.innerHTML);
    if (num > 1) {
      num--;
    }
    input.innerHTML = num + '';
    pr.cantidad = num;
    pr.subTotal = pr.cantidad * pr.producto.precio;
    this.precioTotal();
  }

  ngOnInit(): void {
    this.servicioCarrito.loadLocalStorage();
    this.dataSource = this.servicioCarrito.listaCarrito;
  }

  moneyFormating(num: number) {
    return Intl.NumberFormat('de-DE').format(num);
  }

  precioTotal() {
    let sum = 0;
    this.dataSource.forEach(function (value) {
      sum = sum + value.subTotal;
    });
    return this.moneyFormating(sum);
  }
  openSnackBar(producto:ProductoPedido) {
    let snackBarRef = this._snackBar.open("¿Seguro que desea eliminar su producto del carrito?","Si estoy seguro.", {
      duration: 3000
    });
    
    snackBarRef.onAction().subscribe(() => {
      let index = this.servicioCarrito.listaCarrito.indexOf(producto);
      this.servicioCarrito.listaCarrito.splice( index ,1);
      this.servicioCarrito.saveInLocalStorage(this.servicioCarrito.listaCarrito);
      this.dataSource = this.servicioCarrito.listaCarrito;
      window.location.reload()
    });
  }
}
