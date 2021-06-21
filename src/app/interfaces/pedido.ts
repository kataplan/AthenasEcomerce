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
