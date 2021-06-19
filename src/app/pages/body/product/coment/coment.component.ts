import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { LoginUsuarioService } from '../../../../services/login-usuario.service';
import { ActivatedRoute } from '@angular/router';


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
        this.servicioProductos.saveComment(this.formulario.controls['coment'].value,this.formulario.controls['rate'].value, this.idProducto)
      }
    }
  }
  rate(valor: number) {
    this.servicioProductos.valorRating = valor;
  }
}
