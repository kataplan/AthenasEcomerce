"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbconfig_1 = require("./config/dbconfig");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var cors = require('cors');
var hostname = 'localhost';
var port = '3000';
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());
/* Conexion con base de datos*/
dbconfig_1.connection.connect(function (error) {
    if (error)
        throw error;
    console.log('Base de datos conectada');
});
app.post('/registrar', function (req, res) {
    if (req.body === '') {
        res.status(500).json({ message: 'ERROR AL REGISTRAR' });
    }
    else {
        var newUser = req.body;
        var sql = "INSERT INTO usuario (nombres, apellidos, rut, email, region, comuna, direccion,contrasena) VALUES('" + newUser.nombres + "','" + newUser.apellidos + "','" + newUser.rut + "','" + newUser.email + "','" + newUser.region + "','" + newUser.comuna + "','" + newUser.direccion + "','" + newUser.password + "') ";
        dbconfig_1.connection.query(sql, function (error, results) {
            if (error)
                throw error;
            console.log("1 usuario registrado");
        });
        res.status(201).json({ message: 'USUARIO CREADO CON EXITO' });
    }
});
app.get('/regiones', function (req, res) {
    fs.readFile('backend/database/regiones-comunas.json', 'utf8', function (err, data) {
        if (err) {
            console.log("Error al leer el archivo:'" + err);
        }
        else {
            var dataRegiones = JSON.parse(data);
            res.send(dataRegiones);
        }
    });
});
app.get('/football', function (req, res) {
    var sql = 'SELECT idProducto, nombreProducto, descripcion, precio, stock, valoracion FROM producto WHERE idCategoria = 1';
    dbconfig_1.connection.query(sql, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.get('/basketball', function (req, res) {
    var sql = 'SELECT * FROM producto WHERE idCategoria = 2';
    dbconfig_1.connection.query(sql, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.get('/rugby', function (req, res) {
    var sql = 'SELECT * FROM producto WHERE idCategoria = 3';
    dbconfig_1.connection.query(sql, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.get('/handball', function (req, res) {
    var sql = 'SELECT * FROM producto WHERE idCategoria = 4';
    dbconfig_1.connection.query(sql, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.get('/ciclismo', function (req, res) {
    var sql = 'SELECT * FROM producto WHERE idCategoria = 5';
    dbconfig_1.connection.query(sql, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.get('/boxeo', function (req, res) {
    var sql = 'SELECT * FROM producto WHERE idCategoria = 6';
    dbconfig_1.connection.query(sql, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.get('/tenis', function (req, res) {
    var sql = 'SELECT * FROM producto WHERE idCategoria = 7';
    dbconfig_1.connection.query(sql, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.get('/producto/:id', function (req, res) {
    var id = req.params.id;
    var sql = 'SELECT * FROM producto WHERE idProducto = ?';
    dbconfig_1.connection.query(sql, id, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.get('/categoria/:id', function (req, res) {
    var id = req.params.id;
    var sql = 'SELECT * FROM categoria WHERE idCategoria = ?';
    dbconfig_1.connection.query(sql, id, function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            res.json(results);
        }
        else {
            res.send('No hay resultados');
        }
    });
});
app.listen(port, hostname, function () {
    console.log('SERVIDOR EJECUTÁNDOSE EN http://localhost:' + port);
});
