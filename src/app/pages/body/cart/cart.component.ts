import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Producto', 'Precio', 'cantidad', 'subtotal'];
  constructor() { }

  ngOnInit(): void {
  }

}
