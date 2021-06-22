import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { RegistroUsuarioService } from '../../../services/registro-usuario.service';
import { RegionesService } from '../../../services/regiones.service';
import { LoginUsuarioService } from '../../../services/login-usuario.service';
import { CarritoService } from '../../../services/carrito.service';
import { PedidosService } from '../../../services/pedidos.service';
import { Region } from '../../../interfaces/region';
import { Pedido } from '../../../interfaces/pedido';
import { Router } from '@angular/router';
import { Profile } from '../../../interfaces/usuario';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  hide = true;
  hide2 = true;
  formulario: FormGroup;
  comunas: Array<String> = [];
  siteKey: string = '6Ld1STYbAAAAANTXcdx94Ki2xxTLd6vn8JYi5om_';
  profile: Profile = {
    nombres: '',
    apellidos: '',
    rut: '',
    direccion: '',
    region: '',
    comuna: '',
  };
  constructor(
    public fb: FormBuilder,
    public servicioRegistro: RegistroUsuarioService,
    public servicioRegiones: RegionesService,
    public servicioLogin: LoginUsuarioService,
    public servicioCarrito: CarritoService,
    public servicioPedidos: PedidosService,
    private router: Router
  ) {
    this.formulario = fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      rut: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      comuna: new FormControl('', [Validators.required]),
      recaptcha: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.servicioRegiones.getRegiones();
    if (!sessionStorage.getItem('whoami')) {
      this.router.navigate(['home']);
    } else {
      const token = <string>sessionStorage.getItem('whoami');

      if (this.servicioLogin.verifyLoggedUser(token)) {
        this.servicioLogin.getUserData(token).subscribe((response) => {
          this.profile = <Profile>response;
          this.formulario.get('firstName')?.setValue(this.profile.nombres);
          this.formulario.get('lastName')?.setValue(this.profile.apellidos);
          this.formulario.get('rut')?.setValue(this.profile.rut);
          this.formulario.get('address')?.setValue(this.profile.direccion);
          this.formulario.get('region')?.setValue(this.profile.region);
          this.seleccionarRegionNombre(this.profile.region)
          this.formulario.get('comuna')?.setValue(this.profile.comuna);
        });
      } else {
        this.router.navigate(['home']);
      }
    }

    this.servicioCarrito.loadLocalStorage();
   
    if (this.servicioCarrito.listaCarrito.length == 0) {
      this.router.navigate(['home']);
    }
    if (!this.servicioLogin.loggedUser) {
      this.router.navigate(['login']);
    }
  }

  moneyFormating(num: number) {
    return Intl.NumberFormat('de-DE').format(num);
  }
  crearPedido() {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const pedido: Pedido = {
      nombreEntrega: this.formulario.controls['firstName'].value,
      apellidoEntrega: this.formulario.controls['lastName'].value,
      rutEntrega: this.formulario.controls['rut'].value,
      regionEntrega: this.formulario.controls['region'].value,
      comunaEntrega: this.formulario.controls['comuna'].value,
      direccionEntrega: this.formulario.controls['address'].value,
      token: sessionStorage.getItem('whoami') || '',
      listaProductos: this.servicioCarrito.listaCarrito,
    };
    this.servicioPedidos.guardarPedidoCliente(pedido);
    this.servicioCarrito.vaciarCarrito();
  
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.router.navigate(['home']);
      this.crearPedido();
    } else {
      alert('Complete correctamente el formulario');
    }
  }

  seleccionarRegion(region: Region) {
    this.comunas = region.comunas;
  }
  seleccionarRegionNombre(RegionStr:string){
    let region:Region = <Region>this.servicioRegiones.listaRegiones.find(function(e){
      return e.region == RegionStr;
    })
    this.comunas=region.comunas
  }

  
}
