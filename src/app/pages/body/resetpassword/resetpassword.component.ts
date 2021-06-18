import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { LoginUsuarioService } from '../../../services/login-usuario.service'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  
  formulario: FormGroup;
  
  constructor(public fb:FormBuilder, public servicioLogin:LoginUsuarioService) { 
    this.formulario = fb.group({
      email: new FormControl('', [Validators.required]),
      //recaptcha: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.formulario.valid){

      const email:string = this.formulario.controls['email'].value;
      console.log(email);
      this.servicioLogin.passReset(email);

    }else{
      alert('Ingresa tu email!')
    }
  }

}
