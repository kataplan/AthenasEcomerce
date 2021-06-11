import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private servicioProductos:ProductoService) { }
  
  ngOnInit(): void {
    
  }
}
