import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuarioService } from '../../../services/login-usuario.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, public servicioLogin:LoginUsuarioService ) { }

  ngOnInit(): void {
    
    if (!sessionStorage.getItem('whoami')){
      this.router.navigate(['home'])
    }else{
      const token = <string> sessionStorage.getItem('whoami')
      
      if(this.servicioLogin.verifyLoggedUser(token)){
        
      }else{
        this.router.navigate(['home'])  
      }
    } 
  }
}
