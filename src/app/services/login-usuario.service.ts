import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Profile } from '../interfaces/usuario';
@Injectable({
  providedIn: 'root',
})
export class LoginUsuarioService {
  server = 'http://localhost:3000/';
  loggedUser = false;
  token = '';
  error = '';
  profile: Profile = {
    nombres: '',
    apellidos: '',
    rut: '',
    direccion: '',
    region: '',
    comuna: '',
    email: ''
  };


  constructor(private servicio: HttpClient, private router: Router) {}
  
  logUser(user: any) {
    return this.servicio.post(`${this.server}login`, user).subscribe(
      (response: any) => {
        if (response.code == 204) {
          this.error = 'Email y/o contraseña erroneos.';
        } else {
          this.token = response.token;
          sessionStorage.setItem('whoami', this.token);
          this.loggedUser = true;
          this.verifylogin();
         
          if (this.verifyLoggedUser(this.token)) {
            this.getUserData(this.token).subscribe((response) => {
              this.profile = <Profile>response;
            });
          }
        }
      },
      (error) => console.log(error)
    );
  }

  getUserData(sessionToken: string) {
    const tokenString = {
      token: sessionToken,
    };
    return this.servicio.post(`${this.server}getUserData`, tokenString);
  }

  verifylogin() {
    if (this.loggedUser) {
      this.router.navigate(['home']);
    } else {
      console.log('false');
    }
  }

  verifyLoggedUser(sessionToken: string) {
    if(sessionToken ===''){
      return this.loggedUser;
    }else{
    
      this.servicio.post(`${this.server}api/${sessionStorage.getItem('whoami')}`,sessionToken).subscribe((dato: any) => {
        this.loggedUser = dato.loginStatus;
      });
      return this.loggedUser;
    }
    
  }

  passReset(email: string) {
    this.servicio.post(`${this.server}passReset/${email}`, email).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  passRecover(token: string, password: string) {
    const recovery = {
      recoveryToken: token,
      recoveryPassword: password,
    };

    this.servicio
      .post(`${this.server}passrecovery`, recovery)
      .subscribe((response: any) => {
        if (response.code == 201) {
          alert('¡Contraseña modificada con éxito!');
          this.router.navigate(['login']);
        }
      });
  }

  logOut() {
    sessionStorage.removeItem('whoami');
    this.router.navigate(['home']);
    window.location.reload();
  }

  loadSession() {
    if (sessionStorage.getItem('whoami')) {
      this.loggedUser = true;
    }
  }

}
