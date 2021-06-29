import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Usuario} from '../interfaces/usuario'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  
  server = 'http://localhost:3000/';

  constructor(private servicio: HttpClient,private router:Router) { }

  registrarUsuario(nuevoUsuario:Usuario){
    
    this.servicio.post(`${this.server}registrar`,nuevoUsuario).subscribe((response:any) =>{
      if(response.code === 201){
        alert('Registrado con éxito!!');
        this.router.navigate(['login']);

      }
      if(response.code === 204){
        alert(response.error)
      }
    });
  }
}
