export interface Producto {
    idProducto:number,
    nombreProducto:string,
    descripcion:string,
    precio:number,
    stock:number,
    valoracion:number,
}
export interface ProductoPedido{
    producto:Producto,
    cantidad:number,
    subTotal:number,
}