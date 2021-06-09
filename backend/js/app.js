"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbconfig_1 = require("./dbconfig");
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
app.get('/', function (req, res) {
    var sql = 'SELECT * FROM categoria';
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
app.listen(port, hostname, function () {
    console.log('SERVIDOR EJECUTÁNDOSE EN http://localhost:' + port);
});
var aa = 'xd';
