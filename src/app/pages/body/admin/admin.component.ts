import { Component, OnInit,ViewChild } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { AdminService} from '../../../services/admin.service'
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { PedidoAdmin } from '../../../interfaces/pedido'
import { ProfileAdmin } from '../../../interfaces/usuario'
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../util/dialog/dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'region', 'comuna','rut', 'direccion', 'fecha','idPedido', 'idProducto', 'cantidad','Eliminar'];
  displayedColumnsUsuario: string[] = ['nombre', 'apellido', 'region', 'comuna','rut', 'direccion', 'mail', 'Eliminar' ];
  adminLogged=false;
  formulario: FormGroup
  hide = true;
  
  dataSource = this.servicioPedidos.listaPedidos;
  
  constructor(public dialog: MatDialog, public servicioPedidos: PedidosService,public fb: FormBuilder, public servicioAdmin:AdminService){
    this.formulario = fb.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      //recaptcha: new FormControl('',[Validators.required])
    });
  }
  @ViewChild(MatTable) table!: MatTable<PedidoAdmin>;
  @ViewChild('profile') profileTable!: MatTable<ProfileAdmin>;
  
  
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

  openSnackBar(pedido: PedidoAdmin ) {
    this.servicioAdmin.textoEliminar="pedido"
    const dialogRef = this.dialog.open(DialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let index = this.servicioPedidos.listaPedidos.indexOf(pedido);
        this.servicioPedidos.listaPedidos.splice( index ,1);
        this.table.renderRows();

        this.servicioPedidos.eliminarProductoPedido(pedido.idProductoPedido)
      }
    });
    
  }
  openMenuUsuario(usuario:ProfileAdmin) {
    this.servicioAdmin.textoEliminar="usuario"
    const dialogRef = this.dialog.open(DialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let index = this.servicioAdmin.listaUsuarios.indexOf(usuario);
        console.log(this.servicioAdmin.listaUsuarios.indexOf(usuario))
        this.servicioAdmin.listaUsuarios.splice( index ,1);
        this.profileTable.renderRows();        
        this.servicioAdmin.eliminarUsuario(usuario.idUsuario)
      }
    });
    
  }
}
