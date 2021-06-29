import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { PedidosService } from '../../../../services/pedidos.service'
import { LoginUsuarioService } from '../../../../services/login-usuario.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.scss'],
})
export class ComentComponent implements OnInit {
  formulario: FormGroup;
  idProducto:number = 0;

  constructor(
    public servicioProductos: ProductoService,
    public servicioLogin: LoginUsuarioService,
    public servicioPedidos: PedidosService,
    private route: ActivatedRoute
  ) {
    this.formulario = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      rate: new FormControl('', [Validators.required]),
      coment: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;
      this.idProducto=params.producto;
    });
    
    this.servicioProductos.loadComments(this.idProducto);
  }

  sendComent() {
    
    if (!this.formulario.valid) {
      alert('Complete el Formulario');
    } else {
      if (this.formulario.controls['rate'].value == '') {
        alert('Debe elegir valoración');
      } else {
        const token = <string>sessionStorage.getItem('whoami');
        if(token){    
          const comentario = this.formulario.controls['coment'].value 
          const valoracion = this.formulario.controls['rate'].value
          this.servicioPedidos.verificarComentario(token,this.idProducto,comentario,valoracion)
        }
      }   
      }
    }
  
  rate(valor: number) {
     this.servicioProductos.valorRating=Math.round(valor*10)/10;
  }
}
