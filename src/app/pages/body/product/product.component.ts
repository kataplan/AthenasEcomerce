import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(public servicioProductos: ProductoService, private route:ActivatedRoute) {}
  public id:any;
  ngOnInit(): void {
    document.documentElement.scrollTop
    this.route.paramMap.subscribe( (paramMap:any) =>{
      const {params} = paramMap
      this.servicioProductos.obtenerProductoPorID(params.producto)
    
    })
    
    this.rating(this.servicioProductos.productoVisto.valoracion);
    
  }
  plus() {
    var input = document.getElementById('quantity-number')!;
    var num: number = parseInt(input.innerText);
    if(num < this.servicioProductos.productoVisto.stock){
      num++;
    }
    input.innerText = num + '';
  }
  minus() {
    var input = document.getElementById('quantity-number')!;
    var num: number = parseInt(input.innerText);
    if (num > 1) {
      num--;
    }
    input.innerText = num + '';
  }
  rating(valoration: number) {
    
    var starArray = document.getElementsByClassName('star-rating');
    var i: number = starArray.length-5;
    while (valoration > 0) {
      if (valoration < 1 && valoration > 0.7) {
        
        starArray[i].textContent = 'star';
      }
      if (valoration <= 0.7 && valoration > 0.3) {
        starArray[i].textContent = 'star_half';

      }
      if (valoration >= 1) {
        starArray[i].textContent = 'star';
        
      }
    
      valoration--;
      i++;
    }
  
  }
  moneyFormating(num:number){
    return Intl.NumberFormat('de-DE').format(num);
 }
 rate(valor:number) {
  this.servicioProductos.valorRating=valor;
}
stock(stock:number){
   if(stock==0){
     return true;
   }
   return false;
}
}
