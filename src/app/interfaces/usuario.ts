export interface Usuario {
    nombres:string,
    apellidos:string,
    rut:string,
    direccion:string,
    region:string,
    comuna:string,
    email:string,
    password:string
}

export interface Profile{
    nombres:string,
    apellidos:string,
    rut:string,
    direccion:string,
    region:string,
    comuna:string,
    email:string
}
export interface ProfileAdmin{
    idUsuario:string,
    nombres:string,
    apellidos:string,
    rut:string,
    direccion:string,
    region:string,
    comuna:string,
    email:string,
}