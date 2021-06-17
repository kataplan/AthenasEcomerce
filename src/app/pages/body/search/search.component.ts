import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaces/productos';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  
  busqueda:any;
  
  constructor(public servicioProductos: ProductoService, private router: Router, private ActiveRoute:ActivatedRoute) {}
  
  ngOnInit(): void {
    
    this.ActiveRoute.paramMap.subscribe( (paramMap:any) =>{      
      const {params} = paramMap
      this.busqueda=params.busqueda
      this.servicioProductos.listaProductos=[]
      this.servicioProductos.obtenerProductoPorNombre(params.busqueda)
      this.servicioProductos.catBusqueda=params.categoria;
    })

  }
  verProducto(item:Producto){
    this.servicioProductos.productoVisto =  item;
    this.router.navigate([`/producto/${item.idProducto}`]);
  }
  moneyFormating(num:number){
     return Intl.NumberFormat('de-DE').format(num);
  }

  rate(valor:number) {
    this.servicioProductos.valorRating=valor;
  }

}