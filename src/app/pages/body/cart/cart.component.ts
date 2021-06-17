import { Component, OnInit, ViewChild } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';
import {  ProductoPedido } from '../../../interfaces/productos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatTable} from '@angular/material/table';


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
  @ViewChild(MatTable) table!: MatTable<ProductoPedido>;

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
    this.servicioCarrito.precioTotal();
    this.servicioCarrito.saveInLocalStorage(this.servicioCarrito.listaCarrito);
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
    this.servicioCarrito.precioTotal();
    this.servicioCarrito.saveInLocalStorage(this.servicioCarrito.listaCarrito);
  }

  ngOnInit(): void {
    this.servicioCarrito.loadLocalStorage();
    this.dataSource = this.servicioCarrito.listaCarrito;
  }

  moneyFormating(num: number) {
    return Intl.NumberFormat('de-DE').format(num);
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
      this.table.renderRows();
      if(this.servicioCarrito.listaCarrito.length==0){
        this.servicioCarrito.hiddenBadge=true;
      }

    });
  }
  checkOut(){
    this.router.navigate(['checkout'])
  }
}
