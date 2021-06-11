import {connection} from './dbconfig'
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

app.get('/football', (req: any, res: any) => {
    const sql = 'SELECT * FROM producto WHERE idCategoria = 1'
    connection.query(sql,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});
app.get('/basketball', (req: any, res: any) => {
    const sql = 'SELECT * FROM producto WHERE idCategoria = 2'
    connection.query(sql,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});
app.get('/rugby', (req: any, res: any) => {
    const sql = 'SELECT * FROM producto WHERE idCategoria = 3'
    connection.query(sql,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});
app.get('/handball', (req: any, res: any) => {
    const sql = 'SELECT * FROM producto WHERE idCategoria = 4'
    connection.query(sql,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});
app.get('/ciclismo', (req: any, res: any) => {
    const sql = 'SELECT * FROM producto WHERE idCategoria = 5'
    connection.query(sql,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});

app.get('/boxeo', (req: any, res: any) => {
    const sql = 'SELECT * FROM producto WHERE idCategoria = 6'
    connection.query(sql,(error:any,results:any)=>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results)
        }else{
            res.send('No hay resultados')
        }
    })
});

app.get('/tenis', (req: any, res: any) => {
    const sql = 'SELECT * FROM producto WHERE idCategoria = 7'
    connection.query(sql,(error:any,results:any)=>{
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

