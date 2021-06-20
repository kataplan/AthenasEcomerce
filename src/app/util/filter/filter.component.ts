import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/productos'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  max = 200000;
  min = 0;
  showTicks = false;
  step = 100;
  minValue:number = 0;
  maxValue:number = 200000;
  tickInterval = 1;
  order = ""
  constructor(
    public servicioProductos: ProductoService,
  ) {}

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  moneyFormating(num: number) {
    return Intl.NumberFormat('de-DE').format(num);
  }
  filtrar(){
    let min =this.minValue;
    let max = this.maxValue;
    this.servicioProductos.listaProductos = this.servicioProductos.listaSinFiltrar.filter(function(e){
      return e.precio>= min && e.precio<=max;
    })
    if(this.order != ""){
      if(this.order=="PrecioMenorMayor"){
        this.servicioProductos.listaProductos = this.servicioProductos.listaProductos.sort(
          (c1, c2) => c1.precio - c2.precio)
      }
      if(this.order=="PrecioMayorMenor"){
        this.servicioProductos.listaProductos = this.servicioProductos.listaProductos.sort(
          (c1, c2) => c2.precio - c1.precio)
      }
      if(this.order=="ValoracionMenorMayor"){
        this.servicioProductos.listaProductos = this.servicioProductos.listaProductos.sort(
          (c1, c2) => c1.valoracion - c2.valoracion)
      }
      if(this.order=="ValoracionMayormenor"){
        this.servicioProductos.listaProductos = this.servicioProductos.listaProductos.sort(
          (c1, c2) => c2.valoracion - c1.valoracion)
      }
      if(this.order=="A-Z"){
        this.servicioProductos.listaProductos = this.servicioProductos.listaProductos.sort(
          (c1, c2) => c1.nombreProducto.localeCompare(c2.nombreProducto))
      }
      if(this.order=="Z-A"){
        this.servicioProductos.listaProductos = this.servicioProductos.listaProductos.sort(
          (c1, c2) => c2.nombreProducto.localeCompare(c1.nombreProducto))
      }
    }
      
  }
    
  ngOnInit(): void {
  }
}
