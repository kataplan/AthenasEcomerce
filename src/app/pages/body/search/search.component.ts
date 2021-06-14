import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/productos';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(public servicioProductos: ProductoService, private router: Router, private ActiveRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.ActiveRoute.paramMap.subscribe( (paramMap:any) =>{      
      const {params} = paramMap
      this.servicioProductos.obtenerProductosPorNombreCategoria(params.categoria)
      this.servicioProductos.catBusqueda=params.categoria;
    })
  }
  verProducto(item:Producto){
    this.servicioProductos.productoVisto =  item;
    this.router.navigate([`/product/${item.idProducto}`]);
  }
  moneyFormating(num:number){
     return Intl.NumberFormat('de-DE').format(num);
  }

  rate(valor:number) {
    this.servicioProductos.valorRating=valor;
  }

}