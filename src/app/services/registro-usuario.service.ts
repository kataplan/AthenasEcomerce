import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Usuario} from '../interfaces/usuario'

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  
  server = 'http://localhost:3000/';

  constructor(private servicio: HttpClient) { }

  registrarUsuario(nuevoUsuario:Usuario){
    
    this.servicio.post(`${this.server}registrar`,nuevoUsuario).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
