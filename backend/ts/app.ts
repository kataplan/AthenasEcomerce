import { connection } from './config/dbconfig'
import { Regiones } from './interfaces/regiones';
import { Usuario } from './interfaces/usuario'

const bcrypt = require('bcryptjs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const cors = require('cors');
const hostname = 'localhost';
const port = '3000';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());

/* Conexion con base de datos*/ 
connection.connect( (error:any)=>{
    if (error) throw error;
    console.log('Base de datos conectada')
})

app.get('/search/:nombreProducto',(req:any, res:any)=>{
    let prodBusqueda = "%"+req.params.nombreProducto+"%";
    const sql = "SELECT idProducto, nombreProducto, descripcion, precio, stock, valoracion FROM producto WHERE nombreProducto LIKE ? "
    
    connection.query(sql,prodBusqueda,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    
    })
})

app.post('/registrar',(req:any,res:any)=>{
    if(req.body===''){
        res.status(500).json({ message: 'ERROR AL REGISTRAR' });
    }else{
        
        const newUser:Usuario= req.body;
        const hashedPassword:string = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync());
        const sql = 'INSERT INTO usuario (nombres, apellidos, rut, email, region, comuna, direccion, contrasena) VALUES(?,?,?,?,?,?,?,?)'   
        connection.query(sql,[newUser.nombres,newUser.apellidos,newUser.rut,newUser.email,newUser.region,newUser.comuna,newUser.direccion, hashedPassword],(error:any,results:any)=>{
            if (error) if (error) throw error;
            
            console.log("1 usuario registrado");
            res.status(201).json({ message: 'USUARIO CREADO CON EXITO' }); 
        })
    }
    
})
app.get('/categoria/:categoria',(req:any, res:any)=>{
    let categoria=req.params.categoria;
    const sql = 'SELECT idProducto, nombreProducto, descripcion, precio, stock, valoracion FROM producto INNER JOIN categoria ON categoria.nombreCategoria = ? WHERE producto.idCategoria = categoria.idCategoria'
    connection.query(sql,categoria,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
})

app.get('/regiones',(req:any, res:any)=>{
    
    fs.readFile('backend/database/regiones-comunas.json', 'utf8', (err: any, data: any) => {
        if (err) {
          console.log(`Error al leer el archivo:'${err}`);
        } else {
            const dataRegiones: Regiones = JSON.parse(data);
            res.send(dataRegiones)
        }
    });
})


app.get('/producto/:id', (req: any, res: any) => {
    let id=req.params.id;
    const sql = 'SELECT * FROM producto WHERE idProducto = ?'
    connection.query(sql,id,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});
app.get('/producto/categoria/:id', (req: any, res: any) => {
    let id=req.params.id;
    const sql = 'SELECT * FROM categoria WHERE idCategoria = ?'
    connection.query(sql,id,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});

app.listen(port, hostname, () => {
    console.log('SERVIDOR EJECUTÁNDOSE EN http://localhost:' + port);
});

