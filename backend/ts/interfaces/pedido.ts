import {ProductoPedido} from './producto'

export interface Pedido {
    nombreEntrega:string,
    apellidoEntrega:string,
    rutEntrega:string,
    emailEntrega:string,
    regionEntrega:string,
    comunaEntrega:string,
    direccionEntrega:string,
    token:string,
    listaProductos:Array<ProductoPedido>,
}