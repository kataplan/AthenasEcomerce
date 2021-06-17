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
import { Usuario } from '../../../interfaces/usuario';
import { Region } from '../../../interfaces/region';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide2 = true;
  comunas: Array<String> = [];
  formulario: FormGroup;
  siteKey: string = '6Ld1STYbAAAAANTXcdx94Ki2xxTLd6vn8JYi5om_';

  constructor(
    public fb: FormBuilder,
    public servicioRegistro: RegistroUsuarioService,
    public servicioRegiones: RegionesService,
    public servicioLogin:LoginUsuarioService,
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
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
      recaptcha: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.servicioRegiones.getRegiones();
    if(this.servicioLogin.loggedUser){
      this.router.navigate(['home'])
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      const password = this.formulario.controls['password'].value;
      const repPassword = this.formulario.controls['repeatPassword'].value;

      if (password === repPassword) {
        const nuevoUsuario: Usuario = {
          nombres: this.formulario.controls['firstName'].value,
          apellidos: this.formulario.controls['lastName'].value,
          rut: this.formulario.controls['rut'].value,
          email: this.formulario.controls['email'].value,
          region: this.formulario.controls['region'].value,
          comuna: this.formulario.controls['comuna'].value,
          direccion: this.formulario.controls['address'].value,
          password: password,
        };

        this.servicioRegistro.registrarUsuario(nuevoUsuario);
        this.router.navigate(['login'])
        alert('Registrado con éxito!!');
      } else {
        alert('Las contraseñas no coinciden');
      }
    } else {
      alert('Complete correctamente el formulario');
    }
  }
  seleccionarRegion(region: Region) {
    this.comunas = region.comunas;
  }
}
