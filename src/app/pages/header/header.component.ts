import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { LoginUsuarioService } from '../../services/login-usuario.service';
import { CarritoService } from '../../services/carrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PedidosService } from '../../services/pedidos.service';
import { Profile } from '../../interfaces/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public servicioProductos: ProductoService,
    private router: Router,
    public servicioLogin: LoginUsuarioService,
    public servicioCarrito: CarritoService,
    public servicioPedidos: PedidosService,
    private _snackBar: MatSnackBar
  ) {}
  

  ngOnInit(): void {
    this.servicioPedidos.obtenerPedidos();
    this.servicioCarrito.loadLocalStorage();
    this.servicioLogin.loadSession();
    if (this.servicioCarrito.listaCarrito.length > 0) {
      this.servicioCarrito.hiddenBadge = false;
    }
    const token = <string>sessionStorage.getItem('whoami');
    if (this.servicioLogin.verifyLoggedUser(token)) {
      this.servicioLogin.getUserData(token).subscribe((response) => {
        this.servicioLogin.profile = <Profile>response;
      });
    }
  }
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
  goProfile() {
    this.router.navigate([`/perfil`]);
  }

  closeSession() {
    this.servicioLogin.logOut();
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
    if (searchInput.value == '') {
      this._snackBar.open('Ingrese correctamente la búsqueda', 'ok', {
        duration: 3000,
      });
    } else {
      this.servicioProductos.obtenerProductoPorNombre(searchInput.value);
      this.router.navigate([`/search/${searchInput.value}`]);
    }
  }

  goCategory(category: string) {
    this.servicioProductos.catBusqueda = category;
    this.servicioProductos.obtenerProductosPorNombreCategoria(category);
    this.router.navigate([`/categoria`, category]);
  }
}
