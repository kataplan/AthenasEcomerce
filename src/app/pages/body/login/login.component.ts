import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { LoginUsuarioService } from '../../../services/login-usuario.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  siteKey: string = '6Ld1STYbAAAAANTXcdx94Ki2xxTLd6vn8JYi5om_';

  constructor(private router: Router, public fb: FormBuilder, public servicioLogin:LoginUsuarioService) {
    this.formulario = fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      //recaptcha: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    if(this.servicioLogin.loggedUser){
      this.router.navigate(['home'])
    }

  }

  onSubmit(){
    
    if (this.formulario.valid){

      const email = this.formulario.controls['email'].value
      const password = this.formulario.controls['password'].value
      
      const userLoginData={
        authorization: 'micabezera',
        _email: email,
        _password: password
      }

      const token = this.servicioLogin.logUser(userLoginData)      
      this.router.navigate(['home'])

    }else{
      
    }
  }

  goRegister() {
    this.router.navigate([`/register`]);
  }
}
