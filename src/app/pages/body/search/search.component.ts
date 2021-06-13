import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/productos';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(public servicioProductos: ProductoService, private router: Router) {}

  ngOnInit(): void {
  }
  verProducto(item:Producto){
    this.servicioProductos.productoVisto =  item;
    this.router.navigate([`/product/`]);
  }
  moneyFormating(num:number){
     return Intl.NumberFormat('de-DE').format(num);
  }

  rate() {
    return 
  }

}