import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuarioService } from '../../../services/login-usuario.service';
import { Profile } from '../../../interfaces/usuario';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile:Profile = {
    nombres:'',
    apellidos:'',
    rut:'',
    direccion:'',
    region:'',
    comuna:''
  }

  constructor(
    private router: Router,
    public servicioLogin: LoginUsuarioService
  ) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('whoami')) {
      this.router.navigate(['home']);
    } else {
     
      const token = <string>sessionStorage.getItem('whoami');

      if (this.servicioLogin.verifyLoggedUser(token)) {
        this.servicioLogin.getUserData(token).subscribe((response)=>{
          this.profile=<Profile>response
        })       
      } else {
        this.router.navigate(['home']);
      }
    }

  }
}
