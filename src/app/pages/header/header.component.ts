import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductoService} from '../../services/producto.service' 
import {Productos} from '../../interfaces/productos'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public servicioProductos:ProductoService,private router: Router) {
    
  }

  ngOnInit(): void {}
  display: boolean = true;
  name() {
    if (this.display) {
      document.getElementById('second-row')!.style.display = 'flex';
      this.display = false;
    } else {
      document.getElementById('second-row')!.style.display = 'none';
      this.display = true;
    }
  }
  goCart(){
    this.router.navigate([`/carrito`])
  }
  goHome(){
    this.router.navigate([`/home`])
  }
  goLogin(){
    this.router.navigate([`/login`])
  }
  goRegister(){
    this.router.navigate([`/register`])
  }
  search(){
    this.router.navigate([`/search`,])
  }
  goCategory(category:string){
    this.servicioProductos.catBusqueda=category;
    this.servicioProductos.obtenerProductos(category)
    this.router.navigate([`/categoria`,category])
  }

}
