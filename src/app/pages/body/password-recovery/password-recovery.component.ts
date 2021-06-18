import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormControlName,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recovery } from '../../../interfaces/recovery'
import {LoginUsuarioService } from '../../../services/login-usuario.service'
@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  hide = true;
  hide2 = true;
  formulario:FormGroup;
  token:string = '';
  constructor(private route: ActivatedRoute,public fb: FormBuilder,public servicioLogin:LoginUsuarioService) { 
    this.formulario = fb.group({
      password: new FormControl('',[Validators.required]),
      repeatPassword:new FormControl('',[Validators.required]),
      //recaptcha: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      const {params} = paramMap
      this.token = params.token
    });
    console.log(this.token);
  }

  onSubmit(){

      const recovery:Recovery ={
        recoveryToken: this.token,
        newPassword: this.formulario.controls['password'].value
      }

      this.servicioLogin.passRecover(recovery);
  }


}
