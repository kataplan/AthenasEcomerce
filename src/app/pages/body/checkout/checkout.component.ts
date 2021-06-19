import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormControlName,
} from '@angular/forms';
import { RegistroUsuarioService } from '../../../services/registro-usuario.service';
import { RegionesService } from '../../../services/regiones.service';
import { LoginUsuarioService  } from '../../../services/login-usuario.service';
import { CarritoService} from '../../../services/carrito.service';
import { Usuario } from '../../../interfaces/usuario';
import { Region } from '../../../interfaces/region';
import { Router } from '@angular/router';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  hide = true;
  hide2 = true;
  formulario: FormGroup;
  comunas: Array<String> = [];
  siteKey: string = '6Ld1STYbAAAAANTXcdx94Ki2xxTLd6vn8JYi5om_';

  constructor(
    public fb: FormBuilder,
    public servicioRegistro: RegistroUsuarioService,
    public servicioRegiones: RegionesService,
    public servicioLogin:LoginUsuarioService,
    public servicioCarrito: CarritoService,
    private router:Router,
    ) {
      this.formulario = fb.group({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        rut: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        region: new FormControl('', [Validators.required]),
        comuna: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        recaptcha: new FormControl('', [Validators.required]),
      });
   }

  ngOnInit(): void {
    this.servicioCarrito.loadLocalStorage();
    this.servicioRegiones.getRegiones();
    if(this.servicioCarrito.listaCarrito.length==0){
      this.router.navigate(['home'])
    }
  }
  moneyFormating(num:number){
    return Intl.NumberFormat('de-DE').format(num);
 }
  CrearPedido(){

  }
  onSubmit() {
    if (this.formulario.valid) {

        this.router.navigate(['home'])
      } else {
        alert('Complete correctamente el formulario');
      } 
  }

  seleccionarRegion(region: Region) {
    this.comunas = region.comunas;
  }
}
