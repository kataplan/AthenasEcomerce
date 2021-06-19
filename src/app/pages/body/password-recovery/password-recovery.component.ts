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
import { Router } from '@angular/router';
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
  constructor(private route: ActivatedRoute,public fb: FormBuilder,public servicioLogin:LoginUsuarioService,private router: Router) { 
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
      this.servicioLogin.passRecover(this.token,this.formulario.controls['password'].value);
  }


}
