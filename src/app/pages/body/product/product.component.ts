import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { CarritoService } from '../../../services/carrito.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    public servicioCarrito: CarritoService,
    public servicioProductos: ProductoService,
    private route: ActivatedRoute
  ) {}
  public id: any;
  ngOnInit(): void {
    
    document.documentElement.scrollTop;
    this.route.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;
      this.servicioProductos.obtenerProductoPorID(params.producto);
    });
    
  }
  plus() {
    var input = document.getElementById('quantity-number')!;
    var num: number = parseInt(input.innerText);
    if (num < this.servicioProductos.productoVisto.stock) {
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
 

  moneyFormating(num: number) {
    return Intl.NumberFormat('de-DE').format(num);
  }

  rate(valor: number) {
    this.servicioProductos.valorRating = valor;
  }

  stock(stock: number) {
    if (stock == 0) {
      return true;
    }
    return false;
  }

  addToCart(){

    let input = document.getElementById('quantity-number')!;
    let num: number = parseInt(input.innerText);
    if(num>this.servicioProductos.productoVisto.stock){
      return null;
    }
    this.servicioCarrito.addProduct(this.servicioProductos.productoVisto,num);
    return
  }

}
