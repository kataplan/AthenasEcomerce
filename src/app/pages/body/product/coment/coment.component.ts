import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { LoginUsuarioService } from '../../../../services/login-usuario.service';


@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.scss']
})
export class ComentComponent implements OnInit {

  constructor(public servicioProductos: ProductoService, public servicioLogin:LoginUsuarioService) 
  {this.formulario =this.createFormGroup();}
  createFormGroup(){
    return new FormGroup({
      rate:new FormControl('',[Validators.required]),
      coment:new FormControl('',[Validators.required, Validators.minLength(5)]),

    });
  }
  formulario:FormGroup;

  ngOnInit(): void {
  }

  sendComent(){
    if(!this.formulario.valid){
      alert("Complete el Formulario");
      return;
    }
    if(this.formulario.value.genero==""){
      alert("Debe elegir valoración");
      return;
    }
    
  }
  rate(valor:number) {
    this.servicioProductos.valorRating=valor;
  }
  }


