import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/productos';


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
 /* rate(valoration: number, id:number) {
    let classVal:Array[]= <HTMLElement>document.getElementsByClassName('rating');
    console.log(classVal);
    
  }
  */
}
/*
rate2(){
  let arrayClases = document.getElementsByClassName("rating");
  console.log(arrayClases)
}*/