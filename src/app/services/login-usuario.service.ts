import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {
  server = 'http://localhost:3000/';
  loggedUser = false;
  token = '';
  headers = new HttpHeaders({'h1':'v1'});

  
  
  constructor(private servicio: HttpClient) { }
 
  logUser(user:any){
    
    return this.servicio.post(`${this.server}login`,user).subscribe(
      (dato:any) =>{
        this.token= dato.token;
        console.log(this.token);
        this.loggedUser=true;
      },
      (error) => console.log(error)
    );
    
  }
  
  //hola hace un commit cuando termines besos en la nalga<3 pongale weno
  // 
  getAdmin(user:any){
    this.servicio.get(`${this.server}admin`,{headers:{'Authorization':`${this.token}`}}).subscribe(
      (response) => console.log(response)
    )
  }

}