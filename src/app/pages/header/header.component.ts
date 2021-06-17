import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/productos';
import { LoginUsuarioService } from '../../services/login-usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public servicioProductos: ProductoService,
    private router: Router,
    public servicioLogin: LoginUsuarioService
  ) {}

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
  goProfile(){
    console.log('TAMO REDY 1')
  }

  closeSession(){
    console.log('TAMO REDY 2')
  }

  goCart() {
    this.router.navigate([`/carrito`]);
  }
  goHome() {
    this.router.navigate([`/home`]);
  }
  goLogin() {
    this.router.navigate([`/login`]);
  }
  goRegister() {
    this.router.navigate([`/register`]);
  }
  search() {
    const searchInput = <HTMLInputElement>(
      document.getElementById('inputSearch')
    );
    this.servicioProductos.obtenerProductoPorNombre(searchInput.value);
    this.router.navigate([`/search/${searchInput.value}`]);
  }
  goCategory(category: string) {
    this.servicioProductos.catBusqueda = category;
    this.servicioProductos.obtenerProductosPorNombreCategoria(category);
    this.router.navigate([`/categoria`, category]);
  }
}
