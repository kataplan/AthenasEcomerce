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
    this.rating(this.servicioProductos.valorRating);
  }
  rating(valoration: number) {
    
    var starArray = document.getElementsByClassName('star-rating');
    var i: number = starArray.length-5;
    while (valoration > 0) {
      console.log(starArray[i])
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
}
