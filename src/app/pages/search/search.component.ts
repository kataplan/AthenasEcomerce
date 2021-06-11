import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(public servicioProductos: ProductoService) {}

  ngOnInit(): void {
  }
  
  rate(valoration: number, id:number) {
    let classVal:Array[]= <HTMLElement>document.getElementsByClassName('rating');
    console.log(classVal);
    
  }
  
}
/*
rate2(){
  let arrayClases = document.getElementsByClassName("rating");
  console.log(arrayClases)
}*/