"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbconfig_1 = require("./config/dbconfig");
var bcrypt = require('bcryptjs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var cors = require('cors');
var hostname = 'localhost';
var port = '3000';
var jwt = require('jsonwebtoken');
/* NODEMAILER SERVICE*/
var nodemailer = require('nodemailer');
/* EXPRESS SESSIONS*/
var session = require('express-session');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
/* Conexion con base de datos*/
dbconfig_1.connection.connect(function (error) {
    if (error)
        throw error;
    console.log('Base de datos conectada');
});
app.post('/admin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body._email;
                password = req.body._password;
                console.log(email, password);
                sql = 'SELECT email, contrasena FROM administrador WHERE email = ?';
                if (!(email && password)) return [3 /*break*/, 2];
                return [4 /*yield*/, dbconfig_1.connection.query(sql, email, function (error, results, fields) {
                        if (results.length > 0) {
                            bcrypt.compare(password, results[0].contrasena, function (err, match) {
                                if (match) {
                                    req.session.loggedin = true;
                                    req.session.username = email;
                                    var token = jwt.sign({ _id: email }, 'secretKey');
                                    res.send({
                                        "code": 200,
                                        "success": "login successful",
                                        "userName": results[0].email,
                                        "token": token
                                    });
                                }
                                else {
                                    res.send({
                                        "code": 204,
                                        "error": "Contraseña erronea"
                                    });
                                }
                            });
                        }
                        else {
                            res.send({
                                "code": 204,
                                "error": "Email no encontrado"
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                res.send({
                    "code": 204,
                    "error": "Email and password does not match"
                });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/eliminarUsuario', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idUsuario, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idUsuario = req.body.id;
                sql = 'DELETE FROM usuario WHERE idUsuario = ?';
                return [4 /*yield*/, dbconfig_1.connection.query(sql, idUsuario, function (error, results) {
                        if (error)
                            throw error;
                        res.send({
                            "code": 201,
                            "message": "Usuario  eliminado correctamente"
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post('/eliminarProductoPedido', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProductoPedido, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idProductoPedido = req.body.id;
                sql = 'DELETE FROM productopedido WHERE idProductoPedido = ?';
                return [4 /*yield*/, dbconfig_1.connection.query(sql, idProductoPedido, function (error, results) {
                        if (error)
                            throw error;
                        res.send({
                            "code": 201,
                            "message": "Producto en pedido eliminado exitosamente"
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.get('/obtenerPedidos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        sql = 'SELECT * FROM pedido INNER JOIN productopedido ON pedido.idPedido = productopedido.idPedido';
        dbconfig_1.connection.query(sql, function (error, results) {
            if (error)
                throw error;
            if (results.length > 0) {
                res.send(results);
            }
            else {
                res.send({
                    "code": 204,
                    "error": "No hay resultados"
                });
            }
        });
        return [2 /*return*/];
    });
}); });
app.post('/verificarComentario', function (req, res) {
    var token = req.body.tokenValue;
    var email = jwt.verify(token, 'secretKey');
    var sql = 'SELECT COUNT(idComentario) as contador FROM comentario WHERE idUsuario = (SELECT idUsuario FROM usuario WHERE email = ?) AND idProducto = ?';
    dbconfig_1.connection.query(sql, [email._id, req.body.idProducto], function (error, results) {
        if (error)
            throw error;
        if (results.length > 0) {
            if (results[0].contador != 0) {
                res.send({
                    "code": 200,
                    "hasComment": "true"
                });
            }
            else {
                res.send({
                    "code": 200,
                    "hasComment": "false"
                });
            }
        }
    });
});
app.post('/guardarPedido', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataToSave, email, sqlEmail, sqlPedido, sqlUltimoPedido, sqlProductoPedido, sqlUpdateStock, idUsuario, idPedido;
    return __generator(this, function (_a) {
        dataToSave = req.body;
        email = jwt.verify(dataToSave.token, 'secretKey');
        sqlEmail = 'SELECT idUsuario FROM usuario WHERE email = ?';
        sqlPedido = 'INSERT INTO pedido (nombre,apellido,rut,direccion,region,comuna,idUsuario) VALUES (?,?,?,?,?,?,?)';
        sqlUltimoPedido = 'SELECT MAX(idPedido) as id FROM pedido';
        sqlProductoPedido = 'INSERT INTO productopedido (idProducto,idPedido,cantidadProductos) VALUES(?,?,?)';
        sqlUpdateStock = 'UPDATE producto SET stock = (SELECT stock from producto WHERE idProducto = ?)-? WHERE idProducto = ? AND idProducto > 0';
        idUsuario = '';
        idPedido = '';
        dbconfig_1.connection.query(sqlEmail, email._id, function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (error)
                            throw error;
                        if (!(results.length > 0)) return [3 /*break*/, 2];
                        idUsuario = results[0].idUsuario;
                        return [4 /*yield*/, dbconfig_1.connection.query(sqlPedido, [dataToSave.nombreEntrega, dataToSave.apellidoEntrega, dataToSave.rutEntrega, dataToSave.direccionEntrega, dataToSave.regionEntrega, dataToSave.comunaEntrega, idUsuario], function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (error)
                                                throw error;
                                            return [4 /*yield*/, dbconfig_1.connection.query(sqlUltimoPedido, function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (error)
                                                            throw error;
                                                        if (results.length > 0 || !null) {
                                                            idPedido = results[0].id;
                                                            dataToSave.listaProductos.forEach(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    dbconfig_1.connection.query(sqlUpdateStock, [item.producto.idProducto, item.cantidad, item.producto.idProducto], function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
                                                                        return __generator(this, function (_a) {
                                                                            switch (_a.label) {
                                                                                case 0:
                                                                                    if (!error) return [3 /*break*/, 1];
                                                                                    res.send({
                                                                                        "code": 204,
                                                                                        "error": "No hay resultados"
                                                                                    });
                                                                                    return [3 /*break*/, 3];
                                                                                case 1: return [4 /*yield*/, dbconfig_1.connection.query(sqlProductoPedido, [item.producto.idProducto, idPedido, item.cantidad], function (error, results) {
                                                                                        if (error)
                                                                                            throw error;
                                                                                    })];
                                                                                case 2:
                                                                                    _a.sent();
                                                                                    _a.label = 3;
                                                                                case 3: return [2 /*return*/];
                                                                            }
                                                                        });
                                                                    }); });
                                                                    return [2 /*return*/];
                                                                });
                                                            }); });
                                                            res.send({
                                                                "code": 200,
                                                                "result": 'Datos insertados correctamente'
                                                            });
                                                        }
                                                        else {
                                                            res.send({
                                                                "code": 204,
                                                                "error": "No hay resultados"
                                                            });
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        res.send({
                            "code": 204,
                            "error": "No hay resultados"
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
app.post('/getUserId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, sql, email;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                sql = 'SELECT idUsuario FROM usuario WHERE email = ?';
                email = jwt.verify(token, 'secretKey');
                return [4 /*yield*/, dbconfig_1.connection.query(sql, email._id, function (error, results) {
                        if (error)
                            throw error;
                        if (results.length > 0) {
                            var id = results[0].idUsuario;
                            res.send({
                                "code": 200,
                                "result": id
                            });
                        }
                        else {
                            res.send({
                                "code": 204,
                                "error": "No hay resultados"
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.get('/getUsers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var adminToken, sql, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                adminToken = req.body.token;
                sql = 'SELECT idUsuario,nombres,apellidos,rut,email,direccion,region,comuna FROM usuario';
                return [4 /*yield*/, dbconfig_1.connection.query(sql, function (error, results) {
                        if (error)
                            throw error;
                        if (results.length > 0) {
                            res.send(results);
                        }
                        else {
                            res.send({
                                "code": 204,
                                "error": "No hay resultados"
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post('/getUserData', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, sqlEmail, email, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                sqlEmail = 'SELECT nombres,apellidos,rut,direccion,region,comuna,email FROM usuario WHERE email = ?';
                email = jwt.verify(token, 'secretKey');
                return [4 /*yield*/, dbconfig_1.connection.query(sqlEmail, email._id, function (error, results) {
                        if (error)
                            throw error;
                        if (results.length > 0) {
                            userData = results[0];
                            res.send(userData);
                        }
                        else {
                            res.send({
                                "code": 204,
                                "error": "No hay resultados"
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post('/loadComments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProducto, sql;
    return __generator(this, function (_a) {
        console.log(req.body);
        idProducto = req.body.id;
        sql = 'SELECT comentario,valoracion,nombres FROM comentario INNER JOIN usuario ON comentario.idUsuario = usuario.idUsuario WHERE comentario.idProducto = ?';
        dbconfig_1.connection.query(sql, idProducto, function (error, results) {
            if (error)
                throw error;
            if (results.length > 0) {
                res.json(results);
            }
            else {
                res.send({
                    "code": 204,
                    "error": "No hay resultados"
                });
            }
        });
        return [2 /*return*/];
    });
}); });
app.post('/saveComment', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, comment, valoration, productId, sqlEmail, email, sqlComment, userId, sqlSelVal, sqlUpdateVal, suma, promedio;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, token = _a.token, comment = _a.comment, valoration = _a.valoration;
                productId = req.body.idProducto;
                sqlEmail = 'SELECT idUsuario FROM usuario WHERE email = ?';
                email = jwt.verify(token, 'secretKey');
                sqlComment = 'INSERT INTO comentario (comentario, valoracion, idProducto, idUsuario) VALUES(?,?,?,?)';
                sqlSelVal = 'SELECT valoracion FROM comentario WHERE idProducto = ?';
                sqlUpdateVal = 'UPDATE producto SET valoracion = ? WHERE producto.idProducto = ?';
                suma = 0;
                promedio = 0;
                return [4 /*yield*/, dbconfig_1.connection.query(sqlEmail, email._id, function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (error)
                                        throw error;
                                    if (!(results.length > 0)) return [3 /*break*/, 2];
                                    userId = results[0].idUsuario;
                                    return [4 /*yield*/, dbconfig_1.connection.query(sqlComment, [comment, valoration, productId, userId], function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (error)
                                                            throw error;
                                                        return [4 /*yield*/, dbconfig_1.connection.query(sqlSelVal, productId, function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
                                                                var i;
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            i = 0;
                                                                            for (i = 0; i < results.length; i++) {
                                                                                suma = suma + results[i].valoracion;
                                                                            }
                                                                            promedio = suma / results.length;
                                                                            return [4 /*yield*/, dbconfig_1.connection.query(sqlUpdateVal, [promedio, productId], function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
                                                                                    return __generator(this, function (_a) {
                                                                                        if (error)
                                                                                            throw error;
                                                                                        res.send({
                                                                                            "code": 201,
                                                                                            "response": "Comentario Guardado"
                                                                                        });
                                                                                        return [2 /*return*/];
                                                                                    });
                                                                                }); })];
                                                                        case 1:
                                                                            _a.sent();
                                                                            return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    res.send({
                                        "code": 204,
                                        "error": "fallo en  validar email"
                                    });
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post('/passRecovery', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, password, sql, hashedPassword, email;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                token = req.body.recoveryToken;
                password = req.body.recoveryPassword;
                sql = ' UPDATE usuario SET contrasena= ? WHERE email = ? ';
                hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                email = jwt.verify(token, 'secretKey');
                if (!(token == '')) return [3 /*break*/, 1];
                res.send({
                    "code": 204,
                    "error": "token error"
                });
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, dbconfig_1.connection.query(sql, [hashedPassword, email._id], function (error, results) {
                    if (error)
                        throw error;
                    res.send({
                        "code": 201,
                        "error": "Contraseña modificada con exito"
                    });
                })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/passReset/:email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = 'SELECT email FROM usuario WHERE email = ?';
                if (!(req.params.email == '')) return [3 /*break*/, 1];
                res.send({
                    "code": 204,
                    "error": "Email inválido"
                });
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, dbconfig_1.connection.query(sql, req.params.email, function (error, results) {
                    if (error)
                        throw error;
                    if (results.length > 0) {
                        mailer(req.params.email);
                        res.status(201).json({ message: 'Email enviado con exito' });
                    }
                    else {
                        res.send({
                            "code": 404,
                            "error": "Email inválido"
                        });
                    }
                })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/api/:sessionToken', verificarToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send({
            "code": 200,
            "success": "login successful",
            "loginStatus": "true",
            "token": req.params.sessionToken
        });
        return [2 /*return*/];
    });
}); });
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body._email;
                password = req.body._password;
                sql = 'SELECT email, contrasena FROM usuario WHERE email = ?';
                if (!(email && password)) return [3 /*break*/, 2];
                return [4 /*yield*/, dbconfig_1.connection.query(sql, email, function (error, results, fields) {
                        if (results.length > 0) {
                            var comparison = bcrypt.compare(password, results[0].contrasena, function (err, match) {
                                if (match) {
                                    req.session.loggedin = true;
                                    req.session.username = email;
                                    var token = jwt.sign({ _id: email }, 'secretKey');
                                    res.send({
                                        "code": 200,
                                        "success": "login successful",
                                        "userName": results[0].email,
                                        "token": token
                                    });
                                }
                                else {
                                    res.send({
                                        "code": 204,
                                        "error": "Contraseña erronea"
                                    });
                                }
                            });
                        }
                        else {
                            res.send({
                                "code": 204,
                                "error": "Email no encontrado"
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                res.send({
                    "code": 204,
                    "error": "Email and password does not match"
                });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/search/:nombreProducto', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prodBusqueda, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prodBusqueda = "%" + req.params.nombreProducto + "%";
                sql = "SELECT idProducto, nombreProducto, descripcion, precio, stock,valoracion FROM producto WHERE nombreProducto LIKE ? ";
                return [4 /*yield*/, dbconfig_1.connection.query(sql, prodBusqueda, function (error, results) {
                        if (error)
                            throw error;
                        if (results.length > 0) {
                            res.json(results);
                        }
                        else {
                            res.send('No hay resultados');
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post('/registrar', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, newUser_1;
    return __generator(this, function (_a) {
        sql = 'SELECT COUNT(idUsuario) as contador FROM usuario WHERE email = ?';
        if (req.body === '') {
            res.status(500).json({ message: 'ERROR AL REGISTRAR' });
        }
        else {
            newUser_1 = req.body;
            if (validarDatos(newUser_1)) {
                if (verificarRut(newUser_1.rut)) {
                    if (verificarContrasena(newUser_1.password)) {
                        dbconfig_1.connection.query(sql, newUser_1.email, function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
                            var hashedPassword, sql_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (error)
                                            throw error;
                                        if (!(results[0].contador == 0)) return [3 /*break*/, 2];
                                        hashedPassword = bcrypt.hashSync(newUser_1.password, bcrypt.genSaltSync(10));
                                        sql_1 = 'INSERT INTO usuario (nombres, apellidos, rut, email, region, comuna, direccion, contrasena) VALUES(?,?,?,?,?,?,?,?)';
                                        return [4 /*yield*/, dbconfig_1.connection.query(sql_1, [newUser_1.nombres, newUser_1.apellidos, newUser_1.rut, newUser_1.email, newUser_1.region, newUser_1.comuna, newUser_1.direccion, hashedPassword], function (error, results) {
                                                if (error)
                                                    if (error)
                                                        throw error;
                                                console.log("1 usuario registrado");
                                                var token = jwt.sign({ _id: newUser_1.password }, 'secretKey');
                                                res.send({
                                                    "code": 201,
                                                    "error": "Registrado con exito"
                                                });
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        res.send({
                                            "code": 204,
                                            "error": "USUARIO YA REGISTRADO"
                                        });
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else {
                        res.send({
                            "code": 204,
                            "error": "Contraseña invalida"
                        });
                    }
                }
                else {
                    res.send({
                        "code": 204,
                        "error": "RUT INVALIDO"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "error": "error al registrar el usuario, verifique los campos"
                });
            }
        }
        return [2 /*return*/];
    });
}); });
app.get('/categoria/:categoria', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoria, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoria = req.params.categoria;
                sql = 'SELECT idProducto, nombreProducto, descripcion, precio, stock,valoracion FROM producto INNER JOIN categoria ON categoria.nombreCategoria = ? WHERE producto.idCategoria = categoria.idCategoria';
                return [4 /*yield*/, dbconfig_1.connection.query(sql, categoria, function (error, results) {
                        if (error)
                            throw error;
                        if (results.length > 0) {
                            res.json(results);
                        }
                        else {
                            res.send('No hay resultados');
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.get('/regiones', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.readFile('backend/database/regiones-comunas.json', 'utf8', function (err, data) {
                    if (err) {
                        console.log("Error al leer el archivo:'" + err);
                    }
                    else {
                        var dataRegiones = JSON.parse(data);
                        res.send(dataRegiones);
                    }
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.get('/producto/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                sql = 'SELECT * FROM producto WHERE idProducto = ?';
                return [4 /*yield*/, dbconfig_1.connection.query(sql, id, function (error, results) {
                        if (error)
                            throw error;
                        if (results.length > 0) {
                            res.json(results);
                        }
                        else {
                            res.send('No hay resultados');
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.get('/producto/categoria/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                sql = 'SELECT * FROM categoria WHERE idCategoria = ?';
                return [4 /*yield*/, dbconfig_1.connection.query(sql, id, function (error, results) {
                        if (error)
                            throw error;
                        if (results.length > 0) {
                            res.json(results);
                        }
                        else {
                            res.send('No hay resultados');
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, hostname, function () {
    console.log('SERVIDOR EJECUTÁNDOSE EN http://localhost:' + port);
});
function verificarToken(req, res, next) {
    if (!req.params.sessionToken) {
        return res.status(401).send('USTED NO TIENE AUTORIZACION PARA ESTAR AQUI');
    }
    var token = req.params.sessionToken;
    if (token === 'null') {
        return res.status(401).send('USTED NO TIENE AUTORIZACION PARA ESTAR AQUI');
    }
    var payload = jwt.verify(token, 'secretKey');
    req.userEmail = payload.email;
    next();
}
function mailer(email) {
    return __awaiter(this, void 0, void 0, function () {
        var recovery_token, mailOptions, transporter;
        return __generator(this, function (_a) {
            console.log(email);
            recovery_token = jwt.sign({ _id: email }, 'secretKey');
            mailOptions = {
                from: 'athenasecommerce@gmail.com',
                to: "" + email,
                subject: 'Recuperar tu contraseña',
                html: '<h2>Click en el siguiente link para recuperar tu contraseña:</h2><button style="background-color: #008CBA;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer; " type="button"><a style="color: #ffffff; text-decoration: none;" href="http://localhost:4200/passwordRecovery/' + recovery_token + '">REINICIAR CONTRASEÑA</a></button>'
            };
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'athenasecommerce@gmail.com',
                    pass: '4th3n4s3c0mm3rc3*'
                }
            });
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Email enviado: ' + info.response);
                }
                ;
            });
            return [2 /*return*/];
        });
    });
}
function validarDatos(newUser) {
    if (newUser.nombres === '') {
        return false;
    }
    if (newUser.apellidos === '') {
        return false;
    }
    if (newUser.direccion === '') {
        return false;
    }
    if (newUser.comuna === '') {
        return false;
    }
    if (newUser.region === '') {
        return false;
    }
    return true;
}
function verificarContrasena(password) {
    if (password.length < 8 || password === '') {
        return false;
    }
    else {
        return true;
    }
}
function verificarRut(rut) {
    if (rut === '') {
        return false;
    }
    else {
        return digitoVerificador(rut);
    }
}
function digitoVerificador(rut) {
    var serie = [2, 3, 4, 5, 6, 7, 2, 3];
    var _a = rut.split("-"), numRut = _a[0], numVerificador = _a[1];
    var numeros = numRut.split("");
    var suma = 0;
    numeros.reverse().map(function (num, i) {
        suma += Number(num) * serie[i];
    });
    var module = suma % 11;
    var Verificador = 11 - module;
    var k = "k";
    var zero = "0";
    if (Verificador == Number(numVerificador)) {
        return true;
    }
    else if (Verificador == 11) {
        if (numVerificador != zero) {
            return false;
        }
        else {
            return true;
        }
    }
    else if (Verificador == 10) {
        if (numVerificador != k) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
