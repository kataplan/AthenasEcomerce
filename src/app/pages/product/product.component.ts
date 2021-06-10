import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.rating(4.8);
  }
  plus() {
    var input = document.getElementById('quantity-number')!;
    var num: number = parseInt(input.innerText);
    num++;
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
    var i: number = 0;
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
}
