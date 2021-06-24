import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { AdminService} from '../../../services/admin.service'
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'region', 'comuna','rut', 'direccion', 'fecha','idPedido', 'idProducto', 'cantidad' ];
  displayedColumnsUsuario: string[] = ['nombre', 'apellido', 'region', 'comuna','rut', 'direccion', 'mail' ];
  adminLogged=false;
  formulario: FormGroup
  hide = true;
 
  dataSource = this.servicioPedidos.listaPedidos;
  
  constructor(public servicioPedidos: PedidosService,public fb: FormBuilder, public servicioAdmin:AdminService){
    this.formulario = fb.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      //recaptcha: new FormControl('',[Validators.required])
    });
  }
  
  
  ngOnInit(): void {
    
    //console.log(this.servicioPedidos.listaPedidos);
    if(sessionStorage.getItem('admin')){
      let token=sessionStorage.getItem('admin')
      this.adminLogged = true;
      this.servicioPedidos.obtenerPedidos();
      this.servicioAdmin.obtenerUsuarios();
    }else{
      this.adminLogged= false;
    }
    
       
          
  }

  onSubmit(){
    if (this.formulario.valid){

      const email = this.formulario.controls['email'].value
      const password = this.formulario.controls['password'].value
      const userLoginData={
        _email: email,
        _password: password
      }
      this.servicioAdmin.logAdmin(userLoginData);
    }else{
      alert('Email y/o contraseña inválidos')
    }
  }

}
