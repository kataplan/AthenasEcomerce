import { ProductoPedido } from './productos';
export interface Pedido {
    nombreEntrega:string,
    apellidoEntrega:string,
    rutEntrega:string,
    regionEntrega:string,
    comunaEntrega:string,
    direccionEntrega:string,
    token:string,
    listaProductos:Array<ProductoPedido>,
}

export interface PedidoAdmin {
    apellido:string,
    cantidadProductos:number,
    comuna:string,
    direccion:string,
    fecha: string,
    idPedido:number,
    idProducto:number,
    idProductoPedido:number,
    idUsuario:number,
    nombre:string,
    region:string,
    rut:string,
}
