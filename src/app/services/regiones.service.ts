import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region'

@Injectable({
  providedIn: 'root'
})
export class RegionesService {
  server = 'http://localhost:3000/';
  listaRegiones: Array<Region> = [];

  constructor(private servicio: HttpClient) { 

  }

  getRegiones(){
    this.listaRegiones = [];
    this.servicio.get(`${this.server}regiones`).subscribe((dato:any)=>{
      this.listaRegiones=dato.regiones
    })
  }
}
