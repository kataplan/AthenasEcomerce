import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  constructor(public servicioProductos: ProductoService) { }
  
  ngOnInit(): void {
    
  }

  fullStar(num:number){
    if((this.servicioProductos.valorRating-num) >=1){
      return true;
    }else{
      if((this.servicioProductos.valorRating-num) >0.7){
        return true;
      }
    }
    return false;
  }
  halfStar(num:number){
    if((this.servicioProductos.valorRating-num) <=0.7 && (this.servicioProductos.valorRating-num) >=0.3 ){
      return true;
    }
    return false;
  }
  emptyStar(num:number){
    if((this.servicioProductos.valorRating-num)<=0){
      return true;
    }else{
      if((this.servicioProductos.valorRating-num)<0.3){
        return true;
      }
    }
    return false;
  }
}
