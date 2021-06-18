import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { textChangeRangeIsUnchanged } from 'typescript';
import {Recovery} from '../interfaces/recovery'
@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {
  server = 'http://localhost:3000/';
  loggedUser = false;
  token = '';

  constructor(private servicio: HttpClient) { }
 
  logUser(user:any){
    return this.servicio.post(`${this.server}login`,user).subscribe(
      (dato:any) =>{
        this.token = dato.token;
        sessionStorage.setItem('whoami',this.token)
        console.log(this.token);
        this.loggedUser=true;
      },
      (error) => console.log(error)
    );
    
  }

  verifyLoggedUser(sessionToken:string){
    
    this.servicio.post(`${this.server}api/${sessionStorage.getItem('whoami')}`,sessionToken).subscribe(
      (dato:any)=>{
        this.loggedUser = dato.loginStatus
      }
    ) 
    return this.loggedUser;
  }

  /*getAdmin(user:any){
    this.servicio.get(`${this.server}admin`,{headers:{'Authorization':`${this.token}`}}).subscribe(
      (response) => console.log(response)
    )
  }*/

  passReset(email:string){
    this.servicio.post(`${this.server}passReset/${email}`,email).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  passRecover(recovery:Recovery){
    this.servicio.post(`${this.server}passrecovery`,recovery).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  logOut(){
    sessionStorage.removeItem('whoami')
  }

  

}