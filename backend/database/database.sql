CREATE DATABASE athenas_ecommerce_db;

USE athenas_ecommerce_db;

CREATE TABLE categoria(
    idCategoria INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreCategoria VARCHAR(50)
);

CREATE TABLE usuario(
    idUsuario INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(120),
    apellidos VARCHAR(120),
    rut VARCHAR(10),
    direccion VARCHAR(200),
    region VARCHAR(50),
    comuna VARCHAR(50),
    email VARCHAR(30),
    contrasena VARCHAR(100)
);

CREATE TABLE producto(
    idProducto INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreProducto VARCHAR(120),
    descripcion VARCHAR(120),
    precio INT(10),
    stock INT(8),
    valoracion FLOAT(5),
    idCategoria INT(11),
    FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria)
);

CREATE TABLE pedido(
    idPedido INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numeroOrden VARCHAR(45),
    fecha DATE(),
    idUsuario INT(11),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE productoPedido(
    idDetallesPedido INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idProducto INT(11),
    idPedido INT(11),
    totalPedido INT(45),
    cantidadProductos INT(5),
    FOREIGN KEY (idPedido) REFERENCES pedido(idPedido),
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
);

CREATE TABLE comentario(
    idComentario INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comentario VARCHAR(250) NOT NULL,
    valoracion FLOAT(5),
    idProducto INT(11),
    idUsuario INT(11),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
)

CREATE TABLE carrito( 
    idCarrito INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    idUsuario INT(11), FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario) 
)

CREATE TABLE productoCarrito(
    idProductoCarrito INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idCarrito INT(11),
    idProducto INT(11),
    cantidad INT(11),
    FOREIGN KEY (idCarrito) REFERENCES carrito(idCarrito),
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
)

CREATE TABLE administrador(
    idAdmin INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(45) NOT NULL,
    contrasena VARCHAR(45) NOT NULL,
)

